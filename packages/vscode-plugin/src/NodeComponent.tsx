import React from 'react';
import { Node } from './types';

export const NodeComponent: React.FC<{ node: Node; [props: string]: any }> = ({
  node,
  ...props
}) => {
  switch (node.type) {
    case 'heading':
      switch (node.depth) {
        case 1:
          return <NodeContent node={node} as="h1" {...props} />;
        case 2:
          return <NodeContent node={node} as="h2" {...props} />;
        case 3:
          return <NodeContent node={node} as="h3" {...props} />;
        case 4:
          return <NodeContent node={node} as="h4" {...props} />;
      }
    case 'paragraph':
      return <NodeContent node={node} as="p" {...props} />;
    case 'strong':
      return <NodeContent node={node} as="b" {...props} />;
    case 'emphasis':
      return <NodeContent node={node} as="em" {...props} />;
    case 'link':
      return <NodeContent href={node.url} node={node} as="a" {...props} />;
    case 'inlineCode':
      return <NodeContent node={node} as="code" {...props} />;
    case 'code':
      return <NodeContent node={node} as="pre" {...props} />;

    case 'text':
      return <>{node.value}</>;
    case 'tableCell':
      return <NodeContent node={node} as="vscode-data-grid-cell" {...props} />;
    case 'tableRow':
      return <NodeContent node={node} as="vscode-data-grid-row" {...props} />;
    case 'table':
      return node.children ? (
        <vscode-data-grid>
          <vscode-data-grid-row row-type="header">
            {node.children[0].children?.map((cell, index) => (
              <NodeContent
                node={cell}
                grid-column={(index + 1).toString()}
                cell-type="columnheader"
                as="vscode-data-grid-cell"
                key={`header_${index}`}
              />
            ))}
          </vscode-data-grid-row>
          {node.children.slice(1).map((row, index) => (
            <vscode-data-grid-row key={`row_${index}`}>
              {row.children?.map((cell, index) => (
                <NodeContent
                  node={cell}
                  grid-column={(index + 1).toString()}
                  as="vscode-data-grid-cell"
                  key={`cell_${index}`}
                />
              ))}
            </vscode-data-grid-row>
          ))}
        </vscode-data-grid>
      ) : null;
    default:
      debugger;
      return null;
  }
};

export const NodeContent: React.FC<{
  node: Node;
  as: React.ComponentType | keyof JSX.IntrinsicElements;
  [props: string]: any;
}> = ({ node, as: Element, ...rest }) => (
  <>
    {node.value ? (
      <Element {...rest}>{node.value}</Element>
    ) : node.children ? (
      <NodeComponents as={Element} nodes={node.children} {...rest} />
    ) : null}
  </>
);
export const NodeComponents: React.FC<{
  nodes?: Node[];
  as: React.ComponentType | keyof JSX.IntrinsicElements;
  [props: string]: any;
}> = ({ nodes, as: Element, ...rest }) => {
  return nodes ? (
    <Element {...rest}>
      {nodes.map((node, index) => (
        <NodeComponent key={`component_${index}`} node={node} />
      ))}
    </Element>
  ) : null;
};
