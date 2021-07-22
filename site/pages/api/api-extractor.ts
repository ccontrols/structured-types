import * as ts from 'typescript';
import path from 'path';
import { NextApiRequest, NextApiResponse } from 'next';
import { ExtractorConfig } from '@microsoft/api-extractor/lib/api/ExtractorConfig';
import { Collector } from '@microsoft/api-extractor/lib/collector/Collector';
import { MessageRouter } from '@microsoft/api-extractor/lib/collector/MessageRouter';
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
  const { lang = 'typescript', ...compilerOptions } = options?.tsOptions || {};
  const extension = lang === 'javascript' ? 'jsx' : 'tsx';

  const __errors: any[] = [];
  const fileName = `index.${extension}`;

  let result: Record<string, any> = {};
  const host = getHost(fileName, code || '');
  try {
    const extractorConfig: ExtractorConfig = ExtractorConfig.prepare({
      configObject: {
        projectFolder: path.resolve(__dirname, '../../../../../packages/api'),
        mainEntryPointFilePath: path.resolve(
          __dirname,
          '../../../../../packages/api/dist/SymbolParser.d.ts',
        ),
        compiler: { overrideTsconfig: compilerOptions },
      },
      configObjectFullPath: '',
      packageJsonFullPath: '',
    });

    const messageRouter: MessageRouter = new MessageRouter({
      workingPackageFolder: extractorConfig.packageFolder,
      messageCallback: options.messageCallback,
      messagesConfig: extractorConfig.messages || {},
      showVerboseMessages: !!options.showVerboseMessages,
      showDiagnostics: !!options.showDiagnostics,
      tsdocConfiguration: extractorConfig.tsdocConfiguration,
    });
    const collector: Collector = new Collector({
      program: ts.createProgram([fileName], compilerOptions, host.compilerHost),
      messageRouter,
      extractorConfig: extractorConfig,
    });

    collector.analyze();
    result = collector;
  } catch (e) {
    __errors.push(e.toString());
    console.error(e);
  }
  if (__errors.length) {
    result.__errors = __errors;
  }
  res.status(200).json(result);
};
