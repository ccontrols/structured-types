/* eslint-disable prefer-spread */
import path from 'path';
import fs from 'fs';
import { Node } from '../common/types';
import { extractCustomTag, inlineNewContent } from '../common/utils';
import { ExtractProps } from './extract-tsdoc';

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
            const extractProps = new ExtractProps(files);
            const options = attributes.reduce((acc, attr) => {
              let value;
              const strValue = attr[1];
              if (strValue === 'true') {
                value = true;
              } else if (strValue === 'false') {
                value = false;
              } else if (!isNaN(parseFloat(strValue))) {
                value = parseFloat(strValue);
              } else if (typeof attr[1] === 'string') {
                value = splitCommaAttribute(attributes, attr[0]);
              }
              return { ...acc, [attr[0]]: value };
            }, {});
            const tsNodes = extractProps.extract(options);
            newNodes.push(...tsNodes);
          }
          inlineNewContent(attrs, newNodes);
        }
      });
    }
  };
};
