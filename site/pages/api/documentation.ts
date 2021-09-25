import * as ts from 'typescript';
import { tmpdir } from 'os';
import { sep } from 'path';
import { NextApiRequest, NextApiResponse } from 'next';
const documentation = require('documentation');

export default async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  const { code, tsoptions } = req.query as {
    code?: string;
    tsoptions?: string;
  };
  const options = {
    ...(tsoptions ? JSON.parse(tsoptions) : undefined),
  };
  const { lang = 'typescript' } = options || {};
  const extension = lang === 'javascript' ? 'js' : 'ts';
  const host = ts.createCompilerHost({});
  if (host.createHash) {
    const name = host.createHash(Math.random().toString()).substring(0, 12);
    const fileName = `${tmpdir}${sep}${name}.${extension}`;

    ts.sys.writeFile(fileName, code || '');
    documentation
      .build([fileName], {})
      .then(documentation.formats.json)
      .then((output: any) => {
        if (ts.sys.deleteFile) {
          ts.sys.deleteFile(fileName);
        }

        // output is a string of JSON data
        res.status(200).json(output);
      });
  } else {
    res.status(200).json({ __errors: 'Can not locate host.createHash' });
  }
};
