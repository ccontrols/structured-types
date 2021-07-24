import React, { FC, useEffect, useState } from 'react';
import { anaylizeFiles, PropTypes } from '@structured-types/api';
import { reactPlugin } from '@structured-types/api';
import { Loader } from './Loader';
import { addDTSMapping } from '../utilities/dts-file';
import type { Sandbox } from '../vendor/sandbox';
import { PropTypeTree } from './PropTypeTree';

const addReactLib = async (name: string, map: Map<string, string>) => {
  await addDTSMapping(
    'https://cdn.jsdelivr.net/npm/@types/react@17.0.2/',
    '/node_modules/@types/react/',
    name,
    map,
  );
};

export const Results: FC<{ sandbox: Sandbox }> = ({ sandbox }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [results, setResults] = useState<PropTypes>({});
  const [fsExtra, setFsExtra] = useState<Map<string, string>>(new Map());
  const [diagnostics, setDiagnostics] = useState<boolean>(false);
  useEffect(() => {
    const addMappings = async () => {
      const fsMap = new Map();
      await addReactLib('index.d.ts', fsMap);
      await addReactLib('global.d.ts', fsMap);
      await addDTSMapping(
        'https://cdn.jsdelivr.net/npm/csstype@3.0.8/',
        '/node_modules/@types/csstype/',
        'index.d.ts',
        fsMap,
      );
      setFsExtra(fsMap);
    };
    addMappings();
  }, []);
  const onClick = async (collectDiagnostics: boolean) => {
    const tsvfs = await sandbox.setupTSVFS(fsExtra);
    sandbox.editor.updateOptions({ readOnly: true });
    setLoading(true);
    try {
      const files = tsvfs.program.getSourceFiles();
      const types = anaylizeFiles(
        [files[files.length - 1].fileName],
        {
          scope: 'all',
          plugins: [reactPlugin],
          collectDiagnostics,
          tsOptions: tsvfs.program.getCompilerOptions(),
        },
        { program: tsvfs.program },
      );
      setResults(types);
    } finally {
      setLoading(false);
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
        <button disabled={loading} onClick={() => onClick(diagnostics)}>
          Get types
        </button>
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
            disabled={loading}
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
        {loading ? (
          <Loader />
        ) : (
          Object.keys(results).map((key) => (
            <div key={key} className="ast" style={{ paddingBottom: '15px' }}>
              <PropTypeTree data={results[key]} name={key} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};
