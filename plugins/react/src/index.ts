import * as ts from 'typescript';
import {
  getSymbolType,
  getFunctionLike,
  getInitializer,
  isObjectTypeDeclaration,
  isSignatureDeclaration,
  getObjectStaticProp,
  ParsePlugin,
  PropKind,
  ISymbolParser,
} from '@structured-types/api';

const getNodeResults = (
  parser: ISymbolParser,
  node: ts.Node,
): ReturnType<ParsePlugin['typesResolve']> => {
  if (ts.isCallExpression(node) && node.arguments.length) {
    return getNodeResults(parser, node.arguments[0]);
  }
  const symbol = parser.checker.getSymbolAtLocation(node);
  const type = parser.checker.getTypeAtLocation(node);
  if (type) {
    const typeSymbol = type.aliasSymbol || type.symbol;

    const typeDeclaration = ts.isIdentifier(node)
      ? symbol?.valueDeclaration || typeSymbol?.declarations?.[0]
      : typeSymbol?.valueDeclaration || typeSymbol?.declarations?.[0];
    const results = typesResolve({
      parser,
      declaration: typeDeclaration,
      symbolType: type,
    });
    if (symbol && results && !results.prop?.name) {
      results.prop = { ...results.prop, name: symbol.getName() };
    }

    return results;
  }
  return undefined;
};
const typesResolve: ParsePlugin['typesResolve'] = ({
  symbolType,
  declaration,
  parser,
}) => {
  const { checker } = parser;
  if (symbolType.flags & (ts.TypeFlags.Object | ts.TypeFlags.StructuredType)) {
    if (declaration) {
      const functionCall =
        ts.isExportAssignment(declaration) &&
        declaration.expression &&
        ts.isCallExpression(declaration.expression) &&
        declaration.expression.arguments.length
          ? declaration.expression.arguments[0]
          : undefined;
      if (functionCall) {
        return getNodeResults(parser, functionCall);
      }
      const symbol = symbolType.aliasSymbol || symbolType.symbol;
      if (
        symbol &&
        [
          'MemoExoticComponent',
          'NamedExoticComponent',
          'ForwardRefExoticComponent',
        ].includes(symbol.getName())
      ) {
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
          type = typeRef.typeArguments?.length
            ? typeRef.typeArguments[0].isUnionOrIntersection() &&
              typeRef.typeArguments[0].types.length
              ? typeRef.typeArguments[0].types[0]
              : typeRef.typeArguments[0]
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
          prop: { kind: PropKind.Function, name },
          initializer: defaultProps || initializer,
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
            let propsType = getSymbolType(checker, props);
            if (
              !propsType ||
              (propsType as unknown as { intrinsicName?: string })
                .intrinsicName === 'any'
            ) {
              propsType = symbolType;
            }

            if (propsType.isUnionOrIntersection()) {
              propsType = propsType.types[0];
            }
            const displayName = getObjectStaticProp(declaration, 'displayName');

            const name =
              typeof displayName === 'string'
                ? displayName
                : displayName && ts.isStringLiteral(displayName)
                ? displayName.text
                : declaration.name?.text;
            const defaultProps =
              getObjectStaticProp(declaration, 'defaultProps') ||
              getInitializer(declaration);
            return {
              type: propsType,
              prop: { kind: PropKind.Class, name },
              initializer: defaultProps,
            };
          }
        }
      } else {
        const reactFunction = getFunctionLike(checker, declaration);
        if (reactFunction) {
          const jsx = checker.getJsxIntrinsicTagNamesAt(reactFunction);
          if (jsx.length) {
            if (isSignatureDeclaration(reactFunction)) {
              const signature =
                checker.getSignatureFromDeclaration(reactFunction);
              if (signature) {
                const returnType = checker.getReturnTypeOfSignature(signature);
                const returnSymbol =
                  returnType.aliasSymbol || returnType.symbol;
                if (
                  returnSymbol &&
                  ['Element', 'ReactNode'].includes(returnSymbol.getName())
                ) {
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
                    if (
                      !defaultProps &&
                      ts.isObjectBindingPattern(props.name)
                    ) {
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
                    initializer: defaultProps,
                    prop: { kind: PropKind.Function, name },
                    collectGenerics: false,
                    collectParameters: false,
                  };
                }
              }
            } else if (reactFunction.arguments.length) {
              return getNodeResults(parser, reactFunction.arguments[0]);
            }
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
