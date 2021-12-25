import deepmerge from 'deepmerge';
import * as ts from 'typescript';
import { PropType, JSDocInfoType } from '../types';
import { ISymbolParser, ParseOptions } from '../ts-utils';
import {
  parseJSDocTags,
  tagCommentToString,
  cleanJSDocText,
} from './parseJSDocTags';

const mergeProps = (prop: PropType, parsed: PropType) => {
  return deepmerge<PropType>(prop, parsed, {
    clone: false,
    arrayMerge: (dest: any[], src: any[]) => {
      const result =
        dest.length > 0
          ? dest.map((s, idx) => {
              if (idx < src.length) {
                const merged = mergeProps(s, src[idx]);
                Object.assign(s, merged);
              }
              return s;
            })
          : dest;
      return result;
    },
  });
};
export const mergeJSDoc = (
  parser: ISymbolParser,
  prop: PropType,
  options: ParseOptions,
  node?: ts.Node,
): PropType => {
  const parsed = parseJSDocTags(parser, options, node);
  if (parsed) {
    return mergeProps(prop, parsed);
  }
  return prop;
};

export const mergeNodeComments = (
  parser: ISymbolParser,
  prop: PropType,
  options: ParseOptions,
  node?: ts.Node,
): PropType | null => {
  if (node) {
    //jsdoc comments at the symbol level are mangled for overloaded methods
    // example getters/setters and index properties
    // so first try if jsdoc comments are already chached.
    const { jsDoc } = node as unknown as {
      jsDoc: JSDocInfoType[];
    };
    if (jsDoc) {
      const description = jsDoc
        .map(({ comment }) => tagCommentToString(comment))
        .join('');
      if (description) {
        prop.description = description;
      }
    } else {
      const symbol =
        'name' in node
          ? parser.checker.getSymbolAtLocation(node['name'])
          : 'symbol' in node
          ? node['symbol']
          : undefined;
      if (symbol) {
        const description = cleanJSDocText(
          symbol
            .getDocumentationComment(parser.checker)
            .map(({ text }) => text)
            .join(''),
        );
        if (description && !prop.description) {
          prop.description = description;
        }
      }
    }
    const merged = mergeJSDoc(parser, prop, options, node);
    Object.assign(prop, merged);
  }
  return prop;
};
