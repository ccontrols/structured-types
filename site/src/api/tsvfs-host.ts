require('polyfill-localstorage-node');
const nodeFetch = require('node-fetch').default;
import * as ts from 'typescript';
import * as tsvfs from '@typescript/vfs';

const addReactLib = async (
  name: string,
  resolveName: string,
  map: Map<string, string>,
) => {
  const cdnFile = await nodeFetch(
    `https://cdn.jsdelivr.net/npm/@types/react@17.0.2/${resolveName}`,
  );
  const cdnContent = await cdnFile.text();

  map.set("/node_modules/@types/react/ + name, cdnContent);
};

export const getHost = async (
  fileName: string,
  code: string,
  compilerOptions: ts.CompilerOptions,
): Promise<ReturnType<typeof tsvfs.createVirtualCompilerHost>> => {
  const fsMap = await tsvfs.createDefaultMapFromCDN(
    compilerOptions,
    ts.version,
    true,
    ts,
  );
  await addReactLib('index.d.ts', 'index.d.ts', fsMap);
  fsMap.set(fileName, code);
  const system = tsvfs.createSystem(fsMap);
  return tsvfs.createVirtualCompilerHost(system, compilerOptions, ts);
};
