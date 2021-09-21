import * as ts from 'typescript';
import deepmerge from 'deepmerge';

import {
  PropType,
  PropKind,
  BooleanProp,
  isNumberProp,
  isAnyProp,
  isUnknownProp,
  isObjectLikeProp,
  isIndexProp,
  TypeProp,
  UnionProp,
  ArrayProp,
  hasGenerics,
  HasGenericsProp,
  isArrayProp,
  EnumProp,
  TupleProp,
  ObjectProp,
  isFunctionBaseType,
  isClassLikeProp,
  propValue,
  ClassProp,
  trimQuotes,
  hasProperties,
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
} from './ts-utils';
import { resolveType } from './ts/resolveType';
import { getInitializer } from './ts/getInitializer';
import { mergeNodeComments } from './jsdoc/mergeJSDoc';
import { parseJSDocTag } from './jsdoc/parseJSDocTags';
export class SymbolParser implements ISymbolParser {
  public checker: ts.TypeChecker;
  public readonly options: Required<ParseOptions>;
  private refSymbols: {
    props: { prop: PropType }[];
    resolved?: PropType;
    symbol: ts.Symbol;
  }[] = [];
  private root?: PropType;
  private checkLibrary: (fileName: ts.SourceFile, node: ts.Node) => boolean;
  private propParents: Record<string, PropType> = {};
  private fileNames: string[];
  constructor(
    program: ts.Program,
    checkLibrary: (fileName: ts.SourceFile, node: ts.Node) => boolean,
    fileNames: string[],
    options?: ParseOptions,
  ) {
    this.checkLibrary = checkLibrary;
    this.checker = program.getTypeChecker();
    this.fileNames = fileNames;
    this.options = deepmerge(
      defaultParseOptions,
      options as Required<ParseOptions>,
    );
  }
  private addRefSymbol(prop: PropType, symbol: ts.Symbol): PropType {
    const refSymbol = this.refSymbols.find((r) => r.symbol === symbol);
    if (!refSymbol) {
      this.refSymbols.push({ props: [{ prop }], symbol });
    } else if (!refSymbol.resolved) {
      refSymbol.props.push({ prop });
    } else {
      const p = this.findProp(this.root, refSymbol.resolved);
      if (!p) {
        refSymbol.props.push({ prop });
      }
    }
    return prop;
  }

  private addParentSymbol(
    name: string,
    symbol: ts.Symbol,
    options: ParseOptions,
  ) {
    if (options.collectHelpers) {
      if (!this.propParents[name]) {
        const prop = { name };
        this.propParents[name] = prop;
        this.addRefSymbol(prop, symbol);
      }
    }
  }
  private getParent(
    node: ts.Node,
    parentProp: PropType,
    options: ParseOptions,
  ): string | undefined | '__internal' {
    const propName = this.geDeclarationName(node as ts.Declaration);
    const addParentRef = (
      declaration: ts.Node,
    ): string | undefined | '__internal' => {
      if (this.internalNode(declaration)) {
        return '__internal';
      }
      let parent = declaration.parent;
      //find immediate parent
      while (parent) {
        const name = this.geDeclarationName(parent as ts.Declaration);
        if (name && propName !== name) {
          break;
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
            this.addParentSymbol(name, (parent as any).symbol, options);
            if (parentName !== name) {
              return name;
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
      const symbol = type.aliasSymbol || type.symbol;
      if (symbol) {
        const declaration = symbol.valueDeclaration || symbol.declarations?.[0];
        if (declaration && this.internalNode(declaration) === undefined) {
          return addParentRef(declaration);
        }
      }
      return addParentRef(node);
    }
    return undefined;
  }

  private parseFilePath = (
    prop: PropType,
    options: ParseOptions,
    node?: ts.Node,
  ): PropType => {
    if (node && options.collectFilePath) {
      const source = node.getSourceFile();
      if (source && !this.fileNames.includes(source.fileName)) {
        prop.filePath = source.fileName;
      }
    }
    return prop;
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
        const existingIdx = results.findIndex(
          (p) =>
            p.name &&
            p.name === prop.name &&
            p.kind === prop.kind &&
            p.type === prop.type,
        );
        if (existingIdx >= 0) {
          results[existingIdx] = { ...results[existingIdx], ...prop };
        } else {
          results.push(prop);
        }
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
          const symbol = this.checker.getSymbolAtLocation(p.name);
          if (symbol) {
            const prop = this.addRefSymbol(
              { name: symbol.escapedName as string },
              symbol,
            );
            if (prop) {
              addProp(prop);
            }
            continue;
          }
        }
      }
      const prop = this.parseTypeValueComments({}, options, p, p);
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
        if (
          ts.isTypePredicateNode(node.type) &&
          node.type.type &&
          ts.isTypeReferenceNode(node.type.type)
        ) {
          const returnSymbol = this.checker.getSymbolAtLocation(
            node.type.type?.typeName,
          );
          if (returnSymbol) {
            prop.returns = this.addRefSymbol({}, returnSymbol);
          }
        }

        if (!prop.returns) {
          const returns = this.parseTypeValueComments({}, options, node.type);
          if (returns) {
            prop.returns = returns;
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
          const symbol = returnType.aliasSymbol || returnType.symbol;
          const returnProp = symbol
            ? this.parseSymbolProp(
                { name: symbol.escapedName as string },
                symbol,
                options,
              )
            : this.updatePropKind({}, returnType);

          if (returnProp && returnProp.kind !== undefined) {
            prop.returns = returnProp;
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
      const extendsProp: string[] = [];
      node.heritageClauses.forEach((h) => {
        h.types.forEach((t) => {
          const symbol = this.checker.getSymbolAtLocation(t.expression);
          if (symbol) {
            const name = symbol.escapedName as string;
            extendsProp.push(name);
            this.addParentSymbol(name, symbol, options);
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
          if (ts.isPropertyAssignment(e) || ts.isBindingElement(e)) {
            const p = properties.find((p) => p.name === e.name.getText());
            if (p) {
              this.parseValue(p, options, e.initializer);
            } else {
              const childSymbol = this.checker.getSymbolAtLocation(e.name);

              if (childSymbol) {
                const childProp = this.parseSymbolProp(
                  {},
                  childSymbol,
                  options,
                );
                if (childProp && this.filterProperty(childProp, options)) {
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
      } else if (ts.isObjectLiteralExpression(node) && hasProperties(prop)) {
        addProperties(node.properties);
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
      } else if (ts.isNewExpression(node)) {
        prop.kind = PropKind.Object;
        if (node.arguments) {
          (prop as ObjectProp).properties = this.parseProperties(
            node.arguments as ts.NodeArray<ts.ArrayBindingElement>,
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
      } else if (node.kind === ts.SyntaxKind.BooleanKeyword) {
        if (!prop.kind) {
          prop.kind = PropKind.Boolean;
        }
        propValue(prop, (node as ts.LiteralLikeNode).text);
      } else if (isAnyProp(prop)) {
        if (typeof (node as ts.LiteralLikeNode)?.text !== 'undefined') {
          prop.kind = PropKind.Undefined;
          prop.value = (node as ts.LiteralLikeNode).text;
        }
      } else if (isUnknownProp(prop)) {
        prop.kind = PropKind.Unknown;
        if (typeof (node as ts.LiteralLikeNode)?.text !== 'undefined') {
          const value = (node as ts.LiteralLikeNode)?.text;
          switch (value) {
            case 'undefined':
              prop.value = undefined;
              break;
            case 'null':
              prop.value = null;
              break;
            case 'false':
              prop.value = false;
              break;
            case 'true':
              prop.value = true;
              break;
            default:
              prop.value = value;
          }
        }
      } else if (isObjectLikeProp(prop)) {
        if (ts.isObjectLiteralExpression(node)) {
          prop.properties = this.parseProperties(
            node.properties,
            options,
            prop.properties,
          );
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
    return name && 'text' in name ? name.getText() : undefined;
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
        if (isIndexProp(prop) && node.parameters.length) {
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
          prop.type = type;
        }
      } else if (
        ts.isIndexedAccessTypeNode(node) &&
        ts.isLiteralTypeNode(node.indexType) &&
        ts.isTypeReferenceNode(node.objectType)
      ) {
        const propName = trimQuotes(node.indexType.literal.getText());
        const refSymbol = this.checker.getSymbolAtLocation(
          node.objectType.typeName,
        );
        const typeSymbol = refSymbol?.members?.get(propName as ts.__String);
        if (typeSymbol) {
          return this.addRefSymbol(prop, typeSymbol);
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
        const symbol = this.checker.getSymbolAtLocation(node.expression);
        if (symbol) {
          return this.addRefSymbol(prop, symbol);
        }
      } else if (ts.isExportSpecifier(node)) {
        if (node.propertyName) {
          prop.name = node.propertyName.getText();
          const symbol = this.checker.getSymbolAtLocation(node.propertyName);
          if (symbol) {
            return this.addRefSymbol(prop, symbol);
          }
        }
      } else if (isObjectTypeDeclaration(node)) {
        if (!prop.kind) {
          prop.kind = tsKindToPropKind[node.kind];
        }

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
        const symbol = this.checker.getSymbolAtLocation(node.typeName);
        if (symbol) {
          const d = symbol.valueDeclaration || symbol.declarations?.[0];
          if (d && tsKindToPropKind[d.kind]) {
            prop.kind = tsKindToPropKind[d.kind];
          }
          prop.type = node.typeName.getText();
          const internalKind = this.internalSymbol(symbol);
          if (internalKind === undefined) {
            this.addRefSymbol(prop, symbol);
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
          if (ts.isTypeLiteralNode(t)) {
            const childProp: PropType = {};

            if (tsKindToPropKind[t.kind]) {
              childProp.kind = tsKindToPropKind[t.kind];
            }

            this.parseTypeValueComments(childProp, options, t);
            if (isClassLikeProp(childProp) && childProp.properties) {
              properties.push(...childProp.properties);
            }
          }
        });
        (prop as TypeProp).properties = properties;
      } else if (ts.isLiteralTypeNode(node)) {
        this.parseTypeValueComments(prop, options, node.literal);
      } else if (ts.isParenthesizedTypeNode(node)) {
        this.parseTypeValueComments(prop, options, node.type);
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
          prop.type = type;
        }
      } else if (ts.isUnionTypeNode(node)) {
        prop.kind = PropKind.Union;
        (prop as UnionProp).properties = this.parseProperties(
          node.types,
          options,
        );
      } else if (ts.isEnumDeclaration(node)) {
        prop.kind = PropKind.Enum;
        (prop as EnumProp).properties = this.parseProperties(
          node.members,
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
          case ts.SyntaxKind.JSDocTypeLiteral:
            prop.kind = PropKind.Type;
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

  private getTypeIndexes(type: ts.Type, options: ParseOptions): PropType[] {
    interface InterfaceOrTypeWithIndex extends ts.InterfaceType {
      stringIndexInfo?: ts.IndexInfo;
      numberIndexInfo?: ts.IndexInfo;
    }
    const result = [];
    if (type) {
      if (type.flags & ts.TypeFlags.Object || type.isClassOrInterface()) {
        const numberIndex = (type as InterfaceOrTypeWithIndex).numberIndexInfo;
        if (numberIndex?.declaration) {
          const index = this.parseTypeValueComments(
            {},
            options,
            numberIndex.declaration,
          );
          if (index) {
            result.push(index);
          }
        }
        const stringIndex = (type as InterfaceOrTypeWithIndex).stringIndexInfo;
        if (stringIndex?.declaration) {
          const index = this.parseTypeValueComments(
            {},
            options,
            stringIndex.declaration,
          );
          if (index) {
            result.push(index);
          }
        }
      }
    }
    return result;
  }
  private parseSymbolProp(
    prop: PropType,
    symbol: ts.Symbol,
    defaultOptions: ParseOptions,
  ): PropType | null {
    const symbolDeclaration =
      symbol.valueDeclaration || symbol.declarations?.[0];
    const symbolType = getSymbolType(this.checker, symbol);
    const declaration = symbolDeclaration;
    updateModifiers(prop, declaration);
    this.updateSymbolName(prop, declaration);
    if (symbolType) {
      const pluginResolved = resolveType(
        {
          symbolType,
          declaration,
          parser: this,
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
      if (
        resolvedType &&
        resolvedType.flags & (ts.TypeFlags.Object | ts.TypeFlags.Intersection)
      ) {
        this.parseFilePath(prop, options, declaration);
        const resolvedSymbol = resolvedType.aliasSymbol || resolvedType.symbol;
        const resolvedDeclaration = resolvedSymbol
          ? resolvedSymbol.valueDeclaration || resolvedSymbol.declarations?.[0]
          : undefined;

        if (!pluginName && !prop.type) {
          const typeName = this.geDeclarationName(resolvedDeclaration);
          if (typeName && prop.name !== typeName) {
            prop.type = typeName;
          }
        }
        if (
          this.internalNode(resolvedDeclaration) === undefined &&
          (!resolvedDeclaration ||
            !(
              isHasType(resolvedDeclaration) &&
              resolvedDeclaration.type &&
              isArrayLike(resolvedDeclaration.type)
            ))
        ) {
          if (!prop.kind && resolvedDeclaration?.kind !== undefined) {
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
                m.modifiers?.find((f) => f.kind === ts.SyntaxKind.StaticKeyword)
              ) {
                if (m.name) {
                  const s = this.checker.getSymbolAtLocation(m.name);
                  if (s) {
                    staticProps.push(s);
                  }
                }
              }
            });
          }

          const properties: PropType[] = [];
          for (const childSymbol of [...staticProps, ...childProps]) {
            const d =
              childSymbol.valueDeclaration || childSymbol.declarations?.[0];
            if (!d) {
              //tuple members do not carry type information
              return this.parseTypeValueComments(
                prop,
                options,
                declaration,
                initializer,
              );
            }
            const parent = this.getParent(d, prop, options);
            if (parent !== '__internal') {
              const childProp = this.addRefSymbol(
                { name: childSymbol.name },
                childSymbol,
              );
              if (childProp) {
                if (parent) {
                  childProp.parent = parent;
                }
                if (this.filterProperty(childProp, options)) {
                  properties.push(childProp);
                }
              }
            }
          }
          if (options.collectParameters) {
            const callSignatures = resolvedType.getCallSignatures();
            if (callSignatures?.length) {
              const fnDeclaration = callSignatures[0].declaration;
              if (fnDeclaration && isFunctionLike(fnDeclaration)) {
                this.parseFunction(prop, options, fnDeclaration);
              }
            }
          }
          if (options.collectInheritance) {
            this.parseHeritageClauses(prop, options, resolvedDeclaration);
          }
          if (options.collectGenerics) {
            if (
              (resolvedType as any).objectFlags & ts.ObjectFlags.Reference &&
              (resolvedType as ts.TypeReference).typeArguments?.length
            ) {
              (prop as TypeProp).generics = (
                resolvedType as ts.TypeReference
              ).typeArguments?.map((t) => {
                const p: PropType = {};
                const name =
                  (t as any).intrinsicName || (t.aliasSymbol || t.symbol)?.name;
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
          const indexes = this.getTypeIndexes(resolvedType, options);
          properties.unshift(...indexes);

          if (properties.length) {
            (prop as TypeProp).properties = properties;
          }
          //any initializer values
          this.parseValue(prop, options, initializer);
          if (!prop.name) {
            prop.name = symbol.getName();
          }
          return this.filterProperty(
            mergeNodeComments(this, prop, options, declaration),
            options,
          );
        }
      }
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
    if (node) {
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
      const declaration = symbol.valueDeclaration || symbol.declarations?.[0];
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
      const symbol = typeNode.aliasSymbol || typeNode.symbol;
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

  private findProp = (
    root: PropType | undefined,
    prop: PropType | undefined,
  ): boolean => {
    if (root && prop) {
      if (root === prop) {
        return true;
      }
      const keys = Object.keys(root);
      for (const key of keys) {
        const p = (root as any)[key];
        if (Array.isArray(p)) {
          return p.some((i) => this.findProp(i, prop));
        } else if (typeof p === 'object') {
          return this.findProp(p, prop);
        }
      }
    }
    return false;
  };
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
    const { maxDepth = 5 } = this.options;
    while (i < maxDepth) {
      const cachedSymbols = this.refSymbols.filter((r) => r.props.length);
      if (!cachedSymbols.length) {
        break;
      }
      cachedSymbols.forEach((ref) => {
        const { props, symbol } = ref;
        ref.props = [];
        props.forEach(({ prop }) => {
          const p = this.parseSymbolProp(prop, symbol, this.options);
          if (p && !ref.resolved) {
            ref.resolved = p;
          }
        });
      });
      i += 1;
    }
  };

  get parents(): Record<string, PropType> {
    return this.propParents;
  }

  public resetParents(): void {
    this.propParents = {};
  }
  public parseSymbol(symbol: ts.Symbol): PropType | undefined {
    this.refSymbols = [];
    const prop = this.addRefSymbol({}, symbol);
    this.resolveRefTypes();
    return this.filterProps(prop) ? prop : undefined;
  }
  public parse(symbol: ts.Symbol): PropType | undefined {
    this.refSymbols = [];
    this.root = this.addRefSymbol({}, symbol);
    this.resolveRefTypes();
    return this.filterProps(this.root) ? this.root : undefined;
  }
}
