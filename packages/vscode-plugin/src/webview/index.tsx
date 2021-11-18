import React from 'react';
import ReactDOM from 'react-dom';
import {
  provideVSCodeDesignSystem,
  allComponents,
} from '@vscode/webview-ui-toolkit';
import './fast-components';
import { App } from './App';

provideVSCodeDesignSystem().register(allComponents);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);
