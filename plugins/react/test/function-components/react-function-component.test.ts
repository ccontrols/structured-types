import path from 'path';
import { parseFiles } from '@structured-types/api';
import reactPlugin from '../../src';

describe('function-component', () => {
  it('rest-props', () => {
    const result = parseFiles([path.resolve(__dirname, 'rest-props.tsx')], {
      plugins: [reactPlugin],
    });
    expect(result).toEqual({
      MyComponent: {
        name: 'MyComponent',
        extension: 'react',
        kind: 25,
        properties: [
          {
            name: 'stringProp',
            parent: 'Props',
            kind: 1,
          },
          {
            name: 'boolProp',
            parent: 'Props',
            kind: 3,
          },
        ],
      },
    });
  });
  it('event-handler', () => {
    const result = parseFiles([path.resolve(__dirname, 'event-handler.tsx')], {
      plugins: [reactPlugin],
    });
    expect(result).toEqual({
      Clickable: {
        name: 'Clickable',
        extension: 'react',
        kind: 25,
        properties: [
          {
            name: 'onClick',
            parent: 'ClickableProps',
            optional: true,
            kind: 4,
            properties: [
              {
                kind: 11,
                type: 'MouseEventHandler',
                generics: [
                  {
                    name: 'T',
                  },
                ],
                parameters: [
                  {
                    name: 'event',
                    type: 'E',
                  },
                ],
                returns: {
                  kind: 12,
                },
                name: 'MouseEventHandler',
              },
              {
                kind: 8,
              },
            ],
          },
        ],
        description: 'Clickable special component',
      },
    });
  });
  it('Editor', () => {
    const result = parseFiles(
      [
        path.resolve(
          __dirname,
          '../../../../site/src/components/viewers/JSONViewer.tsx',
        ),
      ],
      {
        plugins: [reactPlugin],
        collectHelpers: true,
        extract: ['JSONViewer'],
      },
    );
    expect(result).toMatchSnapshot();
  });
  it('record-props', () => {
    const result = parseFiles([path.resolve(__dirname, 'record-props.tsx')], {
      plugins: [reactPlugin],
    });
    expect(result).toEqual({
      default: {
        name: 'MyComponent',
        extension: 'react',
        kind: 25,
        properties: [
          {
            name: 'first',
            parent: 'MyProps',
            kind: 15,
            type: 'Record',
            generics: [
              {
                kind: 1,
              },
              {
                kind: 1,
              },
            ],
          },
          {
            name: 'second',
            parent: 'MyProps',
            optional: true,
            kind: 15,
            type: 'Record',
            generics: [
              {
                kind: 1,
              },
              {
                kind: 1,
              },
            ],
          },
        ],
      },
      MyProps: {
        kind: 14,
        name: 'MyProps',
        properties: [
          {
            generics: [
              {
                kind: 1,
              },
              {
                kind: 1,
              },
            ],
            kind: 15,
            name: 'first',
            type: 'Record',
          },
          {
            generics: [
              {
                kind: 1,
              },
              {
                kind: 1,
              },
            ],
            kind: 15,
            name: 'second',
            optional: true,
            type: 'Record',
          },
        ],
      },
    });
  });
  it('default-props', () => {
    const result = parseFiles([path.resolve(__dirname, 'default-props.tsx')], {
      plugins: [reactPlugin],
      collectHelpers: false,
    });
    expect(result).toEqual({
      default: {
        name: 'MyComponent',
        extension: 'react',
        kind: 25,
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
        kind: 25,
        extension: 'react',
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
        kind: 25,
        extension: 'react',
      },
    });
  });

  it('display-name', () => {
    const result = parseFiles([path.resolve(__dirname, 'display-name.tsx')], {
      plugins: [reactPlugin],
      collectHelpers: false,
    });
    expect(result).toEqual({
      default: {
        name: 'CustomComponentName',
        extension: 'react',
        kind: 25,
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
      collectHelpers: false,
    });
    expect(result).toMatchSnapshot();
  });

  it('omit-props', () => {
    const result = parseFiles([path.resolve(__dirname, 'omit-props.tsx')], {
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
        kind: 25,
        extension: 'react',
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
        kind: 25,
        extension: 'react',
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
