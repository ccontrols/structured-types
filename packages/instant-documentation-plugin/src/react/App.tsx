import React from 'react';
import ReactDOM from 'react-dom';
import type { Sandbox } from '../vendor/sandbox';
import { Results } from './Results';

export const renderUI = (sandbox: Sandbox): void => {
  ReactDOM.render(
    <React.StrictMode>
      <h3>Extract types</h3>
      <p>
        This plugin displays instant documentation from typescript types and
        jsdoc comments.
      </p>
      <Results sandbox={sandbox} />
    </React.StrictMode>,
    document.getElementById('root'),
  );
};
