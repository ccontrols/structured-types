import { TextNode, NodeKind } from '../types';

export const textNode = (value: string): TextNode =>
  ({ kind: NodeKind.Text, value } as TextNode);
