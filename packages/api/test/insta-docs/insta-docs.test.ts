import path from 'path';
import fs from 'fs';
import { parseFiles, SourcePositions, FunctionProp } from '../../src/index';

describe('insta-docs', () => {
  it('story-source', () => {
    const result = parseFiles([path.resolve(__dirname, 'story-props.tsx')], {});
    expect(result).toEqual({
      story: {
        name: 'story',
        kind: 11,
        returns: {
          kind: 1,
          optional: true,
        },
        properties: [
          {
            name: 'story',
            kind: 26,
            properties: [
              {
                name: 'subcomponents',
                properties: [
                  {
                    name: 'My Button Tab',
                    kind: 1,
                    value: 'Button',
                  },
                ],
                kind: 26,
              },
            ],
          },
        ],
      },
    });
  });
  it('story-source', () => {
    const fileName = path.resolve(__dirname, 'story-source.tsx');
    const result = parseFiles([fileName], {
      collectSourceInfo: 'body',
      collectInnerLocations: true,
      collectParametersUsage: true,
    });
    const fileContent = fs.readFileSync(fileName, 'utf-8');
    const extractSource = (
      source?: string,
      loc?: SourcePositions,
    ): string | undefined => {
      if (loc && source) {
        const { start, end } = loc || {};
        if (start && end) {
          const lines = source.split('\n');

          if (start.line === end.line) {
            return lines[start.line - 1].substring(start.col - 1, end.col - 1);
          } else {
            const startLine = lines[start.line - 1];
            const endLine = lines[end.line - 1];
            if (startLine !== undefined && endLine !== undefined) {
              return [
                startLine.substring(start.col - 1),
                ...lines.slice(start.line, end.line - 1),
                endLine.substring(0, end.col - 1),
              ].join('\n');
            }
          }
        }
      }
      return undefined;
    };
    expect(extractSource(fileContent, result['fnStory'].loc?.loc)).toEqual(
      "() {\n  return '';\n}",
    );
    expect(extractSource(fileContent, result['singleLine'].loc?.loc)).toEqual(
      '(text: string): string =>\n  `this is my text variable ${text}`',
    );
    expect((result['singleLine'] as FunctionProp).parameters).toMatchObject([
      {
        name: 'text',
        loc: {
          loc: {
            start: {
              line: 16,
              col: 28,
            },
            end: {
              line: 16,
              col: 32,
            },
          },
        },
        usage: [
          {
            start: {
              line: 17,
              col: 31,
            },
            end: {
              line: 17,
              col: 35,
            },
          },
        ],
        kind: 1,
      },
    ]);
    expect(extractSource(fileContent, result['asyncStory'].loc?.loc)).toEqual(
      "() => {\n  const response = await fetch(\n    'http://dummy.restapiexample.com/api/v1/employee/1',\n  );\n  const { data } = await response.json();\n  // eslint-disable-next-line react/display-name\n  return () => <h2>{`Hello, my name is ${data.employee_name}.`}</h2>;\n}",
    );
  });
  it('document', () => {
    const result = parseFiles([path.resolve(__dirname, 'document.docs.tsx')], {
      collectSourceInfo: true,
    });
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
      defaultName: {
        name: 'defaultName',
        loc: {
          loc: {
            start: {
              line: 9,
              col: 14,
            },
            end: {
              line: 9,
              col: 25,
            },
          },
        },
        kind: 11,
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
      initializedName: {
        name: 'initializedName',
        loc: {
          loc: {
            start: {
              line: 11,
              col: 14,
            },
            end: {
              line: 11,
              col: 29,
            },
          },
        },
        kind: 11,
        parameters: [
          {
            kind: 26,
            properties: [
              {
                name: 'name',
                kind: 1,
                value: 'steve',
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
      assignedProps: {
        name: 'assignedProps',
        loc: {
          loc: {
            start: {
              line: 15,
              col: 14,
            },
            end: {
              line: 15,
              col: 27,
            },
          },
        },
        kind: 11,
        parameters: [
          {
            kind: 26,
            properties: [
              {
                name: 'name',
                kind: 1,
                value: 'steve',
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
        properties: [
          {
            name: 'title',
            kind: 1,
            value: 'Custom title',
          },
          {
            name: 'controls',
            kind: 26,
            properties: [
              {
                name: 'name',
                properties: [
                  {
                    name: 'type',
                    kind: 1,
                    value: 'string',
                  },
                  {
                    name: 'value',
                    kind: 1,
                    value: 'enter value here',
                  },
                ],
                kind: 26,
              },
            ],
          },
        ],
      },
    });
  });
});
