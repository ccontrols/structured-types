import React from 'react';
import ReactDOM from 'react-dom/server';
import { App } from './App';
import { Node } from './types';

module.exports.renderPage = (nodes: Node[]): string =>
  ReactDOM.renderToString(<App nodes={nodes} />);
