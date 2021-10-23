import * as vscode from 'vscode';

import { PropType } from '@structured-types/api';

export async function getSymbols(
  document: vscode.TextDocument,
): Promise<vscode.DocumentSymbol[]> {
  return new Promise(async (resolve) => {
    let symbols = await vscode.commands.executeCommand<vscode.DocumentSymbol[]>(
      'vscode.executeDocumentSymbolProvider',
      document.uri,
    );
    // tslint:disable-line
    if (!symbols || symbols.length === 0) {
      setTimeout(async () => {
        symbols = await vscode.commands.executeCommand<vscode.DocumentSymbol[]>(
          'vscode.executeDocumentSymbolProvider',
          document.uri,
        );
        // tslint:disable-line
        return resolve(symbols || []);
      }, 1200);
    } else {
      return resolve(symbols || []);
    }
  });
}

async function goToSymbol(
  document: vscode.TextDocument,
  symbolName: string,
): Promise<void> {
  const symbols = await getSymbols(document);
  const findSymbol = symbols.find((symbol) => symbol.name === symbolName);
  const activeTextEditor = vscode.window.activeTextEditor;
  if (findSymbol && activeTextEditor) {
    activeTextEditor.selection = new vscode.Selection(
      findSymbol.range.start,
      findSymbol.range.start,
    );
    activeTextEditor.revealRange(
      findSymbol.range,
      vscode.TextEditorRevealType.AtTop,
    );
  }
}

export const openSymbol = (filePath: string, symbolName: string): void => {
  vscode.workspace
    .openTextDocument(vscode.Uri.file(filePath))
    .then((document) => {
      vscode.window.showTextDocument(document).then(() => {
        goToSymbol(document, symbolName);
      });
    });
};

const goToLocation = (loc: PropType['loc']): void => {
  const activeTextEditor = vscode.window.activeTextEditor;
  if (activeTextEditor) {
    const range = new vscode.Range(
      new vscode.Position(loc.start.line, loc.start.col),
      new vscode.Position(loc.end.line, loc.end.col),
    );
    activeTextEditor.selection = new vscode.Selection(range.start, range.start);
    activeTextEditor.revealRange(range, vscode.TextEditorRevealType.AtTop);
  }
};

export const openLocation = (filePath: string, loc: PropType['loc']): void => {
  vscode.workspace
    .openTextDocument(vscode.Uri.file(filePath))
    .then((document) => {
      vscode.window.showTextDocument(document).then(() => {
        goToLocation(loc);
      });
    });
};
export function getUri(
  webview: vscode.Webview,
  extensionUri: vscode.Uri,
  pathList: string[],
): vscode.Uri {
  return webview.asWebviewUri(vscode.Uri.joinPath(extensionUri, ...pathList));
}
