import {
  ParsePlugin,
  getObjectStaticProp,
  getInitializer,
  PropKind,
  PropType,
  mergeNodeComments,
  ISymbolParser,
  UnionProp,
  ParseOptions,
  ArrayProp,
  ObjectProp,
  getSymbolDeclaration,
} from '@structured-types/api';
import reactPlugin from '@structured-types/react-plugin';
import ts from 'typescript';

type PropTypeExpression = { name: ts.MemberName; id?: ts.Expression };
const assignProp = (
  parser: ISymbolParser,
  prop: PropType,
  options: ParseOptions,
  expression: PropTypeExpression,
): PropType => {
  switch (expression.name.text) {
    case 'string':
      prop.kind = PropKind.String;
      break;
    case 'number':
      prop.kind = PropKind.Number;
      break;
    case 'array':
      prop.kind = PropKind.Array;
      break;
    case 'bool':
      prop.kind = PropKind.Boolean;
      break;
    case 'object':
      prop.kind = PropKind.Object;
      break;
    case 'symbol':
      prop.kind = PropKind.String;
      prop.type = 'Symbol';
      break;
    case 'any':
      prop.kind = PropKind.Any;
      break;
    case 'func':
      prop.kind = PropKind.Function;
      break;
    case 'node':
      prop.kind = PropKind.Type;
      prop.type = 'React.ReactNode';
      break;
    case 'element':
      prop.kind = PropKind.Type;
      prop.type = 'React.Element';
      break;
    case 'elementType':
      prop.kind = PropKind.Type;
      prop.type = 'React.ElementType';
      break;

    case 'instanceOf':
      if (expression.id) {
        const symbol = parser.checker.getSymbolAtLocation(expression.id);
        const p = symbol ? parser.parseSymbol(symbol, options) : undefined;
        if (p) {
          Object.assign(prop, p);
        }
      }
      break;
    case 'oneOf':
      if (expression.id && ts.isArrayLiteralExpression(expression.id)) {
        const elements = expression.id.elements.map((e) => {
          const symbol = parser.checker.getSymbolAtLocation(e);
          return symbol
            ? parser.parseSymbol(symbol, options)
            : parser.parseTypeValueComments({}, options, e, e);
        }) as PropType[];
        prop.kind = PropKind.Union;
        (prop as UnionProp).properties = elements;
      }
      break;
    case 'oneOfType':
      if (expression.id && ts.isArrayLiteralExpression(expression.id)) {
        const elements = expression.id.elements
          .map((e) => {
            const prop = extractProp(parser, e);
            return prop;
          })
          .filter((e) => e) as PropType[];
        prop.kind = PropKind.Union;
        (prop as UnionProp).properties = elements;
      }
      break;
    case 'arrayOf':
      if (expression.id) {
        const propType = extractProp(parser, expression.id);
        prop.kind = PropKind.Array;
        if (propType) {
          (prop as ArrayProp).properties = [propType];
        }
      }
      break;
    case 'objectOf':
      if (expression.id) {
        prop.kind = PropKind.Object;
        const p = extractProp(parser, expression.id);
        if (p) {
          (prop as ObjectProp).properties = [p];
        }
      }
      break;
    case 'shape':
    case 'exact':
      if (expression.id && ts.isObjectLiteralExpression(expression.id)) {
        const properties = expression.id.properties
          .map((e) => {
            const prop = extractProp(parser, getInitializer(e));
            if (prop && e.name) {
              prop.name = e.name.getText();
            }
            return prop;
          })
          .filter((e) => e) as PropType[];
        prop.kind = PropKind.Object;
        (prop as UnionProp).properties = properties;
      }
      break;
  }
  return prop;
};

const extractExpressionMembers = (
  checker: ts.TypeChecker,
  node?: ts.Node,
  idNode?: ts.Expression,
): PropTypeExpression[] | undefined => {
  if (node) {
    if (ts.isCallExpression(node)) {
      return extractExpressionMembers(
        checker,
        node.expression,
        node.arguments.length ? node.arguments[0] : undefined,
      );
    } else if (ts.isPropertyAccessExpression(node)) {
      const name = node.name;
      if (node.expression) {
        if (ts.isPropertyAccessExpression(node.expression)) {
          const r = extractExpressionMembers(checker, node.expression, idNode);
          if (!r) {
            return undefined;
          }
          return [
            ...r,
            {
              name,
            },
          ];
        } else if (ts.isCallExpression(node.expression)) {
          return extractExpressionMembers(
            checker,
            node.expression.expression,
            node.expression.arguments.length
              ? node.expression.arguments[0]
              : undefined,
          );
        } else {
          const symbol = checker.getSymbolAtLocation(node.expression);
          if (symbol) {
            const declaration = getSymbolDeclaration(symbol);
            if (declaration && ts.isImportClause(declaration)) {
              if (
                declaration.parent.moduleSpecifier
                  .getText()
                  .replace(/['"]+/g, '') === 'prop-types'
              ) {
                return [{ name, id: idNode }];
              }
            }
          }
        }
      }
    }
  }
  return undefined;
};

const extractProp = (
  parser: ISymbolParser,
  node?: ts.Node,
): PropType | undefined => {
  const propTypes = extractExpressionMembers(parser.checker, node);
  if (propTypes && propTypes.length) {
    const prop: PropType = assignProp(parser, {}, parser.options, propTypes[0]);
    if (!propTypes.find((p) => p.name.text === 'isRequired')) {
      prop.optional = true;
    }
    return prop;
  }
  return undefined;
};
export default {
  ...reactPlugin,
  pluginName: 'react-prop-types',
  typesResolve: (input) => {
    const react = reactPlugin.typesResolve(input);
    if (react) {
      if (input.declaration) {
        const propTypes = getObjectStaticProp(
          input.declaration,
          'propTypes',
          input.parser.checker,
        );
        if (propTypes) {
          return {
            ...react,
            declaration: input.declaration,
            type: input.parser.checker.getTypeAtLocation(propTypes),
          };
        }
      }
      if (react.declaration) {
        const propTypes = getObjectStaticProp(
          react.declaration,
          'propTypes',
          input.parser.checker,
        );
        if (propTypes) {
          const prop = mergeNodeComments(
            input.parser,
            { ...react.prop },
            react,
            react.declaration,
          );
          return {
            ...react,
            prop,
            type: input.parser.checker.getTypeAtLocation(propTypes),
          };
        }
      }
    } else if (input.declaration) {
      const prop = extractProp(input.parser, getInitializer(input.declaration));
      if (prop) {
        return {
          declaration: input.declaration,
          type: input.symbolType,
          prop,
          collectExtension: false,
          collectGenerics: false,
          collectParameters: false,
          collectProperties: false,
          collectInheritance: false,
        };
      }
    }
    return undefined;
  },
} as ParsePlugin;
