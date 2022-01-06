import reactPlugin from '@structured-types/react-plugin';
import propTypesPlugin from '@structured-types/prop-types-plugin';
import { DocsOptions, parseFiles } from '@structured-types/api';
import {
  propsToDocumentation,
  DocumentationOptions,
} from '@structured-types/api-docs';
import { nodesToRemark } from './nodeToRemark';
import { RemarkNode } from '../types';

export const extractProps = async (
  files: string[],
  config?: DocsOptions & DocumentationOptions,
): Promise<RemarkNode[]> => {
  const props = parseFiles(files, {
    collectSourceInfo: true,
    collectHelpers: false,
    plugins: [propTypesPlugin, reactPlugin],
    ...config,
  });
  const nodes = await propsToDocumentation(props, config);

  return nodesToRemark(nodes);
};
