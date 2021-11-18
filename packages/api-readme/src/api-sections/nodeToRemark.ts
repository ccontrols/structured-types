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
  isCollapsibleNode,
  isBlockNode,
} from '@structured-types/api-docs';
import { RemarkNode } from '../types';

const renderNode = (
  {
    node,
    ...props
  }: {
    node: DocumentationNode;
    [props: string]: any;
  },
  skipLineBreaks = false,
): RemarkNode | null => {
  if (isHeadingNode(node)) {
    return nodeContent({ node, as: 'heading', depth: node.depth, ...props });
  } else if (isParagraphNode(node)) {
    return nodeContent({ node, as: 'paragraph', ...props });
  } else if (isBlockNode(node) && node.children && !skipLineBreaks) {
    return {
      type: 'paragraph',
      children: [
        ...(node.children.map((node) => renderNode({ node })) as RemarkNode[]),
        {
          type: 'html',
          value: '<br />',
        },
      ],
    };
  } else if (isCollapsibleNode(node)) {
    return {
      type: 'paragraph',
      children: [
        {
          type: 'html',
          value: '<details>',
        },
        {
          type: 'html',
          value: '<summary>',
        },
        ...nodesToRemark(node.summary),
        {
          type: 'html',
          value: '</summary>',
        },
        {
          type: 'html',
          value: '<blockquote>',
        },
        ...(node.children
          ? node.children.reduce((acc, n, idx) => {
              const r = renderNode(
                { node: n },
                idx === node.children.length - 1,
              );
              if (r) {
                const returns = [r];
                return [...acc, ...returns];
              }
              return acc;
            }, [] as RemarkNode[])
          : []),
        {
          type: 'html',
          value: '</blockquote>',
        },
        {
          type: 'html',
          value: '</details>',
        },
      ],
    };
  } else if (isBoldNode(node)) {
    return nodeContent({ node, as: 'strong', ...props });
  } else if (isEmphasisNode(node)) {
    return nodeContent({ node, as: 'emphasis', ...props });
  } else if (isLinkNode(node)) {
    return node.url
      ? nodeContent({ node, as: 'link', url: node.url, ...props })
      : nodeContent({ node, as: 'paragraph', ...props });
  } else if (isInlineCodeNode(node)) {
    return nodeContent({ node, as: 'inlineCode', ...props });
  } else if (isCodeNode(node)) {
    return nodeContent({ node, as: 'code', ...props });
  } else if (isTextNode(node)) {
    return nodeContent({ node, as: 'text', ...props });
  } else if (isTableCellNode(node)) {
    return nodeContent({ node, as: 'tableCell', ...props });
  } else if (isTableRowNode(node)) {
    return nodeContent({ node, as: 'tableRow', ...props });
  } else if (isTableNode(node)) {
    return nodeContent({ node, as: 'table', ...props });
  } else if (isNodeWithChildren(node)) {
    return nodeContent({ node, as: 'paragraph', ...props });
  }
  return null;
};

const nodeContent = ({
  node,
  as,
  ...rest
}: {
  node: DocumentationNode;
  as: string;
  [props: string]: any;
}): RemarkNode | null => {
  const value = isNodeWithChildren(node)
    ? nodeComponents({ nodes: node.children, as, ...rest })
    : isNodeWithValue(node)
    ? { type: as, ...rest, value: node.value }
    : null;
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
}): RemarkNode | null => {
  return nodes
    ? ({
        type: as,
        children: nodes
          .map((node) => renderNode({ node }))
          .filter((n) => n) as RemarkNode[],
        ...rest,
      } as RemarkNode)
    : null;
};

export const nodesToRemark = (nodes: DocumentationNode[]): RemarkNode[] => {
  return nodes
    .map((node) => {
      const rendered = renderNode({ node });
      return rendered;
    })
    .filter((n) => n) as RemarkNode[];
};
