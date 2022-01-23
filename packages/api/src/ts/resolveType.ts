import ts from 'typescript';
import {
  TypeResolver,
  ResolverReturnType,
  DocsOptions,
  getInitializer,
  getSymbolDeclaration,
} from '../ts-utils';

export const resolveType: (
  props: Parameters<TypeResolver>[0],
  options?: DocsOptions,
) => ResolverReturnType = (props, options) => {
  if (options?.plugins) {
    for (const plugin of options.plugins) {
      if (plugin.typesResolve) {
        const resolved = plugin.typesResolve({
          ...props,
        });
        if (resolved) {
          return { ...plugin, ...resolved };
        }
      }
    }
  }
  let initializer: ts.Node | undefined = undefined;
  if (props.expression) {
    const expressionSymbol = props.parser.checker.getSymbolAtLocation(
      props.expression,
    );
    const expressionDeclaration = getSymbolDeclaration(expressionSymbol);
    initializer = getInitializer(expressionDeclaration);
  } else {
    initializer = getInitializer(props.declaration);
  }
  return {
    type: props.symbolType,
    initializer,
    ...options,
  };
};
