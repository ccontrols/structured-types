import { NextApiRequest, NextApiResponse } from 'next';
import * as ts from 'typescript';
import { withCompilerOptions, ParserOptions } from 'react-docgen-typescript';
import { getHost } from '../../src/api/tsvfs-host';

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
  const { lang = 'typescript', ...compilerOptions } = options || {};
  const extension = lang === 'javascript' ? 'jsx' : 'tsx';
  const parserOptions: ParserOptions = {
    shouldIncludePropTagMap: true,
    shouldExtractLiteralValuesFromEnum: true,
    shouldRemoveUndefinedFromOptional: true,
    savePropValueAsString: false,
  };
  const __errors: any[] = [];
  const fileName = `index.${extension}`;
  let result: Record<string, any> = {};
  const host = await getHost(fileName, code || '', compilerOptions);

  const parser = withCompilerOptions(compilerOptions, parserOptions);
  try {
    result = parser.parseWithProgramProvider(fileName, () =>
      ts.createProgram([fileName], compilerOptions, host.compilerHost),
    );
  } catch (e: unknown) {
    if (e instanceof Error) {
      __errors.push(e.toString());
    }
  }

  if (__errors.length) {
    result.__errors = __errors;
  }
  res.status(200).json(result);
};
