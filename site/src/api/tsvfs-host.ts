require('polyfill-localstorage-node');
import * as ts from 'typescript';
import * as tsvfs from '@typescript/vfs';
import { addDTSMapping } from './dts-file';

const addReactLib = async (name: string, map: Map<string, string>) => {
  await addDTSMapping(
    'https://cdn.jsdelivr.net/npm/@types/react@17.0.2/',
    '/node_modules/@types/react/',
    name,
    map,
  );
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
  await addReactLib('index.d.ts', fsMap);
  await addReactLib('global.d.ts', fsMap);
  await addDTSMapping(
    'https://cdn.jsdelivr.net/npm/csstype@3.0.8/',
    '/node_modules/@types/csstype/',
    'index.d.ts',
    fsMap,
  );
  fsMap.set(fileName, code);
  const system = tsvfs.createSystem(fsMap);
  return tsvfs.createVirtualCompilerHost(system, compilerOptions, ts);
};
