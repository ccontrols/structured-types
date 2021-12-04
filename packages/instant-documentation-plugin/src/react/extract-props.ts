import deepmerge from 'deepmerge';
import reactPlugin from '@structured-types/react-plugin';
import propTypesPlugin from '@structured-types/prop-types-plugin';
import {
  DocsOptions,
  analyzeFiles,
  ProgramOptions,
} from '@structured-types/api';
import {
  propsToDocumentation,
  apiDocsConfig,
  DocumentationOptions,
} from '@structured-types/api-docs';

export const extractProps = (
  fileName: string,
  options: DocsOptions & DocumentationOptions = {},
  programOptions: ProgramOptions,
): ReturnType<typeof propsToDocumentation> => {
  const { config } = apiDocsConfig(fileName) || {};
  const mergedConfig = deepmerge<DocsOptions & DocumentationOptions>(
    config,
    options,
  );
  const props = analyzeFiles(
    [fileName],
    {
      collectSourceInfo: true,
      collectHelpers: false,
      collectInnerLocations: true,
      collectExtension: true,
      plugins: [propTypesPlugin, reactPlugin],
      ...mergedConfig,
    },
    programOptions,
  );

  const nodes = propsToDocumentation(props, mergedConfig);
  return nodes;
};
