import { InlineCodeNode, NodeKind } from '../types';

export const inlineCodeNode = (value: string): InlineCodeNode =>
  ({
    kind: NodeKind.InlineCode,
    value,
  } as InlineCodeNode);
