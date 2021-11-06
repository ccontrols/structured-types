// code from https://codebycorey.com/blog/building-a-vscode-extension-part-four
interface VSCode {
  getState(): any;
  setState(state: any): void;
  postMessage(message: { type: string; value: any }): void;
}
declare const acquireVsCodeApi: () => VSCode;

interface VSCodeApi {
  getState: () => any;
  setState: (newState: any) => any;
  postMessage: (message: any) => void;
}

class VSCodeWrapper {
  private readonly vscodeApi: VSCodeApi = acquireVsCodeApi();

  /**
   * Send message to the extension framework.
   * @param message
   */
  public postMessage(message: any): void {
    this.vscodeApi.postMessage(message);
  }

  /**
   * Add listener for messages from extension framework.
   * @param callback called when the extension sends a message
   * @returns function to clean up the message eventListener.
   */
  public onMessage(callback: (message: any) => void): () => void {
    window.addEventListener('message', callback);
    return () => window.removeEventListener('message', callback);
  }
  setState = ({ key, value }: { key: string; value: any }) => {
    const previousState = this.vscodeApi.getState();
    const state = previousState ? { ...previousState } : {};
    this.vscodeApi.setState({ ...state, [key]: value });
  };

  getState = (key: string) => {
    const previousState = this.vscodeApi.getState();
    return previousState ? previousState[key] : null;
  };
}

export const VSCodeAPI: VSCodeWrapper = new VSCodeWrapper();
