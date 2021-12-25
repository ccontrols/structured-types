import { PropType } from '@structured-types/api';
import {
  DocumentationNode,
  NodeKind,
  TableNode,
  TableRowNode,
  ColumnName,
  ColumnObject,
  ColumnConfig,
} from '../types';
import { textNode } from './text';
import { tableCellNode } from './table-cell';
import { inlineCodeNode } from './inline-code';

export type PropItem = Record<
  ColumnName,
  DocumentationNode[] | undefined | string
> & { prop: PropType };

export type VisibleColumns = Record<ColumnName, boolean>;

export const createPropsRow = (
  { name, type, default: defaultValue, parents, description, prop }: PropItem,
  columnOptions: ColumnObject,
  visColumns: VisibleColumns,
): TableRowNode => {
  const getCell = (
    column: ColumnName,
  ): DocumentationNode[] | string | undefined => {
    switch (column) {
      case 'name':
        return name;
      case 'type':
        return type;
      case 'default':
        return [
          inlineCodeNode(
            typeof defaultValue !== 'undefined' ? defaultValue.toString() : '',
          ),
        ];
      case 'description':
        if (typeof description === 'string') {
          const parts = description.split('`');
          if (parts.length > 1) {
            return parts.reduce((acc: DocumentationNode[], text, idx) => {
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
            }, []);
          } else {
            return [textNode(description)];
          }
        } else {
          return [textNode('')];
        }

      case 'parents':
        return parents;
      default:
        return undefined;
    }
  };
  const children: DocumentationNode[] = [];
  Object.keys(columnOptions).forEach((key) => {
    const name = key as ColumnName;
    const column = columnOptions[name];
    if (column && visColumns[name]) {
      let cell: DocumentationNode[] | DocumentationNode | undefined = undefined;
      if (typeof column.render === 'function') {
        cell = column.render(name, prop);
      }
      if (!cell) {
        const content = getCell(name);
        cell =
          typeof content === 'string'
            ? textNode(content)
            : content
            ? content
            : textNode('');
      }
      if (cell) {
        if (Array.isArray(cell)) {
          children.push(tableCellNode(cell));
        } else {
          children.push(tableCellNode([cell]));
        }
      }
    }
  });

  return {
    kind: NodeKind.TableRow,
    children,
  } as TableRowNode;
};

export const createPropsTable = (
  children: PropItem[],
  columnOptions: ColumnObject,
  prop: PropType,
): {
  propsTable: DocumentationNode[];
  table?: TableNode;
  visibleColumns: VisibleColumns;
} => {
  const propsTable: DocumentationNode[] = [];
  let table: TableNode | undefined = undefined;
  const visibleColumns: Record<ColumnName, boolean> = {
    name: false,
    default: false,
    description: false,
    parents: false,
    type: true,
  };
  const getTitle = (
    config: ColumnConfig,
    prop: PropType,
  ): DocumentationNode => {
    let value = '';
    const { title } = config;
    if (title) {
      value = (typeof title === 'function' ? title(prop) : title) || '';
    }
    return tableCellNode([textNode(value)]);
  };
  if (children) {
    const columns: DocumentationNode[] = [];
    Object.keys(columnOptions).forEach((key) => {
      const name = key as ColumnName;
      const column = columnOptions[name];
      if (column && !column.hidden) {
        visibleColumns[name] = children.some(
          (item) => item[name] !== undefined,
        );
        if (visibleColumns[name]) {
          columns.push(getTitle(column, prop));
        }
      }
    });
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
    table.children?.push(
      ...children.map((child: PropItem) =>
        createPropsRow(child, columnOptions, visibleColumns),
      ),
    );
  }
  return { propsTable: propsTable, table, visibleColumns };
};
