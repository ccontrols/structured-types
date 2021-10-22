import deepmerge from 'deepmerge';
import reactPlugin from '@structured-types/react-plugin';
import propTypesPlugin from '@structured-types/prop-types-plugin';
import { DocsOptions, parseFiles } from '@structured-types/api';
import {
  propsToDocumentation,
  apiDocsConfig,
} from '@structured-types/api-docs';

export const extractProps = (
  fileName: string,
  options: DocsOptions = {},
): ReturnType<typeof propsToDocumentation> => {
  const { config = {} } = apiDocsConfig(fileName) || {};
  const mergedConfig = deepmerge(config, options);
  const props = parseFiles([fileName], {
    collectFilePath: true,
    collectHelpers: false,
    collectLinesOfCode: true,
    collectExtension: true,
    plugins: [propTypesPlugin, reactPlugin],
    ...mergedConfig,
  });

  const nodes = propsToDocumentation(props, config);

  return nodes;
};
