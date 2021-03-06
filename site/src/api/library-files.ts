import { addDTSMapping } from './dts-file';

const addReactLib = async (name: string, map: Map<string, string>) => {
  await addDTSMapping(
    'https://cdn.jsdelivr.net/npm/@types/react@17.0.2/',
    '/node_modules/@types/react/',
    name,
    map,
  );
};

export const getLibraryFiles = async (): Promise<Map<string, string>> => {
  const fsMap = new Map();
  await addReactLib('index.d.ts', fsMap);
  await addReactLib('global.d.ts', fsMap);
  await addReactLib('jsx-runtime.d.ts', fsMap);
  await addDTSMapping(
    'https://cdn.jsdelivr.net/npm/csstype@3.0.8/',
    '/node_modules/@types/csstype/',
    'index.d.ts',
    fsMap,
  );
  await addDTSMapping(
    'https://cdn.jsdelivr.net/npm/@types/prop-types@15.7.4/',
    '/node_modules/@types/prop-types/',
    'index.d.ts',
    fsMap,
  );
  return fsMap;
};
