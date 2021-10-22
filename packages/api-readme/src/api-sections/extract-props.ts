import reactPlugin from '@structured-types/react-plugin';
import propTypesPlugin from '@structured-types/prop-types-plugin';
import { DocsOptions, parseFiles } from '@structured-types/api';
import {
  propsToDocumentation,
  DocumentationOptions,
} from '@structured-types/api-docs';
import { nodesToRemark } from './nodeToRemark';
import { RemarkNode } from '../types';

export const extractProps = (
  files: string[],
  config?: DocsOptions & DocumentationOptions,
): RemarkNode[] => {
  const props = parseFiles(files, {
    collectFilePath: true,
    collectHelpers: true,
    collectLinesOfCode: true,
    plugins: [propTypesPlugin, reactPlugin],
    ...config,
  });
  const nodes = propsToDocumentation(props, config);

  return nodesToRemark(nodes);
};
