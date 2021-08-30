/* eslint-disable prefer-spread */
import path from 'path';
import fs from 'fs';
import { Node } from '../common/types';
import { extractCustomTag, inlineNewContent } from '../common/utils';
import { extractTSDoc } from './extract-tsdoc';

export const insertTSDoc = (fileName: string) => (): ((node: Node) => void) => {
  const resolve = (file: string): string => {
    if (file.startsWith('.')) {
      return path.resolve(path.dirname(path.resolve(fileName)), file);
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
  return (node: Node): void => {
    const sections = extractCustomTag(node, 'api-readme');
    if (sections) {
      sections.forEach(({ attrs, attributes = [] }) => {
        if (attributes) {
          const newNodes: Node[] = [];
          const files =
            splitCommaAttribute(attributes, 'files')?.map((f) => resolve(f)) ||
            [];

          if (!files.length) {
            const srcFolder = resolve('./src');
            if (fs.existsSync(srcFolder)) {
              const sourceFiles = fs.readdirSync(srcFolder);
              const indexFile = sourceFiles.find((f) => f.startsWith('index'));
              if (indexFile) {
                files.push(resolve(path.resolve(srcFolder, indexFile)));
              }
            }
          }
          if (files.length) {
            const tsNodes = extractTSDoc(
              files,
              splitCommaAttribute(attributes, 'extract'),
            );
            if (tsNodes) {
              newNodes.push(...tsNodes);
            }
            // console.log(tsdocs);
          }
          inlineNewContent(attrs, newNodes);
        }
      });
    }
  };
};
