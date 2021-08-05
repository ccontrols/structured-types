import path from 'path';
import { parseFiles } from '@structured-types/api';
import reactPlugin from '../../src';

describe('react-hoc', () => {
  it('multiple-hoc', () => {
    const result = parseFiles([path.resolve(__dirname, 'multiple-hoc.tsx')], {
      plugins: [reactPlugin],
    });
    expect(result).toEqual({
      NamedClassImport: {
        name: 'ClassComponent',
        extension: 'react',
        kind: 13,
        properties: [
          {
            parent: 'OwnProps',
            optional: true,
            name: 'stringProp',
            kind: 1,
          },
        ],
      },
      NamedFunctionImport: {
        name: 'FunctionComponent',
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
  it('function-component', () => {
    const result = parseFiles(
      [path.resolve(__dirname, 'function-component.tsx')],
      {
        plugins: [reactPlugin],
      },
    );
    expect(result).toEqual({
      NamedImport: {
        name: 'MyComponent',
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
      default: {
        extension: 'react',
        kind: 11,
        name: 'MyComponent',
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
  it('class-component', () => {
    const result = parseFiles(
      [path.resolve(__dirname, 'class-component.tsx')],
      {
        plugins: [reactPlugin],
      },
    );
    expect(result).toEqual({
      NamedImport: {
        name: 'MyComponent',
        extension: 'react',
        kind: 13,
        properties: [
          {
            parent: 'OwnProps',
            optional: true,
            name: 'stringProp',
            kind: 1,
          },
        ],
      },
      default: {
        extension: 'react',
        kind: 13,
        name: 'MyComponent',
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
