import React, { FC, useState } from 'react';
import { anaylizeFiles, PropTypes } from '@structured-types/api';
import type { Sandbox } from '../vendor/sandbox';
import { PropTypeTree } from './PropTypeTree';

export const Results: FC<{ sandbox: Sandbox }> = ({ sandbox }) => {
  const [results, setResults] = useState<PropTypes>({});
  const onClick = async () => {
    const tsvfs = await sandbox.setupTSVFS();
    sandbox.editor.updateOptions({ readOnly: true });
    try {
      const files = tsvfs.program.getSourceFiles();
      const types = anaylizeFiles(
        [files[files.length - 1].fileName],
        { scope: 'all' },
        { program: tsvfs.program },
      );
      setResults(types);
    } finally {
      sandbox.editor.updateOptions({ readOnly: false });
    }
  };
  return (
    <div>
      <button onClick={onClick}>Get types</button>
      <div style={{ marginTop: '20px' }}>
        {Object.keys(results).map((key) => (
          <div key={key} className="ast" style={{ paddingBottom: '15px' }}>
            <PropTypeTree data={results[key]} name={key} />
          </div>
        ))}
      </div>
    </div>
  );
};
