import { DocumentationNode, HeadingNode, NodeKind } from '../types';
import { textNode } from './text';

export const headingNode = (
  value: string | DocumentationNode[],
  depth: number,
): HeadingNode =>
  ({
    kind: NodeKind.Heading,
    depth,
    children: typeof value === 'string' ? [textNode(value)] : value,
  } as HeadingNode);
