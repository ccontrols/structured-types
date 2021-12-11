import { PropType, PropKind, isArrayProp } from '@structured-types/api';
import { DocumentationNode } from '../types';
import { DocumentationConfig } from '../DocumentationConfig';
import { inlineCodeNode } from '../blocks/inline-code';
import { arrayPropNodes } from './array-prop';
import { blockNode } from '../blocks/block';

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
  if (isArrayProp(prop)) {
    return blockNode(arrayPropNodes(prop, config));
  }
  if (prop.kind) {
    return inlineCodeNode(`${PropKind[prop.kind].toLowerCase()}`);
  }
  return undefined;
};
