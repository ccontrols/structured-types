import {
  ParsePlugin,
  getObjectStaticProp,
  getInitializer,
  PropKind,
  PropType,
  mergeNodeComments,
} from '@structured-types/api';
import reactPlugin from '@structured-types/react-plugin';
import ts from 'typescript';

const propTypeToKind = (name: ts.MemberName): PropKind | undefined => {
  switch (name.text) {
    case 'string':
      return PropKind.String;
    case 'number':
      return PropKind.Number;
    case 'array':
      return PropKind.Array;
    case 'bool':
      return PropKind.Boolean;
    case 'object':
      return PropKind.Object;
    case 'symbol':
      return PropKind.String;
    case 'any':
      return PropKind.Any;
    default:
      return undefined;
  }
};

const extractExpressionMembers = (
  checker: ts.TypeChecker,
  node?: ts.Node,
): ts.MemberName[] | undefined => {
  if (node && ts.isPropertyAccessExpression(node)) {
    if (node.expression) {
      if (ts.isPropertyAccessExpression(node.expression)) {
        const r = extractExpressionMembers(checker, node.expression);
        if (!r) {
          return undefined;
        }
        return [...r, node.name];
      } else {
        const symbol = checker.getSymbolAtLocation(node.expression);
        if (symbol) {
          const declaration =
            symbol.valueDeclaration || symbol.declarations?.[0];
          if (declaration && ts.isImportClause(declaration)) {
            if (
              declaration.parent.moduleSpecifier
                .getText()
                .replace(/['"]+/g, '') === 'prop-types'
            ) {
              return [node.name];
            }
          }
        }
      }
    }
  }
  return undefined;
};

export default {
  ...reactPlugin,
  pluginName: 'react-prop-types',
  typesResolve: (input) => {
    const react = reactPlugin.typesResolve(input);
    if (react && react.type) {
      if (input.declaration) {
        const propTypes = getObjectStaticProp(input.declaration, 'propTypes');
        if (propTypes) {
          return {
            ...react,
            type: input.parser.checker.getTypeAtLocation(propTypes),
          };
        }
      }
      const symbol = react.type.aliasSymbol || react.type.symbol;
      if (symbol) {
        const declaration = symbol.valueDeclaration || symbol.declarations?.[0];
        if (declaration) {
          const propTypes = getObjectStaticProp(declaration, 'propTypes');
          if (propTypes) {
            const prop = mergeNodeComments(
              input.parser,
              { ...react.prop },
              react,
              declaration,
            );
            return {
              ...react,
              prop,
              type: input.parser.checker.getTypeAtLocation(propTypes),
            };
          }
        }
      }
    } else if (input.declaration) {
      const initializer = getInitializer(input.declaration);
      const propTypes = extractExpressionMembers(
        input.parser.checker,
        initializer,
      );
      if (propTypes && propTypes.length) {
        const prop: PropType = {
          kind: propTypeToKind(propTypes[0]),
        };
        if (!propTypes.find((p) => p.text === 'isRequired')) {
          prop.optional = true;
        }
        return {
          type: input.symbolType,
          prop,
          collectGenerics: false,
          collectParameters: false,
          collectProperties: false,
        };
      }
    }
    return react;
  },
} as ParsePlugin;
