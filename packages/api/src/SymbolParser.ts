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
  isArrayProp,
  EnumProp,
  TupleProp,
  ObjectProp,
  isFunctionBaseType,
  isClassLikeProp,
  propValue,
  ClassProp,
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
  updatePropKind,
  updateModifiers,
} from './ts-utils';
import { resolveType } from './ts/resolveType';
import { getInitializer } from './ts/getInitializer';
import { mergeNodeComments } from './jsdoc/mergeJSDoc';
import { parseJSDocTag } from './jsdoc/parseJSDocTags';

const strToValue = (s: string): any => {
  switch (s) {
    case 'undefined':
      return undefined;
    case 'null':
      return null;
    case 'false':
      return false;
    case 'true':
      return true;
  }
  return s;
};

export class SymbolParser implements ISymbolParser {
  public checker: ts.TypeChecker;
  public readonly options: Required<ParseOptions>;
  private refSymbols: {
    props: PropType[];
    symbol: ts.Symbol;
  }[] = [];
  private visitedSymbols: ts.Symbol[] = [];
  private propParents: Record<string, PropType> = {};
  private fileNames: string[];
  constructor(
    checker: ts.TypeChecker,
    fileNames: string[],
    options?: ParseOptions,
  ) {
    this.checker = checker;
    this.fileNames = fileNames;
    this.options = deepmerge(
      defaultParseOptions,
      options as Required<ParseOptions>,
    );
  }
  private addRefSymbol(prop: PropType, symbol: ts.Symbol): PropType {
    const refSymbol = this.refSymbols.find((r) => r.symbol === symbol);
    if (this.visitedSymbols.find((s) => s === symbol)) {
      if (prop.name) {
        prop.type = symbol.getName();
      } else {
        prop.name = symbol.getName();
      }
    } else if (!refSymbol) {
      this.refSymbols.push({ props: [prop], symbol });
    } else {
      refSymbol.props.push(prop);
    }
    return prop;
  }
  private getParent(
    parentProp: PropType,
    options: ParseOptions,
    node?: ts.Node,
    parentName?: string,
  ): PropType | false | undefined {
    if (!node) {
      return false;
    }
    const addParentRef = (parent: PropType, symbol: ts.Symbol) => {
      if (options.consolidateParents) {
        const name = parent.name;
        if (name) {
          if (!this.propParents[name]) {
            this.propParents[name] = parent;
          }
        }
        return this.addRefSymbol(parent, symbol);
      }
      return parent;
    };
    let parent = node.parent;
    if (ts.isPropertyAccessExpression(node)) {
      const name = node.expression.getText();
      if (!this.skipProperty(options, name)) {
        if (name === parentName || name === parentProp.parent) {
          return false;
        }
        const symbol = this.checker.getSymbolAtLocation(node.expression);
        if (symbol) {
          return addParentRef({ name: name }, symbol);
        }
      }
      return undefined;
    }
    while (parent) {
      if (isTypeParameterType(parent) || ts.isEnumDeclaration(parent)) {
        const name = parent.name ? parent.name.getText() : undefined;
        if (!name || !this.skipProperty(options, name)) {
          if (name === parentName || name === parentProp.parent) {
            return false;
          }
          const propParent = { name: name };
          if (parent.name) {
            const symbol = this.checker.getSymbolAtLocation(parent.name);
            if (symbol) {
              return addParentRef(propParent, symbol);
            }
          }
          return (
            this.parseTypeValueComments(propParent, options, parent) ||
            undefined
          );
        }
        return undefined;
      }
      parent = parent.parent;
    }
    return false;
  }
  private parseFilePath = (
    prop: PropType,
    options: ParseOptions,
    node?: ts.Node,
  ): PropType => {
    if (options.collectFilePath) {
      let parent = node;
      while (parent) {
        if (ts.isSourceFile(parent)) {
          if (!this.fileNames.includes(parent.fileName)) {
            prop.filePath = parent.fileName;
          }
          break;
        }
        parent = parent.parent;
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
            const prop = this.parseSymbolProp({}, options, symbol);
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
        const returns = this.parseTypeValueComments({}, options, node.type);
        if (returns) {
          prop.returns = returns;
        }
      }
      if (node.typeParameters?.length && !prop.types) {
        prop.types = this.parseProperties(node.typeParameters, options);
      }
      if (
        !prop.returns &&
        (ts.isFunctionDeclaration(node) ||
          ts.isMethodDeclaration(node) ||
          ts.isArrowFunction(node))
      ) {
        const signature = this.checker.getSignatureFromDeclaration(node);
        if (signature) {
          const returnType = this.checker.getReturnTypeOfSignature(signature);
          const symbol = returnType.aliasSymbol || returnType.symbol;
          const returnProp = symbol
            ? this.parseSymbolProp({}, options, symbol)
            : updatePropKind({}, returnType);
          if (returnProp?.kind !== undefined) {
            prop.returns = returnProp;
          }
        }
      }
    }

    return prop;
  }

  private parseValue(
    prop: PropType,
    options: ParseOptions,
    node?: ts.Node,
  ): PropType {
    if (node) {
      if (isFunctionLike(node)) {
        return this.parseFunction(prop, options, node);
      } else if (ts.isObjectBindingPattern(node) && 'properties' in prop) {
        node.elements.forEach((e) => {
          const p = (prop as ClassProp).properties?.find(
            (p) => p.name === e.name.getText(),
          );
          if (p) {
            this.parseValue(p, options, e.initializer);
          }
        });
      } else if (ts.isObjectLiteralExpression(node) && 'properties' in prop) {
        node.properties.forEach((e) => {
          const p = (prop as ClassProp).properties?.find(
            (p) => p.name === e.name?.getText(),
          );
          if (p && ts.isPropertyAssignment(e)) {
            this.parseValue(p, options, e.initializer);
          }
        });
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
          prop.value = strToValue((node as ts.LiteralLikeNode)?.text);
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
  public updateSymbolName(prop: PropType, node?: ts.Declaration): PropType {
    const name = (node as ts.NamedDeclaration).name;
    if (name) {
      if (ts.isQualifiedName(name)) {
        prop.name = (name as ts.QualifiedName).right.text;
      } else {
        prop.name = name.getText();
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
          if (
            (ts.isClassLike(node) || ts.isInterfaceDeclaration(node)) &&
            node.heritageClauses?.length
          ) {
            let extendsProp: string[] | undefined = undefined;
            if (isClassLikeProp(prop)) {
              extendsProp = [];
            }
            node.heritageClauses.forEach((h) => {
              h.types.forEach((t) => {
                if (extendsProp) {
                  extendsProp.push(t.expression.getText());
                }
              });
            });
            if (isClassLikeProp(prop)) {
              prop.extends = extendsProp;
            }
          }
          prop.properties = properties;
        }
      } else if (ts.isTypeReferenceNode(node)) {
        const symbol = this.checker.getSymbolAtLocation(node.typeName);
        if (
          symbol &&
          symbol.escapedName &&
          !this.skipProperty(options, symbol.escapedName.toString())
        ) {
          if (prop.parent) {
          }
          this.addRefSymbol(prop, symbol);
        } else {
          prop.type = node.getText();
        }
        if (
          options.collectGenerics &&
          node.typeArguments?.length &&
          hasGenerics(prop)
        ) {
          prop.generics = this.parseProperties(node.typeArguments, options);
        }
        prop.kind = PropKind.Type;
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
        const parent = this.getParent(prop, options, node, prop.parent);
        if (parent) {
          prop.parent = parent.name;
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
    interface InterfaceOrTypeWithINdex extends ts.InterfaceType {
      stringIndexInfo?: ts.IndexInfo;
      numberIndexInfo?: ts.IndexInfo;
    }
    const result = [];
    if (type) {
      if (type.flags & ts.TypeFlags.Object || type.isClassOrInterface()) {
        const numberIndex = (type as InterfaceOrTypeWithINdex).numberIndexInfo;
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
        const stringIndex = (type as InterfaceOrTypeWithINdex).stringIndexInfo;
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
    defaultOptions: ParseOptions,
    symbol: ts.Symbol,
  ): PropType | null {
    const symbolDeclaration =
      symbol.valueDeclaration || symbol.declarations?.[0];
    const symbolType = getSymbolType(this.checker, symbol);
    const declaration = symbolDeclaration;
    this.visitedSymbols.push(symbol);
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
      if (pluginName && !prop.parent) {
        prop.extension = pluginName;
      }
      Object.assign(prop, resolvedProp);
      if (prop.kind === undefined) {
        updatePropKind(prop, resolvedType);
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
        if (
          !resolvedDeclaration ||
          !(
            isHasType(resolvedDeclaration) &&
            resolvedDeclaration.type &&
            isArrayLike(resolvedDeclaration.type)
          )
        ) {
          if (!prop.kind) {
            prop.kind =
              tsKindToPropKind[
                resolvedDeclaration?.kind || ts.SyntaxKind.TypeAliasDeclaration
              ] || PropKind.Type;
          }
          const childProps =
            options.collectProperties === false
              ? []
              : resolvedType.getApparentProperties();
          const properties: PropType[] = [];
          for (const childSymbol of childProps) {
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
            const parent = this.getParent(prop, options, d, prop.name);
            if (parent !== undefined) {
              const childProp = this.parseSymbolProp(
                { parent: prop.name },
                options,
                childSymbol,
              );
              if (childProp) {
                if (parent && parent.name) {
                  const parentName = parent.name;
                  childProp.parent = parentName;
                } else {
                  delete childProp.parent;
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
          if (
            options.collectGenerics &&
            resolvedDeclaration &&
            isTypeParameterType(resolvedDeclaration) &&
            resolvedDeclaration.typeParameters?.length
          ) {
            (prop as TypeProp).generics = this.parseProperties(
              resolvedDeclaration.typeParameters,
              options,
            );
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
          return mergeNodeComments(this, prop, options, declaration);
        }
      }
    }

    return this.parseTypeValueComments(
      prop,
      defaultOptions,
      declaration,
      getInitializer(declaration),
    );
  }
  private skipProperty(options: ParseOptions, name?: string): boolean {
    return name !== undefined && !!options.internalTypes?.includes(name);
  }
  private filterProperty(prop: PropType, options: ParseOptions): boolean {
    return !options.filter || options.filter(prop);
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

  private resolveRefTypes = () => {
    let i = 0;
    const { maxDepth = 5 } = this.options;
    while (i < maxDepth) {
      const chachedSymbols = this.refSymbols.filter((r) => r.props.length);
      if (!chachedSymbols.length) {
        break;
      }
      chachedSymbols.forEach((ref) => {
        const { props, symbol } = ref;
        ref.props = [];
        const p = this.parseSymbolProp({}, this.options, symbol);
        if (p) {
          const { name, ...rest } = p;
          const type: PropType | string | undefined = Object.keys(rest).length
            ? p
            : name;
          props.forEach((prop) => {
            if (typeof type === 'string') {
              if (prop.name && prop.name !== type) {
                prop.type = type;
              } else {
                prop.name = type;
              }
            } else {
              Object.assign(prop, rest);
              if (prop.name) {
                if (!prop.type && prop.name !== name) {
                  prop.type = name;
                }
              } else {
                prop.name = name;
              }
            }
          });
        }
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
  public parseSymbol(symbol: ts.Symbol): PropType | null {
    const prop = this.parseSymbolProp({}, this.options, symbol);
    this.resolveRefTypes();
    return prop;
  }
}
