import path from 'path';
import { parseFiles } from '@structured-types/api';
import propsPlugin from '../../src';

describe('prop-types-class-component', () => {
  it('hoc', () => {
    const result = parseFiles([path.resolve(__dirname, 'hoc.jsx')], {
      plugins: [propsPlugin],
      consolidateParents: false,
    });
    expect(result).toEqual({
      NamedClassImport: {
        kind: 11,
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
      consolidateParents: false,
    });
    expect(result).toEqual({
      MyComponent: {
        kind: 11,
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
      consolidateParents: false,
    });
    expect(result).toEqual({
      default: {
        kind: 11,
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
