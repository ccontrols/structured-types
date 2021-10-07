import { Node, NodeChildren } from '../common/types';

export interface PropItem {
  name: string;
  isOptional: boolean;
  type: Node[];
  value?: any;
  description: string;
}

export const createPropsRow = (
  { name, isOptional, type, value, description }: PropItem,
  hasValues: boolean,
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
      children: type,
    },
  ];
  if (hasValues) {
    children.push({
      type: 'tableCell',
      children: [
        {
          type: 'text',
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
): { propsTable: Node[]; table?: NodeChildren; hasValues: boolean } => {
  const propsTable: Node[] = [];
  let table: NodeChildren | undefined = undefined;
  let hasValues = false;
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
    const columns: Node[] = [
      { type: 'tableCell', children: [{ type: 'text', value: 'Name' }] },
      { type: 'tableCell', children: [{ type: 'text', value: 'Type' }] },
    ];
    hasValues = children.some((item) => item.value !== undefined);
    if (hasValues) {
      columns.push({
        type: 'tableCell',
        children: [{ type: 'text', value: 'Value' }],
      });
    }
    columns.push({
      type: 'tableCell',
      children: [{ type: 'text', value: 'Description' }],
    });
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
      ...children.map((child: PropItem) => createPropsRow(child, hasValues)),
    );
  }
  return { propsTable, table, hasValues };
};
