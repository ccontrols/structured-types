import path from 'path';
import { parseFiles } from '@structured-types/api';
import propsPlugin from '../../src';

describe('prop-types-class-component', () => {
  it('with-children', () => {
    const result = parseFiles([path.resolve(__dirname, 'with-children.jsx')], {
      plugins: [{ ...propsPlugin, filter: undefined }],
      collectHelpers: false,
    });
    expect(result).toEqual({
      default: {
        name: 'ButtonWithPropTypes',
        extension: 'react-prop-types',
        kind: 25,
        properties: [
          {
            name: 'children',
            kind: 15,
            type: 'React.Element',
            optional: true,
            description: 'Description of prop "children".',
          },
          {
            name: 'foo',
            kind: 2,
            optional: true,
            value: 42,
            description: 'Description of prop "foo".',
          },
          {
            name: 'baz',
            kind: 4,
            properties: [
              {
                kind: 2,
                optional: true,
              },
              {
                kind: 1,
                optional: true,
              },
            ],
            optional: true,
            description: 'Description of prop "baz".',
          },
        ],
      },
    });
  });
  it('hoc', () => {
    const result = parseFiles([path.resolve(__dirname, 'hoc.jsx')], {
      plugins: [propsPlugin],
      collectHelpers: false,
    });
    expect(result).toEqual({
      NamedClassImport: {
        kind: 25,
        extension: 'react-prop-types',
        properties: [
          {
            name: 'stringProp',
            kind: 1,
            optional: true,
            description: 'stringProp description',
            value: 'test',
          },
          {
            name: 'numberProp',
            kind: 2,
            description: 'numberProp description',
          },
        ],
        description: 'MyComponent special component',
        name: 'MyComponent',
      },
    });
  });
  it('default-props-static', () => {
    const result = parseFiles(
      [path.resolve(__dirname, 'default-props-static.jsx')],
      {
        plugins: [propsPlugin],
        collectHelpers: false,
      },
    );
    expect(result).toEqual({
      MyComponent: {
        kind: 25,
        extension: 'react-prop-types',
        properties: [
          {
            name: 'stringProp',
            kind: 1,
            optional: true,
            description: 'stringProp description',
            value: 'test',
          },
          {
            name: 'numberProp',
            kind: 2,
            description: 'numberProp description',
          },
        ],
        description: 'MyComponent special component',
        name: 'MyComponent',
      },
    });
  });
  it('named-export', () => {
    const result = parseFiles([path.resolve(__dirname, 'named-export.jsx')], {
      plugins: [propsPlugin],
      collectHelpers: false,
    });
    expect(result).toEqual({
      MyComponent: {
        kind: 25,
        extension: 'react-prop-types',
        properties: [
          {
            name: 'stringProp',
            kind: 1,
            optional: true,
            description: 'stringProp description',
            value: 'test',
          },
          {
            name: 'numberProp',
            kind: 2,
            description: 'numberProp description',
          },
        ],
        description: 'MyComponent special component',
        name: 'MyComponent',
      },
    });
  });
  it('default-export', () => {
    const result = parseFiles([path.resolve(__dirname, 'default-export.jsx')], {
      plugins: [propsPlugin],
      collectHelpers: false,
    });
    expect(result).toEqual({
      default: {
        kind: 25,
        extension: 'react-prop-types',
        properties: [
          {
            name: 'stringProp',
            kind: 1,
            optional: true,
            description: 'stringProp description',
            value: 'test',
          },
          {
            name: 'numberProp',
            kind: 2,
            description: 'numberProp description',
          },
        ],
        description: 'MyComponent special component',
        name: 'MyComponent',
      },
    });
  });
});
