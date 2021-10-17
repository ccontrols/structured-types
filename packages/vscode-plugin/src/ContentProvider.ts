import * as path from 'path';
import * as vscode from 'vscode';
import { ExtractProps } from './extract-tsdoc';
import { renderNodes } from './renderNode';

type PanelStore = {
  panel?: vscode.WebviewPanel;
};
export class ContentProvider {
  private readonly context: vscode.ExtensionContext;
  private previewPanels: Record<string, PanelStore> = {};
  public static currentPanel: ContentProvider | undefined;
  private static readonly viewType = 'documentation';
  private render: (fileName: string) => string;
  constructor(context: vscode.ExtensionContext) {
    this.context = context;
    this.render = (fileName: string) => {
      const extractor = new ExtractProps([fileName]);
      const nodes = extractor.extract({ collectHelpers: false });
      console.log(nodes);
      return renderNodes(nodes);
    };

    context.subscriptions.push(
      vscode.workspace.onDidSaveTextDocument((document) => {
        this.updateProps(document.uri);
      }, null),
    );
  }
  private updateProps(uri: vscode.Uri): void {
    const { panel } = this.getPreview(uri);
    if (panel) {
      panel.webview.html = this.getHtml(panel, uri);
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
    const { panel: existingPanel } = this.getPreview(sourceUri);
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
            `_structured_types.${message.command}`,
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
    this.previewPanels[sourceUri.fsPath] = { panel };
    panel.title = this.getTitle(sourceUri);
    this.updateProps(sourceUri);
  }

  public refreshPreview(sourceUri: vscode.Uri): void {
    this.updateProps(sourceUri);
  }

  private getPreview(sourceUri: vscode.Uri): PanelStore {
    return this.previewPanels[sourceUri.fsPath] || {};
  }
  public destroyPreview(sourceUri: vscode.Uri): void {
    const { panel } = this.getPreview(sourceUri);
    if (panel) {
      panel.dispose();
      delete this.previewPanels[sourceUri.fsPath];
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
			</body>
			</html>`;
  }

  openSymbol(filePath: string, symbolName: string): void {
    vscode.workspace
      .openTextDocument(vscode.Uri.file(filePath))
      .then((document) => {
        vscode.window.showTextDocument(document).then(() => {
          goToSymbol(document, symbolName);
        });
      });
  }
}

async function getSymbols(
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

async function goToSymbol(document: vscode.TextDocument, symbolName: string) {
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

function getUri(
  webview: vscode.Webview,
  extensionUri: vscode.Uri,
  pathList: string[],
): vscode.Uri {
  return webview.asWebviewUri(vscode.Uri.joinPath(extensionUri, ...pathList));
}
