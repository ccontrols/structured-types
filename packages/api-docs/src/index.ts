import * as path from 'path';
import { PropTypes } from '@structured-types/api';
import { cosmiconfigSync } from 'cosmiconfig';
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
 * Read the api-docs configuration file
 * @param fileName the file that is being analyzed, will be used the starting folder to search for configuration files.
 * @param configFileName pass directly the configuration file name
 * @returns page generation options from the config file
 */
export const apiDocsConfig = (
  fileName: string,
  configFileName?: string,
): CosmiconfigResult => {
  const configExplorer = cosmiconfigSync('api-docs');
  if (configFileName) {
    return configExplorer.load(configFileName);
  }
  const searchPath = path.dirname(fileName);
  return configExplorer.search(searchPath);
};

export { getRepoPath } from './package-info/package-info';
