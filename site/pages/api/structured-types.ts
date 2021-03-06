import { NextApiRequest, NextApiResponse } from 'next';
import reactPlugin from '@structured-types/react-plugin';
import propTypesPlugin from '@structured-types/prop-types-plugin';

import { analyzeFiles, DocsOptions } from '@structured-types/api';
import { getHost } from '../../src/api/tsvfs-host';

export default async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  const { code, config, tsoptions } = req.query as {
    code?: string;
    config?: string;
    tsoptions?: string;
  };
  const parseOptions = config ? JSON.parse(config) : {};
  const { extensions: e, ...otherOptions } = parseOptions;
  const extensions = !e ? ['react-prop-types', 'react'] : e;
  const plugins = [];
  let isJsx = false;
  if (extensions.includes('react-prop-types')) {
    plugins.push(propTypesPlugin);
  }
  if (extensions.includes('react')) {
    isJsx = true;
    plugins.push(reactPlugin);
  }
  const options: DocsOptions = {
    plugins,
    ...otherOptions,
    tsOptions: tsoptions ? JSON.parse(tsoptions) : undefined,
  };

  const { lang = 'typescript', ...compilerOptions } = options?.tsOptions || {};
  const extension = isJsx
    ? lang === 'javascript'
      ? 'jsx'
      : 'tsx'
    : lang === 'javascript'
    ? 'js'
    : 'ts';
  const fileName = `index.${extension}`;
  const host = await getHost(fileName, code || '', compilerOptions);
  const result = analyzeFiles([fileName], options, {
    host: host.compilerHost,
  });
  res.status(200).json(result);
};
