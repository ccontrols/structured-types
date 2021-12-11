import hostedGitInfo from 'hosted-git-info';
import * as ts from 'typescript';
import { dirname, relative, resolve } from 'path-browserify';
import parseRepositoryURL from '@hutson/parse-repository-url';
import { STFS } from '../types';

const traverseFolder = async (
  fs: STFS,
  filePath: string,
  levels = 10,
  fileName = 'package.json',
): Promise<string | null> => {
  if (!fs.fileExists(filePath)) {
    return null;
  }
  const files: string[] = await fs.readDirectory(filePath);
  if (levels === 0) {
    return null;
  }
  const pckg = files.find((file) => file === fileName);
  if (pckg) {
    return resolve(filePath, pckg);
  }
  return traverseFolder(fs, resolve(filePath, '..'), levels - 1, fileName);
};
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
export const getRepoPath = async (
  fs: STFS,
  filePath: string,
): Promise<RepoPathReturnValue> => {
  const result: RepoPathReturnValue = {};

  const packageFileName = await traverseFolder(fs, dirname(filePath));
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
