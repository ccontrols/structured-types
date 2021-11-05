import path from 'path';
import { parseFiles } from '@structured-types/api';
import reactPlugin from '../../src';

const simpleResults = {
  MyComponent: {
    kind: 25,
    extension: 'react',
    properties: [
      {
        kind: 1,
        name: 'name',
      },
    ],
    name: 'MyComponent',
  },
};
describe('class-component', () => {
  it('exports-by-name', () => {
    const result = parseFiles(
      [path.resolve(__dirname, 'exports-by-name.tsx')],
      {
        plugins: [reactPlugin],
        collectHelpers: false,
      },
    );
    expect(result).toEqual({
      name: 'CustomComponent',
      extension: 'react',
      kind: 25,
      properties: [
        {
          name: 'name',
          parent: {
            name: 'CustomComponentProps',
          },
          kind: 1,
        },
      ],
    });
  });
  it('display-name-field', () => {
    const result = parseFiles(
      [path.resolve(__dirname, 'display-name-field.tsx')],
      {
        plugins: [reactPlugin],
        collectHelpers: false,
      },
    );
    expect(result).toEqual({
      default: {
        name: 'CustomComponentName',
        extension: 'react',
        kind: 25,
        properties: [
          {
            parent: {
              name: 'OwnProps',
            },
            optional: true,
            name: 'stringProp',
            kind: 1,
            description: 'stringProp description',
            value: 'test',
          },
          {
            parent: {
              name: 'OwnProps',
            },
            kind: 2,
            name: 'numberProp',
            description: 'numberProp description',
          },
        ],
        description: 'MyComponent special component',
      },
    });
  });
  it('default-props-field', () => {
    const result = parseFiles(
      [path.resolve(__dirname, 'default-props-field.tsx')],
      {
        plugins: [reactPlugin],
        collectHelpers: false,
      },
    );
    expect(result).toEqual({
      default: {
        name: 'MyComponent',
        kind: 25,
        extension: 'react',
        properties: [
          {
            parent: {
              name: 'OwnProps',
            },
            optional: true,
            name: 'stringProp',
            kind: 1,
            description: 'stringProp description',
            value: 'test',
          },
          {
            parent: {
              name: 'OwnProps',
            },
            kind: 2,
            name: 'numberProp',
            description: 'numberProp description',
          },
        ],
        description: 'MyComponent special component',
      },
    });
  });
  it('display-name-static', () => {
    const result = parseFiles(
      [path.resolve(__dirname, 'display-name-static.tsx')],
      {
        plugins: [reactPlugin],
        collectHelpers: false,
      },
    );
    expect(result).toEqual({
      MyComponent: {
        extension: 'react',
        name: 'CustomComponentName',
        kind: 25,
        description: 'MyComponent special component',
      },
    });
  });

  it('default-props-static', () => {
    const result = parseFiles(
      [path.resolve(__dirname, 'default-props-static.tsx')],
      {
        plugins: [reactPlugin],
        collectHelpers: false,
      },
    );
    expect(result).toEqual({
      MyComponent: {
        extension: 'react',
        name: 'MyComponent',
        kind: 25,
        properties: [
          {
            parent: {
              name: 'OwnProps',
            },
            optional: true,
            name: 'stringProp',
            kind: 1,
            description: 'stringProp description',
            value: 'test',
          },
          {
            parent: {
              name: 'OwnProps',
            },
            kind: 2,
            name: 'numberProp',
            description: 'numberProp description',
          },
        ],
        description: 'MyComponent special component',
      },
    });
  });
  it('pure-component', () => {
    const result = parseFiles([path.resolve(__dirname, 'pure-component.tsx')], {
      plugins: [reactPlugin],
    });
    expect(result).toEqual(simpleResults);
  });
  it('star-import', () => {
    const result = parseFiles([path.resolve(__dirname, 'star-import.tsx')], {
      plugins: [reactPlugin],
    });
    expect(result).toEqual(simpleResults);
  });
  it('inline-props', () => {
    const result = parseFiles([path.resolve(__dirname, 'inline-props.tsx')], {
      plugins: [reactPlugin],
    });
    expect(result).toEqual(simpleResults);
  });
  it('alias-component', () => {
    const result = parseFiles(
      [path.resolve(__dirname, 'alias-component.tsx')],
      {
        plugins: [reactPlugin],
      },
    );
    expect(result).toEqual(simpleResults);
  });
  it('named-component', () => {
    const result = parseFiles(
      [path.resolve(__dirname, 'named-component.tsx')],
      {
        plugins: [reactPlugin],
      },
    );
    expect(result).toEqual(simpleResults);
  });
  it('composed-props', () => {
    const result = parseFiles([path.resolve(__dirname, 'composed-props.tsx')], {
      plugins: [reactPlugin],
    });
    expect(result).toMatchSnapshot();
  });
  it('default-export', () => {
    const result = parseFiles([path.resolve(__dirname, 'default-export.tsx')], {
      plugins: [reactPlugin],
      collectHelpers: false,
    });
    expect(result).toEqual({
      default: {
        name: 'MyComponent',
        kind: 25,
        extension: 'react',
        properties: [
          {
            parent: {
              name: 'OwnProps',
            },
            optional: true,
            name: 'stringProp',
            kind: 1,
            description: 'stringProp description',
          },
          {
            parent: {
              name: 'OwnProps',
            },
            kind: 2,
            name: 'numberProp',
            description: 'numberProp description',
          },
        ],
        description: 'MyComponent special component',
      },
    });
  });
  it('named-export', () => {
    const result = parseFiles([path.resolve(__dirname, 'named-export.tsx')], {
      plugins: [reactPlugin],
      collectHelpers: false,
    });
    expect(result).toEqual({
      MyComponent: {
        name: 'MyComponent',
        kind: 25,
        extension: 'react',
        properties: [
          {
            parent: {
              name: 'OwnProps',
            },
            optional: true,
            name: 'stringProp',
            kind: 1,
            description: 'stringProp description',
          },
          {
            parent: {
              name: 'OwnProps',
            },
            kind: 2,
            name: 'numberProp',
            description: 'numberProp description',
          },
        ],
        description: 'MyComponent special component',
      },
    });
  });
});
