import path from 'path-browserify';
import { STFS } from '../types';

async function getDirectory(fs: STFS, filepath: string): Promise<string> {
  const filePathIsDirectory = await fs.isDirectory(filepath);

  if (filePathIsDirectory === true) {
    return filepath;
  }

  const directory = path.dirname(filepath);

  return directory;
}

export { getDirectory };
