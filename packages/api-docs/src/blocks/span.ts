import { SpanNode, NodeKind, DocumentationNode } from '../types';

export const spanNode = (children: DocumentationNode[]): SpanNode =>
  ({
    kind: NodeKind.Span,
    children,
  } as SpanNode);
