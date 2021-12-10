import { resolve } from 'path-browserify';
import { STFS } from '..';
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
  public fs?: STFS;
  public getRepo(filePath: string): RepoInfo | undefined {
    if (!this.repos[filePath] && typeof window === 'undefined') {
      let fs = this.fs;
      if (!fs) {
        if (typeof window !== 'undefined') {
          return undefined;
        }
        const { existsSync, readdirSync } = require('fs');

        fs = {
          fileExists: existsSync,
          readDirectory: readdirSync,
        };
      }
      this.repos[filePath] = getRepoPath(fs, resolve(filePath));
    }
    return this.repos[filePath];
  }
}
