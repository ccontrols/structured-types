import { DocumentationNode, ParagraphNode, NodeKind } from '../types';
import { textNode } from './text';

export const paragraphNode = (
  value: string | DocumentationNode[],
): ParagraphNode =>
  ({
    kind: NodeKind.Paragraph,
    children: typeof value === 'string' ? [textNode(value)] : value,
  } as ParagraphNode);
