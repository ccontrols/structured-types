import path from 'path';
import { parseFiles } from '../../../src/index';

describe('interface', () => {
  it('initialized-typecast', () => {
    const results = parseFiles([
      path.resolve(__dirname, 'initialized-typecast.ts'),
    ]);
    expect(results).toEqual({
      default: {
        name: 'default',
        kind: 14,
        type: 'Person',
        properties: [
          {
            name: 'title',
            kind: 1,
            value: 'Mr',
          },
          {
            name: 'name',
            properties: [
              {
                name: 'first',
                kind: 1,
                value: 'John',
                optional: true,
              },
              {
                name: 'family',
                optional: true,
                kind: 1,
              },
            ],
            optional: true,
            kind: 15,
          },
        ],
      },
    });
  });
  it('initialized-object', () => {
    const results = parseFiles([
      path.resolve(__dirname, 'initialized-object.ts'),
    ]);
    expect(results).toEqual({
      default: {
        name: 'Person',
        kind: 14,
        properties: [
          {
            name: 'title',
            kind: 1,
            value: 'Mr',
          },
          {
            name: 'name',
            properties: [
              {
                name: 'first',
                kind: 1,
                value: 'John',
                optional: true,
              },
              {
                name: 'family',
                optional: true,
                kind: 1,
              },
            ],
            optional: true,
            kind: 15,
          },
        ],
      },
    });
  });
  it('jsdoc-default', () => {
    const results = parseFiles([path.resolve(__dirname, 'jsdoc-default.ts')]);
    expect(results).toEqual({
      Interface: {
        name: 'Interface',
        kind: 14,
        properties: [
          {
            name: 'eat',
            kind: 4,
            properties: [
              {
                kind: 1,
                value: 'honey',
              },
              {
                kind: 1,
                value: 'bread',
              },
              {
                kind: 1,
                value: 'meat',
              },
            ],
            value: 'bread',
            description: 'union prop',
          },
        ],
      },
    });
  });
  it('extends-record', () => {
    const results = parseFiles([path.resolve(__dirname, 'extends-record.ts')]);

    expect(results).toEqual({
      Props: {
        name: 'Props',
        kind: 14,
        extends: [{ name: 'Base', token: 'Base:c2d43652d1' }],
        properties: [
          {
            name: 'm',
            kind: 1,
            description: 'interface member property',
            value: 'hello',
          },
          {
            name: 'n',
            parent: {
              name: 'Base',
              token: 'Base:c2d43652d1',
            },
            optional: true,
            kind: 15,
            type: 'Record',
            generics: [
              {
                kind: 1,
              },
              {
                kind: 15,
                properties: [
                  {
                    name: 'a',
                    kind: 3,
                  },
                ],
              },
            ],
          },
        ],
      },
    });
  });

  it('index-prop', () => {
    const results = parseFiles([path.resolve(__dirname, 'index-prop.ts')]);

    expect(results).toEqual({
      IndexInterface: {
        name: 'IndexInterface',
        kind: 14,
        properties: [
          {
            kind: 20,
            index: {
              kind: 2,
              name: 'index',
            },
            prop: {
              kind: 1,
            },
          },
        ],
      },
    });
  });
  it('record-props', () => {
    const results = parseFiles(
      [path.resolve(__dirname, 'record-props.ts')],
      {},
    );
    expect(results).toEqual({
      MyProps: {
        name: 'MyProps',
        kind: 14,
        properties: [
          {
            name: 'first',
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
    });
  });
  it('extends', () => {
    const results = parseFiles([path.resolve(__dirname, 'extends.ts')], {
      collectHelpers: true,
    });
    expect(results).toEqual({
      Bear: {
        name: 'Bear',
        kind: 14,
        extends: [
          { name: 'Internal', token: 'Internal:9ba9eeb224' },
          { name: 'Home', token: 'Home:4be6b0aae9' },
        ],
        properties: [
          {
            kind: 3,
            name: 'honey',
            description: 'boolean type member',
          },
          {
            parent: {
              name: 'Internal',
              token: 'Internal:9ba9eeb224',
            },
            kind: 1,
            name: 'm',
            description: 'string type member',
          },
          {
            parent: {
              name: 'Home',
              token: 'Home:4be6b0aae9',
            },
            properties: [
              {
                kind: 1,
                name: 'name',
              },
              {
                kind: 2,
                name: 'age',
              },
            ],
            name: 'resident',
            kind: 15,
          },
        ],
        description: 'interface extending another one',
      },
      __helpers: {
        'Internal:9ba9eeb224': {
          name: 'Internal',
          kind: 14,
          properties: [
            {
              kind: 1,
              name: 'm',
              description: 'string type member',
            },
          ],
          description: 'internal interface with one member',
          token: 'Internal:9ba9eeb224',
        },
        'Home:4be6b0aae9': {
          name: 'Home',
          kind: 14,
          properties: [
            {
              name: 'resident',
              kind: 15,
              properties: [
                {
                  kind: 1,
                  name: 'name',
                },
                {
                  kind: 2,
                  name: 'age',
                },
              ],
            },
          ],
          token: 'Home:4be6b0aae9',
        },
      },
    });
  });
  it('enum-prop', () => {
    const results = parseFiles([path.resolve(__dirname, 'enum-prop.ts')], {
      collectHelpers: true,
    });
    expect(results).toEqual({
      InterfaceWithEnumConstant: {
        name: 'InterfaceWithEnumConstant',
        kind: 14,
        properties: [
          {
            name: 'kind',
            kind: 1,
            description: 'kind is an enum constant',
            parent: {
              name: 'StringEnums',
              token: 'StringEnums:fb0af3ee11',
            },
            value: 'UP',
            type: 'Up',
          },
          {
            kind: 2,
            name: 'radius',
            description: 'radius property',
          },
        ],
      },
      __helpers: {
        'StringEnums:fb0af3ee11': {
          name: 'StringEnums',
          kind: 5,
          properties: [
            {
              name: 'Up',
              kind: 1,
              value: 'UP',
            },
          ],
          token: 'StringEnums:fb0af3ee11',
        },
      },
    });
  });

  it('array-implementation', () => {
    const results = parseFiles([
      path.resolve(__dirname, 'array-implementation.ts'),
    ]);
    expect(results).toEqual({
      InterfaceArrayType: {
        name: 'InterfaceArrayType',
        kind: 14,
        properties: [
          {
            kind: 2,
            name: 'length',
            description: 'Gets or sets the length of the array.',
          },
          {
            name: 'pop',
            kind: 11,
            returns: {
              kind: 4,
              properties: [
                {
                  type: 'Type',
                },
                {
                  kind: 8,
                },
              ],
              optional: true,
            },
            description:
              'Removes the last element from an array and returns it.',
          },
          {
            name: 'push',
            kind: 11,
            parameters: [
              {
                name: 'items',
                kind: 16,
                properties: [
                  {
                    type: 'Type',
                  },
                ],
                type: 'Array',
              },
            ],
            returns: {
              kind: 2,
              optional: true,
            },
            description:
              'Appends new elements to an array, and returns the new length of the array.',
          },
        ],
        generics: [
          {
            name: 'Type',
          },
        ],
      },
    });
  });

  it('generics', () => {
    const results = parseFiles([path.resolve(__dirname, 'generics.ts')]);
    expect(results).toEqual({
      GenericInterface: {
        name: 'GenericInterface',
        kind: 14,
        generics: [
          {
            name: 'Type',
          },
        ],
        properties: [
          {
            name: 'contents',
            type: 'Type',
          },
        ],
      },
    });
  });

  it('combined-props', () => {
    const results = parseFiles([path.resolve(__dirname, 'combined-props.ts')]);
    expect(results).toEqual({
      StringNumberPair: {
        name: 'StringNumberPair',
        kind: 14,
        properties: [
          {
            description: 'specialized properties',
            name: 'length',
            kind: 2,
            value: 2,
          },
          {
            kind: 1,
            name: '0',
          },
          {
            kind: 2,
            name: '1',
          },
          {
            description: "Other 'Array<string | number>' members...",
            name: 'slice',
            kind: 11,
            parameters: [
              {
                kind: 2,
                optional: true,
                name: 'start',
              },
              {
                kind: 2,
                optional: true,
                name: 'end',
              },
            ],
            returns: {
              kind: 16,
              properties: [
                {
                  kind: 4,
                  properties: [
                    {
                      kind: 1,
                    },
                    {
                      kind: 2,
                    },
                  ],
                },
              ],
              optional: true,
            },
          },
        ],
      },
    });
  });

  it('simple', () => {
    const results = parseFiles([path.resolve(__dirname, 'simple.ts')]);
    expect(results).toEqual({
      I: {
        description: 'this is interface\nmultiple lines',
        name: 'I',
        kind: 14,
        properties: [
          {
            description: 'interface member property',
            kind: 1,
            name: 'm',
          },
        ],
      },
    });
  });
});
