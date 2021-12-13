import deepmerge from 'deepmerge';
import { dirname, relative, basename } from 'path-browserify';
import { cosmiconfig } from './cosmiconfig';
import {
  CosmiconfigResult,
  emptyResults,
  OptionsBase as CosmicOptions,
} from './cosmiconfig/types';
import { DocumentationOptions, STFS } from './types';
import { getFS } from './utility/vfs';
export { propsToDocumentation } from './props-to-nodes';
export * from './types';
/**
 * deep merge of documentation configurations, by replacing array members (ie sections, columns)
 */
export const mergeConfig = (
  dest: DocumentationOptions,
  src: DocumentationOptions,
): DocumentationOptions =>
  deepmerge<DocumentationOptions>(dest, src, {
    arrayMerge: (dest: any[], src: any[]) => src,
  });

/**
 * Options for configuration file
 */
export interface ConfigOptions {
  /**
   * optional virtual file system, to use in environments like vscode web
   */
  fs?: STFS;
  /**
   * an optional element id. If not, the elements will be micromatch'ed based on relative path from configuration
   */
  elementId?: string;
  /**
   * cosmiconfig options
   */
  cosmic?: Omit<CosmicOptions, 'fs'>;
}
/**
 * Read the api-docs configuration file
 * @param fileName the file that is being analyzed, will be used the starting folder to search for configuration files.
 * @param configFileName pass directly the configuration file name
 * @param options optional configuration options
 * @returns page generation options from the config file
 */
export const apiDocsConfig = async (
  fileName: string,
  configFileName?: string,
  options?: ConfigOptions,
): Promise<CosmiconfigResult> => {
  const { fs, elementId, cosmic } = options || {};
  let results: CosmiconfigResult = emptyResults;
  if (typeof window !== 'undefined') {
    return results;
  }

  const configExplorer = cosmiconfig('api-docs', { fs: getFS(fs), ...cosmic });

  if (configFileName) {
    results = await configExplorer.load(configFileName);
  } else {
    const searchPath = dirname(fileName);
    results = await configExplorer.search(searchPath);
  }
  if (results) {
    const micromatch = require('micromatch');
    const { filepath, config } = results;
    if (filepath && config) {
      const { elements, ...rest } = config;
      results.config = rest;
      if (elements) {
        const id = elementId || relative(dirname(filepath), fileName);
        const onlyName = basename(fileName);
        Object.keys(elements).forEach((key) => {
          if (onlyName === key || micromatch.isMatch(id, key)) {
            results!.config = mergeConfig(results!.config, elements[key]);
          }
        });
      }
    }
  }
  return results;
};

export { getRepoPath } from './package-info/package-info';
