import React, { useEffect, useState } from 'react';
import { VSCodeAPI } from './VSCodeApi';
import { renderNodes } from './nodeToReact';
import { DocumentationNode } from '@structured-types/api-docs/types';

export const App: React.FC = () => {
  const [nodes, setNodes] = useState<DocumentationNode[] | undefined>();
  useEffect(() => {
    return VSCodeAPI.onMessage((message) => {
      setNodes(message.data);
    });
  });
  return <section>{nodes ? renderNodes(nodes) : 'loading...'}</section>;
};
