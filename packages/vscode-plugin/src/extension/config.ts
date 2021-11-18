import * as vscode from 'vscode';
import { DocumentationOptions } from '@structured-types/api-docs';
export interface VSCodeConfig extends DocumentationOptions {
  singlePage: boolean | undefined;
  autoShowDocumentation: boolean | undefined;
}

export class ConfigStore {
  private _config: VSCodeConfig = {
    singlePage: true,
    autoShowDocumentation: false,
  };
  constructor() {
    this.readConfig();
  }
  get config(): VSCodeConfig {
    return this._config;
  }
  private readValue = <P extends unknown>(
    config: vscode.WorkspaceConfiguration,
    key: string,
  ): P | undefined => {
    const value = config.get<P>(key);
    if (typeof value === 'string' && value === '') {
      return undefined;
    } else if (Array.isArray(value) && value.length === 0) {
      return undefined;
    }
    return value;
  };
  public readConfig(): VSCodeConfig {
    const config = vscode.workspace.getConfiguration('instant-documentation');
    this._config.singlePage = this.readValue<boolean>(config, 'singlePage');
    this._config.autoShowDocumentation = this.readValue<boolean>(
      config,
      'autoShowDocumentation',
    );
    this._config.collapsed = this.readValue<DocumentationOptions['collapsed']>(
      config,
      'collapsed',
    );

    this._config.visible = this.readValue<DocumentationOptions['visible']>(
      config,
      'visible',
    );
    this._config.extensions = this.readValue<
      DocumentationOptions['extensions']
    >(config, 'extensions');
    this._config.columns = this.readValue<DocumentationOptions['columns']>(
      config,
      'columns',
    );
    this._config.sections = this.readValue<DocumentationOptions['sections']>(
      config,
      'sections',
    );
    this._config.skipInherited = this.readValue<
      DocumentationOptions['skipInherited']
    >(config, 'skipInherited');
    Object.keys(this._config).forEach((key) => {
      const name = key as keyof VSCodeConfig;
      if (this._config[name] === undefined) {
        delete this._config[name];
      }
    });
    return this._config;
  }
}
