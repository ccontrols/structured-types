import {
  TypeResolver,
  ResolverReturnType,
  DocsOptions,
  getInitializer,
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
  return {
    type: props.symbolType,
    initializer: getInitializer(props.declaration),
    ...options,
  };
};
