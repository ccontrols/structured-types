import { CodeNode, NodeKind } from '../types';
export const codeNode = (value: string): CodeNode =>
  ({
    kind: NodeKind.Code,
    value,
  } as CodeNode);
