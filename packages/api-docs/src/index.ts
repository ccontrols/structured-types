import * as path from 'path';
import { PropTypes } from '@structured-types/api';
import { cosmiconfigSync } from 'cosmiconfig';
import micromatch from 'micromatch';
import deepmerge from 'deepmerge';

import { CosmiconfigResult } from 'cosmiconfig/dist/types';

import { DocumentationNode, DocumentationOptions } from './types';
import { PropsToDocumentation } from './PropsToDocumentation';
export * from './types';

/**
 * Creates a list of api documentation nodes
 * @param props properties parsed from `structured-types/api`
 * @param options page generation options
 * @returns a list of documentation nodes
 */
export const propsToDocumentation = (
  props: PropTypes,
  options?: DocumentationOptions,
): DocumentationNode[] => {
  const extractor = new PropsToDocumentation();
  return extractor.extract(props, options);
};

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
  const configExplorer = cosmiconfigSync('api-docs');
  let results: CosmiconfigResult;
  if (configFileName) {
    results = configExplorer.load(configFileName);
  } else {
    const searchPath = path.dirname(fileName);
    results = configExplorer.search(searchPath);
  }
  if (results) {
    const { filepath, config } = results;
    if (filepath && config) {
      const { elements, ...rest } = config;
      results.config = rest;
      if (elements) {
        const id = elementId || path.relative(path.dirname(filepath), fileName);
        const onlyName = path.basename(fileName);
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
