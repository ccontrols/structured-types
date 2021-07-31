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

const reactPlugin: ParsePlugin = {
  pluginName: 'react',
  filter: (prop) => prop.name !== 'children',
  typesResolve: ({ symbolType, declaration, checker }) => {
    if ((symbolType.flags & ts.TypeFlags.Object) === ts.TypeFlags.Object) {
      if (declaration) {
        if (isObjectTypeDeclaration(declaration)) {
          const jsx = checker.getJsxIntrinsicTagNamesAt(declaration);
          if (jsx) {
            const defaultProps =
              getObjectStaticProp(declaration, 'defaultProps') ||
              getInitializer(declaration);
            const displayName = getObjectStaticProp(declaration, 'displayName');

            const signatures = symbolType.getConstructSignatures();
            if (signatures.length > 0 && signatures[0].parameters.length) {
              const props = signatures[0].parameters[0];
              let propsType = getSymbolType(checker, props) || symbolType;

              if (propsType.isUnionOrIntersection()) {
                propsType = propsType.types[0];
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
                kind: PropKind.Class,
              };
            }
          }
        } else {
          const reactFunction = getFunctionLike(checker, declaration);
          if (reactFunction) {
            const jsx = checker.getJsxIntrinsicTagNamesAt(reactFunction);
            if (jsx) {
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
  },
};

export default reactPlugin;
