import { BlockNode, NodeKind, DocumentationNode } from '../types';

export const blockNode = (children: DocumentationNode[]): BlockNode =>
  ({
    kind: NodeKind.Block,
    children,
  } as BlockNode);
