import path from 'path';
import { parseFiles } from '@structured-types/api';
import reactPlugin from '../../src';

describe('function-component', () => {
  it('function-inline-props', () => {
    const result = parseFiles(
      [path.resolve(__dirname, 'function-inline-props.tsx')],
      {
        plugins: [reactPlugin],
      },
    );
    expect(result).toEqual({
      MyComponent: {
        name: 'MyComponent',
        kind: 11,
        framework: 'react',
        properties: [
          {
            name: 'name',
            optional: true,
            kind: 1,
            value: 'hello',
          },
        ],
      },
    });
  });
  it('default-props', () => {
    const result = parseFiles([path.resolve(__dirname, 'default-props.tsx')], {
      plugins: [reactPlugin],
      consolidateParents: false,
    });
    expect(result).toEqual({
      default: {
        name: 'MyComponent',
        framework: 'react',
        kind: 11,
        properties: [
          {
            parent: 'OwnProps',
            optional: true,
            name: 'stringProp',
            kind: 1,
            description: 'stringProp description',
            value: 'test',
          },
          {
            parent: 'OwnProps',
            name: 'numberProp',
            kind: 2,
            description: 'numberProp description',
          },
        ],
      },
    });
  });
  it('not-react', () => {
    const result = parseFiles([path.resolve(__dirname, 'not-react.tsx')], {
      plugins: [reactPlugin],
    });
    expect(result).toEqual({
      NotReactClass: {
        name: 'NotReactClass',
        kind: 13,
        properties: [
          {
            name: 'exec',
            kind: 11,
            parameters: [
              {
                name: 'condition',
                kind: 3,
              },
            ],
            returns: {
              kind: 3,
            },
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
      MyComponent: {
        name: 'MyComponent',
        kind: 11,
        framework: 'react',
      },
    });
  });

  it('display-name', () => {
    const result = parseFiles([path.resolve(__dirname, 'display-name.tsx')], {
      plugins: [reactPlugin],
      consolidateParents: false,
    });
    expect(result).toEqual({
      default: {
        name: 'CustomComponentName',
        framework: 'react',
        kind: 11,
        properties: [
          {
            parent: 'OwnProps',
            optional: true,
            name: 'stringProp',
            kind: 1,
            description: 'stringProp description',
          },
          {
            parent: 'OwnProps',
            name: 'numberProp',
            kind: 2,
            description: 'numberProp description',
          },
        ],
      },
    });
  });
  it('pick-props', () => {
    const result = parseFiles([path.resolve(__dirname, 'pick-props.tsx')], {
      plugins: [reactPlugin],
      consolidateParents: false,
      collectFilePath: false,
    });
    expect(result).toMatchSnapshot();
  });

  it('omit-props', () => {
    const result = parseFiles([path.resolve(__dirname, 'omit-props.tsx')], {
      plugins: [reactPlugin],
      consolidateParents: false,
    });
    expect(result).toEqual({
      MyComponent: {
        name: 'MyComponent',
        kind: 11,
        framework: 'react',
        properties: [
          {
            parent: 'PrimitmiveProps',
            name: 'stringProp',
            kind: 1,
          },
          {
            parent: 'ComponentProps',
            optional: true,
            name: 'prop1',
            kind: 4,
            properties: [
              {
                kind: 1,
                value: 'this',
              },
              {
                kind: 1,
                value: 'that',
              },
            ],
          },
        ],
      },
    });
  });

  it('typed-props', () => {
    const result = parseFiles([path.resolve(__dirname, 'typed-props.tsx')], {
      plugins: [reactPlugin],
    });
    expect(result).toEqual({
      MyComponent: {
        name: 'MyComponent',
        kind: 11,
        framework: 'react',
        properties: [
          {
            optional: true,
            name: 'name',
            kind: 1,
            description: 'optional string prop',
            value: 'hello',
          },
          {
            name: 'numProp',
            kind: 2,
            description: 'a required number prop',
          },
        ],
        description: 'special react component',
      },
    });
  });

  it('inline-props', () => {
    const result = parseFiles([path.resolve(__dirname, 'inline-props.tsx')], {
      plugins: [reactPlugin],
    });
    expect(result).toEqual({
      MyComponent: {
        name: 'MyComponent',
        kind: 11,
        framework: 'react',
        properties: [
          {
            name: 'name',
            optional: true,
            kind: 1,
            value: 'hello',
          },
        ],
      },
    });
  });
});
