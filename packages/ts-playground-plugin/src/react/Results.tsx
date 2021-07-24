import React, { FC, useState } from 'react';
import { anaylizeFiles, PropTypes } from '@structured-types/api';
import { reactPlugin } from '@structured-types/api';
import type { Sandbox } from '../vendor/sandbox';
import { PropTypeTree } from './PropTypeTree';

export const Results: FC<{ sandbox: Sandbox }> = ({ sandbox }) => {
  const [results, setResults] = useState<PropTypes>({});
  const [diagnostics, setDiagnostics] = useState<boolean>(false);

  const onClick = async (collectDiagnostics: boolean) => {
    const tsvfs = await sandbox.setupTSVFS();
    sandbox.editor.updateOptions({ readOnly: true });
    try {
      const files = tsvfs.program.getSourceFiles();
      const types = anaylizeFiles(
        [files[files.length - 1].fileName],
        {
          scope: 'all',
          plugins: [reactPlugin],
          collectDiagnostics,
        },
        { program: tsvfs.program },
      );
      setResults(types);
    } finally {
      sandbox.editor.updateOptions({ readOnly: false });
    }
  };
  return (
    <div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <button onClick={() => onClick(diagnostics)}>Get types</button>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <input
            type="checkbox"
            id="diagnostics"
            checked={diagnostics}
            onClick={() => {
              setDiagnostics(!diagnostics);
              onClick(!diagnostics);
            }}
          />
          <label htmlFor="diagnostics">
            <span style={{ paddingLeft: '2px' }}>diagnostics</span>
          </label>
        </div>
      </div>
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
