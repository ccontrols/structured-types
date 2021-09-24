import { getTypescriptConfig } from '@structured-types/typescript-config';
import { analyzeFiles } from './analyzeFiles';
import { PropTypes } from './types';
import { tsDefaults, DocsOptions, ProgramOptions } from './ts-utils';
export * from './jsdoc';
export * from './ts';
export * from './types';
export * from './ts-utils';

export { analyzeFiles };

export const parseFiles = (
  filePaths: string[],
  options: DocsOptions = {},
  programOptions?: ProgramOptions,
): PropTypes => {
  if (!filePaths.length) {
    throw new Error('You need to supply at least one file');
  }
  options.tsOptions = {
    ...tsDefaults,
    ...getTypescriptConfig(filePaths[0], options.tsOptions),
  };
  const results = analyzeFiles(filePaths, options, programOptions);
  return results;
};
