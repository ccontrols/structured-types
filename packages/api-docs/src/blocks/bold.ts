import { DocumentationNode, BoldNode, NodeKind } from '../types';
import { textNode } from './text';

export const boldNode = (value: string | DocumentationNode[]): BoldNode =>
  ({
    kind: NodeKind.Bold,
    children: typeof value === 'string' ? [textNode(value)] : value,
  } as BoldNode);
