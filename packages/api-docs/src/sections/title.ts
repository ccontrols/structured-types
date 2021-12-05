import { PropType } from '@structured-types/api';
import { DocumentationNode } from '../types';
import { headingNode } from '../blocks/heading';

export const titleSection = (
  prop: PropType,
): DocumentationNode[] | undefined => {
  return prop.name ? [headingNode(prop.name, 2)] : undefined;
};
