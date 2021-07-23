import path from 'path';
import fs from 'fs';
import * as ts from 'typescript';
import resolve from 'resolve';
import * as tsvfs from '@typescript/vfs';
import { getTypescriptConfig } from '@structured-types/typescript-config';

const typeScriptPath = path.dirname(
  resolve.sync('typescript', { basedir: __dirname }),
);
const getLib = (name: string) => {
  return fs.readFileSync(path.join(typeScriptPath, name), 'utf8');
};

const addLib = (name: string, map: Map<string, string>) => {
  map.set('/' + name, getLib(name));
};

const createDefaultMap = () => {
  const fsMap = new Map<string, string>();
  addLib('lib.es2015.d.ts', fsMap);
  addLib('lib.es2015.collection.d.ts', fsMap);
  addLib('lib.es2015.core.d.ts', fsMap);
  addLib('lib.es2015.generator.d.ts', fsMap);
  addLib('lib.es2015.iterable.d.ts', fsMap);
  addLib('lib.es2015.promise.d.ts', fsMap);
  addLib('lib.es2015.proxy.d.ts', fsMap);
  addLib('lib.es2015.reflect.d.ts', fsMap);
  addLib('lib.es2015.symbol.d.ts', fsMap);
  addLib('lib.es2015.symbol.wellknown.d.ts', fsMap);
  addLib('lib.es5.d.ts', fsMap);
  addLib('lib.dom.d.ts', fsMap);
  addLib('lib.dom.iterable.d.ts', fsMap);
  addLib('lib.esnext.d.ts', fsMap);
  addLib('lib.es2021.d.ts', fsMap);
  addLib('lib.es2020.d.ts', fsMap);
  addLib('lib.es2019.d.ts', fsMap);
  addLib('lib.es2018.d.ts', fsMap);
  addLib('lib.es2017.d.ts', fsMap);
  addLib('lib.es2016.d.ts', fsMap);
  addLib('lib.es2016.array.include.d.ts', fsMap);
  addLib('lib.es2017.object.d.ts', fsMap);
  addLib('lib.es2017.sharedmemory.d.ts', fsMap);
  addLib('lib.es2017.string.d.ts', fsMap);
  addLib('lib.es2017.intl.d.ts', fsMap);
  addLib('lib.es2017.typedarrays.d.ts', fsMap);
  addLib('lib.es2017.full.d.ts', fsMap);

  addLib('lib.es2018.asynciterable.d.ts', fsMap);
  addLib('lib.es2018.asyncgenerator.d.ts', fsMap);
  addLib('lib.es2018.promise.d.ts', fsMap);
  addLib('lib.es2018.regexp.d.ts', fsMap);
  addLib('lib.es2018.intl.d.ts', fsMap);
  addLib('lib.es2019.array.d.ts', fsMap);
  addLib('lib.es2019.object.d.ts', fsMap);
  addLib('lib.es2019.string.d.ts', fsMap);
  addLib('lib.es2019.symbol.d.ts', fsMap);
  addLib('lib.es2020.bigint.d.ts', fsMap);
  addLib('lib.es2020.promise.d.ts', fsMap);
  addLib('lib.es2020.sharedmemory.d.ts', fsMap);
  addLib('lib.es2020.string.d.ts', fsMap);
  addLib('lib.es2020.symbol.wellknown.d.ts', fsMap);
  addLib('lib.es2020.intl.d.ts', fsMap);
  addLib('lib.es2021.promise.d.ts', fsMap);
  addLib('lib.es2021.string.d.ts', fsMap);
  addLib('lib.es2021.weakref.d.ts', fsMap);
  addLib('lib.esnext.intl.d.ts', fsMap);
  addLib('lib.webworker.importscripts.d.ts', fsMap);
  addLib('lib.scripthost.d.ts', fsMap);

  return fsMap;
};
const options = getTypescriptConfig(path.resolve(__dirname, 'index.ts')) || {};
const fsMap = createDefaultMap();

const reactPath = path.dirname(resolve.sync('react', { basedir: __dirname }));
console.log(
  'main',
  JSON.stringify(
    fs.readdirSync(path.resolve(reactPath, '../../site')),
    null,
    2,
  ),
);
console.log(
  'node_modules',
  JSON.stringify(fs.readdirSync(path.resolve(reactPath, '..')), null, 2),
);

const typesPath = path.resolve(reactPath, '../@types/react');
fsMap.set(
  '/react.d.ts',
  fs.readFileSync(path.resolve(typesPath, 'index.d.ts'), 'utf8'),
);
fsMap.set(
  '/global.d.ts',
  fs.readFileSync(path.resolve(typesPath, 'global.d.ts'), 'utf8'),
);
fsMap.set(
  '/react-dom.d.ts',
  fs.readFileSync(path.resolve(typesPath, '../react-dom/index.d.ts'), 'utf8'),
);

const system = tsvfs.createSystem(fsMap);

export const getHost = (
  fileName: string,
  code: string,
): ReturnType<typeof tsvfs.createVirtualCompilerHost> => {
  fsMap.set(fileName, code);
  return tsvfs.createVirtualCompilerHost(system, options, ts);
};
