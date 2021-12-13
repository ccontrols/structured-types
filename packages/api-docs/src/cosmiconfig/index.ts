/**
 * original code forked from https://github.com/davidtheclark/cosmiconfig
 */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { Explorer } from './Explorer';
import { loaders } from './loaders';
import {
  Config,
  CosmiconfigResult,
  ExplorerOptions,
  ExplorerOptionsSync,
  Loaders,
  LoadersSync,
  OptionsBase,
} from './types';

type LoaderResult = Config | null;
export type Loader =
  | ((filepath: string, content: string) => Promise<LoaderResult>)
  | LoaderSync;
export type LoaderSync = (filepath: string, content: string) => LoaderResult;

export type Transform =
  | ((CosmiconfigResult: CosmiconfigResult) => Promise<CosmiconfigResult>)
  | TransformSync;

export type TransformSync = (
  CosmiconfigResult: CosmiconfigResult,
) => CosmiconfigResult;

export interface Options extends OptionsBase {
  loaders?: Loaders;
  transform?: Transform;
}

export interface OptionsSync extends OptionsBase {
  loaders?: LoadersSync;
  transform?: TransformSync;
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function cosmiconfig(moduleName: string, options: Options = {}) {
  const normalizedOptions: ExplorerOptions = normalizeOptions(
    moduleName,
    options,
  );

  const explorer = new Explorer(normalizedOptions);

  return {
    search: explorer.search.bind(explorer),
    load: explorer.load.bind(explorer),
    clearLoadCache: explorer.clearLoadCache.bind(explorer),
    clearSearchCache: explorer.clearSearchCache.bind(explorer),
    clearCaches: explorer.clearCaches.bind(explorer),
  } as const;
}

// do not allow mutation of default loaders. Make sure it is set inside options
const defaultLoaders = Object.freeze({
  '.cjs': loaders.loadJs,
  '.js': loaders.loadJs,
  '.json': loaders.loadJson,
  '.yaml': loaders.loadYaml,
  '.yml': loaders.loadYaml,
  noExt: loaders.loadYaml,
} as const);

const identity: TransformSync = function identity(x) {
  return x;
};

function normalizeOptions(
  moduleName: string,
  options: OptionsSync,
): ExplorerOptionsSync;
function normalizeOptions(
  moduleName: string,
  options: Options,
): ExplorerOptions;
function normalizeOptions(
  moduleName: string,
  options: Options | OptionsSync,
): ExplorerOptions | ExplorerOptionsSync {
  const defaults: ExplorerOptions | ExplorerOptionsSync = {
    packageProp: moduleName,
    searchPlaces: [
      'package.json',
      `.${moduleName}rc`,
      `.${moduleName}rc.json`,
      `.${moduleName}rc.yaml`,
      `.${moduleName}rc.yml`,
      `.${moduleName}rc.js`,
      `.${moduleName}rc.cjs`,
      `${moduleName}.config.js`,
      `${moduleName}.config.cjs`,
    ],
    ignoreEmptySearchPlaces: true,
    stopDir: options.fs?.cwd() || '',
    cache: true,
    transform: identity,
    loaders: defaultLoaders,
  };

  const normalizedOptions: ExplorerOptions | ExplorerOptionsSync = {
    ...defaults,
    ...options,
    loaders: {
      ...defaults.loaders,
      ...options.loaders,
    },
  };

  return normalizedOptions;
}

export { cosmiconfig, defaultLoaders };
