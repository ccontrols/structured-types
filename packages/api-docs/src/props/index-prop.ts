import { IndexProp } from '@structured-types/api';
import { textNode } from '../blocks/text';
import { DocumentationNode } from '../types';
import { DocumentationConfig } from '../DocumentationConfig';
import { shortPropType } from './short-prop-type';
import { blockNode } from '../blocks/block';

export const indexPropNodes = (
  prop: IndexProp,
  config: DocumentationConfig,
): DocumentationNode[] => {
  const propType = shortPropType(prop.index, config);
  const result: DocumentationNode[] = [];
  if (propType) {
    result.push(textNode('['), ...propType, textNode(']'));
  }
  if (prop.prop) {
    result.push(textNode(': '));
    result.push(...config.propTypes.extractType(prop.prop));
  }
  return [blockNode(result)];
};
