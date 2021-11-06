import * as path from 'path';
import * as vscode from 'vscode';
import { extractProps } from './extract-props';
import { nodesToHTML } from './nodeToHTML';
import { getUri, getNonce, openLocation } from './utils';
import { VSCodeConfig } from './config';

type PanelStore = {
  panel: vscode.WebviewPanel;
  viewColumn: vscode.ViewColumn;
  uri: vscode.Uri;
};
export class ContentProvider {
  private readonly context: vscode.ExtensionContext;
  private config: VSCodeConfig;
  private previewPanels: Record<string, PanelStore> = {};
  private singlePreviewPanel: PanelStore | undefined;
  private static readonly viewType = 'instant_documentation';
  private render: (fileName: string) => string;
  constructor(context: vscode.ExtensionContext, config: VSCodeConfig) {
    this.context = context;
    this.config = { ...config };
    this.render = (fileName: string) => {
      const nodes = extractProps(fileName, this.config);
      return nodesToHTML(nodes);
    };

    context.subscriptions.push(
      vscode.workspace.onDidSaveTextDocument((document) => {
        this.updateProps(document.uri);
      }, null),
    );
  }
  private updateProps(uri: vscode.Uri): void {
    const { panel } = this.getPreview(uri) || {};
    if (panel) {
      panel.webview.html = this.getHtml(panel, uri);
      panel.webview.onDidReceiveMessage((data) => {
        switch (data.type) {
          case 'open_loc':
            openLocation(data.value);
        }
      });
    }
  }
  private getTitle(uri: vscode.Uri): string {
    return `Documentation ${path.basename(uri.fsPath)}`;
  }
  public createPreview(sourceUri: vscode.Uri, column: vscode.ViewColumn): void {
    const previewColumn =
      column ||
      (vscode.window.activeTextEditor
        ? vscode.window.activeTextEditor.viewColumn
        : undefined) ||
      vscode.ViewColumn.One;
    const { panel: existingPanel } = this.getPreview(sourceUri) || {};
    let panel = existingPanel;
    if (!panel || panel.viewColumn !== previewColumn) {
      if (panel) {
        this.destroyPreview(sourceUri);
      }
      panel = vscode.window.createWebviewPanel(
        ContentProvider.viewType,
        this.getTitle(sourceUri),
        previewColumn,
        {
          enableFindWidget: true,
          enableScripts: true,
          localResourceRoots: [
            vscode.Uri.file(path.join(this.context.extensionPath, 'dist')),
          ],
        },
      );
      panel.webview.onDidReceiveMessage(
        (message) => {
          vscode.commands.executeCommand(
            `_instant-documentation.${message.command}`,
            ...message.args,
          );
        },
        null,
        this.context.subscriptions,
      );
      this.setPreviewActiveContext(true);
      // unregister previewPanel
      panel.onDidDispose(
        () => {
          this.destroyPreview(sourceUri);
          this.setPreviewActiveContext(false);
        },
        null,
        this.context.subscriptions,
      );
      panel.onDidChangeViewState(({ webviewPanel }) => {
        this.setPreviewActiveContext(webviewPanel.active);
      });
    }
    const preview: PanelStore = {
      panel,
      viewColumn: previewColumn,
      uri: sourceUri,
    };
    if (this.config.singlePage) {
      this.singlePreviewPanel = preview;
    } else {
      this.previewPanels[sourceUri.fsPath] = preview;
    }

    panel.title = this.getTitle(sourceUri);
    this.updateProps(sourceUri);
  }

  public refreshPreview(sourceUri: vscode.Uri): void {
    this.updateProps(sourceUri);
  }

  public getPreview(sourceUri: vscode.Uri): PanelStore | undefined {
    if (this.config.singlePage) {
      return this.singlePreviewPanel;
    } else {
      return this.previewPanels[sourceUri.fsPath];
    }
  }
  public isPreviewOn(sourceUri: vscode.Uri): boolean {
    if (this.config.singlePage) {
      return this.singlePreviewPanel?.uri.fsPath === sourceUri.fsPath;
    } else {
      return !!this.previewPanels[sourceUri.fsPath];
    }
  }
  public destroyPreview(sourceUri: vscode.Uri): void {
    const { panel } = this.getPreview(sourceUri) || {};
    if (panel) {
      panel.dispose();
      if (this.config.singlePage) {
        this.singlePreviewPanel = undefined;
      } else {
        delete this.previewPanels[sourceUri.fsPath];
      }
    }
  }

  public refreshAll(): void {
    if (this.config.singlePage && this.singlePreviewPanel) {
      this.refreshPreview(this.singlePreviewPanel.uri);
    } else {
      Object.keys(this.previewPanels).forEach((key) =>
        this.refreshPreview(this.previewPanels[key].uri),
      );
    }
  }
  public destroyAll(): void {
    if (this.config.singlePage && this.singlePreviewPanel) {
      this.destroyPreview(this.singlePreviewPanel.uri);
    } else {
      const keys = Object.keys(this.previewPanels);
      for (const key in keys) {
        this.destroyPreview(this.previewPanels[key].uri);
      }
    }
  }
  public updateConfiguration(config: VSCodeConfig): void {
    if (JSON.stringify(config) !== JSON.stringify(this.config)) {
      const singleStateChange = this.config.singlePage !== config.singlePage;
      this.config = { ...config };
      if (singleStateChange) {
        this.destroyAll();
      } else {
        this.refreshAll();
      }
    }
  }

  private setPreviewActiveContext(value: boolean) {
    vscode.commands.executeCommand(
      'setContext',
      'documentation_view_active',
      value,
    );
  }
  private getHtml(panel: vscode.WebviewPanel, sourceUri: vscode.Uri) {
    const rendered = this.render(sourceUri.fsPath);
    const toolkitUri = getUri(panel.webview, this.context.extensionUri, [
      'dist',
      'toolkit.js',
    ]);
    const scriptUri = panel.webview.asWebviewUri(
      vscode.Uri.joinPath(this.context.extensionUri, 'dist', 'script.js'),
    );
    const nonce = getNonce();
    return `<!DOCTYPE html>
			<html lang="en">
			<head>
				<meta charset="utf-8">
				<meta name="viewport" content="width=device-width,initial-scale=1,shrink-to-fit=no">
        <script type="module" src="${toolkitUri}"></script>
				<title>${this.getTitle(sourceUri)}</title>
				<base href="${vscode.Uri.file(
          path.join(this.context.extensionPath, 'dist'),
        ).with({
          scheme: 'vscode-resource',
        })}/">
        
			</head>
			<body>
				<noscript>You need to enable JavaScript to run this app.</noscript>
        ${rendered}
        <script nonce="${nonce}" src="${scriptUri}"></script>
			</body>
			</html>`;
  }
}
