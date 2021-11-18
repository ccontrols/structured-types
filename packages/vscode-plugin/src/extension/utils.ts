import * as vscode from 'vscode';
import { PropType } from '@structured-types/api';

const goToLocation = (location: PropType['loc']): void => {
  const { loc } = location || {};
  if (loc) {
    const activeTextEditor = vscode.window.activeTextEditor;
    if (activeTextEditor) {
      const range = new vscode.Range(
        new vscode.Position(loc.start.line - 1, loc.start.col - 1),
        new vscode.Position(loc.end.line - 1, loc.end.col - 1),
      );
      activeTextEditor.selection = new vscode.Selection(
        range.start,
        range.start,
      );
      activeTextEditor.revealRange(range);
    }
  }
};

export const getOpposingViewColumn = (
  defColumn?: vscode.ViewColumn,
  column?: vscode.ViewColumn,
): vscode.ViewColumn => {
  return column === vscode.ViewColumn.One ? vscode.ViewColumn.Two : defColumn;
};
export const openLocation = (
  location: PropType['loc'],
  column: vscode.ViewColumn,
): void => {
  if (location?.filePath)
    vscode.workspace
      .openTextDocument(vscode.Uri.file(location.filePath))
      .then((document) => {
        vscode.window
          .showTextDocument(document, getOpposingViewColumn(undefined, column))
          .then(() => {
            goToLocation(location);
          });
      });
};
export const getUri = (
  webview: vscode.Webview,
  extensionUri: vscode.Uri,
  pathList: string[],
): vscode.Uri => {
  return webview.asWebviewUri(vscode.Uri.joinPath(extensionUri, ...pathList));
};

export const getNonce = (): string => {
  let text = '';
  const possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < 32; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

export function isDocumentableFile(document: vscode.TextDocument): boolean {
  return (
    (document.languageId === 'typescript' ||
      document.languageId === 'typescriptreact' ||
      document.languageId === 'javascript' ||
      document.languageId === 'javascriptreact') &&
    document.uri.scheme !== 'instant-documentation'
  );
}
