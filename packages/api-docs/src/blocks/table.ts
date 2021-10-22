import {
  boldNode,
  DocumentationNode,
  inlineCodeNode,
  NodeKind,
  tableCellNode,
  TableNode,
  TableRowNode,
  textNode,
} from '../types';

export interface PropItem {
  name?: string;
  isOptional: boolean;
  type?: DocumentationNode[];
  value?: any;
  parent?: DocumentationNode[];
  description?: string;
}

export type VisibleColumns = {
  names?: boolean;
  types?: boolean;
  parents?: boolean;
  values?: boolean;
  descriptions?: boolean;
};
export const createPropsRow = (
  { name, isOptional, type, value, parent, description }: PropItem,
  visColumns: VisibleColumns,
): TableRowNode => {
  const children: DocumentationNode[] = [
    tableCellNode(
      name ? [inlineCodeNode(`${name}${isOptional ? '' : '*'}`)] : [],
    ),
    tableCellNode(type || []),
  ];
  if (visColumns.parents) {
    children.push(tableCellNode(parent || []));
  }
  if (visColumns.values) {
    children.push(
      tableCellNode([
        inlineCodeNode(typeof value !== 'undefined' ? value.toString() : ''),
      ]),
    );
  }

  if (visColumns.descriptions) {
    if (description) {
      const parts = description.split('`');
      if (parts.length > 1) {
        children.push(
          tableCellNode(
            parts.reduce((acc: DocumentationNode[], text, idx) => {
              if (idx % 2 === 0) {
                return [...acc, textNode(text)];
              } else {
                return [
                  ...acc,
                  textNode(' '),
                  inlineCodeNode(text),
                  textNode(' '),
                ];
              }
            }, []),
          ),
        );
      } else {
        children.push(tableCellNode([textNode(description)]));
      }
    } else {
      children.push(tableCellNode([textNode('')]));
    }
  }
  return {
    kind: NodeKind.TableRow,
    children,
  } as TableRowNode;
};

export const createPropsTable = (
  children: PropItem[],
  title?: string,
): {
  propsTable: DocumentationNode[];
  table?: TableNode;
  visibleColumns: VisibleColumns;
} => {
  const propsTable: DocumentationNode[] = [];
  let table: TableNode | undefined = undefined;
  const visibleColumns: VisibleColumns = {};
  if (children) {
    if (title) {
      propsTable.push(boldNode([textNode(title)]));
    }
    const columns: DocumentationNode[] = [];
    visibleColumns.names = children.some((item) => item.name !== undefined);
    if (visibleColumns.names) {
      columns.push(tableCellNode([textNode('Name')]));
    }
    visibleColumns.types = children.some((item) => item.type !== undefined);
    if (visibleColumns.types) {
      columns.push(tableCellNode([textNode('Type')]));
    }

    visibleColumns.parents = children.some((item) => item.parent !== undefined);
    if (visibleColumns.parents) {
      columns.push(tableCellNode([textNode('Parent')]));
    }
    visibleColumns.values = children.some((item) => item.value !== undefined);
    if (visibleColumns.values) {
      columns.push(tableCellNode([textNode('Value')]));
    }
    visibleColumns.descriptions = children.some((item) => item.description);
    if (visibleColumns.descriptions) {
      columns.push(tableCellNode([textNode('Description')]));
    }
    table = {
      kind: NodeKind.Table,
      children: [
        {
          kind: NodeKind.TableRow,
          children: columns,
        } as TableRowNode,
      ],
    };
    propsTable.push(table);
    // eslint-disable-next-line prefer-spread
    table.children?.push(
      ...children.map((child: PropItem) =>
        createPropsRow(child, visibleColumns),
      ),
    );
  }
  return { propsTable, table, visibleColumns };
};
