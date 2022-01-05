import {
  PropType,
  PropKind,
  isArrayProp,
  UnionProp,
  EnumProp,
  ArrayProp,
  isUnionProp,
  isEnumProp,
  hasGenerics,
} from '@structured-types/api';
import { inlineCodeNode } from '../blocks/inline-code';
import { textNode } from '../blocks/text';
import { DocumentationNode, DocumentationNodeWithChildren } from '../types';
import { DocumentationConfig } from '../DocumentationConfig';
import { getPropValue } from '../utility/prop-value';

export const getGenerics = (
  prop: PropType,
  config: DocumentationConfig,
): DocumentationNode[] => {
  const result: DocumentationNode[] = [];
  if (hasGenerics(prop)) {
    const generics = prop.generics;
    if (generics) {
      result.push(textNode('<'));

      generics.forEach((p, idx) => {
        const propType = shortPropType(p, config, true);
        if (propType) {
          result.push(...propType);
          if (idx < generics.length - 1) {
            result.push(textNode(', '));
          }
        }
      });
      result.push(textNode('>'));
    }
  }
  return result;
};

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
          const result = propType;
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
  useValue?: boolean,
): DocumentationNode[] | undefined => {
  if (typeof prop.type === 'string') {
    const typeLink = config.propLinks.propLink({
      name: prop.type,
      loc: prop.loc,
    });
    const generics = getGenerics(prop, config);
    return [typeLink, ...generics];
  }
  if (isArrayProp(prop) || isUnionProp(prop) || isEnumProp(prop)) {
    return arrayPropNodes(prop, config);
  }
  if (prop.kind) {
    if (useValue) {
      const value = getPropValue(prop);
      if (typeof value === 'string') {
        return [inlineCodeNode(value)];
      }
    }
    return [inlineCodeNode(`${PropKind[prop.kind].toLowerCase()}`)];
  }
  return undefined;
};
