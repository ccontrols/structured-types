import { DocumentationNode, EmphasisNode, NodeKind } from '../types';
import { textNode } from './text';
export const emphasisNode = (
  value: string | DocumentationNode[],
): EmphasisNode =>
  ({
    kind: NodeKind.Emphasis,
    children: typeof value === 'string' ? [textNode(value)] : value,
  } as EmphasisNode);
