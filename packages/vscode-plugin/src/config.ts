import * as vscode from 'vscode';

export const useSinglePreview = (): boolean => {
  const config = vscode.workspace.getConfiguration('structured-types');
  return config.get<boolean>('singlePreview');
};
