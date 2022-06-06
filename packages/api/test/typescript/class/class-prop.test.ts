import path from 'path';
import { parseFiles } from '../../../src/index';

describe('class', () => {
  it('getters/setters', () => {
    const results = parseFiles([path.resolve(__dirname, 'getters-setters.ts')]);

    expect(results).toEqual({
      ClassGetters: {
        name: 'ClassGetters',
        kind: 13,
        properties: [
          {
            description: 'member description',
            kind: 2,
            name: '_length',
            value: 0,
          },
          {
            description: 'getter description',
            kind: 22,
            name: 'length',
            returns: {
              kind: 2,
              optional: true,
            },
          },
          {
            parameters: [
              {
                kind: 2,
                name: 'value',
                description: 'the new value',
              },
            ],
            description: 'setter description',
            kind: 23,
            name: 'length',
          },
        ],
      },
    });
  });
  it('object-type', () => {
    const results = parseFiles([path.resolve(__dirname, 'object-type.ts')]);

    expect(results).toEqual({
      Test: {
        name: 'Test',
        kind: 13,
        properties: [
          {
            name: 'make',
            kind: 11,
            parameters: [
              {
                name: 'gen',
                kind: 9,
                type: 'Object',
              },
            ],
            returns: {
              description:
                'Provides functionality common to all JavaScript objects.',
              kind: 14,
              name: 'Object',
              type: 'ObjectConstructor',
              optional: true,
            },
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
      Bar: {
        name: 'Bar',
        kind: 13,
        extends: [{ name: 'Foo', token: 'Foo:0be18c18e8' }],
      },
      __helpers: {
        'Foo:0be18c18e8': {
          name: 'Foo',
          kind: 13,
          properties: [
            {
              name: 'dummy',
              static: true,
              readonly: true,
              kind: 3,
              value: false,
            },
          ],
          token: 'Foo:0be18c18e8',
        },
      },
    });
  });

  it('generics', () => {
    const results = parseFiles([path.resolve(__dirname, 'generics.ts')]);

    expect(results).toEqual({
      Test: {
        name: 'Test',
        kind: 13,
        properties: [
          {
            name: 'make',
            kind: 11,
            parameters: [
              {
                name: 'gen',
                kind: 13,
                generics: [
                  {
                    name: 'boolean',
                    kind: 3,
                  },
                ],
                properties: [
                  {
                    parent: {
                      name: 'Generic',
                      token: 'Generic:c82f927d27',
                    },
                    name: 'value',
                    kind: 3,
                    type: 'T',
                  },
                ],
                type: 'Generic',
              },
            ],
            returns: {
              kind: 3,
              optional: true,
            },
          },
        ],
      },
    });
  });

  it('index signature', () => {
    const results = parseFiles([path.resolve(__dirname, 'index-signature.ts')]);
    expect(results).toEqual({
      ClassIndexSignature: {
        name: 'ClassIndexSignature',
        kind: 13,
        properties: [
          {
            description: 'class index',
            kind: 20,
            index: {
              kind: 1,
              name: 's',
            },
            prop: {
              kind: 4,
              properties: [
                {
                  kind: 3,
                },
                {
                  kind: 11,
                  parameters: [
                    {
                      kind: 1,
                      name: 's',
                    },
                  ],
                  returns: {
                    kind: 3,
                    optional: true,
                  },
                },
              ],
            },
          },
          {
            returns: {
              description: 'returns the value',
              kind: 3,
              optional: true,
            },
            parameters: [
              {
                name: 's',
                description: 'input string',
                kind: 1,
              },
            ],
            name: 'check',
            kind: 11,
          },
        ],
      },
    });
  });
  it('arrow function', () => {
    const results = parseFiles([path.resolve(__dirname, 'arrow-function.ts')]);
    expect(results).toEqual({
      ArrowFunctionClass: {
        name: 'ArrowFunctionClass',
        kind: 13,
        properties: [
          {
            description: 'name value initialzied',
            kind: 1,
            name: 'name',
            value: 'MyClass',
          },
          {
            returns: {
              description: 'a string value',
              kind: 1,
              optional: true,
            },
            description: 'name accessor',
            name: 'getName',
            kind: 11,
          },
        ],
      },
    });
  });

  it('param modifiers', () => {
    const results = parseFiles([path.resolve(__dirname, 'param-modifiers.ts')]);
    expect(results).toEqual({
      ParameterModifiers: {
        name: 'ParameterModifiers',
        kind: 13,
        properties: [
          {
            parameters: [
              {
                name: 'x',
                description: 'x coordinate',
                kind: 2,
                visibility: 'public',
                readonly: true,
              },
              {
                name: 'y',
                description: 'y coordinate',
                kind: 2,
                visibility: 'protected',
              },
              {
                name: 'z',
                description: 'z coordinate',
                kind: 2,
                visibility: 'private',
              },
            ],
            description: 'constructor implementation',
            kind: 21,
          },
        ],
      },
    });
  });
  it('initialized prop', () => {
    const results = parseFiles([
      path.resolve(__dirname, 'initialized-props.ts'),
    ]);
    expect(results).toEqual({
      GreeterInitializedMembers: {
        name: 'GreeterInitializedMembers',
        kind: 13,
        properties: [
          {
            kind: 1,
            readonly: true,
            name: 'name',
            value: 'world',
          },
          {
            name: 'err',
            kind: 11,
            returns: {
              kind: 12,
              optional: true,
            },
          },
        ],
      },
    });
  });

  it('constructor', () => {
    const results = parseFiles([path.resolve(__dirname, 'constructor.ts')]);
    expect(results).toEqual({
      ClassWithConstrunctor: {
        name: 'ClassWithConstrunctor',
        kind: 13,
        properties: [
          {
            kind: 1,
            name: 'name',
          },
          {
            description: 'constructor description',
            kind: 21,
            parameters: [
              {
                kind: 1,
                optional: true,
                name: 'x',
              },
            ],
          },
        ],
      },
    });
  });
  it('simple class', () => {
    const results = parseFiles([path.resolve(__dirname, 'simple.ts')]);
    expect(results).toEqual({
      Point: {
        description: 'this is a class with two members',
        name: 'Point',
        kind: 13,
        properties: [
          {
            description: 'COORDINATE X',
            kind: 2,
            name: 'x',
          },
          {
            description: 'COORDINATE Y',
            kind: 2,
            name: 'y',
          },
        ],
      },
    });
  });

  it('static members', () => {
    const results = parseFiles([path.resolve(__dirname, 'static-members.ts')]);
    expect(results).toEqual({
      ClassStatic: {
        name: 'ClassStatic',
        kind: 13,
        properties: [
          {
            kind: 2,
            static: true,
            name: 'x',
            value: 0,
          },
          {
            static: true,
            name: 'printX',
            kind: 11,
            returns: {
              kind: 12,
              optional: true,
            },
          },
        ],
      },
    });
  });
  it('member visibility', () => {
    const results = parseFiles([
      path.resolve(__dirname, 'member-visibility.ts'),
    ]);

    expect(results).toEqual({
      MemberVisibikity: {
        name: 'MemberVisibikity',
        kind: 13,
        properties: [
          {
            description: 'a public method',
            visibility: 'public',
            name: 'method1',
            kind: 11,
            returns: {
              kind: 12,
              optional: true,
            },
          },
          {
            description: 'a protected method',
            visibility: 'protected',
            name: 'method2',
            kind: 11,
            returns: {
              kind: 12,
              optional: true,
            },
          },
          {
            description: 'a private method',
            visibility: 'private',
            name: 'method3',
            kind: 11,
            returns: {
              kind: 12,
              optional: true,
            },
          },
        ],
      },
    });
  });
});
