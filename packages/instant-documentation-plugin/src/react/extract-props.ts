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
  mergeConfig,
  DocumentationNode,
} from '@structured-types/api-docs';

export const extractProps = async (
  fileName: string,
  options: DocsOptions & DocumentationOptions = {},
  programOptions: ProgramOptions,
): Promise<DocumentationNode[]> => {
  const { config } = apiDocsConfig(fileName) || {};
  const mergedConfig = mergeConfig(config, options);
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
  const nodes = await propsToDocumentation(props, mergedConfig);
  return nodes;
};
