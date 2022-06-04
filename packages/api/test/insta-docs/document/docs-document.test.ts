import path from 'path';
import { parseFiles } from '../../../src/index';

describe('docs-document', () => {
  it('export-default', () => {
    const result = parseFiles(
      [path.resolve(__dirname, 'export-default.docs.tsx')],
      {
        collectSourceInfo: true,
      },
    );
    expect(result).toMatchObject({
      default: {
        loc: {
          loc: {
            start: {
              line: 4,
              col: 1,
            },
            end: {
              line: 7,
              col: 3,
            },
          },
        },
        kind: 26,
        properties: [
          {
            name: 'name',
            kind: 1,
            value: 'documentation for MyComponent',
          },
          {
            name: 'component',
            type: 'FC',
            kind: 15,
            generics: [
              {
                name: 'MyComponentProps',
              },
            ],
            properties: [
              {
                name: 'propTypes',
                parent: {
                  name: 'FunctionComponent',
                },
                optional: true,
                kind: 4,
                properties: [
                  {
                    kind: 15,
                    type: 'WeakValidationMap',
                    generics: [
                      {
                        name: 'T',
                      },
                    ],
                  },
                  {
                    kind: 8,
                  },
                ],
              },
              {
                name: 'contextTypes',
                parent: {
                  name: 'FunctionComponent',
                },
                optional: true,
                kind: 4,
                properties: [
                  {
                    kind: 15,
                    type: 'ValidationMap',
                    generics: [
                      {
                        name: 'T',
                      },
                    ],
                  },
                  {
                    kind: 8,
                  },
                ],
              },
              {
                name: 'defaultProps',
                parent: {
                  name: 'FunctionComponent',
                },
                optional: true,
                kind: 4,
                properties: [
                  {
                    kind: 15,
                    type: 'Partial',
                    generics: [
                      {
                        type: 'P',
                      },
                    ],
                  },
                  {
                    kind: 8,
                  },
                ],
              },
              {
                name: 'displayName',
                parent: {
                  name: 'FunctionComponent',
                },
                optional: true,
                kind: 4,
                properties: [
                  {
                    kind: 1,
                  },
                  {
                    kind: 8,
                  },
                ],
              },
            ],
            value: {
              name: 'MyComponent',
              loc: {
                loc: {
                  start: {
                    line: 12,
                    col: 14,
                  },
                  end: {
                    line: 12,
                    col: 25,
                  },
                },
              },
              type: 'FC',
              kind: 11,
              generics: [
                {
                  name: 'MyComponentProps',
                },
              ],
              properties: [
                {
                  name: 'propTypes',
                  parent: {
                    name: 'FunctionComponent',
                  },
                },
                {
                  name: 'contextTypes',
                  parent: {
                    name: 'FunctionComponent',
                  },
                },
                {
                  name: 'defaultProps',
                  parent: {
                    name: 'FunctionComponent',
                  },
                },
                {
                  name: 'displayName',
                  parent: {
                    name: 'FunctionComponent',
                  },
                },
              ],
              parameters: [
                {
                  kind: 26,
                  properties: [
                    {
                      name: 'name',
                      kind: 1,
                      value: 'some default text',
                    },
                  ],
                },
              ],
              returns: {
                name: 'Element',
                kind: 14,
                extends: [
                  {
                    name: 'ReactElement',
                  },
                ],
                properties: [
                  {
                    name: 'type',
                    parent: {
                      name: 'ReactElement',
                    },
                    type: 'T',
                  },
                  {
                    name: 'props',
                    parent: {
                      name: 'ReactElement',
                    },
                    type: 'P',
                  },
                  {
                    name: 'key',
                    parent: {
                      name: 'ReactElement',
                    },
                    kind: 4,
                    properties: [
                      {
                        kind: 4,
                        type: 'Key',
                        properties: [
                          {
                            kind: 1,
                          },
                          {
                            kind: 2,
                          },
                        ],
                      },
                      {
                        kind: 10,
                      },
                    ],
                  },
                ],
                optional: true,
              },
            },
          },
        ],
        name: 'default',
      },
    });
  });
  it('require-import', () => {
    const result = parseFiles(
      [path.resolve(__dirname, 'require-import.docs.tsx')],
      {
        collectSourceInfo: 'body',
        collectInnerLocations: true,
        collectParametersUsage: true,
        collectGenerics: false,
      },
    );
    expect(result).toMatchObject({
      default: {
        type: 'Document',
        kind: 26,
        properties: [
          {
            name: 'name',
            kind: 1,
            value: 'documentation for MyComponent',
          },
          {
            name: 'subcomponents',
            properties: [
              {
                name: 'MyComponent',
                kind: 17,
                value: 'MyComponent',
              },
            ],
            kind: 15,
            type: 'Record',
          },
        ],
        name: 'default',
      },
    });
  });
});
