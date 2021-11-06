import React, { useEffect, useState } from 'react';
import { VSCodeAPI } from './VSCodeApi';
import { renderNodes } from './nodeToReact';
import { DocumentationNode } from '@structured-types/api-docs/types';
import { Flex } from './components/Flex';

export const App: React.FC = () => {
  const [nodes, setNodes] = useState<DocumentationNode[] | undefined>(
    VSCodeAPI.getState('nodes'),
  );
  useEffect(() => {
    return VSCodeAPI.onMessage((message) => {
      setNodes(message.data);
      VSCodeAPI.setState({ key: 'nodes', value: message.data });
    });
  });
  return (
    <section>
      {nodes ? (
        renderNodes(nodes)
      ) : (
        <Flex>
          <vscode-progress-ring />
        </Flex>
      )}
    </section>
  );
};
