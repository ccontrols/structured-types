import { getRepoPath } from '../package-info/package-info';

type RepoInfo = {
  repo?: string;
  filePath?: string;
  packageName?: string;
  relativePath?: string;
};
type ReposList = {
  [key: string]: {
    repo?: string;
    filePath?: string;
    packageName?: string;
    relativePath?: string;
  };
};

export class PropRepos {
  private repos: ReposList = {};
  public getRepo(filePath: string): RepoInfo | undefined {
    if (!this.repos[filePath] && typeof window === 'undefined') {
      const { resolve } = require('path');
      this.repos[filePath] = getRepoPath(resolve(filePath));
    }
    return this.repos[filePath];
  }
}
