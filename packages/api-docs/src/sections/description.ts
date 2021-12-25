import { PropType } from '@structured-types/api';
import { DocumentationNode } from '../types';
import { paragraphNode } from '../blocks/paragraph';

export const descriptionSection = (
  prop: PropType,
): DocumentationNode[] | undefined => {
  return prop.description
    ? [paragraphNode(prop.description.split('\n').join(' '))]
    : undefined;
};
