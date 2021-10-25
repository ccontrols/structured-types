import { SourceLocation } from '@structured-types/api';
import { DocumentationNode, LinkNode, NodeKind } from '../types';

export const linkNode = (
  children: DocumentationNode[],
  url?: string,
  loc?: SourceLocation,
): LinkNode => {
  const prop = {
    kind: NodeKind.Link,
    children,
  } as LinkNode;
  if (url) {
    prop.url = url;
  }
  if (loc) {
    prop.loc = loc;
  }
  return prop;
};
