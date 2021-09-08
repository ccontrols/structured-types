import path from 'path';
import { parseFiles } from '@structured-types/api';
import reactPlugin from '@structured-types/react-plugin';
import propsPlugin from '../../src';

describe('prop-types-types', () => {
  it('default-props', () => {
    const result = parseFiles([path.resolve(__dirname, 'default-props.tsx')], {
      plugins: [propsPlugin, reactPlugin],
      consolidateParents: false,
    });
    expect(result).toEqual({
      default: {
        name: 'MyComponent',
        extension: 'react',
        kind: 11,
        properties: [
          {
            name: 'stringProp',
            parent: 'OwnProps',
            kind: 1,
            value: 'test',
            optional: true,
            description: 'stringProp description',
          },
          {
            name: 'numberProp',
            parent: 'OwnProps',
            kind: 2,
            description: 'numberProp description',
          },
        ],
      },
    });
  });
  it('instance-of', () => {
    const result = parseFiles([path.resolve(__dirname, 'instance-of.jsx')], {
      plugins: [propsPlugin],
      consolidateParents: false,
    });
    expect(result).toEqual({
      MyComponent: {
        name: 'MyComponent',
        extension: 'react-prop-types',
        kind: 11,
        properties: [
          {
            name: 'Person',
            kind: 13,
            properties: [
              {
                name: 'name',
                kind: 1,
                description: 'name of a person is a string',
              },
            ],
            description: 'Creates a new Person.',
            optional: true,
          },
        ],
        description: 'MyComponent special component',
      },
    });
  });
  it('boolean', () => {
    const result = parseFiles([path.resolve(__dirname, 'boolean.jsx')], {
      plugins: [propsPlugin],
      consolidateParents: false,
    });
    expect(result).toEqual({
      MyComponent: {
        name: 'MyComponent',
        extension: 'react-prop-types',
        kind: 11,
        properties: [
          {
            name: 'optionalBool',
            kind: 3,
            optional: true,
            value: false,
            description: 'optional bool prop description',
          },
        ],
        description: 'MyComponent special component',
      },
    });
  });
  it('exact', () => {
    const result = parseFiles([path.resolve(__dirname, 'exact.jsx')], {
      plugins: [propsPlugin],
      consolidateParents: false,
    });
    expect(result).toEqual({
      MyComponent: {
        name: 'MyComponent',
        extension: 'react-prop-types',
        kind: 11,
        properties: [
          {
            name: 'aPerson',
            kind: 26,
            properties: [
              {
                kind: 1,
                optional: true,
                name: 'color',
              },
              {
                kind: 2,
                optional: true,
                name: 'fontSize',
              },
              {
                name: 'person',
                kind: 13,
                properties: [
                  {
                    name: 'name',
                    kind: 1,
                    description: 'name of a person is a string',
                  },
                ],
                description: 'Creates a new Person.',
                optional: true,
              },
            ],
            optional: true,
          },
        ],
        description: 'MyComponent special component',
      },
    });
  });
  it('shape', () => {
    const result = parseFiles([path.resolve(__dirname, 'shape.jsx')], {
      plugins: [propsPlugin],
      consolidateParents: false,
    });
    expect(result).toEqual({
      MyComponent: {
        name: 'MyComponent',
        extension: 'react-prop-types',
        kind: 11,
        properties: [
          {
            name: 'aPerson',
            kind: 26,
            properties: [
              {
                kind: 1,
                optional: true,
                name: 'color',
              },
              {
                kind: 2,
                optional: true,
                name: 'fontSize',
              },
              {
                name: 'person',
                kind: 13,
                properties: [
                  {
                    name: 'name',
                    kind: 1,
                    description: 'name of a person is a string',
                  },
                ],
                description: 'Creates a new Person.',
                optional: true,
              },
            ],
            optional: true,
          },
        ],
        description: 'MyComponent special component',
      },
    });
  });
  it('object-of', () => {
    const result = parseFiles([path.resolve(__dirname, 'object-of.jsx')], {
      plugins: [propsPlugin],
      consolidateParents: false,
    });
    expect(result).toEqual({
      MyComponent: {
        name: 'MyComponent',
        extension: 'react-prop-types',
        kind: 11,
        properties: [
          {
            name: 'optionalObj',
            type: {
              kind: 2,
              optional: true,
            },
            kind: 26,
            optional: true,
            description: 'optional object prop description',
          },
        ],
        description: 'MyComponent special component',
      },
    });
  });
  it('array-of', () => {
    const result = parseFiles([path.resolve(__dirname, 'array-of.jsx')], {
      plugins: [propsPlugin],
      consolidateParents: false,
    });
    expect(result).toEqual({
      MyComponent: {
        name: 'MyComponent',
        extension: 'react-prop-types',
        kind: 11,
        properties: [
          {
            name: 'optionalArrayOf',
            kind: 16,
            properties: [
              {
                kind: 2,
                optional: true,
              },
            ],
            optional: true,
            description: 'optional arrayOf prop description',
          },
        ],
        description: 'MyComponent special component',
      },
    });
  });
  it('one-of-type', () => {
    const result = parseFiles([path.resolve(__dirname, 'one-of-type.jsx')], {
      plugins: [propsPlugin],
      consolidateParents: false,
    });
    expect(result).toEqual({
      MyComponent: {
        name: 'MyComponent',
        extension: 'react-prop-types',
        kind: 11,
        properties: [
          {
            name: 'optionalUnion',
            kind: 4,
            properties: [
              {
                kind: 1,
                optional: true,
              },
              {
                kind: 2,
                optional: true,
              },
              {
                name: 'Person',
                kind: 13,
                properties: [
                  {
                    name: 'name',
                    kind: 1,
                    description: 'name of a person is a string',
                  },
                ],
                description: 'Creates a new Person.',
                optional: true,
              },
            ],
            optional: true,
            description: 'optional union prop description',
          },
        ],
        description: 'MyComponent special component',
      },
    });
  });
  it('one-of', () => {
    const result = parseFiles([path.resolve(__dirname, 'one-of.jsx')], {
      plugins: [propsPlugin],
      consolidateParents: false,
    });
    expect(result).toEqual({
      MyComponent: {
        name: 'MyComponent',
        extension: 'react-prop-types',
        kind: 11,
        properties: [
          {
            name: 'optionalUnion',
            kind: 4,
            properties: [
              {
                kind: 1,
                value: 'News',
              },
              {
                kind: 1,
                value: 'Photos',
              },
            ],
            optional: true,
            description: 'optional union prop description',
          },
        ],
        description: 'MyComponent special component',
      },
    });
  });

  it('element-type', () => {
    const result = parseFiles([path.resolve(__dirname, 'element-type.jsx')], {
      plugins: [propsPlugin],
      consolidateParents: false,
    });
    expect(result).toEqual({
      MyComponent: {
        name: 'MyComponent',
        extension: 'react-prop-types',
        kind: 11,
        properties: [
          {
            name: 'Component',
            kind: 15,
            type: 'React.ElementType',
            description: 'elementType prop description',
          },
        ],
        description: 'MyComponent special component',
      },
    });
  });
  it('element', () => {
    const result = parseFiles([path.resolve(__dirname, 'element.jsx')], {
      plugins: [propsPlugin],
      consolidateParents: false,
    });
    expect(result).toEqual({
      MyComponent: {
        name: 'MyComponent',
        extension: 'react-prop-types',
        kind: 11,
        properties: [
          {
            name: 'optionalElement',
            kind: 15,
            type: 'React.Element',
            optional: true,
            description: 'optional element prop description',
          },
        ],
        description: 'MyComponent special component',
      },
    });
  });
  it('node', () => {
    const result = parseFiles([path.resolve(__dirname, 'node.jsx')], {
      plugins: [propsPlugin],
      consolidateParents: false,
    });
    expect(result).toEqual({
      MyComponent: {
        name: 'MyComponent',
        extension: 'react-prop-types',
        kind: 11,
        properties: [
          {
            name: 'optionalNode',
            kind: 15,
            type: 'React.ReactNode',
            optional: true,
            description: 'optional node prop description',
          },
        ],
        description: 'MyComponent special component',
      },
    });
  });
  it('symbol', () => {
    const result = parseFiles([path.resolve(__dirname, 'symbol.jsx')], {
      plugins: [propsPlugin],
      consolidateParents: false,
    });
    expect(result).toEqual({
      MyComponent: {
        name: 'MyComponent',
        extension: 'react-prop-types',
        kind: 11,
        properties: [
          {
            name: 'optionalSymbol',
            kind: 1,
            type: 'Symbol',
            optional: true,
            description: 'optional symbol prop description',
          },
        ],
        description: 'MyComponent special component',
      },
    });
  });
  it('string', () => {
    const result = parseFiles([path.resolve(__dirname, 'string.jsx')], {
      plugins: [propsPlugin],
      consolidateParents: false,
    });
    expect(result).toEqual({
      MyComponent: {
        name: 'MyComponent',
        extension: 'react-prop-types',
        kind: 11,
        properties: [
          {
            name: 'optionalString',
            kind: 1,
            optional: true,
            description: 'optional string prop description',
            value: 'hello',
          },
        ],
        description: 'MyComponent special component',
      },
    });
  });
  it('object', () => {
    const result = parseFiles([path.resolve(__dirname, 'object.jsx')], {
      plugins: [propsPlugin],
      consolidateParents: false,
    });
    expect(result).toEqual({
      MyComponent: {
        name: 'MyComponent',
        extension: 'react-prop-types',
        kind: 11,
        properties: [
          {
            name: 'optionalObj',
            kind: 26,
            optional: true,
            description: 'optional object prop description',
          },
        ],
        description: 'MyComponent special component',
      },
    });
  });
  it('number', () => {
    const result = parseFiles([path.resolve(__dirname, 'number.jsx')], {
      plugins: [propsPlugin],
      consolidateParents: false,
    });
    expect(result).toEqual({
      MyComponent: {
        name: 'MyComponent',
        extension: 'react-prop-types',
        kind: 11,
        properties: [
          {
            name: 'optionalNumber',
            kind: 2,
            optional: true,
            description: 'optional number prop description',
            value: 2,
          },
        ],
        description: 'MyComponent special component',
      },
    });
  });
  it('function', () => {
    const result = parseFiles([path.resolve(__dirname, 'function.jsx')], {
      plugins: [propsPlugin],
      consolidateParents: false,
    });
    expect(result).toEqual({
      MyComponent: {
        name: 'MyComponent',
        extension: 'react-prop-types',
        kind: 11,
        properties: [
          {
            name: 'optionalfunc',
            kind: 11,
            optional: true,
            description: 'optional func prop description',
          },
        ],
        description: 'MyComponent special component',
      },
    });
  });

  it('array', () => {
    const result = parseFiles([path.resolve(__dirname, 'array.jsx')], {
      plugins: [propsPlugin],
      consolidateParents: false,
    });
    expect(result).toEqual({
      MyComponent: {
        name: 'MyComponent',
        extension: 'react-prop-types',
        kind: 11,
        properties: [
          {
            name: 'optionalArray',
            kind: 16,
            optional: true,
            description: 'optional Array prop description',
          },
        ],
        description: 'MyComponent special component',
      },
    });
  });
});
