import { InlineCodeNode, TextNode, NodeKind } from '../types';

export const inlineCodeNode = (value: string): InlineCodeNode | TextNode =>
  value
    ? ({
        kind: NodeKind.InlineCode,
        value,
      } as InlineCodeNode)
    : ({
        kind: NodeKind.Text,
        value,
      } as TextNode);
