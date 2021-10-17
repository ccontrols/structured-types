import * as vscode from 'vscode';
import { ContentProvider } from './ContentProvider';

export function activate(context: vscode.ExtensionContext): void {
  const contentProvider = new ContentProvider(context);
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
    vscode.commands.registerCommand(
      'structured-types.openPreview',
      openPreview(vscode.ViewColumn.One),
    ),
  );
  context.subscriptions.push(
    vscode.commands.registerCommand(
      'structured-types.openPreviewSide',
      openPreview(vscode.ViewColumn.Two),
    ),
  );
  context.subscriptions.push(
    vscode.commands.registerCommand(
      'structured-types.refresh',
      (uri?: vscode.Uri) => uri && contentProvider.refreshPreview(uri),
    ),
  );
}
