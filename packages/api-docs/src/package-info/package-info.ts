import hostedGitInfo from 'hosted-git-info';
import * as ts from 'typescript';
import parseRepositoryURL from '@hutson/parse-repository-url';

interface RepoPathReturnValue {
  /**
   * repository url
   */
  repo?: string;
  /**
   * name field from the project's package.json
   */
  packageName?: string;
  /**
   * file's relative path to the project's package.json
   */
  relativePath?: string;
}
/**
 * Retrieves the repo path from the project's package.json file.
 * @param filePath file path to start the search for a package.json
 */
export const getRepoPath = (filePath: string): RepoPathReturnValue => {
  const result: ReturnType<typeof getRepoPath> = {};
  if (typeof window !== 'undefined') {
    return result;
  }
  const { dirname, relative, resolve } = require('path');
  const { existsSync, readdirSync } = require('fs');
  const traverseFolder = (
    filePath: string,
    levels = 10,
    fileName = 'package.json',
  ): string | null => {
    if (!existsSync(filePath)) {
      return null;
    }
    const files: string[] = readdirSync(filePath);
    if (levels === 0) {
      return null;
    }
    const pckg = files.find((file) => file === fileName);
    if (pckg) {
      return resolve(filePath, pckg);
    }
    return traverseFolder(resolve(filePath, '..'), levels - 1, fileName);
  };
  const packageFileName = traverseFolder(dirname(filePath));
  if (packageFileName) {
    const content = ts.sys.readFile(packageFileName);
    if (content) {
      const packageJSON = JSON.parse(content);
      result.packageName = packageJSON.name;
      result.relativePath = relative(dirname(packageFileName), filePath);
      const repositoryURL =
        typeof packageJSON.repository === 'string'
          ? packageJSON.repository
          : packageJSON.repository && packageJSON.repository.url;
      if (repositoryURL) {
        const templates =
          hostedGitInfo.fromUrl(repositoryURL) ||
          parseRepositoryURL(repositoryURL);
        result.relativePath = `${
          packageJSON.repository && packageJSON.repository.directory
            ? `${packageJSON.repository.directory}/`
            : ''
        }${relative(dirname(packageFileName), filePath)}`;
        const fillTemplate = (template: string): string => {
          return template
            .replace('auth@', templates.auth || '')
            .replace('{domain}', templates.domain || '')
            .replace('{user}', templates.user || '')
            .replace('{project}', templates.project || '')
            .replace('{#fragment}', '')
            .replace('{path}', result.relativePath as string)
            .replace('{treepath}', templates.treepath || '')
            .replace(
              '{/tree/committish}',
              `/${templates.treepath}/${templates.committish || 'master'}`,
            )
            .replace('{committish}', templates.committish || 'master');
        };
        result.repo = fillTemplate(templates.browsefiletemplate);
      }
    }
  }
  return result;
};
