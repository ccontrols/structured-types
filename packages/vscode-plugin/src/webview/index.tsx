interface VSCode {
  getState(): any;
  setState(state: any): void;
  postMessage(message: { type: string; value: any }): void;
}
declare const acquireVsCodeApi: () => VSCode;
(function () {
  const vscode = acquireVsCodeApi();
  const vscodeLinks = document.querySelectorAll('a[data-filepath]');
  vscodeLinks.forEach((link) => {
    link.addEventListener('click', (event: any) => {
      const filePath = decodeURIComponent(
        event.currentTarget.getAttribute('data-filepath'),
      );
      const loc = event.currentTarget.getAttribute('data-loc');
      vscode.postMessage({
        type: 'open_loc',
        value: {
          filePath,
          loc: loc ? JSON.parse(decodeURIComponent(loc)) : undefined,
        },
      });
    });
  });
})();

export {};
