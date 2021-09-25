import { getTypescriptConfig } from '@structured-types/typescript-config';
import { analyzeFiles } from './analyzeFiles';
import { PropTypes } from './types';
import { tsDefaults, DocsOptions, ProgramOptions } from './ts-utils';
export * from './jsdoc';
export * from './ts';
export * from './types';
export * from './ts-utils';

export { analyzeFiles };

/**
 * API to analyze the given files by also loading the local typescript options from tsconfig
 * @param files list of files to be processed
 * @param options parsing options
 * @param programOptions typescript ts.program and ts.compilerHost
 * @returns the parsed types
 */
export const parseFiles = (
  files: string[],
  options: DocsOptions = {},
  programOptions?: ProgramOptions,
): PropTypes => {
  if (!files.length) {
    throw new Error('You need to supply at least one file');
  }
  options.tsOptions = {
    ...tsDefaults,
    ...getTypescriptConfig(files[0], options.tsOptions),
  };
  const results = analyzeFiles(files, options, programOptions);
  return results;
};
