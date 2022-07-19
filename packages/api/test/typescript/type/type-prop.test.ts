import path from 'path';
import { parseFiles } from '../../../src/index';

describe('type', () => {
  it('index-any', () => {
    const results = parseFiles([path.resolve(__dirname, 'index-any.ts')]);
    expect(results).toEqual({
      AnyType: {
        name: 'AnyType',
        kind: 15,
        properties: [
          {
            kind: 20,
            index: {
              kind: 1,
            },
            optional: true,
            prop: {
              kind: 17,
            },
          },
        ],
      },
    });
  });
  it('union-generic-param', () => {
    const results = parseFiles([
      path.resolve(__dirname, 'union-generic-param.ts'),
    ]);
    expect(results).toEqual({
      FullProps: {
        name: 'FullProps',
        kind: 15,
        properties: [
          {
            name: 'id',
            parent: {
              name: 'Props',
              token: 'Props:992e576be5',
            },
            kind: 1,
          },
          {
            name: 'bool',
            parent: {
              name: 'Props',
              token: 'Props:992e576be5',
            },
            kind: 3,
          },
          {
            name: 'children',
            parent: {
              name: 'PropsWithChildren',
              token: 'PropsWithChildren:0fb2bba6dd',
            },
            optional: true,
            kind: 1,
          },
        ],
      },
    });
  });
  it('nested-generic', () => {
    const results = parseFiles([path.resolve(__dirname, 'nested-generic.ts')], {
      collectHelpers: true,
    });
    expect(results).toEqual({
      NestedGenericType: {
        kind: 15,
        properties: [
          {
            description: 'member field',
            name: 'm',
            type: 'Type',
            parent: {
              name: 'GenericArrayType',
              token: 'GenericArrayType:f4ef3cb9d4',
            },
          },
        ],
        name: 'NestedGenericType',

        generics: [
          {
            name: 'Type',
          },
        ],
      },
      __helpers: {
        'GenericArrayType:f4ef3cb9d4': {
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
              type: 'Type',
            },
          ],
          token: 'GenericArrayType:f4ef3cb9d4',
        },
      },
    });
  });

  it('initialized', () => {
    const results = parseFiles([path.resolve(__dirname, 'initialized.ts')]);
    expect(results).toEqual({
      obj: {
        description: 'this is an object',
        kind: 26,
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

  it('referenced-type', () => {
    const results = parseFiles(
      [path.resolve(__dirname, 'referenced-type.ts')],
      { collectHelpers: true },
    );
    expect(results).toEqual({
      JSDocInfoType: {
        name: 'JSDocInfoType',
        kind: 15,
        properties: [
          {
            name: 'comment',
            optional: true,
            readonly: true,
            kind: 4,
            properties: [
              {
                kind: 1,
              },
              {
                kind: 14,
                type: 'NodeArray',
                generics: [
                  {
                    kind: 15,
                    type: 'JSDocComment',
                  },
                ],
              },
            ],
          },
        ],
      },
    });
  });
  it('partial', () => {
    const results = parseFiles([path.resolve(__dirname, 'partial.ts')]);
    expect(results).toEqual({
      PartialType: {
        name: 'PartialType',
        kind: 15,
        type: 'Partial',

        properties: [
          {
            name: 'stringProp',
            parent: {
              name: 'MainType',
              token: 'MainType:672e8ca0ba',
            },
            kind: 1,
            description: 'string prop description',
          },
        ],
        description: 'partial type description',
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
            name: 'children',
            optional: true,
            kind: 16,
            properties: [
              {
                kind: 15,
                type: 'Children',
                properties: [
                  {
                    name: 'parent',
                    kind: 15,
                    properties: [
                      {
                        name: 'children',
                        parent: {
                          name: 'Parent',
                          token: 'Parent:7049d5a61a',
                        },
                      },
                    ],
                    type: 'Parent',
                  },
                  {
                    name: 'items',
                    optional: true,
                    kind: 16,
                    properties: [
                      {
                        kind: 15,
                        type: 'Children',
                      },
                    ],
                    description: 'self-referencing items',
                  },
                ],
                description: 'this is type Children',
              },
            ],
            description: 'child elements',
          },
        ],
        description: 'this is type Parent',
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
            type: 'Type',
          },
          {
            kind: 10,
          },
        ],
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
                type: 'Node',
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
  it('extend-type', () => {
    const results = parseFiles([path.resolve(__dirname, 'extend-type.ts')], {
      collectHelpers: true,
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
            parent: {
              name: 'T',
              token: 'T:879fabfe9e',
            },
          },
          {
            description: 'own member',
            name: 'honey',
            kind: 3,
          },
        ],
        name: 'ExtendT',
      },
      __helpers: {
        'T:879fabfe9e': {
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
          token: 'T:879fabfe9e',
        },
      },
    });
  });

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
            prop: {
              kind: 15,
              properties: [
                {
                  name: 'a',
                  type: 'Bear',
                  kind: 17,
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
            type: 'Type',
          },
        ],
      },
    });
  });

  it('generics', () => {
    const results = parseFiles([path.resolve(__dirname, 'generics.ts')], {
      collectHelpers: true,
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
            kind: 1,
            type: 'Type',
            parent: {
              name: 'GenericInterface',
              token: 'GenericInterface:0d09a4c291',
            },
          },
        ],
        name: 'GenericConsumer',
      },
      __helpers: {
        'GenericInterface:0d09a4c291': {
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
              type: 'Type',
            },
          ],
          token: 'GenericInterface:0d09a4c291',
        },
      },
    });
  });

  it('intersection', () => {
    const results = parseFiles([path.resolve(__dirname, 'intersection.ts')], {
      collectHelpers: true,
    });
    expect(results).toEqual({
      Intersect: {
        description: 'intersect type',
        kind: 15,
        properties: [
          {
            name: 'a',
            kind: 1,
            parent: {
              name: 'A',
              token: 'A:7411e131cb',
            },
          },
          {
            name: 'b',
            kind: 2,
            parent: {
              name: 'B',
              token: 'B:f95c97ee09',
            },
          },
        ],
        name: 'Intersect',
      },
      __helpers: {
        'A:7411e131cb': {
          description: 'type A',
          name: 'A',
          kind: 15,
          properties: [
            {
              name: 'a',
              kind: 1,
            },
          ],
          token: 'A:7411e131cb',
        },
        'B:f95c97ee09': {
          description: 'type B',
          name: 'B',
          kind: 15,
          properties: [
            {
              name: 'b',
              kind: 2,
            },
          ],
          token: 'B:f95c97ee09',
        },
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
