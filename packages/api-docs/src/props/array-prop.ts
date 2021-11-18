import { PropType, UnionProp, EnumProp } from '@structured-types/api/types';
import { textNode } from '../blocks/text';
import { DocumentationNode, DocumentationNodeWithChildren } from '../types';
import { shortPropType } from './short-prop-type';
import { DocumentationConfig } from '../DocumentationConfig';

export const arrayPropNodes = (
  prop: UnionProp | EnumProp,
  config: DocumentationConfig,
): DocumentationNode[] => {
  const properties = prop.properties;
  if (properties) {
    const elements = properties.reduce(
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
    ) as DocumentationNodeWithChildren[];

    const multiProps = elements.length > 1;
    if (multiProps) {
      elements.splice(
        0,
        0,
        textNode('(') as unknown as DocumentationNodeWithChildren,
      );
      elements.push(textNode(')') as unknown as DocumentationNodeWithChildren);
    }
    elements.push(textNode('[]') as unknown as DocumentationNodeWithChildren);
    return elements;
  }
  return [];
};
