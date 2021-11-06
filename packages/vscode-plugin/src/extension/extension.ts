import * as vscode from 'vscode';
import { ContentProvider } from './ContentProvider';
import { isDocumentableFile } from './utils';
import { ConfigStore } from './config';

export function activate(context: vscode.ExtensionContext): void {
  const config = new ConfigStore();
  const contentProvider = new ContentProvider(context, config.config);

  const openPreview = (column: vscode.ViewColumn) => (uri?: vscode.Uri) => {
    let resource = uri;
    if (!(resource instanceof vscode.Uri)) {
      if (vscode.window.activeTextEditor) {
        // we are relaxed and don't check for markdown files
        resource = vscode.window.activeTextEditor.document.uri;
      }
    }
    if (resource) {
      contentProvider.createPreview(resource, column);
    }
  };
  context.subscriptions.push(
    vscode.window.onDidChangeActiveTextEditor((textEditor) => {
      if (textEditor && textEditor.document && textEditor.document.uri) {
        if (isDocumentableFile(textEditor.document)) {
          const sourceUri = textEditor.document.uri;

          const isUsingSinglePreview = config.config.singlePage;
          const {
            panel: previewPanel,
            viewColumn = vscode.ViewColumn.One,
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
              previewPanel.reveal(vscode.ViewColumn.Two, true);
            }
          } else if (
            config.config.autoShowDocumentation &&
            textEditor.viewColumn !== viewColumn
          ) {
            openPreview(vscode.ViewColumn.Two)(sourceUri);
          }
        }
      }
    }),
  );
  context.subscriptions.push(
    vscode.commands.registerCommand(
      'instant-documentation.openPreview',
      openPreview(vscode.ViewColumn.One),
    ),
  );
  context.subscriptions.push(
    vscode.commands.registerCommand(
      'instant-documentation.openPreviewSide',
      openPreview(vscode.ViewColumn.Two),
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
