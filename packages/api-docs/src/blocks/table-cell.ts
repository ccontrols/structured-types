import { DocumentationNode, TableCellNode, NodeKind } from '../types';
import { textNode } from './text';

export const tableCellNode = (
  value: string | DocumentationNode[],
): TableCellNode =>
  ({
    kind: NodeKind.TableCell,
    children: typeof value === 'string' ? [textNode(value)] : value,
  } as TableCellNode);
