import { DocumentationNode, CollapsibleNode, NodeKind } from '../types';

export const collapsibleNode = (
  children: DocumentationNode[],
  summary: DocumentationNode[],
): CollapsibleNode =>
  ({
    kind: NodeKind.Collapsible,
    summary,
    children,
  } as CollapsibleNode);
