import path from 'path';
import { parseFiles } from '../../../src/index';

describe('interface', () => {
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
      consolidateParents: true,
    });
    expect(results).toEqual({
      Bear: {
        name: 'Bear',
        kind: 14,
        properties: [
          {
            kind: 3,
            name: 'honey',
            description: 'boolean type member',
          },
          {
            parent: 'Internal',
            kind: 1,
            name: 'm',
            description: 'string type member',
          },
          {
            parent: 'Home',
            name: 'resident',
            kind: 15,
          },
        ],
        description: 'interface extending another one',
      },
      __parents: {
        Internal: {
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
        },
        Home: {
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
        },
      },
    });
  });
  it('enum-prop', () => {
    const results = parseFiles([path.resolve(__dirname, 'enum-prop.ts')], {
      consolidateParents: true,
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
            parent: 'StringEnums',
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
      __parents: {
        StringEnums: {
          name: 'StringEnums',
          kind: 5,
          properties: [
            {
              name: 'Up',
              kind: 1,
              value: 'UP',
            },
          ],
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
            type: {
              kind: 1,
            },
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
