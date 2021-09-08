import path from 'path';
import { parseFiles } from '@structured-types/api';
import reactPlugin from '../../src';

describe('react-forward-ref', () => {
  it('initialized', () => {
    const result = parseFiles([path.resolve(__dirname, 'initialized.tsx')], {
      plugins: [reactPlugin],
    });
    expect(result).toEqual({
      FancyButton: {
        name: 'FancyButton',
        extension: 'react',
        kind: 11,
        properties: [
          {
            parent: 'OwnProps',
            optional: true,
            name: 'stringProp',
            kind: 1,
            value: 'test',
          },
        ],
      },
    });
  });
  it('hoc', () => {
    const result = parseFiles([path.resolve(__dirname, 'hoc.tsx')], {
      plugins: [reactPlugin],
    });
    expect(result).toEqual({
      default: {
        extension: 'react',
        kind: 11,
        properties: [
          {
            parent: 'OwnProps',
            optional: true,
            name: 'stringProp',
            kind: 1,
          },
        ],
        name: 'FancyButton',
      },
    });
  });
  it('composed-props', () => {
    const result = parseFiles([path.resolve(__dirname, 'composed-props.tsx')], {
      plugins: [reactPlugin],
    });
    expect(result).toMatchSnapshot();
  });
  it('default-props', () => {
    const result = parseFiles([path.resolve(__dirname, 'default-props.tsx')], {
      plugins: [reactPlugin],
    });
    expect(result).toEqual({
      FancyButton: {
        name: 'FancyButton',
        extension: 'react',
        kind: 11,
        properties: [
          {
            parent: 'OwnProps',
            optional: true,
            name: 'stringProp',
            kind: 1,
            value: 'default value',
          },
        ],
      },
    });
  });
  it('display-name', () => {
    const result = parseFiles([path.resolve(__dirname, 'display-name.tsx')], {
      plugins: [reactPlugin],
    });
    expect(result).toEqual({
      FancyButton: {
        name: 'CustomComponentName',
        extension: 'react',
        kind: 11,
        properties: [
          {
            parent: 'OwnProps',
            optional: true,
            name: 'stringProp',
            kind: 1,
          },
        ],
      },
    });
  });
  it('inline-initialized', () => {
    const result = parseFiles(
      [path.resolve(__dirname, 'inline-initialized.tsx')],
      {
        plugins: [reactPlugin],
      },
    );
    expect(result).toEqual({
      FancyButton: {
        name: 'FancyButton',
        extension: 'react',
        kind: 11,
        properties: [
          {
            parent: 'OwnProps',
            optional: true,
            name: 'stringProp',
            kind: 1,
            description: 'own string prop',
            value: 'hello',
          },
        ],
      },
    });
  });
  it('inline-props', () => {
    const result = parseFiles([path.resolve(__dirname, 'inline-props.tsx')], {
      plugins: [reactPlugin],
    });
    expect(result).toEqual({
      FancyButton: {
        name: 'FancyButton',
        extension: 'react',
        kind: 11,
        properties: [
          {
            parent: 'OwnProps',
            optional: true,
            name: 'stringProp',
            kind: 1,
            description: 'own string prop',
          },
        ],
      },
    });
  });
  it('no-props', () => {
    const result = parseFiles([path.resolve(__dirname, 'no-props.tsx')], {
      plugins: [reactPlugin],
    });
    expect(result).toEqual({
      default: {
        extension: 'react',
        kind: 11,
        name: 'default',
      },
    });
  });

  it('own-props', () => {
    const result = parseFiles([path.resolve(__dirname, 'own-props.tsx')], {
      plugins: [reactPlugin],
    });
    expect(result).toEqual({
      FancyButton: {
        name: 'FancyButton',
        extension: 'react',
        kind: 11,
        properties: [
          {
            parent: 'OwnProps',
            optional: true,
            name: 'stringProp',
            kind: 1,
          },
        ],
      },
    });
  });
});
