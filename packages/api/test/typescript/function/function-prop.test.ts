import path from 'path';
import { parseFiles } from '../../../src/index';

describe('function', () => {
  it('extends-parameter', () => {
    const results = parseFiles(
      [path.resolve(__dirname, 'extends-parameter.ts')],
      { collectHelpers: true },
    );
    expect(results).toEqual({
      paintHomeyBear: {
        name: 'paintHomeyBear',
        kind: 11,
        parameters: [
          {
            kind: 15,
            type: 'ExtendT',
            properties: [
              {
                name: 'm',
                parent: 'T',
                kind: 1,
                description: 'base type member property',
              },
              {
                name: 'honey',
                kind: 3,
                description: 'own member',
              },
            ],
            name: 'ExtendT',
            description: 'extended type',
          },
        ],
        returns: {
          kind: 14,
          type: 'Bear',
          extends: ['Internal'],
          properties: [
            {
              name: 'honey',
              kind: 3,
              description: 'boolean type member',
            },
            {
              name: 'm',
              parent: 'Internal',
              kind: 1,
              description: 'string type member',
            },
          ],
          name: 'Bear',
          description: 'interface extending another one',
        },
        description: 'exported function',
      },
      __helpers: {
        Bear: {
          description: 'interface extending another one',
          kind: 14,
          name: 'Bear',
          extends: ['Internal'],
          properties: [
            {
              description: 'boolean type member',
              kind: 3,
              name: 'honey',
            },
            {
              description: 'string type member',
              kind: 1,
              name: 'm',
              parent: 'Internal',
            },
          ],
        },
        ExtendT: {
          description: 'extended type',
          kind: 15,
          name: 'ExtendT',
          properties: [
            {
              description: 'base type member property',
              kind: 1,
              name: 'm',
              parent: 'T',
            },
            {
              description: 'own member',
              kind: 3,
              name: 'honey',
            },
          ],
        },

        T: {
          name: 'T',
          kind: 15,
          properties: [
            {
              name: 'm',
              kind: 1,
              description: 'base type member property',
            },
          ],
          description: 'base type',
        },

        Internal: {
          name: 'Internal',
          kind: 14,
          properties: [
            {
              name: 'm',
              kind: 1,
              description: 'string type member',
            },
          ],
          description: 'internal interface with one member',
        },
      },
    });
  });
  it('inline-props', () => {
    const results = parseFiles([path.resolve(__dirname, 'inline-props.ts')], {
      collectHelpers: true,
    });

    expect(results).toEqual({
      inlineProps: {
        name: 'inlineProps',
        kind: 11,
        parameters: [
          {
            name: 'props',
            kind: 15,
            properties: [
              {
                name: 'stringProp',
                kind: 1,
              },
              {
                name: 'numProp',
                kind: 2,
              },
            ],
          },
        ],
        returns: {
          kind: 12,
        },
      },
    });
  });
  it('class-prop', () => {
    const results = parseFiles([path.resolve(__dirname, 'class-prop.ts')]);
    expect(results).toEqual({
      Boz: {
        name: 'Boz',
        kind: 13,
        properties: [
          {
            name: 'fn',
            kind: 11,
            parameters: [
              {
                name: 'foo',
                kind: 13,
                type: 'Foo',
                properties: [
                  {
                    parent: 'Foo',
                    static: true,
                    readonly: true,
                    name: 'dummy',
                    kind: 3,
                    value: false,
                  },
                ],
              },
            ],
            returns: {
              kind: 12,
            },
          },
        ],
      },
    });
  });
  it('async-function', () => {
    const results = parseFiles([path.resolve(__dirname, 'async-function.ts')]);
    expect(results).toEqual({
      genMyClass: {
        async: true,
        name: 'genMyClass',
        kind: 11,
        returns: {
          description: 'Represents the completion of an asynchronous operation',
          kind: 14,
          name: 'Promise',
          type: 'PromiseConstructor',
        },
      },
    });
  });

  it('generic-parameter', () => {
    const results = parseFiles(
      [path.resolve(__dirname, 'generic-parameter.ts')],
      { collectHelpers: true },
    );
    expect(results).toEqual({
      genericFunction: {
        name: 'genericFunction',
        kind: 11,
        parameters: [
          {
            name: 'box',
            kind: 14,
            generics: [
              {
                name: 'Type',
              },
            ],
            type: 'GenericInterface',
            properties: [
              {
                parent: 'GenericInterface',
                name: 'm',
                type: 'T',
              },
            ],
          },
          {
            name: 'newContents',
            type: 'Type',
          },
        ],
        returns: {
          kind: 14,
          generics: [
            {
              name: 'T',
            },
          ],
          name: 'GenericInterface',
          type: 'GenericInterface',
          properties: [
            {
              name: 'm',
              type: 'T',
            },
          ],
        },
        types: [
          {
            name: 'Type',
          },
        ],
      },
      __helpers: {
        GenericInterface: {
          name: 'GenericInterface',
          kind: 14,
          generics: [
            {
              name: 'T',
            },
          ],
          properties: [
            {
              name: 'm',
              type: 'T',
            },
          ],
        },
      },
    });
  });

  it('infer-return', () => {
    const results = parseFiles([path.resolve(__dirname, 'infer-return.ts')]);
    expect(results).toEqual({
      fn: {
        name: 'fn',
        kind: 11,
        parameters: [
          {
            name: 'in1',
            kind: 2,
          },
          {
            name: 'in2',
            kind: 2,
          },
        ],
        returns: {
          kind: 2,
        },
      },
    });
  });
  it('react fc', () => {
    const results = parseFiles([path.resolve(__dirname, 'react-fc.ts')]);
    expect(results).toMatchSnapshot();
  });
  it('function properties', () => {
    const results = parseFiles([path.resolve(__dirname, 'function-props.ts')]);

    expect(results).toEqual({
      fn: {
        name: 'fn',
        kind: 11,
        properties: [
          {
            kind: 1,
            description: 'custom property for a function',
            name: 'customProp',
            value: 'my custom prop',
          },
        ],
        returns: {
          kind: 12,
        },
      },
    });
  });

  it('object parameter', () => {
    const results = parseFiles([
      path.resolve(__dirname, 'object-parameter.ts'),
    ]);

    expect(results).toEqual({
      printCoord: {
        parameters: [
          {
            name: 'pt',
            description: 'object parameter',
            kind: 15,
            properties: [
              {
                description: 'x coordinate',
                kind: 2,
                name: 'x',
              },
              {
                description: 'optional y coordinate',
                kind: 2,
                optional: true,
                name: 'y',
              },
            ],
          },
        ],
        description: 'print coordinates',
        name: 'printCoord',
        kind: 11,
        returns: {
          kind: 12,
        },
      },
    });
  });

  it('tuple parameters', () => {
    const results = parseFiles([path.resolve(__dirname, 'tuple-parameter.ts')]);
    expect(results).toEqual({
      distanceFromOrigin: {
        name: 'distanceFromOrigin',
        kind: 11,
        parameters: [
          {
            kind: 6,
            properties: [
              {
                kind: 2,
              },
              {
                kind: 2,
              },
            ],
          },
        ],
        returns: {
          kind: 2,
        },
      },
    });
  });
  it('spread tuple parameters', () => {
    const results = parseFiles([
      path.resolve(__dirname, 'spread-tuple-parameter.ts'),
    ]);
    expect(results).toEqual({
      spreadTupleFunction: {
        name: 'spreadTupleFunction',
        kind: 11,
        parameters: [
          {
            name: 'args',
            kind: 6,
            properties: [
              {
                kind: 1,
              },
              {
                kind: 2,
              },
              {
                kind: 7,
                type: {
                  kind: 16,
                  properties: [
                    {
                      kind: 3,
                    },
                  ],
                },
              },
            ],
          },
        ],
        returns: {
          kind: 12,
        },
      },
    });
  });

  it('union parameter', () => {
    const results = parseFiles([path.resolve(__dirname, 'union-parameter.ts')]);
    expect(results).toEqual({
      printId: {
        name: 'printId',
        kind: 11,
        parameters: [
          {
            name: 'id',
            kind: 4,
            properties: [
              {
                kind: 2,
              },
              {
                kind: 1,
              },
            ],
          },
        ],
        returns: {
          kind: 12,
        },
      },
    });
  });

  it('jsdoc parameter', () => {
    const results = parseFiles([path.resolve(__dirname, 'jsdoc-parameter.ts')]);
    expect(results).toEqual({
      greet: {
        parameters: [
          {
            name: 'name',
            description: 'string type parameters',
            kind: 1,
          },
        ],
        description: 'greeting function',
        name: 'greet',
        kind: 11,
        returns: {
          kind: 12,
        },
      },
    });
  });
  it('arrow fn jsdoc', () => {
    const results = parseFiles([path.resolve(__dirname, 'arrow-function.ts')]);
    expect(results).toEqual({
      arrowGreet: {
        description: 'arrow greeting function',
        name: 'arrowGreet',
        kind: 11,
        parameters: [
          {
            description: 'name parameter inline description',
            kind: 1,
            name: 'name',
          },
        ],
        returns: {
          kind: 12,
        },
      },
    });
  });
});
