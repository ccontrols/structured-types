import * as ts from 'typescript';
import { getTypescriptConfig } from '@structured-types/typescript-config';
import { dirname } from 'path-browserify';
import { PropTypes, PropType, PropDiagnostic, FunctionProp } from './types';
import {
  tsDefaults,
  DocsOptions,
  ProgramOptions,
  getSymbolDeclaration,
} from './ts-utils';
import { SymbolParser } from './SymbolParser';
import { createHash } from './create-hash';

export * from './jsdoc';
export * from './ts';
export * from './types';
export * from './ts-utils';

const cleanPropParents = (
  prop: FunctionProp,
  propsName: 'properties' | 'parameters' | 'types',
  parents: Record<string, PropType>,
) => {
  if (prop[propsName]) {
    if (prop.parent && parents[prop.parent.name]) {
      delete prop[propsName];
    } else {
      prop[propsName] = consolidateParentProps(
        prop[propsName] as PropType[],
        parents,
      );
    }
  }
};
const consolidateParentProps = (
  props: PropType[],
  parents: Record<string, PropType>,
): PropType[] => {
  return props.map((prop) => {
    const propFn = prop as FunctionProp;
    cleanPropParents(propFn, 'properties', parents);
    cleanPropParents(propFn, 'parameters', parents);
    cleanPropParents(propFn, 'types', parents);
    return propFn;
  });
};

/**
 * API to analyze the given files
 * @example
 * import { analyzeFiles } from '@structured-types/api';
 *
 * const props = analyzeFiles(['index.ts'], {
 *  collectHelpers: true,
 *  collectSourceInfo: true,
 *  tsOptions: {
 *    allowJs: true,
 *  }
 * })
 * @param files list of files to be processed
 * @param options parsing options
 * @param programOptions typescript ts.program and ts.compilerHost
 * @returns the parsed types
 */
export const analyzeFiles = (
  files: string[],
  options: DocsOptions = {},
  programOptions: ProgramOptions = {},
): PropTypes => {
  const {
    tsOptions: userTsOptions,
    scope = 'exports',
    ...parseOptions
  } = options;
  const tsOptions = { ...tsDefaults, ...userTsOptions };
  const {
    extract,
    collectDiagnostics,
    internalTypes,
    collectHelpers,
    moduleCallback,
  } = parseOptions || {};
  const { program: userProgram, host: userHost, hostCallback } = programOptions;
  const host = userHost || ts.createCompilerHost(tsOptions);
  if (hostCallback) {
    hostCallback(host);
  }

  const program = userProgram || ts.createProgram(files, tsOptions, host);
  const defaultLibraryFileName = host.getDefaultLibFileName(tsOptions);

  const defaultLibraryPath = host.getDefaultLibLocation
    ? host.getDefaultLibLocation()
    : dirname(defaultLibraryFileName);
  const equalityComparer = host.useCaseSensitiveFileNames()
    ? (s1: string, s2: string) => s1 === s2
    : (s1: string, s2: string) => s1.toUpperCase() === s2.toUpperCase();

  const isLibraryFile =
    defaultLibraryPath === '/'
      ? program.isSourceFileDefaultLibrary
      : (file: ts.SourceFile, node: ts.Node) => {
          if (file.hasNoDefaultLib) {
            return true;
          }
          if (files.includes(file.fileName)) {
            return false;
          }
          if (typeof parseOptions.isInternal === 'function') {
            const result = parseOptions.isInternal(file, node);
            if (result !== undefined) {
              return result;
            }
          }
          return equalityComparer(dirname(file.fileName), defaultLibraryPath);
        };
  const parser = new SymbolParser(program, isLibraryFile, parseOptions);
  let parsed: PropTypes = {};
  const addSymbol = (symbol?: ts.Symbol): void => {
    if (symbol) {
      const symbolName = symbol.getName();
      if (
        internalTypes?.[symbolName] === undefined &&
        (!extract || extract.includes(symbolName))
      ) {
        const prop = parser.parse(symbol);
        if (prop) {
          parsed[symbolName] = prop;
        }
      }
    }
  };
  for (const fileName of files) {
    const sourceFile = program.getSourceFile(fileName);
    if (sourceFile) {
      if (scope === 'all') {
        ts.forEachChild(sourceFile, (node: ts.Node) => {
          const namedNode = node as ts.ClassDeclaration;
          if (namedNode.name) {
            const symbol = parser.checker.getSymbolAtLocation(namedNode.name);
            addSymbol(symbol);
          } else if (ts.isVariableStatement(node)) {
            node.declarationList.declarations.forEach((d) => {
              if (d.name) {
                const symbol = parser.checker.getSymbolAtLocation(d.name);
                addSymbol(symbol);
              }
            });
          }
        });
      }
      const module = parser.checker.getSymbolAtLocation(sourceFile);
      if (module) {
        const exports = parser.checker
          .getExportsOfModule(module)
          .sort((s1, s2) => {
            // getExportsOfModule returns unsorted exports
            const d1 = getSymbolDeclaration(s1);
            const d2 = getSymbolDeclaration(s2);
            return (
              (d1?.pos || Number.MAX_VALUE) - (d2?.pos || Number.MAX_VALUE)
            );
          });
        exports.forEach((symbol) => addSymbol(symbol));
        if (moduleCallback) {
          moduleCallback(module, parser.checker);
        }
      }
    }
  }
  if (extract?.length) {
    let propKeys = Object.keys(parsed);

    propKeys = propKeys.sort((key1, key2) => {
      return extract.indexOf(key1) - extract.indexOf(key2);
    });
    const sortedProps = propKeys.reduce(
      (acc, key) => ({
        ...acc,
        [key]: parsed[key],
      }),
      {},
    );
    parsed = sortedProps;
  }
  if (collectHelpers) {
    // only return parents that are not already exported from the same file
    const helpers: Record<string, PropType> = Object.keys(parser.helpers)
      .filter((helperName) => {
        const { name, token } = parser.helpers[helperName];

        if (options.collectHelpers && name) {
          const parsedNode = parsed[name];
          return (
            parsedNode === undefined ||
            createHash(name, {
              filePath: parsedNode.loc?.filePath,
              start: parsedNode.loc?.loc?.start,
              end: parsedNode.loc?.loc?.end,
            }) !== token
          );
        }

        return parsed[helperName] === undefined;
      })
      .reduce((acc, name) => ({ ...acc, [name]: parser.helpers[name] }), {});
    if (Object.keys(helpers).length) {
      parsed = Object.keys(parsed).reduce((acc, key) => {
        return {
          ...acc,
          [key]: consolidateParentProps([parsed[key]], helpers)[0],
        };
      }, {});

      parsed.__helpers = Object.keys(helpers).reduce((acc, key) => {
        return {
          ...acc,
          [key]: consolidateParentProps([helpers[key]], helpers)[0],
        };
      }, {});
    }
  }
  if (collectDiagnostics) {
    const allDiagnostics = ts
      .getPreEmitDiagnostics(program)
      .filter(({ file }) => file && files.includes(file.fileName));
    if (allDiagnostics.length) {
      parsed.__diagnostics = allDiagnostics.map(
        ({ category, messageText, file, start }) => {
          const message =
            typeof messageText === 'string'
              ? messageText
              : messageText.messageText;

          const result: PropDiagnostic = {
            category,
            message,
          };
          if (file) {
            result.fileName = file.fileName.split('\\').pop()?.split('/').pop();
            if (typeof start !== 'undefined') {
              const location = file.getLineAndCharacterOfPosition(start);
              result.row = location.line + 1;
              result.column = location.character + 1;
            }
          }
          return result;
        },
      );
    }
  }

  return parsed;
};

/**
 * API to analyze the given files by also loading the local typescript options from tsconfig
 * @example
 * import { parseFiles } from '@structured-types/api';
 *
 * const props = parseFiles(['index.ts'], {
 *  collectHelpers: true,
 *  collectSourceInfo: true,
 * })
 * @param files list of files to be processed
 * @param options parsing options
 * @param programOptions typescript ts.program and ts.compilerHost
 * @returns the parsed types
 */
export const parseFiles = (
  files: string[],
  options: DocsOptions = {},
  programOptions?: ProgramOptions,
): PropTypes => {
  if (!files.length) {
    throw new Error('You need to supply at least one file');
  }
  options.tsOptions = {
    ...tsDefaults,
    ...getTypescriptConfig(files[0], options.tsOptions, {
      host: programOptions?.host,
    }),
  };
  const results = analyzeFiles(files, options, programOptions);
  return results;
};
