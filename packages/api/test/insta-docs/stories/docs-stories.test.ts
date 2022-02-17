import path from 'path';
import fs from 'fs';
import { parseFiles, SourcePositions, FunctionProp } from '../../../src/index';

describe('docs-stories', () => {
  it('default-name', () => {
    const result = parseFiles(
      [path.resolve(__dirname, 'default-name.docs.tsx')],
      {
        collectSourceInfo: true,
      },
    );
    expect(result).toMatchObject({
      defaultName: {
        name: 'defaultName',
        loc: {
          loc: {
            start: {
              line: 4,
              col: 14,
            },
            end: {
              line: 4,
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
    });
  });
  it('initialized-props', () => {
    const result = parseFiles(
      [path.resolve(__dirname, 'initialized-props.docs.tsx')],
      {
        collectSourceInfo: true,
      },
    );
    expect(result).toMatchObject({
      initializedName: {
        name: 'initializedName',
        loc: {
          loc: {
            start: {
              line: 4,
              col: 14,
            },
            end: {
              line: 4,
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
    });
  });
  it('assigned-props', () => {
    const result = parseFiles(
      [path.resolve(__dirname, 'assigned-props.docs.tsx')],
      {
        collectSourceInfo: true,
      },
    );
    expect(result).toMatchObject({
      assignedProps: {
        name: 'assignedProps',
        loc: {
          loc: {
            start: {
              line: 4,
              col: 14,
            },
            end: {
              line: 4,
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
  it('subcomponents', () => {
    const result = parseFiles(
      [path.resolve(__dirname, 'subcomponents.docs.tsx')],
      {},
    );
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
});
