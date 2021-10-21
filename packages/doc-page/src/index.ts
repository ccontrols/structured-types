import * as path from 'path';
import { PropTypes } from '@structured-types/api';
import { cosmiconfigSync } from 'cosmiconfig';
import { DocumentationNode, DocumentationOptions } from './types';
import { PropsToDocumentation } from './PropsToDocumentation';
export * from './types';
export { getRepoPath } from './package-info/package-info';

export const apiDocsConfig = (
  fileName: string,
  configFileName?: string,
): ReturnType<ReturnType<typeof cosmiconfigSync>['load']> => {
  const configExplorer = cosmiconfigSync('api-docs');
  return configFileName
    ? configExplorer.load(configFileName)
    : configExplorer.search(path.dirname(fileName));
};
export const propsToDocumentation = (
  props: PropTypes,
  options?: DocumentationOptions,
): DocumentationNode[] => {
  const extractor = new PropsToDocumentation();
  return extractor.extract(props, options);
};
