import { Node, NodeChildren } from '../common/types';

export interface PropItem {
  name?: string;
  isOptional: boolean;
  type?: Node[];
  value?: any;
  parent?: Node[];
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
): NodeChildren => {
  const children: Node[] = [
    {
      type: 'tableCell',
      children: name
        ? [
            {
              type: 'inlineCode',
              value: `${name}${isOptional ? '' : '*'}`,
            },
          ]
        : [],
    },
    {
      type: 'tableCell',
      children: type || [],
    },
  ];
  if (visColumns.parents) {
    children.push({
      type: 'tableCell',
      children: parent || [],
    });
  }
  if (visColumns.values) {
    children.push({
      type: 'tableCell',
      children: [
        {
          type: 'inlineCode',
          value: typeof value !== 'undefined' ? value.toString() : '',
        },
      ],
    });
  }

  if (description) {
    const parts = description.split('`');
    if (parts.length > 1) {
      children.push({
        type: 'tableCell',
        children: parts.reduce((acc: Node[], text, idx) => {
          if (idx % 2 === 0) {
            return [...acc, { type: 'text', value: text }];
          } else {
            return [
              ...acc,
              { type: 'text', value: ' ' },
              { type: 'inlineCode', value: text },
              { type: 'text', value: ' ' },
            ];
          }
        }, []),
      });
    } else {
      children.push({
        type: 'tableCell',
        children: [{ type: 'text', value: description }],
      });
    }
  } else {
    children.push({
      type: 'tableCell',
      children: [{ type: 'text', value: '' }],
    });
  }
  return {
    type: 'tableRow',
    children,
  };
};

export const createPropsTable = (
  children: PropItem[],
  title?: string,
): {
  propsTable: Node[];
  table?: NodeChildren;
  visibleColumns: VisibleColumns;
} => {
  const propsTable: Node[] = [];
  let table: NodeChildren | undefined = undefined;
  const visibleColumns: VisibleColumns = {};
  if (children) {
    if (title) {
      propsTable.push({
        type: 'paragraph',
        children: [
          {
            type: 'heading',
            depth: 3,
            children: [
              {
                type: 'strong',
                children: [
                  {
                    type: 'text',
                    value: title,
                  },
                ],
              },
            ],
          },
        ],
      });
    }
    const columns: Node[] = [];
    visibleColumns.names = children.some((item) => item.name !== undefined);
    if (visibleColumns.names) {
      columns.push({
        type: 'tableCell',
        children: [{ type: 'text', value: 'Name' }],
      });
    }
    visibleColumns.types = children.some((item) => item.type !== undefined);
    if (visibleColumns.types) {
      columns.push({
        type: 'tableCell',
        children: [{ type: 'text', value: 'Type' }],
      });
    }

    visibleColumns.parents = children.some((item) => item.parent !== undefined);
    if (visibleColumns.parents) {
      columns.push({
        type: 'tableCell',
        children: [{ type: 'text', value: 'Parent' }],
      });
    }
    visibleColumns.values = children.some((item) => item.value !== undefined);
    if (visibleColumns.values) {
      columns.push({
        type: 'tableCell',
        children: [{ type: 'text', value: 'Value' }],
      });
    }
    visibleColumns.descriptions = children.some(
      (item) => item.description !== undefined,
    );
    if (visibleColumns.descriptions) {
      columns.push({
        type: 'tableCell',
        children: [{ type: 'text', value: 'Description' }],
      });
    }
    table = {
      type: 'table',
      children: [
        {
          type: 'tableRow',
          children: columns,
        },
      ],
    };
    propsTable.push({
      type: 'paragraph',
      children: [table],
    });
    // eslint-disable-next-line prefer-spread
    table.children.push(
      ...children.map((child: PropItem) =>
        createPropsRow(child, visibleColumns),
      ),
    );
  }
  return { propsTable, table, visibleColumns };
};
