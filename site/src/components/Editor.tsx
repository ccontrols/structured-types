import React from 'react';
import MonacoEditor, { Monaco } from '@monaco-editor/react';
import { Box, useColorMode } from 'theme-ui';

import { useOptions } from '../contexts/OptionsContext';
import { useCodeContext } from '../contexts/CodeContext';

/**
 * Monaco editor component. Uses CodeContext for data repository.
 */
export const Editor: React.FC = () => {
  const [colorMode] = useColorMode();
  const [tsOptions] = useOptions('tsOptions');
  const { code, updateCode } = useCodeContext();
  const language =
    tsOptions.General.lang.value || tsOptions.General.lang.defaultValue;
  function handleEditorChange(value: string | undefined) {
    updateCode(value || '');
  }
  function onWillMount(monaco: Monaco) {
    monaco.languages.typescript.typescriptDefaults.setCompilerOptions(
      tsOptions,
    );
    fetch('/api/editor-maps')
      .then((data) => data.json())
      .then((maps) => {
        Object.keys(maps).forEach((key) => {
          monaco.languages.typescript.typescriptDefaults.addExtraLib(
            maps[key],
            `file://${key}`,
          );
        });
      });
  }
  return (
    <Box style={{ height: '90vh' }}>
      <MonacoEditor
        language={language as string}
        value={code}
        onChange={handleEditorChange}
        beforeMount={onWillMount}
        theme={colorMode === 'dark' ? 'vs-dark' : 'vs-light'}
      />
    </Box>
  );
};
