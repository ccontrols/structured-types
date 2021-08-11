import path from 'path';
import { parseFiles } from '../../../src/index';

describe('type', () => {
  it('generic-type', () => {
    const results = parseFiles([path.resolve(__dirname, 'generic-type.ts')]);
    expect(results).toEqual({
      GenericType: {
        kind: 15,
        generics: [
          {
            name: 'Type',
          },
        ],
        properties: [
          {
            type: 'Type',
            kind: 15,
            name: 'contents',
          },
        ],
        name: 'GenericType',
      },
    });
  });
  it('index-prop', () => {
    const results = parseFiles([path.resolve(__dirname, 'index-prop.ts')]);
    expect(results).toEqual({
      IndexT: {
        kind: 15,
        properties: [
          {
            description: 'type index property',
            kind: 20,
            index: {
              name: 'index',
              kind: 1,
            },
            type: {
              kind: 15,
              properties: [
                {
                  name: 'a',
                  kind: 15,
                  type: 'Bear',
                },
                {
                  name: 'b',
                  kind: 10,
                },
              ],
            },
          },
          {
            description: 'this is an additional name prop',
            optional: true,
            name: 'name',
            kind: 1,
          },
        ],
        name: 'IndexT',
      },
    });
  });
  it('circular-reference', () => {
    const results = parseFiles([
      path.resolve(__dirname, 'circular-reference.ts'),
    ]);
    expect(results).toEqual({
      Parent: {
        name: 'Parent',
        kind: 15,
        properties: [
          {
            optional: true,
            name: 'children',
            kind: 16,
            properties: [
              {
                kind: 15,
                properties: [
                  {
                    name: 'parent',
                    kind: 15,
                    properties: [
                      {
                        parent: 'Parent',
                        optional: true,
                        name: 'children',
                        kind: 16,
                        properties: [
                          {
                            name: 'Children',
                            kind: 15,
                          },
                        ],
                        description: 'child elements',
                      },
                    ],
                  },
                  {
                    optional: true,
                    name: 'items',
                    kind: 16,
                    properties: [
                      {
                        name: 'Children',
                        kind: 15,
                      },
                    ],
                    description: 'self-referencing items',
                  },
                ],
                description: 'this is type Children',
                name: 'Children',
              },
            ],
            description: 'child elements',
          },
        ],
        description: 'this is type Parent',
      },
    });
  });
  it('self-reference', () => {
    const results = parseFiles([path.resolve(__dirname, 'self-reference.ts')]);
    expect(results).toEqual({
      Node: {
        name: 'Node',
        kind: 15,
        properties: [
          {
            optional: true,
            name: 'items',
            kind: 16,
            properties: [
              {
                name: 'Node',
                kind: 15,
              },
            ],
            description: 'self-referencing items',
          },
        ],
        description: 'this is type',
      },
    });
  });
  it('initialized', () => {
    const results = parseFiles([path.resolve(__dirname, 'initialized.ts')]);
    expect(results).toEqual({
      obj: {
        description: 'this is an object',
        kind: 15,
        properties: [
          {
            description: 'field a',
            name: 'a',
            kind: 1,
            value: 'field a',
          },
          {
            description: 'field b',
            optional: true,
            name: 'b',
            kind: 2,
          },
        ],
        name: 'obj',
      },
    });
  });

  it('generic-array', () => {
    const results = parseFiles([path.resolve(__dirname, 'generic-array.ts')]);
    expect(results).toEqual({
      GenericArrayType: {
        name: 'GenericArrayType',
        kind: 16,
        generics: [
          {
            name: 'Type',
          },
        ],
        properties: [
          {
            kind: 15,
            name: 'Type',
          },
        ],
      },
    });
  });

  it('generics', () => {
    const results = parseFiles([path.resolve(__dirname, 'generics.ts')], {
      consolidateParents: true,
    });
    expect(results).toEqual({
      GenericConsumer: {
        description: 'reference type description',
        kind: 15,
        generics: [
          {
            kind: 1,
            name: 'string',
          },
        ],
        properties: [
          {
            description: 'interface prop',
            name: 'm',
            kind: 15,
            type: 'Type',
            parent: 'GenericInterface',
          },
        ],
        name: 'GenericConsumer',
      },
      __parents: {
        GenericInterface: {
          description: 'upstream interface',
          name: 'GenericInterface',
          kind: 14,
          generics: [
            {
              name: 'Type',
            },
          ],
          properties: [
            {
              description: 'interface prop',
              name: 'm',
              kind: 15,
              type: 'Type',
            },
          ],
        },
      },
    });
  });

  it('intersection', () => {
    const results = parseFiles([path.resolve(__dirname, 'intersection.ts')], {
      consolidateParents: true,
    });
    expect(results).toEqual({
      Intersect: {
        description: 'intersect type',
        kind: 15,
        properties: [
          {
            name: 'a',
            kind: 1,
            parent: 'A',
          },
          {
            name: 'b',
            kind: 2,
            parent: 'B',
          },
        ],
        name: 'Intersect',
      },
      __parents: {
        A: {
          description: 'type A',
          name: 'A',
          kind: 15,
          properties: [
            {
              name: 'a',
              kind: 1,
            },
          ],
        },
        B: {
          description: 'type B',
          name: 'B',
          kind: 15,
          properties: [
            {
              name: 'b',
              kind: 2,
            },
          ],
        },
      },
    });
  });

  it('extend-type', () => {
    const results = parseFiles([path.resolve(__dirname, 'extend-type.ts')], {
      consolidateParents: true,
    });
    expect(results).toEqual({
      ExtendT: {
        description: 'extended type',
        kind: 15,
        properties: [
          {
            description: 'base type member property',
            name: 'm',
            kind: 1,
            parent: 'T',
          },
          {
            description: 'own member',
            name: 'honey',
            kind: 3,
          },
        ],
        name: 'ExtendT',
      },
      __parents: {
        T: {
          description: 'base type',
          name: 'T',
          kind: 15,
          properties: [
            {
              description: 'base type member property',
              name: 'm',
              kind: 1,
            },
          ],
        },
      },
    });
  });
  it('nested-generic', () => {
    const results = parseFiles([path.resolve(__dirname, 'nested-generic.ts')], {
      consolidateParents: true,
    });
    expect(results).toEqual({
      NestedGenericType: {
        kind: 15,
        properties: [
          {
            description: 'member field',
            name: 'm',
            kind: 15,
            type: 'Type',
            parent: 'GenericArrayType',
          },
        ],
        name: 'NestedGenericType',

        generics: [
          {
            name: 'Type',
          },
        ],
      },
      __parents: {
        GenericArrayType: {
          description: 'generic interface',
          name: 'GenericArrayType',
          kind: 15,
          generics: [
            {
              name: 'Type',
            },
          ],
          properties: [
            {
              description: 'member field',
              name: 'm',
              kind: 15,
              type: 'Type',
            },
          ],
        },
      },
    });
  });

  it('union-generic', () => {
    const results = parseFiles([path.resolve(__dirname, 'union-generic.ts')]);
    expect(results).toEqual({
      UnionGenericType: {
        name: 'UnionGenericType',
        kind: 4,
        properties: [
          {
            name: 'Type',
            kind: 15,
          },
          {
            kind: 10,
          },
        ],
      },
    });
  });

  it('basic type', () => {
    const results = parseFiles([path.resolve(__dirname, 'simple.ts')]);
    expect(results).toEqual({
      T: {
        description: 'this is type',
        kind: 15,
        properties: [
          {
            description: 'type member property',
            kind: 1,
            name: 'm',
          },
        ],
        name: 'T',
      },
    });
  });
});
