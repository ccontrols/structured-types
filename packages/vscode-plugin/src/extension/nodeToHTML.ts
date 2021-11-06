import {
  DocumentationNode,
  isBoldNode,
  isCodeNode,
  isHeadingNode,
  isInlineCodeNode,
  isEmphasisNode,
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
  } else if (isEmphasisNode(node)) {
    return nodeContent({ node, as: 'em', ...props });
  } else if (isLinkNode(node)) {
    const link = nodeContent({
      node,
      as: 'a',
      href: node.loc
        ? '#'
        : node.url
        ? encodeURIComponent(node.url)
        : undefined,
      'data-filepath': node.loc?.filePath
        ? encodeURIComponent(node.loc.filePath)
        : undefined,
      'data-loc': node.loc?.loc
        ? encodeURIComponent(JSON.stringify(node.loc.loc))
        : undefined,
      ...props,
    });
    return link;
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
        <vscode-data-grid grid-template-columns="${node.children[0].children
          .map(() => '1fr')
          .join(' ')}">
          <vscode-data-grid-row row-type="header">
            ${node.children[0].children
              ?.map((cell, index) =>
                renderNode({
                  node: cell,
                  'grid-column': (index + 1).toString(),
                  'cell-type': 'columnheader',
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
                  renderNode({
                    node: cell,
                    'grid-column': (index + 1).toString(),
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
      return `"${value}"`;
    case 'number':
      return `${value}`;
    default:
      return `${value}`;
  }
};

const propsToAttrs = (props: Record<string, any>): string => {
  return Object.keys(props)
    .map((key) =>
      props[key] !== undefined ? `${key}=${valueToStr(props[key])}` : undefined,
    )
    .filter((k) => k)
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
    ? `<${as} ${propsToAttrs(rest)}>${encodeURIComponent(node.value)}</${as}>`
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
  if (!Array.isArray(nodes)) {
    debugger;
  }
  return nodes
    ? `<${as} ${propsToAttrs(rest)}>${nodes
        .map((node) => renderNode({ node }))
        .join('\n')}</${as}>`
    : '';
};

export const nodesToHTML = (nodes: DocumentationNode[]): string => {
  try {
    const rendered = `
  <section>
    ${nodes
      .map((node) => {
        const rendered = renderNode({ node });
        return rendered;
      })
      .join('\n')}
  </section>
`;
    return rendered;
  } catch (e: unknown) {
    if (e instanceof Error) {
      return `error ${e.toString()}`;
    }
    return 'error';
  }
};
