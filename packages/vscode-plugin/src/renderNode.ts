import { Node } from './types';

const renderNode = ({
  node,
  ...props
}: {
  node: Node;
  [props: string]: any;
}): string => {
  switch (node.type) {
    case 'heading':
      switch (node.depth) {
        case 1:
          return nodeContent({ node, as: 'h1', ...props });
        case 2:
          return nodeContent({ node, as: 'h2', ...props });
        case 3:
          return nodeContent({ node, as: 'h3', ...props });
        case 4:
          return nodeContent({ node: node, as: 'h4', ...props });
      }
    case 'paragraph':
      return nodeContent({ node: node, as: 'p', ...props });
    case 'strong':
      return nodeContent({ node, as: 'b', ...props });
    case 'emphasis':
      return nodeContent({ node, as: 'em', ...props });
    case 'link':
      return nodeContent({ node, as: 'a', href: node.url, ...props });
    case 'inlineCode':
      return nodeContent({ node: node, as: 'code', ...props });
    case 'code':
      return nodeContent({ node, as: 'pre', ...props });

    case 'text':
      return node.value || '';
    case 'tableCell':
      return nodeContent({ node, as: 'vscode-data-grid-cell', ...props });
    case 'tableRow':
      return nodeContent({ node, as: 'vscode-data-grid-row', ...props });
    case 'table':
      const table = node.children
        ? `
        <vscode-data-grid>
          <vscode-data-grid-row row-type="header">
            ${node.children[0].children
              ?.map((cell, index) =>
                nodeContent({
                  node: cell,
                  'grid-column': index + 1,
                  'cell-type': 'columnheader',
                  as: 'vscode-data-grid-cell',
                }),
              )
              .join('')}
          </vscode-data-grid-row>
          ${node.children
            .slice(1)
            .map(
              (row) => `
            <vscode-data-grid-row >
              ${row.children
                ?.map((cell, index) =>
                  nodeContent({
                    node: cell,
                    'grid-column': index + 1,
                    as: 'vscode-data-grid-cell',
                  }),
                )
                .join('')}
            </vscode-data-grid-row>
            `,
            )
            .join('')}
        </vscode-data-grid>
        `
        : '';
      return table;
    default:
      debugger;
      return '';
  }
};

const propToStr = (prop: string): string => {
  switch (typeof prop) {
    case 'string':
      return `"${prop}""`;
    case 'number':
      return `${prop}`;
    default:
      return `${prop}`;
  }
};

const propsToAttrs = (props: Record<string, any>): string => {
  return Object.keys(props)
    .map((key) => `${key}=${propToStr(props[key])}`)
    .join(' ');
};
const nodeContent = ({
  node,
  as,
  ...rest
}: {
  node: Node;
  as: string;
  [props: string]: any;
}): string => {
  const value = node.value
    ? `<${as} ${propsToAttrs(rest)}>${node.value}</${as}>`
    : node.children
    ? nodeComponents({ nodes: node.children, as, ...rest })
    : '';
  return value;
};
const nodeComponents = ({
  nodes,
  as,
  ...rest
}: {
  nodes?: Node[];
  as: string;
  [props: string]: any;
}): string => {
  return nodes
    ? `<${as} ${propsToAttrs(rest)}>
      ${nodes.map((node) => renderNode({ node })).join('')}
    </${as}>`
    : '';
};

export const renderNodes = (nodes: Node[]): string => {
  const rendered = `
  <main>
    ${nodes
      .map((node) => {
        const rendered = renderNode({ node });
        return rendered;
      })
      .join('')}
  </main>
`;
  return rendered;
};
