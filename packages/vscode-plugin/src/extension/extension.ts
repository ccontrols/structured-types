import * as vscode from 'vscode';
import { ContentProvider } from './ContentProvider';
import { getOpposingViewColumn, isDocumentableFile } from './utils';
import { ConfigStore } from './config';

export function activate(context: vscode.ExtensionContext): void {
  const config = new ConfigStore();
  const contentProvider = new ContentProvider(context, config.config);

  const openPreview = (uri?: vscode.Uri) => {
    let resource = uri;
    const selectedEditor =
      (uri &&
        vscode.window.visibleTextEditors.find(
          (e) => e.document.uri.fsPath === uri.fsPath,
        )) ||
      vscode.window.activeTextEditor;
    let viewColumn = vscode.ViewColumn.One;
    if (selectedEditor) {
      if (!(resource instanceof vscode.Uri)) {
        resource = selectedEditor.document.uri;
      }
      viewColumn = getOpposingViewColumn(
        vscode.ViewColumn.Two,
        selectedEditor.viewColumn,
      );
    }
    if (resource) {
      contentProvider.createPreview(resource, viewColumn);
    }
  };
  context.subscriptions.push(
    vscode.window.onDidChangeActiveTextEditor((textEditor) => {
      if (
        textEditor.document.uri.fsPath ===
        vscode.window.activeTextEditor.document.uri.fsPath
      ) {
        if (isDocumentableFile(textEditor.document)) {
          const sourceUri = textEditor.document.uri;

          const isUsingSinglePreview = config.config.singlePage;
          const {
            panel: previewPanel,
            viewColumn,
            uri = { fsPath: '' },
          } = contentProvider.getPreview(sourceUri) || {};

          if (contentProvider.isPreviewOn(sourceUri)) {
            if (
              isUsingSinglePreview &&
              previewPanel &&
              sourceUri.fsPath !== uri.fsPath
            ) {
              contentProvider.createPreview(sourceUri, viewColumn);
            } else if (!isUsingSinglePreview && previewPanel) {
              previewPanel.reveal(undefined, true);
            }
          } else if (
            config.config.autoShowDocumentation &&
            textEditor.viewColumn !== viewColumn
          ) {
            openPreview(sourceUri);
          }
        }
      }
    }),
  );
  context.subscriptions.push(
    vscode.commands.registerCommand(
      'instant-documentation.openPreview',
      openPreview,
    ),
  );
  context.subscriptions.push(
    vscode.commands.registerCommand(
      'instant-documentation.refresh',
      (uri?: vscode.Uri) => uri && contentProvider.refreshPreview(uri),
    ),
  );
  context.subscriptions.push(
    vscode.workspace.onDidChangeConfiguration(() => {
      config.readConfig();
      contentProvider.updateConfiguration(config.config);
    }),
  );
}
