import reactPlugin from '@structured-types/react-plugin';
import propTypesPlugin from '@structured-types/prop-types-plugin';
import { DocsOptions, parseFiles } from '@structured-types/api';
import { ExtractProps } from './extract-tsdoc';
import { Node } from './types';

export const extractProps = (
  filePath: string,
  config?: DocsOptions,
): Node[] => {
  const props = parseFiles([filePath], {
    collectFilePath: true,
    collectHelpers: false,
    collectLinesOfCode: true,
    plugins: [propTypesPlugin, reactPlugin],
    ...config,
  });
  const extractor = new ExtractProps();
  return extractor.extract(props, {});
};
