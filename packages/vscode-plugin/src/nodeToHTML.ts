import {
  DocumentationNode,
  isBoldNode,
  isCodeNode,
  isHeadingNode,
  isInlineCodeNode,
  isItalicNode,
  isLinkNode,
  isParagraphNode,
  isTableCellNode,
  isTableNode,
  isTableRowNode,
  isTextNode,
  isNodeWithChildren,
  isNodeWithValue,
} from '@structured-types/api-docs';

const renderNode = ({
  node,
  ...props
}: {
  node: DocumentationNode;
  [props: string]: any;
}): string => {
  if (isHeadingNode(node)) {
    switch (node.depth) {
      case 1:
        return nodeContent({ node, as: 'h1', ...props });
      case 2:
        return nodeContent({ node, as: 'h2', ...props });
      case 3:
        return nodeContent({ node, as: 'h3', ...props });
      case 4:
        return nodeContent({ node, as: 'h4', ...props });
    }
  } else if (isParagraphNode(node)) {
    return nodeContent({ node, as: 'p', ...props });
  } else if (isBoldNode(node)) {
    return nodeContent({ node, as: 'b', ...props });
  } else if (isItalicNode(node)) {
    return nodeContent({ node, as: 'em', ...props });
  } else if (isLinkNode(node)) {
    return nodeContent({ node, as: 'a', href: node.url, ...props });
  } else if (isInlineCodeNode(node)) {
    return nodeContent({ node, as: 'code', ...props });
  } else if (isCodeNode(node)) {
    return nodeContent({ node, as: 'pre', ...props });
  } else if (isTextNode(node)) {
    return node.value || '';
  } else if (isTableCellNode(node)) {
    return nodeContent({ node, as: 'vscode-data-grid-cell', ...props });
  } else if (isTableRowNode(node)) {
    return nodeContent({ node, as: 'vscode-data-grid-row', ...props });
  } else if (isTableNode(node)) {
    const table = node.children
      ? `
        <vscode-data-grid>
          <vscode-data-grid-row row-type="header">
            ${node.children[0].children
              ?.map((cell, index) =>
                nodeContent({
                  node: cell,
                  'grid-column': (index + 1).toString(),
                  'cell-type': 'columnheader',
                  as: 'vscode-data-grid-cell',
                }),
              )
              .join('\n')}
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
                    'grid-column': (index + 1).toString(),
                    as: 'vscode-data-grid-cell',
                  }),
                )
                .join('\n')}
            </vscode-data-grid-row>
            `,
            )
            .join('\n')}
        </vscode-data-grid>
        `
      : '';
    return table;
  }
  debugger;
  return '';
};

const valueToStr = (value: any): string => {
  switch (typeof value) {
    case 'string':
      return `"${value}""`;
    case 'number':
      return `${value}`;
    default:
      return `${value}`;
  }
};

const propsToAttrs = (props: Record<string, any>): string => {
  return Object.keys(props)
    .map((key) => `${key}=${valueToStr(props[key])}`)
    .join(' ');
};
const nodeContent = ({
  node,
  as,
  ...rest
}: {
  node: DocumentationNode;
  as: string;
  [props: string]: any;
}): string => {
  const value = isNodeWithChildren(node)
    ? nodeComponents({ nodes: node.children, as, ...rest })
    : isNodeWithValue(node)
    ? `<${as} ${propsToAttrs(rest)}>${node.value}</${as}>`
    : '';
  return value;
};
const nodeComponents = ({
  nodes,
  as,
  ...rest
}: {
  nodes?: DocumentationNode[];
  as: string;
  [props: string]: any;
}): string => {
  return nodes
    ? `<${as} ${propsToAttrs(rest)}>
      ${nodes.map((node) => renderNode({ node })).join('\n')}
    </${as}>`
    : '';
};

export const nodesToHTML = (nodes: DocumentationNode[]): string => {
  const rendered = `
  <main>
    ${nodes
      .map((node) => {
        const rendered = renderNode({ node });
        return rendered;
      })
      .join('\n')}
  </main>
`;
  return rendered;
};
