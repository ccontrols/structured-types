import * as ts from 'typescript';
import deepmerge from 'deepmerge';

import {
  PropType,
  PropKind,
  BooleanProp,
  isNumberProp,
  isUnknownProp,
  isObjectLikeProp,
  isIndexProp,
  TypeProp,
  UnionProp,
  ArrayProp,
  hasGenerics,
  HasGenericsProp,
  isArrayProp,
  TupleProp,
  isFunctionBaseType,
  isClassLikeProp,
  propValue,
  ClassProp,
  trimQuotes,
  IndexProp,
  RestProp,
  isEnumProp,
  PropParent,
  SourceLocation,
  strValue,
} from './types';
import {
  getSymbolType,
  ParseOptions,
  defaultParseOptions,
  isObjectTypeDeclaration,
  isHasType,
  tsKindToPropKind,
  isGenericsType,
  isTypeParameterType,
  FunctionLike,
  isFunctionLike,
  isArrayLike,
  ISymbolParser,
  getTypeKind,
  updateModifiers,
  getSymbolDeclaration,
  getTypeSymbol,
  getInitializer,
} from './ts-utils';
import { resolveType } from './ts/resolveType';
import { mergeNodeComments } from './jsdoc/mergeJSDoc';
import { parseJSDocTag } from './jsdoc/parseJSDocTags';
import { isTypeProp, ObjectProp } from './types';

export class SymbolParser implements ISymbolParser {
  public checker: ts.TypeChecker;
  public readonly options: Required<ParseOptions>;
  private refSymbols: {
    newProps: { prop: PropType; topLevel: boolean }[];
    resolved?: PropType;
    symbol: ts.Symbol;
  }[] = [];
  private root?: PropType;
  private checkLibrary: (fileName: ts.SourceFile, node: ts.Node) => boolean;
  private _helpers: Record<string, PropType> = {};
  constructor(
    program: ts.Program,
    checkLibrary: (fileName: ts.SourceFile, node: ts.Node) => boolean,
    options?: ParseOptions,
  ) {
    this.checkLibrary = checkLibrary;
    this.checker = program.getTypeChecker();
    this.options = deepmerge(
      defaultParseOptions,
      options as Required<ParseOptions>,
    );
  }
  private addRefSymbol(
    prop: PropType,
    symbol: ts.Symbol,
    topLevel: boolean,
  ): PropType {
    const refSymbol = this.refSymbols.find((r) => r.symbol === symbol);
    if (!refSymbol) {
      this.refSymbols.push({
        newProps: [{ prop, topLevel }],
        symbol,
      });
    } else if (!refSymbol.resolved) {
      refSymbol.newProps.push({ prop, topLevel });
    }
    return prop;
  }

  private addParentSymbol(
    name: string,
    symbol: ts.Symbol,
    options: ParseOptions,
  ) {
    if (options.collectHelpers) {
      if (!this._helpers[name]) {
        const prop = { name };
        this._helpers[name] = prop;
        return this.addRefSymbol(prop, symbol, true);
      }
    }
    return undefined;
  }

  private addHelperSymbol(
    name: string,
    symbol: ts.Symbol,
    options: ParseOptions,
  ) {
    return (
      this.addParentSymbol(name, symbol, options) ||
      this.addRefSymbol({ name }, symbol, false)
    );
  }
  private getParent(
    node: ts.Node,
    parentProp: PropType,
    options: ParseOptions,
  ): PropParent | undefined | '__internal' {
    const propName = this.geDeclarationName(node as ts.Declaration);
    const addParentRef = (
      declaration: ts.Node,
    ): ReturnType<typeof this.getParent> => {
      if (this.internalNode(declaration)) {
        return '__internal';
      }
      let parent = declaration.parent;
      //find immediate parent
      while (parent) {
        const name = this.geDeclarationName(parent as ts.Declaration);
        if (name) {
          if (name === parentProp.name) {
            return undefined;
          }
          if (propName !== name) {
            break;
          }
        }
        parent = parent.parent;
      }
      if (parent) {
        const name = this.geDeclarationName(parent as ts.Declaration);
        if (name) {
          if (this.internalNode(node) === undefined) {
            const parentName =
              parentProp.name ||
              (typeof parentProp.type === 'string'
                ? parentProp.type
                : undefined);
            const propParent: PropParent = { name };
            this.addParentSymbol(name, (parent as any).symbol, options);
            if (parentName !== name) {
              const loc = this.parseFilePath(options, false, parent);
              if (loc) {
                propParent.loc = loc;
              }
              return propParent;
            }
            return undefined;
          }
          return '__internal';
        }
      }
      return undefined;
    };

    const type = this.checker.getTypeAtLocation(node);
    if (type) {
      const symbol = getTypeSymbol(type);
      if (symbol && (symbol.flags & ts.SymbolFlags.TypeAlias) === 0) {
        const declaration = getSymbolDeclaration(symbol);
        if (declaration && this.internalNode(declaration) === undefined) {
          return addParentRef(declaration);
        }
      }
      return addParentRef(node);
    }
    return undefined;
  }

  private parseFilePath = (
    options: ParseOptions,
    isTopLevel: boolean,
    node?: ts.Node,
  ): SourceLocation | undefined => {
    let location: SourceLocation | undefined = undefined;
    if (
      options.collectSourceInfo &&
      node &&
      (isTopLevel || options.collectInnerLocations)
    ) {
      const source = node.getSourceFile();
      if (!location) {
        location = {};
      }
      location.filePath = source.fileName;
      const name = ts.getNameOfDeclaration(node as ts.Declaration) || node;
      if (name) {
        const start = source.getLineAndCharacterOfPosition(name.getStart());
        const end = source.getLineAndCharacterOfPosition(name.getEnd());
        location.loc = {
          start: {
            line: start.line + 1,
            col: start.character + 1,
          },
          end: {
            line: end.line + 1,
            col: end.character + 1,
          },
        };
      }
    }
    return location;
  };
  public parseProperties(
    properties: ts.NodeArray<
      | ts.ClassElement
      | ts.ObjectLiteralElementLike
      | ts.TypeElement
      | ts.TypeNode
      | ts.HeritageClause
      | ts.EnumMember
      | ts.ArrayBindingElement
      | ts.ParameterDeclaration
      | ts.TypeParameterDeclaration
    >,
    options: ParseOptions,
    types: PropType[] = [],
  ): PropType[] {
    const results: PropType[] = [...types];
    const addProp = (prop: PropType) => {
      if (this.filterProperty(prop, options)) {
        results.push(prop);
      }
    };
    for (const p of properties) {
      if (
        !ts.isTypeNode(p) &&
        !ts.isOmittedExpression(p) &&
        !ts.isHeritageClause(p) &&
        p.name
      ) {
        const name = p.name.getText();
        //locate property overrides.
        //when multiple properties with the same name, symbol returns the same symbol for all of them.
        // thus can not get their properties and comments
        const numProps = properties.filter(
          (f) => (f as ts.TypeElement).name?.getText() === name,
        );
        if (numProps.length <= 1) {
          const symbol = this.getSymbolAtLocation(p.name);
          if (symbol) {
            const prop = this.addRefSymbol(
              { name: symbol.escapedName as string },
              symbol,
              false,
            );
            if (prop) {
              addProp(prop);
            }
            continue;
          }
        }
      }
      const prop = this.parseTypeValueComments(
        {},
        options,
        p,
        getInitializer(p) || p,
      );
      if (prop) {
        addProp(prop);
      }
    }
    return results;
  }
  private parseFunction(
    prop: PropType,
    options: ParseOptions,
    node: FunctionLike,
  ): PropType {
    prop.kind = tsKindToPropKind[node.kind];
    if (isFunctionBaseType(prop)) {
      if (node.parameters.length && !prop.parameters) {
        prop.parameters = this.parseProperties(node.parameters, options);
      }
      if (node.type && !prop.returns) {
        if (!prop.returns) {
          const returns = this.parseTypeValueComments({}, options, node.type);
          if (returns) {
            prop.returns = returns;
            if (!prop.returns.kind) {
              if (tsKindToPropKind[node.type.kind]) {
                prop.returns.kind = tsKindToPropKind[node.type.kind];
              } else {
                prop.returns.kind = PropKind.Type;
              }
            }
            prop.returns.optional = true;
          }
        }
      }
      if (node.typeParameters?.length && !prop.types) {
        prop.types = this.parseProperties(node.typeParameters, options);
      }
      if (
        !prop.returns &&
        !prop.extension &&
        (ts.isFunctionDeclaration(node) ||
          ts.isMethodDeclaration(node) ||
          ts.isArrowFunction(node))
      ) {
        const signature = this.checker.getSignatureFromDeclaration(node);

        if (signature) {
          const returnType = this.checker.getReturnTypeOfSignature(signature);
          const symbol = getTypeSymbol(returnType);
          const returnProp = symbol
            ? this.parseSymbolProp(
                { name: symbol.escapedName as string },
                symbol,
                options,
                false,
              )
            : this.updatePropKind({}, returnType);

          if (returnProp && returnProp.kind !== undefined) {
            prop.returns = returnProp;
            prop.returns.optional = true;
          }
        }
      }
    }

    return prop;
  }

  private parseHeritageClauses(
    prop: PropType,
    options: ParseOptions,
    node?: ts.Node,
  ) {
    if (
      node &&
      (ts.isClassLike(node) || ts.isInterfaceDeclaration(node)) &&
      node.heritageClauses?.length &&
      isClassLikeProp(prop)
    ) {
      const extendsProp: PropParent[] = [];
      node.heritageClauses.forEach((h) => {
        h.types.forEach((t) => {
          const symbol = this.getSymbolAtLocation(t.expression);
          if (symbol) {
            const name = symbol.escapedName as string;
            const loc = this.parseFilePath(
              options,
              false,
              getSymbolDeclaration(symbol),
            );
            const p: PropParent = { name };
            if (loc) {
              p.loc = loc;
            }
            extendsProp.push(p);
            if (this.internalSymbol(symbol) !== undefined) {
              this.addRefSymbol({ name }, symbol, false);
            } else {
              this.addParentSymbol(name, symbol, options);
            }
          }
        });
      });
      if (extendsProp.length) {
        prop.extends = extendsProp;
      }
    }
  }
  private parseValue(
    prop: PropType,
    options: ParseOptions,
    node?: ts.Node,
  ): PropType {
    const addProperties = (
      nodeProperties: ts.NodeArray<
        ts.ObjectLiteralElementLike | ts.BindingElement
      >,
    ) => {
      if (nodeProperties.length) {
        if (!(prop as ClassProp).properties) {
          (prop as ClassProp).properties = [];
        }
        const properties = (prop as ClassProp).properties as PropType[];
        nodeProperties.forEach((e) => {
          if (
            (ts.isPropertyAssignment(e) || ts.isBindingElement(e)) &&
            e.initializer
          ) {
            const p = properties.find((p) => p.name === e.name.getText());
            if (p) {
              this.parseValue(p, options, e.initializer);
            } else {
              const childSymbol = this.getSymbolAtLocation(e.name);

              if (childSymbol) {
                const childProp = this.parseSymbolProp(
                  {},
                  childSymbol,
                  options,
                  false,
                );
                if (
                  childProp &&
                  childProp.kind !== PropKind.Rest &&
                  this.filterProperty(childProp, options)
                ) {
                  this.parseValue(childProp, options, e.initializer);
                  properties.push(childProp);
                }
              }
            }
          }
        });
      }
    };
    if (node) {
      if (isFunctionLike(node)) {
        return this.parseFunction(prop, options, node);
      } else if (ts.isObjectBindingPattern(node)) {
        addProperties(node.elements);
      } else if (ts.isObjectLiteralExpression(node)) {
        addProperties(node.properties);
      } else if (ts.isIdentifier(node)) {
        const symbol = this.getSymbolAtLocation(node);
        if (symbol && isTypeProp(prop)) {
          prop.value = this.addHelperSymbol(symbol.name, symbol, options);
        }
      } else if (
        ts.isTypeAssertionExpression(node) ||
        ts.isAsExpression(node)
      ) {
        this.parseValue(prop, options, node.expression);
      } else if (
        ts.isArrayBindingPattern(node) ||
        ts.isArrayLiteralExpression(node)
      ) {
        prop.kind = PropKind.Array;
        if (isArrayProp(prop)) {
          prop.value = this.parseProperties(
            node.elements as ts.NodeArray<ts.ArrayBindingElement>,
            options,
          );
        }
      } else if (ts.isNumericLiteral(node)) {
        if (!prop.kind) {
          prop.kind = PropKind.Number;
        }
        propValue(prop, node.text);
      } else if (ts.isStringLiteral(node)) {
        if (!prop.kind) {
          prop.kind = PropKind.String;
        }
        propValue(prop, node.text);
      } else if (ts.isRegularExpressionLiteral(node)) {
        prop.kind = PropKind.RegEx;
        propValue(prop, node.text);
      } else if (node.kind === ts.SyntaxKind.FalseKeyword) {
        if (!prop.kind) {
          prop.kind = PropKind.Boolean;
        }
        (prop as BooleanProp).value = false;
      } else if (node.kind === ts.SyntaxKind.TrueKeyword) {
        if (!prop.kind) {
          prop.kind = PropKind.Boolean;
        }
        (prop as BooleanProp).value = true;
      } else if (isUnknownProp(prop)) {
        prop.kind = PropKind.Unknown;
        if (typeof (node as ts.LiteralLikeNode)?.text !== 'undefined') {
          const value = (node as ts.LiteralLikeNode)?.text;
          prop.value = strValue(value);
        }
      } else if (ts.isPrefixUnaryExpression(node)) {
        this.parseValue(prop, options, node.operand);
        if (
          node.operator === ts.SyntaxKind.MinusToken &&
          isNumberProp(prop) &&
          typeof prop.value !== 'undefined'
        ) {
          prop.value = -prop.value;
        }
      }
    }
    return prop;
  }
  private geDeclarationName(declaration?: ts.Declaration): string | undefined {
    if (!declaration || ts.isModuleDeclaration(declaration)) {
      return undefined;
    }
    const name = ts.getNameOfDeclaration(declaration);
    if (name) {
      return 'text' in name ? name.getText() : undefined;
    }
    return undefined;
  }

  public updateSymbolName(prop: PropType, node?: ts.Declaration): PropType {
    if (node && prop.name === undefined) {
      const name = this.geDeclarationName(node);
      if (name && name !== prop.type) {
        prop.name = name;
      }
    }
    return prop;
  }
  public parseType(
    prop: PropType,
    options: ParseOptions,
    node?: ts.Node,
  ): PropType {
    if (node) {
      if (isFunctionLike(node)) {
        return this.parseFunction(prop, options, node);
      } else if (isArrayLike(node)) {
        prop.kind = PropKind.Array;

        if (ts.isArrayTypeNode(node)) {
          const element = this.parseType({}, options, node.elementType);
          (prop as ArrayProp).properties = [element];
        } else if (ts.isTypeReferenceNode(node) && node.typeArguments?.length) {
          (prop as ArrayProp).properties = this.parseProperties(
            node.typeArguments,
            options,
          );
        }
      } else if (ts.isIndexSignatureDeclaration(node)) {
        prop.kind = PropKind.Index;
        if (isIndexProp(prop)) {
          if (node.parameters.length) {
            const index = node.parameters[0];
            const indexProp = this.parseTypeValueComments(
              {
                name: index.name.getText(),
              },
              options,
              index,
            );
            if (indexProp) {
              prop.index = indexProp;
            }
          }
          const type = this.parseTypeValueComments({}, options, node.type);
          if (type) {
            prop.prop = type;
            if (type.name) {
              prop.prop.type = type.name;
            }
          }
        }
      } else if (ts.isIndexedAccessTypeNode(node)) {
        if (
          ts.isLiteralTypeNode(node.indexType) &&
          ts.isTypeReferenceNode(node.objectType)
        ) {
          const propName = trimQuotes(node.indexType.literal.getText());
          const refSymbol = this.getSymbolAtLocation(node.objectType.typeName);
          const typeSymbol = refSymbol?.members?.get(propName as ts.__String);
          if (typeSymbol) {
            return this.addRefSymbol(prop, typeSymbol, false);
          }
        } else {
          const propType: ts.Type | undefined = this.checker.getTypeAtLocation(
            node.objectType,
          );
          if (propType) {
            const typeArguments: ts.Type[] | undefined =
              (propType as any).resolvedTypeArguments ||
              (propType as any).typeArguments;
            if (typeArguments) {
              prop.kind = PropKind.Union;
              (prop as UnionProp).properties = typeArguments.map((arg) => {
                const p: PropType = {
                  kind: getTypeKind(arg) || PropKind.String,
                };
                propValue(p, (arg as any).value as string);
                return p;
              });
            }
          }
        }
      } else if (isHasType(node) && node.type) {
        if (node.type?.kind && tsKindToPropKind[node.type.kind]) {
          prop.kind = tsKindToPropKind[node.type.kind];
        }
        if (
          options.collectGenerics &&
          hasGenerics(prop) &&
          isGenericsType(node) &&
          node.typeParameters
        ) {
          prop.generics = this.parseProperties(node.typeParameters, options);
        }
        this.parseTypeValueComments(prop, options, node.type);
      } else if (ts.isExportAssignment(node)) {
        const symbol = this.getSymbolAtLocation(node.expression);
        if (symbol) {
          return this.addRefSymbol(prop, symbol, false);
        }
      } else if (ts.isExportSpecifier(node)) {
        if (node.propertyName) {
          prop.name = node.propertyName.getText();
          const symbol = this.getSymbolAtLocation(node.propertyName);
          if (symbol) {
            return this.addRefSymbol(prop, symbol, false);
          }
        }
      } else if (isObjectTypeDeclaration(node)) {
        if (isObjectLikeProp(prop)) {
          if (
            options.collectGenerics &&
            hasGenerics(prop) &&
            isGenericsType(node) &&
            !ts.isTypeLiteralNode(node) &&
            node.typeParameters
          ) {
            prop.generics = this.parseProperties(node.typeParameters, options);
          }

          const properties: PropType[] = this.parseProperties(
            node.members,
            options,
          );
          if (options.collectInheritance) {
            this.parseHeritageClauses(prop, options, node);
          }

          prop.properties = properties;
        }
      } else if (ts.isTypeReferenceNode(node)) {
        const symbol = this.getSymbolAtLocation(node.typeName);
        if (symbol) {
          const d = getSymbolDeclaration(symbol);
          if (d && tsKindToPropKind[d.kind]) {
            prop.kind = tsKindToPropKind[d.kind];
          }
          prop.type = node.typeName.getText();
          const internalKind = this.internalSymbol(symbol);
          if (internalKind === undefined) {
            this.addRefSymbol(prop, symbol, false);
          } else {
            if (internalKind !== PropKind.Any) {
              prop.kind = internalKind;
            }
          }
        } else {
          const type = node.getText();
          if (typeof type === 'string') {
            prop.type = type;
          }
        }
        if (options.collectGenerics && node.typeArguments?.length) {
          (prop as HasGenericsProp).generics = this.parseProperties(
            node.typeArguments,
            options,
          );
        }
      } else if (ts.isTypeParameterDeclaration(node)) {
        const typeName = this.geDeclarationName(node);
        if (typeName && prop.name !== typeName) {
          prop.type = typeName;
        }
      } else if (ts.isIntersectionTypeNode(node)) {
        prop.kind = PropKind.Type;
        const properties: PropType[] = [];
        node.types.forEach((t) => {
          if (ts.isTypeReferenceNode(t)) {
            const symbol = this.getSymbolAtLocation(t.typeName);
            if (symbol) {
              const childProp: PropType = {};
              this.addRefSymbol(prop, symbol, false);
              properties.push(childProp);
            }
          }
        });
        (prop as TypeProp).properties = properties;
      } else if (ts.isLiteralTypeNode(node)) {
        this.parseTypeValueComments(prop, options, node.literal);
      } else if (ts.isTypeLiteralNode(node)) {
        prop.kind = PropKind.Type;
        if (node.members.length) {
          (prop as TypeProp).properties = this.parseProperties(
            node.members,
            options,
          );
        }
      } else if (ts.isOptionalTypeNode(node)) {
        prop.optional = true;
        this.parseTypeValueComments(prop, options, node.type);
      } else if (ts.isRestTypeNode(node)) {
        prop.kind = PropKind.Rest;
        const type = this.parseTypeValueComments({}, options, node.type);
        if (type) {
          (prop as RestProp).prop = type;
        }
      } else if (ts.isParameter(node)) {
        return this.parseType(prop, options, node.name);
      } else if (ts.isUnionTypeNode(node)) {
        prop.kind = PropKind.Union;
        (prop as UnionProp).properties = this.parseProperties(
          node.types,
          options,
        );
      } else if (ts.isEnumMember(node)) {
        const enumType = node.name.getText();
        if (prop.name !== enumType) {
          prop.type = enumType;
        }
      } else if (ts.isTupleTypeNode(node)) {
        prop.kind = PropKind.Tuple;
        (prop as TupleProp).properties = this.parseProperties(
          node.elements,
          options,
        );
      } else if (ts.isObjectBindingPattern(node)) {
        prop.kind = PropKind.Object;
        (prop as ObjectProp).properties = this.parseProperties(
          node.elements,
          options,
        );
      } else {
        switch (node.kind) {
          case ts.SyntaxKind.NumberKeyword:
            prop.kind = PropKind.Number;
            break;

          case ts.SyntaxKind.StringLiteral:
          case ts.SyntaxKind.StringKeyword:
            prop.kind = PropKind.String;
            break;
          case ts.SyntaxKind.BooleanKeyword:
            prop.kind = PropKind.Boolean;
            break;
          case ts.SyntaxKind.VoidKeyword:
            prop.kind = PropKind.Void;
            break;
          case ts.SyntaxKind.ObjectKeyword:
            prop.kind = PropKind.Object;
            break;
          case ts.SyntaxKind.AnyKeyword:
            prop.kind = PropKind.Any;
            break;
          case ts.SyntaxKind.UnknownKeyword:
            prop.kind = PropKind.Unknown;
            break;
          case ts.SyntaxKind.NullKeyword:
            prop.kind = PropKind.Null;
            break;
          case ts.SyntaxKind.UndefinedKeyword:
            prop.kind = PropKind.Undefined;
            break;
          case ts.SyntaxKind.JSDocPropertyTag:
          case ts.SyntaxKind.JSDocParameterTag:
            parseJSDocTag(this, options, prop, node as ts.JSDocTag);
            break;
        }
      }
    }
    return prop;
  }

  private getSymbolAtLocation(node: ts.Node): ts.Symbol | undefined {
    const symbol = this.checker.getSymbolAtLocation(node);
    if (symbol && symbol.flags & ts.SymbolFlags.Alias) {
      return this.checker.getAliasedSymbol(symbol);
    }
    return symbol;
  }

  private getTypeIndexes(type: ts.Type, options: ParseOptions): PropType[] {
    interface InterfaceOrTypeWithIndex extends ts.InterfaceType {
      stringIndexInfo?: ts.IndexInfo;
      numberIndexInfo?: ts.IndexInfo;
    }
    const extractIndex = (
      index: ts.IndexInfo | undefined,
      kind: PropKind,
    ): PropType | null => {
      if (index?.declaration) {
        return this.parseTypeValueComments({}, options, index.declaration);
      } else if (index?.type) {
        const symbol = getTypeSymbol(index.type);
        const p: IndexProp = {
          kind: PropKind.Index,
          index: { kind },
          optional: true,
          prop: symbol
            ? this.addHelperSymbol(symbol.getName(), symbol, options)
            : this.updatePropKind({}, index?.type),
        };
        return p;
      }
      return null;
    };
    const result = [];
    if (type) {
      if (
        type.flags & ts.TypeFlags.Object ||
        type.isClassOrInterface() ||
        type.isUnionOrIntersection()
      ) {
        const { numberIndexInfo, stringIndexInfo } =
          type as InterfaceOrTypeWithIndex;
        const numberIndex = extractIndex(
          numberIndexInfo ||
            this.checker.getIndexInfoOfType(type, ts.IndexKind.Number),
          PropKind.Number,
        );
        if (numberIndex) {
          result.push(numberIndex);
        }
        const stringIndex = extractIndex(
          stringIndexInfo ||
            this.checker.getIndexInfoOfType(type, ts.IndexKind.String),
          PropKind.String,
        );
        if (stringIndex) {
          result.push(stringIndex);
        }
      }
    }
    return result;
  }

  private parseChildSymbol(
    prop: PropType,
    symbol: ts.Symbol,
    options: ParseOptions,
  ): PropType | undefined {
    const declaration = getSymbolDeclaration(symbol);
    if (declaration) {
      const parent = this.getParent(declaration, prop, options);
      if (parent !== '__internal') {
        const childProp = this.addRefSymbol(
          { name: symbol.name },
          symbol,
          false,
        );
        if (childProp) {
          if (parent) {
            childProp.parent = parent;
          }
          return childProp;
        }
      }
    }
    return undefined;
  }
  private parseSymbolProp(
    prop: PropType,
    symbol: ts.Symbol,
    defaultOptions: ParseOptions,
    topLevel: boolean,
  ): PropType | null {
    const symbolDeclaration = getSymbolDeclaration(symbol);
    const symbolType = getSymbolType(this.checker, symbol);
    const declaration =
      symbol.flags & ts.SymbolFlags.Alias
        ? getSymbolDeclaration(getTypeSymbol(symbolType)) || symbolDeclaration
        : symbolDeclaration;

    updateModifiers(prop, declaration);
    this.updateSymbolName(prop, declaration);
    if (symbolType) {
      const pluginResolved = resolveType(
        {
          symbolType,
          declaration,
          parser: this,
          expression:
            symbolDeclaration &&
            (ts.isExpressionStatement(symbolDeclaration) ||
              ts.isExportAssignment(symbolDeclaration))
              ? symbolDeclaration.expression
              : undefined,
        },
        defaultOptions,
      );
      const {
        type: resolvedType,
        initializer,
        pluginName,
        prop: resolvedProp,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        declaration: _,
        ...resolvedOptions
      } = pluginResolved;
      const options = deepmerge(defaultOptions, resolvedOptions);
      if (pluginName && !prop.parent && options.collectExtension) {
        prop.extension = pluginName;
      }
      Object.assign(prop, resolvedProp);
      if (prop.kind === undefined) {
        this.updatePropKind(prop, resolvedType);
      }
      const loc = this.parseFilePath(options, topLevel, declaration);
      if (loc) {
        prop.loc = loc;
      }
      if (resolvedType) {
        if (
          resolvedType &&
          (resolvedType.isIntersection() ||
            resolvedType.flags & ts.TypeFlags.Object)
        ) {
          const resolvedSymbol = getTypeSymbol(resolvedType);
          const resolvedDeclaration = getSymbolDeclaration(resolvedSymbol);

          const internalKind = this.internalNode(resolvedDeclaration);

          const typeName = this.geDeclarationName(resolvedDeclaration);
          if (!pluginName && !prop.type) {
            if (typeName && prop.name !== typeName) {
              prop.type = typeName;
            }
          }

          if (
            !resolvedDeclaration ||
            !(
              isHasType(resolvedDeclaration) &&
              resolvedDeclaration.type &&
              isArrayLike(resolvedDeclaration.type)
            )
          ) {
            if ((!prop.kind || internalKind) && resolvedDeclaration) {
              if (tsKindToPropKind[resolvedDeclaration.kind] !== undefined) {
                prop.kind = tsKindToPropKind[resolvedDeclaration.kind];
              }
            }
            const childProps =
              options.collectProperties === false
                ? []
                : resolvedType.getApparentProperties();
            //static props do not show up from ts.Type.getApparentProperties
            const staticProps: ts.Symbol[] = [];
            if (
              resolvedDeclaration &&
              options.collectProperties !== false &&
              isObjectTypeDeclaration(resolvedDeclaration)
            ) {
              resolvedDeclaration.members.forEach((m) => {
                if (
                  m.modifiers?.find(
                    (f) => f.kind === ts.SyntaxKind.StaticKeyword,
                  )
                ) {
                  if (m.name) {
                    const s = this.getSymbolAtLocation(m.name);
                    if (s) {
                      staticProps.push(s);
                    }
                  }
                }
              });
            }

            const properties: PropType[] = [];
            const allSymbols = [...staticProps, ...childProps];
            if (internalKind === undefined || allSymbols.length) {
              for (const childSymbol of allSymbols) {
                if (this.filterProperty({ name: childSymbol.name }, options)) {
                  const d = getSymbolDeclaration(childSymbol);
                  if (!d) {
                    //tuple members do not carry type information
                    return this.parseTypeValueComments(
                      prop,
                      options,
                      declaration,
                      initializer,
                    );
                  }
                  const childProp = this.parseChildSymbol(
                    prop,
                    childSymbol,
                    options,
                  );
                  if (childProp) {
                    properties.push(childProp);
                  }
                }
              }
              if (options.collectParameters) {
                const callSignatures = resolvedType.getCallSignatures();
                if (callSignatures?.length) {
                  const fnDeclaration = callSignatures[0].declaration;
                  if (fnDeclaration && isFunctionLike(fnDeclaration)) {
                    updateModifiers(prop, fnDeclaration);
                    this.parseFunction(prop, options, fnDeclaration);
                  }
                }
              }
              if (internalKind === undefined) {
                if (options.collectInheritance) {
                  this.parseHeritageClauses(prop, options, resolvedDeclaration);
                }
                if (options.collectGenerics) {
                  if (
                    (resolvedType as any).objectFlags &
                      ts.ObjectFlags.Reference &&
                    (resolvedType as ts.TypeReference).typeArguments?.length
                  ) {
                    (prop as TypeProp).generics = (
                      resolvedType as ts.TypeReference
                    ).typeArguments?.map((t) => {
                      const p: PropType = {};
                      const name =
                        (t as any).intrinsicName || getTypeSymbol(t)?.name;
                      if (name) {
                        p.name = name;
                      }
                      this.updatePropKind(p, t);
                      return p;
                    });
                  } else if (
                    resolvedDeclaration &&
                    isTypeParameterType(resolvedDeclaration) &&
                    resolvedDeclaration.typeParameters?.length
                  ) {
                    (prop as TypeProp).generics = this.parseProperties(
                      resolvedDeclaration.typeParameters,
                      options,
                    );
                  }
                }
              }
              if (!isEnumProp(prop)) {
                const indexes = this.getTypeIndexes(resolvedType, options);
                properties.unshift(...indexes);
              }

              if (properties.length) {
                (prop as TypeProp).properties = properties;
              }
              //any initializer values
              this.parseValue(prop, options, initializer);
              if (!prop.name) {
                const typeName = symbol.getName();
                if (typeName !== prop.type) {
                  prop.name = typeName;
                }
              }
              return this.filterProperty(
                mergeNodeComments(this, prop, options, declaration),
                options,
              );
            }
          }
        } else if (
          resolvedType?.isUnion() &&
          !(resolvedType.flags & (ts.TypeFlags as any).Primitive)
        ) {
          const properties: PropType[] = [];
          (this.checker as any)
            .getAllPossiblePropertiesOfTypes(
              resolvedType.types.filter(
                (t) =>
                  !(t.flags & (ts.TypeFlags as any).Primitive) &&
                  !((t as any).objectFlags && ts.ObjectFlags.Reference),
              ),
            )
            .forEach((s: ts.Symbol) => {
              if (getSymbolDeclaration(s)) {
                const childProp = this.parseChildSymbol(prop, s, options);
                if (
                  childProp &&
                  this.filterProperty(childProp, defaultOptions)
                ) {
                  properties.push(childProp);
                }
              }
            });
          if (properties.length) {
            prop.kind = PropKind.Type;
            (prop as UnionProp).properties = properties;
            return this.filterProperty(
              mergeNodeComments(this, prop, defaultOptions, declaration),
              defaultOptions,
            );
          }
        }
      }
    }
    const loc = this.parseFilePath(defaultOptions, topLevel, declaration);
    if (loc) {
      prop.loc = loc;
    }

    return this.filterProperty(
      this.parseTypeValueComments(
        prop,
        defaultOptions,
        declaration,
        getInitializer(declaration),
      ),
      defaultOptions,
    );
  }
  private internalNode(node?: ts.Node): PropKind | undefined {
    if (node && !this.options.collectInternals) {
      const source = node.getSourceFile();
      if (source) {
        const isInternal = this.checkLibrary(source, node);
        if (isInternal) {
          const type = this.checker.getTypeAtLocation(node);
          const kind = getTypeKind(type);
          if (!kind) {
            const name = this.geDeclarationName(node as ts.Declaration);
            if (name) {
              return this.options.internalTypes[name] || PropKind.Any;
            }
            return PropKind.Any;
          }
          return kind;
        }
      }
    }
    return undefined;
  }
  private internalSymbol(symbol?: ts.Symbol): PropKind | undefined {
    if (symbol) {
      const declaration = getSymbolDeclaration(symbol);
      return this.internalNode(declaration);
    }
    return undefined;
  }
  private updatePropKind(prop: PropType, typeNode?: ts.Type): PropType {
    if (typeNode) {
      const kind = getTypeKind(typeNode);
      if (kind !== undefined) {
        prop.kind = kind;
      }
      const symbol = getTypeSymbol(typeNode);
      const internalKind = symbol ? this.internalSymbol(symbol) : undefined;
      if (internalKind !== undefined) {
        prop.kind = internalKind;
      }
    }
    return prop;
  }
  private filterProperty(
    prop: PropType | null,
    options: ParseOptions,
  ): PropType | null {
    return prop && options.filter ? (options.filter(prop) ? prop : null) : prop;
  }

  private parseTypeValue(
    prop: PropType,
    options: ParseOptions,
    declaration?: ts.Node,
    initializer?: ts.Node,
  ): PropType {
    this.parseType(prop, options, declaration);
    if (declaration && ts.isLiteralTypeNode(declaration)) {
      this.parseValue(prop, options, declaration.literal);
    }
    this.parseValue(prop, options, initializer);
    return prop;
  }
  public parseTypeValueComments(
    prop: PropType,
    options: ParseOptions,
    declaration?: ts.Node,
    initializer?: ts.Node,
  ): PropType | null {
    this.parseTypeValue(prop, options, declaration, initializer);
    return mergeNodeComments(this, prop, options, declaration);
  }

  private filterProps = (root: PropType) => {
    if (this.options.filter && !this.options.filter(root)) {
      return false;
    }
    Object.keys(root).forEach((key) => {
      const p = (root as any)[key];
      if (Array.isArray(p)) {
        (root as any)[key] = p.filter((f) => this.filterProps(f));
        if ((root as any)[key].length === 0) {
          delete (root as any)[key];
        }
        if (typeof p === 'object') {
          this.filterProps(p as PropType);
        }
      }
    });
    return true;
  };

  private resolveRefTypes = () => {
    let i = 0;
    const { maxDepth = 6 } = this.options;
    while (i < maxDepth) {
      const cachedSymbols = this.refSymbols.filter((r) => r.newProps.length);
      if (!cachedSymbols.length) {
        break;
      }
      cachedSymbols.forEach((ref) => {
        const { newProps, symbol } = ref;
        ref.newProps = [];
        newProps.forEach(({ prop, topLevel }) => {
          const p = this.parseSymbolProp(prop, symbol, this.options, topLevel);
          if (p && !ref.resolved) {
            ref.resolved = p;
          }
        });
      });
      i += 1;
    }
  };

  get helpers(): Record<string, PropType> {
    return this._helpers;
  }

  public parseSymbol(symbol: ts.Symbol): PropType | undefined {
    this.refSymbols = [];
    const prop = this.addRefSymbol({}, symbol, true);
    this.resolveRefTypes();
    return this.filterProps(prop) ? prop : undefined;
  }
  public parse(symbol: ts.Symbol): PropType | undefined {
    this.refSymbols = [];
    this.root = this.addRefSymbol({}, symbol, true);
    this.resolveRefTypes();
    return this.filterProps(this.root) ? this.root : undefined;
  }
}
