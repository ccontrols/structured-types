import * as ts from 'typescript';
import * as tsvfs from '@typescript/vfs';
import { getLibraryFiles } from './library-files';

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
  const libMap = await getLibraryFiles();
  libMap.forEach((value, key) => {
    fsMap.set(key, value);
  });
  fsMap.set(fileName, code);
  const system = tsvfs.createSystem(fsMap);
  return tsvfs.createVirtualCompilerHost(system, compilerOptions, ts);
};
