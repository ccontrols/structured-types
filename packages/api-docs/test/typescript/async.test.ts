import path from 'path';
import { analyzeFiles } from '@structured-types/api';
import { propsToDocumentation } from '../../src';
describe('async', () => {
  it('async', async () => {
    const props = analyzeFiles(
      [path.resolve(__dirname, `../../src/props-to-nodes.ts`)],
      {
        extract: ['propsToDocumentation'],
      },
    );
    const results = await propsToDocumentation(props);
    expect(results).toEqual([
      {
        kind: 4,
        depth: 2,
        children: [
          {
            kind: 6,
            value: 'propsToDocumentation',
          },
        ],
      },
      {
        kind: 7,
        children: [
          {
            kind: 11,
            value: 'function',
          },
        ],
      },
      {
        kind: 5,
        children: [
          {
            kind: 6,
            value: 'Async function to create a list of api documentation nodes',
          },
        ],
      },
      {
        kind: 5,
        children: [
          {
            kind: 7,
            children: [
              {
                kind: 6,
                value: 'parameters',
              },
            ],
          },
        ],
      },
      {
        kind: 1,
        children: [
          {
            kind: 2,
            children: [
              {
                kind: 3,
                children: [
                  {
                    kind: 6,
                    value: 'Name',
                  },
                ],
              },
              {
                kind: 3,
                children: [
                  {
                    kind: 6,
                    value: 'Type',
                  },
                ],
              },
              {
                kind: 3,
                children: [
                  {
                    kind: 6,
                    value: 'Description',
                  },
                ],
              },
            ],
          },
          {
            kind: 2,
            children: [
              {
                kind: 3,
                children: [
                  {
                    kind: 9,
                    children: [
                      {
                        kind: 11,
                        value: 'props*',
                      },
                    ],
                  },
                ],
              },
              {
                kind: 3,
                children: [
                  {
                    kind: 13,
                    summary: [
                      {
                        kind: 9,
                        children: [
                          {
                            kind: 11,
                            value: 'PropTypes',
                          },
                        ],
                      },
                    ],
                    children: [
                      {
                        kind: 12,
                        children: [
                          {
                            kind: 6,
                            value: '[',
                          },
                          {
                            kind: 11,
                            value: 'string',
                          },
                          {
                            kind: 6,
                            value: ']',
                          },
                          {
                            kind: 6,
                            value: ': ',
                          },
                          {
                            kind: 13,
                            summary: [
                              {
                                kind: 11,
                                value: 'interface',
                              },
                            ],
                            children: [
                              {
                                kind: 12,
                                children: [
                                  {
                                    kind: 11,
                                    value: 'kind',
                                  },
                                  {
                                    kind: 6,
                                    value: ': ',
                                  },
                                  {
                                    kind: 9,
                                    children: [
                                      {
                                        kind: 11,
                                        value: 'PropKind',
                                      },
                                    ],
                                  },
                                  {
                                    kind: 6,
                                    value: '.',
                                  },
                                  {
                                    kind: 9,
                                    children: [
                                      {
                                        kind: 11,
                                        value: 'String',
                                      },
                                    ],
                                  },
                                  {
                                    kind: 6,
                                    value: ', ',
                                  },
                                  {
                                    kind: 9,
                                    children: [
                                      {
                                        kind: 11,
                                        value: 'PropKind',
                                      },
                                    ],
                                  },
                                  {
                                    kind: 6,
                                    value: '.',
                                  },
                                  {
                                    kind: 9,
                                    children: [
                                      {
                                        kind: 11,
                                        value: 'Number',
                                      },
                                    ],
                                  },
                                  {
                                    kind: 6,
                                    value: ', ',
                                  },
                                  {
                                    kind: 9,
                                    children: [
                                      {
                                        kind: 11,
                                        value: 'PropKind',
                                      },
                                    ],
                                  },
                                  {
                                    kind: 6,
                                    value: '.',
                                  },
                                  {
                                    kind: 9,
                                    children: [
                                      {
                                        kind: 11,
                                        value: 'Boolean',
                                      },
                                    ],
                                  },
                                  {
                                    kind: 6,
                                    value: ', ',
                                  },
                                  {
                                    kind: 9,
                                    children: [
                                      {
                                        kind: 11,
                                        value: 'PropKind',
                                      },
                                    ],
                                  },
                                  {
                                    kind: 6,
                                    value: '.',
                                  },
                                  {
                                    kind: 9,
                                    children: [
                                      {
                                        kind: 11,
                                        value: 'Union',
                                      },
                                    ],
                                  },
                                  {
                                    kind: 6,
                                    value: ', ',
                                  },
                                  {
                                    kind: 9,
                                    children: [
                                      {
                                        kind: 11,
                                        value: 'PropKind',
                                      },
                                    ],
                                  },
                                  {
                                    kind: 6,
                                    value: '.',
                                  },
                                  {
                                    kind: 9,
                                    children: [
                                      {
                                        kind: 11,
                                        value: 'Enum',
                                      },
                                    ],
                                  },
                                  {
                                    kind: 6,
                                    value: ', ',
                                  },
                                  {
                                    kind: 9,
                                    children: [
                                      {
                                        kind: 11,
                                        value: 'PropKind',
                                      },
                                    ],
                                  },
                                  {
                                    kind: 6,
                                    value: '.',
                                  },
                                  {
                                    kind: 9,
                                    children: [
                                      {
                                        kind: 11,
                                        value: 'Tuple',
                                      },
                                    ],
                                  },
                                  {
                                    kind: 6,
                                    value: ', ',
                                  },
                                  {
                                    kind: 9,
                                    children: [
                                      {
                                        kind: 11,
                                        value: 'PropKind',
                                      },
                                    ],
                                  },
                                  {
                                    kind: 6,
                                    value: '.',
                                  },
                                  {
                                    kind: 9,
                                    children: [
                                      {
                                        kind: 11,
                                        value: 'Rest',
                                      },
                                    ],
                                  },
                                  {
                                    kind: 6,
                                    value: ', ',
                                  },
                                  {
                                    kind: 9,
                                    children: [
                                      {
                                        kind: 11,
                                        value: 'PropKind',
                                      },
                                    ],
                                  },
                                  {
                                    kind: 6,
                                    value: '.',
                                  },
                                  {
                                    kind: 9,
                                    children: [
                                      {
                                        kind: 11,
                                        value: 'Undefined',
                                      },
                                    ],
                                  },
                                  {
                                    kind: 6,
                                    value: ', ',
                                  },
                                  {
                                    kind: 9,
                                    children: [
                                      {
                                        kind: 11,
                                        value: 'PropKind',
                                      },
                                    ],
                                  },
                                  {
                                    kind: 6,
                                    value: '.',
                                  },
                                  {
                                    kind: 9,
                                    children: [
                                      {
                                        kind: 11,
                                        value: 'Unknown',
                                      },
                                    ],
                                  },
                                  {
                                    kind: 6,
                                    value: ', ',
                                  },
                                  {
                                    kind: 9,
                                    children: [
                                      {
                                        kind: 11,
                                        value: 'PropKind',
                                      },
                                    ],
                                  },
                                  {
                                    kind: 6,
                                    value: '.',
                                  },
                                  {
                                    kind: 9,
                                    children: [
                                      {
                                        kind: 11,
                                        value: 'Null',
                                      },
                                    ],
                                  },
                                  {
                                    kind: 6,
                                    value: ', ',
                                  },
                                  {
                                    kind: 9,
                                    children: [
                                      {
                                        kind: 11,
                                        value: 'PropKind',
                                      },
                                    ],
                                  },
                                  {
                                    kind: 6,
                                    value: '.',
                                  },
                                  {
                                    kind: 9,
                                    children: [
                                      {
                                        kind: 11,
                                        value: 'Function',
                                      },
                                    ],
                                  },
                                  {
                                    kind: 6,
                                    value: ', ',
                                  },
                                  {
                                    kind: 9,
                                    children: [
                                      {
                                        kind: 11,
                                        value: 'PropKind',
                                      },
                                    ],
                                  },
                                  {
                                    kind: 6,
                                    value: '.',
                                  },
                                  {
                                    kind: 9,
                                    children: [
                                      {
                                        kind: 11,
                                        value: 'Void',
                                      },
                                    ],
                                  },
                                  {
                                    kind: 6,
                                    value: ', ',
                                  },
                                  {
                                    kind: 9,
                                    children: [
                                      {
                                        kind: 11,
                                        value: 'PropKind',
                                      },
                                    ],
                                  },
                                  {
                                    kind: 6,
                                    value: '.',
                                  },
                                  {
                                    kind: 9,
                                    children: [
                                      {
                                        kind: 11,
                                        value: 'Class',
                                      },
                                    ],
                                  },
                                  {
                                    kind: 6,
                                    value: ', ',
                                  },
                                  {
                                    kind: 9,
                                    children: [
                                      {
                                        kind: 11,
                                        value: 'PropKind',
                                      },
                                    ],
                                  },
                                  {
                                    kind: 6,
                                    value: '.',
                                  },
                                  {
                                    kind: 9,
                                    children: [
                                      {
                                        kind: 11,
                                        value: 'Interface',
                                      },
                                    ],
                                  },
                                  {
                                    kind: 6,
                                    value: ', ',
                                  },
                                  {
                                    kind: 9,
                                    children: [
                                      {
                                        kind: 11,
                                        value: 'PropKind',
                                      },
                                    ],
                                  },
                                  {
                                    kind: 6,
                                    value: '.',
                                  },
                                  {
                                    kind: 9,
                                    children: [
                                      {
                                        kind: 11,
                                        value: 'Type',
                                      },
                                    ],
                                  },
                                  {
                                    kind: 6,
                                    value: ', ',
                                  },
                                  {
                                    kind: 9,
                                    children: [
                                      {
                                        kind: 11,
                                        value: 'PropKind',
                                      },
                                    ],
                                  },
                                  {
                                    kind: 6,
                                    value: '.',
                                  },
                                  {
                                    kind: 9,
                                    children: [
                                      {
                                        kind: 11,
                                        value: 'Array',
                                      },
                                    ],
                                  },
                                  {
                                    kind: 6,
                                    value: ', ',
                                  },
                                  {
                                    kind: 9,
                                    children: [
                                      {
                                        kind: 11,
                                        value: 'PropKind',
                                      },
                                    ],
                                  },
                                  {
                                    kind: 6,
                                    value: '.',
                                  },
                                  {
                                    kind: 9,
                                    children: [
                                      {
                                        kind: 11,
                                        value: 'Any',
                                      },
                                    ],
                                  },
                                  {
                                    kind: 6,
                                    value: ', ',
                                  },
                                  {
                                    kind: 9,
                                    children: [
                                      {
                                        kind: 11,
                                        value: 'PropKind',
                                      },
                                    ],
                                  },
                                  {
                                    kind: 6,
                                    value: '.',
                                  },
                                  {
                                    kind: 9,
                                    children: [
                                      {
                                        kind: 11,
                                        value: 'Index',
                                      },
                                    ],
                                  },
                                  {
                                    kind: 6,
                                    value: ', ',
                                  },
                                  {
                                    kind: 9,
                                    children: [
                                      {
                                        kind: 11,
                                        value: 'PropKind',
                                      },
                                    ],
                                  },
                                  {
                                    kind: 6,
                                    value: '.',
                                  },
                                  {
                                    kind: 9,
                                    children: [
                                      {
                                        kind: 11,
                                        value: 'Constructor',
                                      },
                                    ],
                                  },
                                  {
                                    kind: 6,
                                    value: ', ',
                                  },
                                  {
                                    kind: 9,
                                    children: [
                                      {
                                        kind: 11,
                                        value: 'PropKind',
                                      },
                                    ],
                                  },
                                  {
                                    kind: 6,
                                    value: '.',
                                  },
                                  {
                                    kind: 9,
                                    children: [
                                      {
                                        kind: 11,
                                        value: 'Getter',
                                      },
                                    ],
                                  },
                                  {
                                    kind: 6,
                                    value: ', ',
                                  },
                                  {
                                    kind: 9,
                                    children: [
                                      {
                                        kind: 11,
                                        value: 'PropKind',
                                      },
                                    ],
                                  },
                                  {
                                    kind: 6,
                                    value: '.',
                                  },
                                  {
                                    kind: 9,
                                    children: [
                                      {
                                        kind: 11,
                                        value: 'Setter',
                                      },
                                    ],
                                  },
                                  {
                                    kind: 6,
                                    value: ', ',
                                  },
                                  {
                                    kind: 9,
                                    children: [
                                      {
                                        kind: 11,
                                        value: 'PropKind',
                                      },
                                    ],
                                  },
                                  {
                                    kind: 6,
                                    value: '.',
                                  },
                                  {
                                    kind: 9,
                                    children: [
                                      {
                                        kind: 11,
                                        value: 'BigInt',
                                      },
                                    ],
                                  },
                                  {
                                    kind: 6,
                                    value: ', ',
                                  },
                                  {
                                    kind: 9,
                                    children: [
                                      {
                                        kind: 11,
                                        value: 'PropKind',
                                      },
                                    ],
                                  },
                                  {
                                    kind: 6,
                                    value: '.',
                                  },
                                  {
                                    kind: 9,
                                    children: [
                                      {
                                        kind: 11,
                                        value: 'Component',
                                      },
                                    ],
                                  },
                                  {
                                    kind: 6,
                                    value: ', ',
                                  },
                                  {
                                    kind: 9,
                                    children: [
                                      {
                                        kind: 11,
                                        value: 'PropKind',
                                      },
                                    ],
                                  },
                                  {
                                    kind: 6,
                                    value: '.',
                                  },
                                  {
                                    kind: 9,
                                    children: [
                                      {
                                        kind: 11,
                                        value: 'Object',
                                      },
                                    ],
                                  },
                                  {
                                    kind: 6,
                                    value: ', ',
                                  },
                                  {
                                    kind: 9,
                                    children: [
                                      {
                                        kind: 11,
                                        value: 'PropKind',
                                      },
                                    ],
                                  },
                                  {
                                    kind: 6,
                                    value: '.',
                                  },
                                  {
                                    kind: 9,
                                    children: [
                                      {
                                        kind: 11,
                                        value: 'Namespace',
                                      },
                                    ],
                                  },
                                  {
                                    kind: 6,
                                    value: ', ',
                                  },
                                  {
                                    kind: 9,
                                    children: [
                                      {
                                        kind: 11,
                                        value: 'PropKind',
                                      },
                                    ],
                                  },
                                  {
                                    kind: 6,
                                    value: '.',
                                  },
                                  {
                                    kind: 9,
                                    children: [
                                      {
                                        kind: 11,
                                        value: 'RegEx',
                                      },
                                    ],
                                  },
                                ],
                              },
                              {
                                kind: 12,
                                children: [
                                  {
                                    kind: 11,
                                    value: 'name',
                                  },
                                  {
                                    kind: 6,
                                    value: ': ',
                                  },
                                  {
                                    kind: 11,
                                    value: 'string',
                                  },
                                ],
                              },
                              {
                                kind: 13,
                                summary: [
                                  {
                                    kind: 11,
                                    value: 'parent',
                                  },
                                ],
                                children: [
                                  {
                                    kind: 12,
                                    children: [
                                      {
                                        kind: 11,
                                        value: 'name',
                                      },
                                      {
                                        kind: 6,
                                        value: '*',
                                      },
                                      {
                                        kind: 6,
                                        value: ': ',
                                      },
                                      {
                                        kind: 11,
                                        value: 'string',
                                      },
                                    ],
                                  },
                                  {
                                    kind: 12,
                                    children: [
                                      {
                                        kind: 11,
                                        value: 'loc',
                                      },
                                      {
                                        kind: 6,
                                        value: ': ',
                                      },
                                      {
                                        kind: 6,
                                        value: 'SourceLocation',
                                      },
                                    ],
                                  },
                                ],
                              },
                              {
                                kind: 13,
                                summary: [
                                  {
                                    kind: 11,
                                    value: 'loc',
                                  },
                                ],
                                children: [
                                  {
                                    kind: 12,
                                    children: [
                                      {
                                        kind: 11,
                                        value: 'filePath',
                                      },
                                      {
                                        kind: 6,
                                        value: ': ',
                                      },
                                      {
                                        kind: 11,
                                        value: 'string',
                                      },
                                    ],
                                  },
                                  {
                                    kind: 13,
                                    summary: [
                                      {
                                        kind: 11,
                                        value: 'loc',
                                      },
                                    ],
                                    children: [
                                      {
                                        kind: 12,
                                        children: [
                                          {
                                            kind: 11,
                                            value: 'start',
                                          },
                                          {
                                            kind: 6,
                                            value: '*',
                                          },
                                          {
                                            kind: 6,
                                            value: ': ',
                                          },
                                        ],
                                      },
                                      {
                                        kind: 12,
                                        children: [
                                          {
                                            kind: 11,
                                            value: 'end',
                                          },
                                          {
                                            kind: 6,
                                            value: '*',
                                          },
                                          {
                                            kind: 6,
                                            value: ': ',
                                          },
                                        ],
                                      },
                                    ],
                                  },
                                ],
                              },
                              {
                                kind: 12,
                                children: [
                                  {
                                    kind: 11,
                                    value: 'optional',
                                  },
                                  {
                                    kind: 6,
                                    value: ': ',
                                  },
                                  {
                                    kind: 11,
                                    value: 'boolean',
                                  },
                                ],
                              },
                              {
                                kind: 12,
                                children: [
                                  {
                                    kind: 11,
                                    value: 'readonly',
                                  },
                                  {
                                    kind: 6,
                                    value: ': ',
                                  },
                                  {
                                    kind: 11,
                                    value: 'boolean',
                                  },
                                ],
                              },
                              {
                                kind: 12,
                                children: [
                                  {
                                    kind: 11,
                                    value: 'abstract',
                                  },
                                  {
                                    kind: 6,
                                    value: ': ',
                                  },
                                  {
                                    kind: 11,
                                    value: 'boolean',
                                  },
                                ],
                              },
                              {
                                kind: 12,
                                children: [
                                  {
                                    kind: 11,
                                    value: 'async',
                                  },
                                  {
                                    kind: 6,
                                    value: ': ',
                                  },
                                  {
                                    kind: 11,
                                    value: 'boolean',
                                  },
                                ],
                              },
                              {
                                kind: 12,
                                children: [
                                  {
                                    kind: 11,
                                    value: 'visibility',
                                  },
                                  {
                                    kind: 6,
                                    value: ': ',
                                  },
                                  {
                                    kind: 11,
                                    value: '"private"',
                                  },
                                  {
                                    kind: 6,
                                    value: ' | ',
                                  },
                                  {
                                    kind: 11,
                                    value: '"protected"',
                                  },
                                  {
                                    kind: 6,
                                    value: ' | ',
                                  },
                                  {
                                    kind: 11,
                                    value: '"public"',
                                  },
                                ],
                              },
                              {
                                kind: 12,
                                children: [
                                  {
                                    kind: 11,
                                    value: 'static',
                                  },
                                  {
                                    kind: 6,
                                    value: ': ',
                                  },
                                  {
                                    kind: 11,
                                    value: 'boolean',
                                  },
                                ],
                              },
                              {
                                kind: 12,
                                children: [
                                  {
                                    kind: 11,
                                    value: 'type',
                                  },
                                  {
                                    kind: 6,
                                    value: ': ',
                                  },
                                  {
                                    kind: 11,
                                    value: 'string',
                                  },
                                ],
                              },
                              {
                                kind: 12,
                                children: [
                                  {
                                    kind: 11,
                                    value: 'extension',
                                  },
                                  {
                                    kind: 6,
                                    value: ': ',
                                  },
                                  {
                                    kind: 11,
                                    value: 'string',
                                  },
                                ],
                              },
                              {
                                kind: 12,
                                children: [
                                  {
                                    kind: 11,
                                    value: 'description',
                                  },
                                  {
                                    kind: 6,
                                    value: ': ',
                                  },
                                  {
                                    kind: 11,
                                    value: 'string',
                                  },
                                ],
                              },
                              {
                                kind: 12,
                                children: [
                                  {
                                    kind: 11,
                                    value: 'fires',
                                  },
                                  {
                                    kind: 6,
                                    value: ': ',
                                  },
                                  {
                                    kind: 11,
                                    value: 'string',
                                  },
                                  {
                                    kind: 6,
                                    value: '[]',
                                  },
                                ],
                              },
                              {
                                kind: 12,
                                children: [
                                  {
                                    kind: 11,
                                    value: 'see',
                                  },
                                  {
                                    kind: 6,
                                    value: ': ',
                                  },
                                  {
                                    kind: 11,
                                    value: 'string',
                                  },
                                  {
                                    kind: 6,
                                    value: '[]',
                                  },
                                ],
                              },
                              {
                                kind: 12,
                                children: [
                                  {
                                    kind: 11,
                                    value: 'examples',
                                  },
                                  {
                                    kind: 6,
                                    value: ': ',
                                  },
                                  {
                                    kind: 9,
                                    children: [
                                      {
                                        kind: 11,
                                        value: 'JSDocExample',
                                      },
                                    ],
                                  },
                                  {
                                    kind: 6,
                                    value: '[]',
                                  },
                                ],
                              },
                              {
                                kind: 12,
                                children: [
                                  {
                                    kind: 11,
                                    value: 'tags',
                                  },
                                  {
                                    kind: 6,
                                    value: ': ',
                                  },
                                  {
                                    kind: 9,
                                    children: [
                                      {
                                        kind: 11,
                                        value: 'JSDocPropTag',
                                      },
                                    ],
                                  },
                                  {
                                    kind: 6,
                                    value: '[]',
                                  },
                                ],
                              },
                              {
                                kind: 12,
                                children: [
                                  {
                                    kind: 11,
                                    value: 'summary',
                                  },
                                  {
                                    kind: 6,
                                    value: ': ',
                                  },
                                  {
                                    kind: 11,
                                    value: 'string',
                                  },
                                ],
                              },
                              {
                                kind: 12,
                                children: [
                                  {
                                    kind: 11,
                                    value: 'deprecated',
                                  },
                                  {
                                    kind: 6,
                                    value: ': ',
                                  },
                                  {
                                    kind: 11,
                                    value: 'string',
                                  },
                                  {
                                    kind: 6,
                                    value: ' | ',
                                  },
                                  {
                                    kind: 11,
                                    value: 'true',
                                  },
                                ],
                              },
                              {
                                kind: 12,
                                children: [
                                  {
                                    kind: 11,
                                    value: 'ignore',
                                  },
                                  {
                                    kind: 6,
                                    value: ': ',
                                  },
                                  {
                                    kind: 11,
                                    value: 'boolean',
                                  },
                                ],
                              },
                            ],
                          },
                        ],
                      },
                      {
                        kind: 12,
                        children: [
                          {
                            kind: 11,
                            value: '__helpers',
                          },
                          {
                            kind: 6,
                            value: ': ',
                          },
                          {
                            kind: 9,
                            children: [
                              {
                                kind: 11,
                                value: 'Record',
                              },
                            ],
                          },
                          {
                            kind: 6,
                            value: '<',
                          },
                          {
                            kind: 11,
                            value: 'string',
                          },
                          {
                            kind: 6,
                            value: ', ',
                          },
                          {
                            kind: 9,
                            children: [
                              {
                                kind: 11,
                                value: 'PropType',
                              },
                            ],
                          },
                          {
                            kind: 6,
                            value: '>',
                          },
                        ],
                      },
                      {
                        kind: 12,
                        children: [
                          {
                            kind: 11,
                            value: '__diagnostics',
                          },
                          {
                            kind: 6,
                            value: ': ',
                          },
                          {
                            kind: 9,
                            children: [
                              {
                                kind: 11,
                                value: 'PropDiagnostic',
                              },
                            ],
                          },
                          {
                            kind: 6,
                            value: '[]',
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
              {
                kind: 3,
                children: [
                  {
                    kind: 6,
                    value: 'properties parsed from ',
                  },
                  {
                    kind: 6,
                    value: ' ',
                  },
                  {
                    kind: 11,
                    value: 'structured-types/api',
                  },
                  {
                    kind: 6,
                    value: ' ',
                  },
                  {
                    kind: 6,
                    value: '',
                  },
                ],
              },
            ],
          },
          {
            kind: 2,
            children: [
              {
                kind: 3,
                children: [
                  {
                    kind: 9,
                    children: [
                      {
                        kind: 11,
                        value: 'options*',
                      },
                    ],
                  },
                ],
              },
              {
                kind: 3,
                children: [
                  {
                    kind: 13,
                    summary: [
                      {
                        kind: 9,
                        children: [
                          {
                            kind: 11,
                            value: 'DocumentationOptions',
                          },
                        ],
                      },
                    ],
                    children: [
                      {
                        kind: 12,
                        children: [
                          {
                            kind: 11,
                            value: 'collapsed',
                          },
                          {
                            kind: 6,
                            value: ': ',
                          },
                          {
                            kind: 11,
                            value: 'string',
                          },
                          {
                            kind: 6,
                            value: '[]',
                          },
                        ],
                      },
                      {
                        kind: 12,
                        children: [
                          {
                            kind: 11,
                            value: 'extensions',
                          },
                          {
                            kind: 6,
                            value: ': ',
                          },
                          {
                            kind: 11,
                            value: 'string',
                          },
                          {
                            kind: 6,
                            value: '[]',
                          },
                        ],
                      },
                      {
                        kind: 12,
                        children: [
                          {
                            kind: 11,
                            value: 'visible',
                          },
                          {
                            kind: 6,
                            value: ': ',
                          },
                          {
                            kind: 11,
                            value: 'string',
                          },
                          {
                            kind: 6,
                            value: '[]',
                          },
                        ],
                      },
                      {
                        kind: 12,
                        children: [
                          {
                            kind: 11,
                            value: 'columns',
                          },
                          {
                            kind: 6,
                            value: ': ',
                          },
                          {
                            kind: 12,
                            children: [
                              {
                                kind: 9,
                                children: [
                                  {
                                    kind: 11,
                                    value: 'ColumnName',
                                  },
                                ],
                              },
                              {
                                kind: 6,
                                value: '[]',
                              },
                            ],
                          },
                          {
                            kind: 6,
                            value: ' | ',
                          },
                          {
                            kind: 9,
                            children: [
                              {
                                kind: 11,
                                value: 'Partial',
                              },
                            ],
                          },
                        ],
                      },
                      {
                        kind: 12,
                        children: [
                          {
                            kind: 11,
                            value: 'sections',
                          },
                          {
                            kind: 6,
                            value: ': ',
                          },
                          {
                            kind: 12,
                            children: [
                              {
                                kind: 9,
                                children: [
                                  {
                                    kind: 11,
                                    value: 'SectionName',
                                  },
                                ],
                              },
                              {
                                kind: 6,
                                value: '[]',
                              },
                            ],
                          },
                          {
                            kind: 6,
                            value: ' | ',
                          },
                          {
                            kind: 9,
                            children: [
                              {
                                kind: 11,
                                value: 'Partial',
                              },
                            ],
                          },
                        ],
                      },
                      {
                        kind: 12,
                        children: [
                          {
                            kind: 11,
                            value: 'skipInherited',
                          },
                          {
                            kind: 6,
                            value: ': ',
                          },
                          {
                            kind: 11,
                            value: 'boolean',
                          },
                        ],
                      },
                      {
                        kind: 13,
                        summary: [
                          {
                            kind: 11,
                            value: 'fs',
                          },
                        ],
                        children: [
                          {
                            kind: 12,
                            children: [
                              {
                                kind: 11,
                                value: 'fileExists',
                              },
                              {
                                kind: 6,
                                value: '*',
                              },
                              {
                                kind: 6,
                                value: ': ',
                              },
                              {
                                kind: 12,
                                children: [
                                  {
                                    kind: 7,
                                    children: [
                                      {
                                        kind: 6,
                                        value: 'function',
                                      },
                                    ],
                                  },
                                  {
                                    kind: 6,
                                    value: ' (',
                                  },
                                ],
                              },
                              {
                                kind: 12,
                                children: [
                                  {
                                    kind: 11,
                                    value: 'filePath',
                                  },
                                  {
                                    kind: 6,
                                    value: '*',
                                  },
                                  {
                                    kind: 6,
                                    value: ': ',
                                  },
                                  {
                                    kind: 11,
                                    value: 'string',
                                  },
                                ],
                              },
                              {
                                kind: 6,
                                value: ')',
                              },
                              {
                                kind: 6,
                                value: ' => ',
                              },
                              {
                                kind: 9,
                                children: [
                                  {
                                    kind: 11,
                                    value: 'Promise',
                                  },
                                ],
                              },
                              {
                                kind: 6,
                                value: '<',
                              },
                              {
                                kind: 11,
                                value: 'boolean',
                              },
                              {
                                kind: 6,
                                value: '>',
                              },
                            ],
                          },
                          {
                            kind: 12,
                            children: [
                              {
                                kind: 11,
                                value: 'readDirectory',
                              },
                              {
                                kind: 6,
                                value: '*',
                              },
                              {
                                kind: 6,
                                value: ': ',
                              },
                              {
                                kind: 12,
                                children: [
                                  {
                                    kind: 7,
                                    children: [
                                      {
                                        kind: 6,
                                        value: 'function',
                                      },
                                    ],
                                  },
                                  {
                                    kind: 6,
                                    value: ' (',
                                  },
                                ],
                              },
                              {
                                kind: 12,
                                children: [
                                  {
                                    kind: 11,
                                    value: 'path',
                                  },
                                  {
                                    kind: 6,
                                    value: '*',
                                  },
                                  {
                                    kind: 6,
                                    value: ': ',
                                  },
                                  {
                                    kind: 11,
                                    value: 'string',
                                  },
                                ],
                              },
                              {
                                kind: 6,
                                value: ')',
                              },
                              {
                                kind: 6,
                                value: ' => ',
                              },
                              {
                                kind: 9,
                                children: [
                                  {
                                    kind: 11,
                                    value: 'Promise',
                                  },
                                ],
                              },
                              {
                                kind: 6,
                                value: '<',
                              },
                              {
                                kind: 12,
                                children: [
                                  {
                                    kind: 11,
                                    value: 'string',
                                  },
                                  {
                                    kind: 6,
                                    value: '[]',
                                  },
                                ],
                              },
                              {
                                kind: 6,
                                value: '>',
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
              {
                kind: 3,
                children: [
                  {
                    kind: 6,
                    value: 'page generation options',
                  },
                ],
              },
            ],
          },
          {
            kind: 2,
            children: [
              {
                kind: 3,
                children: [
                  {
                    kind: 11,
                    value: 'returns',
                  },
                ],
              },
              {
                kind: 3,
                children: [
                  {
                    kind: 9,
                    children: [
                      {
                        kind: 11,
                        value: 'Promise',
                      },
                    ],
                  },
                  {
                    kind: 6,
                    value: '<',
                  },
                  {
                    kind: 12,
                    children: [
                      {
                        kind: 9,
                        children: [
                          {
                            kind: 11,
                            value: 'DocumentationNode',
                          },
                        ],
                      },
                      {
                        kind: 6,
                        value: '[]',
                      },
                    ],
                  },
                  {
                    kind: 6,
                    value: '>',
                  },
                ],
              },
              {
                kind: 3,
                children: [
                  {
                    kind: 6,
                    value: 'a list of documentation nodes',
                  },
                ],
              },
            ],
          },
        ],
      },
    ]);
  });
});
