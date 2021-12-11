import deepmerge from 'deepmerge';
import { dirname, relative, basename } from 'path-browserify';
import { CosmiconfigResult } from 'cosmiconfig/dist/types';
import { DocumentationOptions } from './types';
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
 * Read the api-docs configuration file
 * @param fileName the file that is being analyzed, will be used the starting folder to search for configuration files.
 * @param configFileName pass directly the configuration file name
 * @param elementId an optional element id. If not, the elements will be micromatch'ed based on relative path from configuration
 * @returns page generation options from the config file
 */
export const apiDocsConfig = (
  fileName: string,
  configFileName?: string,
  elementId?: string,
): CosmiconfigResult => {
  let results: CosmiconfigResult = { config: {}, filepath: '' };
  if (typeof window !== 'undefined') {
    return results;
  }
  const { cosmiconfigSync } = require('cosmiconfig');

  const configExplorer = cosmiconfigSync('api-docs');

  if (configFileName) {
    results = configExplorer.load(configFileName);
  } else {
    const searchPath = dirname(fileName);
    results = configExplorer.search(searchPath);
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
