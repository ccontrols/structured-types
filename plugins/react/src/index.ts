import * as ts from 'typescript';
import {
  getSymbolType,
  getFunctionLike,
  getInitializer,
  isObjectTypeDeclaration,
  getObjectStaticProp,
  ParsePlugin,
  PropKind,
} from '@structured-types/api';

const typesResolve: ParsePlugin['typesResolve'] = ({
  symbolType,
  declaration,
  checker,
}) => {
  if ((symbolType.flags & ts.TypeFlags.Object) === ts.TypeFlags.Object) {
    if (declaration) {
      const functionCall =
        ts.isExportAssignment(declaration) &&
        declaration.expression &&
        ts.isCallExpression(declaration.expression) &&
        declaration.expression.arguments.length
          ? declaration.expression.arguments[0]
          : undefined;
      if (functionCall) {
        const type = checker.getTypeAtLocation(functionCall);
        const typeSymbol = type.getSymbol();
        const typeDeclaration =
          typeSymbol?.valueDeclaration || typeSymbol?.declarations?.[0];
        const results = typesResolve({
          checker,
          declaration: typeDeclaration,
          symbolType: type,
        });
        const symbol = checker.getSymbolAtLocation(functionCall);
        if (symbol && results && !results.name) {
          results.name = symbol.getName();
        }
        return results;
      }
      const symbol = symbolType.aliasSymbol || symbolType.symbol;
      if (symbol && ['ForwardRefExoticComponent'].includes(symbol.getName())) {
        let type;
        let initializer;
        const props =
          ts.hasOnlyExpressionInitializer(declaration) &&
          declaration.initializer &&
          ts.isCallExpression(declaration.initializer) &&
          declaration.initializer.arguments.length &&
          ts.isFunctionLike(declaration.initializer.arguments[0]) &&
          declaration.initializer.arguments[0].parameters.length
            ? declaration.initializer.arguments[0].parameters[0]
            : undefined;
        if (props) {
          initializer = ts.isParameter(props)
            ? props.initializer || props.name
            : undefined;
          type = checker.getTypeAtLocation(props);
        } else {
          const typeRef = symbolType as ts.TypeReference;
          type =
            typeRef.typeArguments?.length &&
            typeRef.typeArguments[0].isUnionOrIntersection() &&
            typeRef.typeArguments[0].types.length
              ? typeRef.typeArguments[0].types[0]
              : undefined;
        }
        const displayName = getObjectStaticProp(declaration, 'displayName');
        const name =
          displayName && ts.isStringLiteral(displayName)
            ? displayName.text
            : undefined;
        const defaultProps: ts.Node | undefined = getObjectStaticProp(
          declaration,
          'defaultProps',
        );
        return {
          type,
          initializer: defaultProps || initializer,
          name,
          kind: PropKind.Function,
          collectGenerics: false,
          collectParameters: false,
        };
      }
      if (isObjectTypeDeclaration(declaration)) {
        const jsx = checker.getJsxIntrinsicTagNamesAt(declaration);
        if (jsx.length) {
          const signatures = symbolType.getConstructSignatures();
          if (signatures.length > 0 && signatures[0].parameters.length) {
            const props = signatures[0].parameters[0];
            let propsType = getSymbolType(checker, props) || symbolType;

            if (propsType.isUnionOrIntersection()) {
              propsType = propsType.types[0];
            }
            const displayName = getObjectStaticProp(declaration, 'displayName');

            const name =
              typeof displayName === 'string'
                ? displayName
                : displayName && ts.isStringLiteral(displayName)
                ? displayName.text
                : undefined;
            const defaultProps =
              getObjectStaticProp(declaration, 'defaultProps') ||
              getInitializer(declaration);
            return {
              type: propsType,
              name,
              initializer: defaultProps,
              kind: PropKind.Class,
            };
          }
        }
      } else {
        const reactFunction = getFunctionLike(checker, declaration);
        if (reactFunction) {
          const jsx = checker.getJsxIntrinsicTagNamesAt(reactFunction);
          if (jsx.length) {
            let propsType = undefined;
            let defaultProps: ts.Node | undefined = getObjectStaticProp(
              reactFunction.parent,
              'defaultProps',
            );
            const displayName =
              getObjectStaticProp(reactFunction.parent, 'displayName') ||
              reactFunction.name?.getText() ||
              (ts.isVariableDeclaration(reactFunction.parent) &&
                reactFunction.parent.name.getText());
            if (reactFunction.parameters.length) {
              const props = reactFunction.parameters[0];
              if (!defaultProps && ts.isObjectBindingPattern(props.name)) {
                defaultProps = props.name;
              }
              propsType = checker.getTypeAtLocation(props);
            }
            const name =
              typeof displayName === 'string'
                ? displayName
                : displayName && ts.isStringLiteral(displayName)
                ? displayName.text
                : undefined;
            return {
              type: propsType,
              name,
              initializer: defaultProps,
              kind: PropKind.Function,
              collectGenerics: false,
              collectParameters: false,
            };
          }
        }
      }
    }
  }
  return undefined;
};
const reactPlugin: ParsePlugin = {
  pluginName: 'react',
  filter: (prop) => !(prop.name === 'children'),
  typesResolve,
};

export default reactPlugin;
