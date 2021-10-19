import fs from 'fs';
import path from 'path';
import hostedGitInfo from 'hosted-git-info';
import parseRepositoryURL from '@hutson/parse-repository-url';
import { resolveModuleName } from 'typescript';

const traverseFolder = (
  filePath: string,
  levels = 10,
  fileName = 'package.json',
): string | null => {
  const files = fs.readdirSync(filePath);
  if (levels === 0) {
    return null;
  }
  const pckg = files.find((file) => file === fileName);
  if (pckg) {
    return path.resolve(filePath, pckg);
  }
  return traverseFolder(path.resolve(filePath, '..'), levels - 1, fileName);
};

export const getRepoPath = (
  filePath: string,
): { repo?: string; packageName?: string; relativePath?: string } => {
  const packageFileName = traverseFolder(path.dirname(filePath));
  const result: ReturnType<typeof getRepoPath> = {};
  if (packageFileName) {
    const packageJSON = JSON.parse(fs.readFileSync(packageFileName, 'utf8'));
    result.packageName = packageJSON.name;
    result.relativePath = path.relative(
      path.dirname(packageFileName),
      filePath,
    );
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
      }${path.relative(path.dirname(packageFileName), filePath)}`;
      const fillTemplate = (template: string): string => {
        return template
          .replace('auth@', templates.auth || '')
          .replace('{domain}', templates.domain || '')
          .replace('{user}', templates.user || '')
          .replace('{project}', templates.project || '')
          .replace('{#fragment}', '')
          .replace('{path}', result.relativePath)
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
  return result;
};
