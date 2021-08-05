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
        kind: 13,
        properties: [
          {
            parent: 'Props',
            name: 'DefaultProps',
          },
          {
            parent: 'Props',
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
        kind: 11,
        properties: [
          {
            parent: 'Props',
            name: 'foo',
            kind: 2,
          },
          {
            parent: 'Props',
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
        kind: 13,
        properties: [
          {
            parent: 'Props',
            name: 'foo',
            kind: 2,
          },
          {
            parent: 'Props',
            optional: true,
            name: 'bar',
            kind: 1,
          },
        ],
      },
    });
  });
});
