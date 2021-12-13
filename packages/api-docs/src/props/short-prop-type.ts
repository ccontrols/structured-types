import {
  PropType,
  PropKind,
  isArrayProp,
  UnionProp,
  EnumProp,
  ArrayProp,
  isUnionProp,
  isEnumProp,
} from '@structured-types/api';
import { inlineCodeNode } from '../blocks/inline-code';
import { blockNode } from '../blocks/block';
import { textNode } from '../blocks/text';
import { DocumentationNode, DocumentationNodeWithChildren } from '../types';
import { DocumentationConfig } from '../DocumentationConfig';

export const arrayPropNodes = (
  prop: UnionProp | EnumProp | ArrayProp,
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
    if (isArrayProp(prop)) {
      elements.push(textNode('[]') as unknown as DocumentationNodeWithChildren);
    }
    return elements;
  }
  return [];
};

export const shortPropType = (
  prop: PropType,
  config: DocumentationConfig,
): DocumentationNode | undefined => {
  if (typeof prop.type === 'string') {
    return config.propLinks.propLink({
      name: prop.type,
      loc: prop.loc,
    });
  }
  if (isArrayProp(prop) || isUnionProp(prop) || isEnumProp(prop)) {
    return blockNode(arrayPropNodes(prop, config));
  }
  if (prop.kind) {
    return inlineCodeNode(`${PropKind[prop.kind].toLowerCase()}`);
  }
  return undefined;
};
