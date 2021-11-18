import deepmerge from 'deepmerge';
import reactPlugin from '@structured-types/react-plugin';
import propTypesPlugin from '@structured-types/prop-types-plugin';
import { DocsOptions, parseFiles } from '@structured-types/api';
import {
  propsToDocumentation,
  apiDocsConfig,
  DocumentationOptions,
} from '@structured-types/api-docs';

export const extractProps = (
  fileName: string,
  options: DocsOptions & DocumentationOptions = {},
): ReturnType<typeof propsToDocumentation> => {
  const { config } = apiDocsConfig(fileName) || {};
  const mergedConfig = deepmerge<DocsOptions & DocumentationOptions>(
    config,
    options,
  );
  const props = parseFiles([fileName], {
    collectSourceInfo: true,
    collectHelpers: false,
    collectInnerLocations: true,
    collectExtension: true,
    plugins: [propTypesPlugin, reactPlugin],
    ...mergedConfig,
  });

  const nodes = propsToDocumentation(props, mergedConfig);
  return nodes;
};
