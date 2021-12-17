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
  CollapsibleNode,
} from '@structured-types/api-docs';
const renderNode = (props: {
  node: DocumentationNode;
  inTree: boolean;
  key?: string;
}): React.ReactNode => {
  const { node, key, inTree } = props;
  if (isHeadingNode(node)) {
    switch (node.depth) {
      case 1:
        return <h1 key={key}>{nodeContent(props)}</h1>;
      case 2:
        return <h2 key={key}>{nodeContent(props)}</h2>;
      case 3:
        return <h3 key={key}>{nodeContent(props)}</h3>;
      case 4:
        return <h4 key={key}>{nodeContent(props)}</h4>;
    }
  } else if (isParagraphNode(node)) {
    return <p key={key}>{nodeContent(props)}</p>;
  } else if (isBlockNode(node) && node.children) {
    return <div key={key}>{nodeContent(props)}</div>;
  } else if (isBoldNode(node)) {
    return <b key={key}>{nodeContent(props)}</b>;
  } else if (isEmphasisNode(node)) {
    return <em key={key}>{nodeContent(props)}</em>;
  } else if (isCollapsibleNode(node)) {
    return <CollapsibleTree node={node} inTree={inTree} />;
  } else if (isLinkNode(node)) {
    return <span>{nodeContent(props)}</span>;
    /* return node.url ? (
      <a href={encodeURIComponent(node.url)} key={key}>
        {nodeContent(props)}
      </a>
    ) : (
      <span>{nodeContent(props)}</span>
    ); */
  } else if (isInlineCodeNode(node)) {
    return <code key={key}>{nodeContent(props)}</code>;
  } else if (isCodeNode(node)) {
    return (
      <pre
        style={{
          backgroundColor: 'var(--list-hover-background)',
          margin: 0,
          padding: '0.2em',
        }}
        key={key}
      >
        {nodeContent(props)}
      </pre>
    );
  } else if (isTextNode(node)) {
    return node.value || '';
  } else if (isTableNode(node)) {
    const table = node.children ? (
      <table
        style={{
          borderCollapse: 'collapse',
          width: '100%',
          boxSizing: 'border-box',
          borderSpacing: 0,
        }}
      >
        <thead>
          <tr
            style={{
              textAlign: 'left',
              borderBottom: '2px solid var(--border-color)',
            }}
          >
            {node.children[0].children?.map((cell, idx) => (
              <th
                grid-column={(idx + 1).toString()}
                cell-type="columnheader"
                key={`head_${idx}`}
              >
                {nodeContent({ node: cell, inTree })}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {node.children.slice(1).map((row, index) => (
            <tr
              key={`row_${index}`}
              style={{ borderTop: '1px solid var(--border-color)' }}
            >
              {row.children?.map((cell, idx) => (
                <td key={`head_${idx}`}>
                  {nodeContent({ node: cell, inTree })}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    ) : null;
    return table;
  }
  return null;
};

const CollapsibleTree: React.FC<{ node: CollapsibleNode; inTree: boolean }> = ({
  node,
  inTree,
}) => {
  const [open, setOpen] = React.useState(false);
  const content = (
    <div
      className={`ast-tree-start ${open ? 'open' : ''}`}
      data-pos="0"
      data-end="127"
      data-depth="0"
    >
      <a className="node-name" onClick={() => setOpen(!open)}>
        {node.summary.map((item, idx) => {
          return renderNode({
            node: item,
            inTree: true,
            key: `summary_${idx}`,
          });
        })}
      </a>
      <ul className="ast-tree">
        {node.children.map((item, idx) => {
          const node = renderNode({
            node: item,
            inTree: true,
            key: `item_${idx}`,
          });
          return <li key={`item_${idx}`}>{node}</li>;
        })}
      </ul>
    </div>
  );
  return inTree ? content : <div className="ast">{content}</div>;
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
        renderNode({ node, key: `_node_${idx}`, inTree }),
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
