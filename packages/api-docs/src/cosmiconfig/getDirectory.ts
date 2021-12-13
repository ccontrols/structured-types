import path from 'path-browserify';

async function getDirectory(filepath: string): Promise<string> {
  const { isDirectory } = require('path-type');

  const filePathIsDirectory = await isDirectory(filepath);

  if (filePathIsDirectory === true) {
    return filepath;
  }

  const directory = path.dirname(filepath);

  return directory;
}

function getDirectorySync(filepath: string): string {
  const { isDirectorySync } = require('path-type');
  const filePathIsDirectory = isDirectorySync(filepath);

  if (filePathIsDirectory === true) {
    return filepath;
  }

  const directory = path.dirname(filepath);

  return directory;
}

export { getDirectory, getDirectorySync };
