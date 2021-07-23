import { getTypescriptConfig } from '@structured-types/typescript-config';
import { anaylizeFiles } from './ts-walk';
export * from './react';
import { PropTypes } from './types';
import { tsDefaults, DocsOptions, ProgramOptions } from './ts-utils';
export * from './types';
export * from './ts-utils';

export { anaylizeFiles };
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
  const results = anaylizeFiles(filePaths, options, programOptions);
  return results;
};
