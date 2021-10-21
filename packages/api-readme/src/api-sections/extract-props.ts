import reactPlugin from '@structured-types/react-plugin';
import propTypesPlugin from '@structured-types/prop-types-plugin';
import { DocsOptions, parseFiles } from '@structured-types/api';
import {
  propsToDocumentation,
  DocumentationOptions,
} from '@structured-types/doc-page';
import { nodesToRemark } from './nodeToRemark';
import { RemarkNode } from '../types';

export const extractProps = (
  filesPath: string[],
  config?: DocsOptions & DocumentationOptions,
): RemarkNode[] => {
  const props = parseFiles(filesPath, {
    collectFilePath: true,
    collectHelpers: true,
    collectLinesOfCode: true,
    plugins: [propTypesPlugin, reactPlugin],
    ...config,
  });
  const nodes = propsToDocumentation(props, config);

  return nodesToRemark(nodes);
};
