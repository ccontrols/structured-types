import { PropType } from '@structured-types/api';
import { DocumentationNode, NodeKind } from '../types';
import { paragraphNode } from '../blocks/paragraph';

export const descriptionSection = (
  prop: PropType,
): DocumentationNode[] | undefined => {
  return prop.description
    ? [
        paragraphNode(
          prop.description.split('\n').map((d) => ({
            kind: NodeKind.Text,
            value: d,
          })),
        ),
      ]
    : undefined;
};
