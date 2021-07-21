import { NextApiRequest, NextApiResponse } from 'next';
import * as ts from 'typescript';
import * as tsvfs from '@typescript/vfs';
import reactPlugin from '@structured-types/api/react';

import { parseFiles, DocsOptions } from '@structured-types/api';

export default async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  const { code, config, tsoptions } = req.query as {
    code?: string;
    config?: string;
    tsoptions?: string;
  };
  const options: DocsOptions = {
    plugins: [reactPlugin],
    ...(config ? JSON.parse(config) : undefined),
    tsOptions: tsoptions ? JSON.parse(tsoptions) : undefined,
  };
  const { lang = 'typescript', ...compilerOptions } = options?.tsOptions || {};
  const extension = lang === 'javascript' ? 'jsx' : 'tsx';
  const fsMap = tsvfs.createDefaultMapFromNodeModules({
    target: ts.ScriptTarget.ESNext,
  });
  const fileName = `index.${extension}`;
  fsMap.set(fileName, code || '');
  const system = tsvfs.createSystem(fsMap);
  const host = tsvfs.createVirtualCompilerHost(system, compilerOptions, ts);
  const result = parseFiles([fileName], options, host.compilerHost);
  res.status(200).json(result);
};
