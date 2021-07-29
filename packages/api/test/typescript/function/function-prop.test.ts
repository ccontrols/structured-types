import path from 'path';
import { parseFiles } from '../../../src/index';

describe('function', () => {
  it('react fc', () => {
    const results = parseFiles([path.resolve(__dirname, 'react-fc.ts')], {
      collectFilePath: false,
    });
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
  it('generic function parameter', () => {
    const results = parseFiles(
      [path.resolve(__dirname, 'generic-parameter.ts')],
      { consolidateParents: true },
    );
    expect(results).toEqual({
      genericFunction: {
        name: 'genericFunction',
        kind: 11,
        parameters: [
          {
            name: 'box',
            kind: 14,
            properties: [
              {
                parent: 'GenericInterface',
                name: 'm',
                kind: 15,
                type: 'T',
              },
            ],
            generics: [
              {
                name: 'T',
              },
            ],
          },
          {
            name: 'newContents',
            kind: 15,
            type: 'Type',
          },
        ],
        returns: {
          kind: 14,
          properties: [
            {
              name: 'm',
              kind: 15,
              type: 'T',
            },
          ],
          generics: [
            {
              name: 'T',
            },
          ],
          name: 'GenericInterface',
        },
        types: [
          {
            name: 'Type',
          },
        ],
      },
      __parents: {
        GenericInterface: {
          name: 'GenericInterface',
          kind: 14,
          properties: [
            {
              name: 'm',
              kind: 15,
              type: 'T',
            },
          ],
          generics: [
            {
              name: 'T',
            },
          ],
        },
      },
    });
  });

  it('extended parameter', () => {
    const results = parseFiles(
      [path.resolve(__dirname, 'extends-parameter.ts')],
      { consolidateParents: true },
    );
    expect(results).toEqual({
      paintHomeyBear: {
        name: 'paintHomeyBear',
        kind: 11,
        parameters: [
          {
            kind: 15,
            properties: [
              {
                parent: 'T',
                kind: 1,
                name: 'm',
                description: 'base type member property',
              },
              {
                kind: 3,
                name: 'honey',
                description: 'own member',
              },
            ],
            description: 'extended type',
            name: 'ExtendT',
          },
        ],
        returns: {
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
          ],
          description: 'interface extending another one',
          name: 'Bear',
        },
        description: 'exported function',
      },
      __parents: {
        T: {
          name: 'T',
          kind: 15,
          properties: [
            {
              kind: 1,
              name: 'm',
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
              kind: 1,
              name: 'm',
              description: 'string type member',
            },
          ],
          description: 'internal interface with one member',
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
