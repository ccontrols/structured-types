import path from 'path';
import { parseFiles } from '@structured-types/api';
import reactPlugin from '../../src';

describe('react-flow', () => {
  it('extend-props', () => {
    const result = parseFiles([path.resolve(__dirname, 'extend-props.tsx')], {
      plugins: [reactPlugin],
    });
    expect(result).toEqual({
      MyComponent: {
        name: 'MyComponent',
        extension: 'react',
        kind: 25,
        properties: [
          {
            parent: {
              name: 'Props',
            },
            name: 'DefaultProps',
          },
          {
            parent: {
              name: 'Props',
            },
            optional: true,
            name: 'bar',
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
      MyComponent: {
        name: 'MyComponent',
        extension: 'react',
        kind: 25,
        properties: [
          {
            parent: {
              name: 'Props',
            },
            name: 'foo',
            kind: 2,
          },
          {
            parent: {
              name: 'Props',
            },
            optional: true,
            name: 'bar',
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
      MyComponent: {
        name: 'MyComponent',
        extension: 'react',
        kind: 25,
        properties: [
          {
            parent: {
              name: 'Props',
            },
            name: 'foo',
            kind: 2,
          },
          {
            parent: {
              name: 'Props',
            },
            optional: true,
            name: 'bar',
            kind: 1,
          },
        ],
      },
    });
  });
});
