import path from 'path';
import { parseFiles } from '../../../src/index';

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
});
