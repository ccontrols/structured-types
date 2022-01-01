/* eslint-disable prefer-spread */
import path from 'path';
import fs from 'fs';
import {
  apiDocsConfig,
  DocumentationOptions,
  mergeConfig,
} from '@structured-types/api-docs';
import { RemarkNode } from '../types';
import { extractCustomTag, inlineNewContent } from '../utils';
import { extractProps } from './extract-props';

export const insertAPISection =
  (fileName: string, configFileName?: string) =>
  (): ((node: RemarkNode) => void) => {
    const resolve = (file: string, filePath: string): string => {
      if (file.startsWith('.')) {
        return path.resolve(path.dirname(path.resolve(filePath)), file);
      }
      return require.resolve(file);
    };

    const splitCommaAttribute = (
      attributes: string[][],
      name: string,
    ): string[] | undefined => {
      if (attributes) {
        const attribute = attributes.find((attribute) => attribute[0] === name);
        return attribute
          ? attribute[1]
              .split(',')
              .map((f) => f.trim())
              .filter((f) => f)
          : undefined;
      }
      return undefined;
    };
    return async (node: RemarkNode): Promise<void> => {
      const sections = extractCustomTag(node, 'api-readme');
      if (sections) {
        for (const section of sections) {
          const { attrs, attributes = [] } = section;
          if (attributes) {
            const newNodes: RemarkNode[] = [];

            let elementId: string | undefined = undefined;
            const inlineOptions = attributes.reduce(
              (acc, attr) => {
                let value;
                const strValue = attr[1];
                if (strValue === 'true') {
                  value = true;
                } else if (strValue === 'false') {
                  value = false;
                } else if (!isNaN(parseFloat(strValue))) {
                  value = parseFloat(strValue);
                } else if (typeof attr[1] === 'string') {
                  if (attr[0] === 'id') {
                    elementId = attr[1];
                    return acc;
                  }
                  value = splitCommaAttribute(attributes, attr[0]);
                }
                return { ...acc, [attr[0]]: value };
              },
              { files: [] },
            ) as DocumentationOptions & { files: string[] };
            let mergedConfig: DocumentationOptions;
            let config: Partial<Awaited<ReturnType<typeof apiDocsConfig>>>;
            if (configFileName !== 'none') {
              config = await apiDocsConfig(fileName, configFileName, {
                elementId,
              });

              mergedConfig = mergeConfig(config?.config, inlineOptions);
            } else {
              mergedConfig = inlineOptions;
              config = {};
            }
            const files =
              config && config.config?.files
                ? config.config.files.map((f: string) =>
                    config?.filepath ? resolve(f, config?.filepath) : f,
                  )
                : inlineOptions.files?.map((f) => resolve(f, fileName));

            if (!files.length) {
              const srcFolder = resolve('./src', fileName);
              if (fs.existsSync(srcFolder)) {
                const sourceFiles = fs.readdirSync(srcFolder);
                const indexFile = sourceFiles.find((f) =>
                  f.startsWith('index'),
                );
                if (indexFile) {
                  files.push(
                    resolve(path.resolve(srcFolder, indexFile), fileName),
                  );
                }
              }
            }
            const tsNodes = await extractProps(files, mergedConfig);
            newNodes.push(...tsNodes);
            inlineNewContent(attrs, newNodes);
          }
        }
      }
    };
  };
