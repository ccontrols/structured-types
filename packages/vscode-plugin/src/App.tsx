import React from 'react';
import { Node } from './types';
import { NodeComponent } from './NodeComponent';

export const App: React.FC<{ nodes: Node[] }> = ({ nodes }) => {
  return (
    <main>
      {nodes.map((node, index) => (
        <NodeComponent key={`node_${index}`} node={node} />
      ))}
    </main>
  );
};
