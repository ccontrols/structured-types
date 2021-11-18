import React from 'react';
import {
  DocumentationNode,
  isBoldNode,
  isCodeNode,
  isInlineCodeNode,
  isEmphasisNode,
  isLinkNode,
  isParagraphNode,
  isTableNode,
  isTextNode,
  isNodeWithChildren,
  isNodeWithValue,
  isHeadingNode,
  isBlockNode,
  isCollapsibleNode,
} from '@structured-types/api-docs/types';
import { VSCodeAPI } from './VSCodeApi';
const renderNode = (props: {
  node: DocumentationNode;
  inTree: boolean;
  key?: string;
}): React.ReactNode => {
  const { node, inTree } = props;
  if (isHeadingNode(node)) {
    switch (node.depth) {
      case 1:
        return <h1>{nodeContent(props)}</h1>;
      case 2:
        return <h2>{nodeContent(props)}</h2>;
      case 3:
        return <h3>{nodeContent(props)}</h3>;
      case 4:
        return <h4>{nodeContent(props)}</h4>;
    }
  } else if (isParagraphNode(node)) {
    return <p>{nodeContent(props)}</p>;
  } else if (isBlockNode(node) && node.children) {
    return <div>{nodeContent(props)}</div>;
  } else if (isBoldNode(node)) {
    return <b>{nodeContent(props)}</b>;
  } else if (isEmphasisNode(node)) {
    return <em>{nodeContent(props)}</em>;
  } else if (isCollapsibleNode(node)) {
    const content = (
      <>
        <fast-tree-item>
          {node.summary.map((item, idx) => {
            return renderNode({
              node: item,
              key: `summary_${idx}`,
              inTree: true,
            });
          })}

          {node.children.map((item, idx) => {
            const node = renderNode({
              node: item,
              inTree: true,
              key: `item_${idx}`,
            });
            return !isCollapsibleNode(item) ? (
              <fast-tree-item key={`item_${idx}`}>{node}</fast-tree-item>
            ) : (
              node
            );
          })}
        </fast-tree-item>
      </>
    );
    return inTree ? content : <fast-tree-view>{content}</fast-tree-view>;
  } else if (isLinkNode(node)) {
    return (
      <a
        href={
          node.loc ? '#' : node.url ? encodeURIComponent(node.url) : undefined
        }
        onClick={() => {
          if (node.loc) {
            VSCodeAPI.postMessage({
              type: 'open_loc',
              value: {
                filePath: node.loc.filePath,
                loc: node.loc.loc,
              },
            });
          }
        }}
      >
        {nodeContent(props)}
      </a>
    );
  } else if (isInlineCodeNode(node)) {
    return <code>{nodeContent(props)}</code>;
  } else if (isCodeNode(node)) {
    return (
      <pre
        style={{
          backgroundColor: 'var(--list-hover-background)',
          margin: 0,
          padding: '0.2em',
        }}
      >
        {nodeContent(props)}
      </pre>
    );
  } else if (isTextNode(node)) {
    return node.value || '';
  } else if (isTableNode(node)) {
    const table = node.children ? (
      <vscode-data-grid
        grid-template-columns={node.children[0].children
          .map(() => '1fr')
          .join(' ')}
      >
        <vscode-data-grid-row row-type="header">
          {node.children[0].children?.map((cell, idx) => (
            <vscode-data-grid-cell
              grid-column={(idx + 1).toString()}
              cell-type="columnheader"
              key={`head_${idx}`}
            >
              {nodeContent({ node: cell, inTree })}
            </vscode-data-grid-cell>
          ))}
        </vscode-data-grid-row>

        {node.children.slice(1).map((row, index) => (
          <vscode-data-grid-row key={`row_${index}`}>
            {row.children?.map((cell, idx) => (
              <vscode-data-grid-cell
                grid-column={(idx + 1).toString()}
                key={`head_${idx}`}
              >
                {nodeContent({ node: cell, inTree })}
              </vscode-data-grid-cell>
            ))}
          </vscode-data-grid-row>
        ))}
      </vscode-data-grid>
    ) : null;
    return table;
  }
  return null;
};

const nodeContent = ({
  node,
  inTree,
}: Parameters<typeof renderNode>[0]): React.ReactNode => {
  const value = isNodeWithChildren(node)
    ? nodeComponents({ nodes: node.children, inTree })
    : isNodeWithValue(node)
    ? node.value
    : null;
  return value;
};
const nodeComponents = ({
  nodes,
  inTree,
}: {
  nodes?: DocumentationNode[];
  inTree: boolean;
}): React.ReactNode => {
  return nodes ? (
    <React.Fragment>
      {nodes.map((node, idx) =>
        renderNode({ node, inTree, key: `_node_${idx}` }),
      )}
    </React.Fragment>
  ) : null;
};

export const renderNodes = (nodes: DocumentationNode[]): React.ReactNode => {
  try {
    const rendered = (
      <section>
        {nodes.map((node, idx) => {
          const rendered = renderNode({
            node,
            inTree: false,
            key: `_node_${idx}`,
          });
          return rendered;
        })}
      </section>
    );
    return rendered;
  } catch (e: unknown) {
    if (e instanceof Error) {
      return `error ${e.toString()}`;
    }
    return 'error';
  }
};
