import { NextApiRequest, NextApiResponse } from 'next';
import { getLibraryFiles } from '../../src/api/library-files';

export default async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  const libs = await getLibraryFiles();
  const maps: Record<string, string> = {};
  libs.forEach((value, key) => {
    maps[key] = value;
  });
  res.status(200).json(maps);
};
