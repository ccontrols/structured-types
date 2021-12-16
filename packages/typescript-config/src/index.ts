import * as ts from 'typescript';
import { resolve, dirname } from 'path-browserify';
import merge from 'deepmerge';

export type TSConfigFS = {
  fileExists: (filePath: string) => Promise<boolean>;
  readFile: (filePath: string) => Promise<string | null>;
};
const deepMerge = <T>(a: any, b: any): T =>
  merge<T>(a, b, {
    arrayMerge: (dest: any[], src: any[]) => [...dest, ...src],
  });
/**
 * Config parsing options
 */
export type TSConfigOptions = {
  keepJson?: boolean;
};
/**
 * Reads any typescript configuration files for a given file, including the extends references
 * @param filePath the full file path to the file
 * @param defaultConfig optional default configuration
 * @param options config parsing options
 * @returns the typescript configuration for the file, or undefined if this is not a typescript file
 */
export const getTypescriptConfig = (
  filePath: string,
  defaultConfig?: ts.CompilerOptions,
  options?: TSConfigOptions,
): ts.CompilerOptions | undefined => {
  const { keepJson } = options || {};
  if (typeof window !== 'undefined') {
    return defaultConfig;
  }
  let readFile: Parameters<typeof ts.readConfigFile>[1];
  let fileExists: Parameters<typeof ts.findConfigFile>[1];
  if (ts.sys) {
    readFile = ts.sys.readFile;
    fileExists = ts.sys.fileExists;
  } else {
    //in vscode onliine, ts.sys is undefined
    return defaultConfig;
  }

  const readConfigFile = (configPath: string): any => {
    let config = ts.readConfigFile(configPath, readFile).config;
    if (config.extends) {
      const extendsPath = ts.findConfigFile(
        resolve(dirname(configPath), config.extends),
        fileExists,
      );
      if (extendsPath && extendsPath !== configPath) {
        config = deepMerge<any>(readConfigFile(extendsPath), config);
      }
    }
    return config;
  };
  const ext = filePath.split('.').pop()?.toLowerCase() || 'js';
  if (['ts', 'tsx'].indexOf(ext) !== -1) {
    let config: ts.CompilerOptions = defaultConfig || {};
    const configPath = ts.findConfigFile(dirname(filePath), fileExists);
    if (configPath) {
      const fileConfig = readConfigFile(configPath);
      if (fileConfig?.compilerOptions) {
        config = deepMerge<ts.CompilerOptions>(
          config,
          fileConfig?.compilerOptions,
        );
      }
      if (config.baseUrl) {
        config.baseUrl = resolve(dirname(configPath), config.baseUrl);
      }
    }

    if (keepJson) {
      return config;
    }

    const { options } = ts.convertCompilerOptionsFromJson(config, '.');

    return options;
  }
  return undefined;
};
