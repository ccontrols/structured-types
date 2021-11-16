import { PropType, UnionProp, EnumProp } from '@structured-types/api/types';
import { textNode } from '../blocks/text';
import { DocumentationNode } from '../types';
import { shortPropType } from './short-prop-type';
import { DocumentationConfig } from '../DocumentationConfig';

export const tuplePropNodes = (
  prop: UnionProp | EnumProp,
  config: DocumentationConfig,
): DocumentationNode[] => {
  const properties = prop.properties;
  if (properties) {
    const nodes = [
      textNode('['),
      ...properties.reduce(
        (acc: DocumentationNode[], p: PropType, idx: number) => {
          const propType = shortPropType(p, config);
          if (propType) {
            const result = [propType];
            if (idx < properties.length - 1) {
              result.push(textNode(', '));
            }
            return [...acc, ...result];
          }
          return acc;
        },
        [],
      ),
      textNode(']'),
    ];
    return nodes;
  }
  return [];
};
