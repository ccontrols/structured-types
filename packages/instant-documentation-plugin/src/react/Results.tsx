import React, { FC, useEffect, useState } from 'react';
import reactPlugin from '@structured-types/react-plugin';
import propTypesPlugin from '@structured-types/prop-types-plugin';

import { Loader } from './Loader';
import { addDTSMapping } from '../utilities/dts-file';
import type { Sandbox } from '../vendor/sandbox';
import { extractProps } from './extract-props';
import { renderNodes } from './nodeToReact';
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
  const [results, setResults] = useState<React.ReactNode>([]);
  const [fsExtra, setFsExtra] = useState<Map<string, string>>(new Map());
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
      await addDTSMapping(
        'https://cdn.jsdelivr.net/npm/@types/prop-types@15.7.4/',
        '/node_modules/@types/prop-types/',
        'index.d.ts',
        fsMap,
      );
      setFsExtra(fsMap);
    };
    addMappings();
  }, []);
  const onClick = async () => {
    const tsvfs = await sandbox.setupTSVFS(fsExtra);
    sandbox.editor.updateOptions({ readOnly: true });
    setLoading(true);
    try {
      const files = tsvfs.program.getSourceFiles();
      const file =
        files.find((f) => f.fileName.startsWith('/input')) ||
        files[files.length - 1];
      const nodes = await extractProps(
        file.fileName,
        {
          //scope: 'all',
          plugins: [propTypesPlugin, reactPlugin],
          tsOptions: tsvfs.program.getCompilerOptions(),
        },
        { program: tsvfs.program, host: tsvfs.host.compilerHost },
      );
      setResults(renderNodes(nodes));
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
        <button disabled={loading} onClick={onClick}>
          Extract
        </button>
      </div>
      <div style={{ marginTop: '20px' }}>{loading ? <Loader /> : results}</div>
    </div>
  );
};
