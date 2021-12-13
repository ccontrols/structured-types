import { STFS } from '..';

export const getFS = (fs?: STFS): STFS | undefined => {
  if (fs) {
    return fs;
  }
  if (typeof window !== 'undefined') {
    return undefined;
  }
  const { existsSync, readdirSync, readFileSync } = require('fs');

  return {
    fileExists: existsSync,
    readDirectory: readdirSync,
    readFile: (filePath: string) => {
      try {
        return readFileSync(filePath, 'utf8');
      } catch (e) {
        return null;
      }
    },
    cwd: process.cwd,
  };
};
