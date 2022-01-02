import path from 'path';
import { PropTypes } from '@structured-types/api';
import { propsToDocumentation, apiDocsConfig } from '../../../src';

const input: PropTypes = {
  TestProp: {
    name: 'TestProp',

    loc: {
      filePath: 'testfile.tsx',
      loc: {
        start: {
          line: 10,
          col: 12,
        },
        end: {
          line: 10,
          col: 20,
        },
      },
    },
    kind: 4,
    properties: [
      {
        kind: 6,
        properties: [
          {
            kind: 1,
            value: 'default value',
            description: 'test prop description',
          },
          {
            kind: 2,
          },
        ],
      },
      {
        kind: 4,
        type: 'NumArr',
        properties: [
          {
            kind: 1,
          },
          {
            kind: 2,
          },
        ],
      },
    ],
    type: 'SomeType',
    examples: [
      {
        caption: 'Example 1',
        content: `
import React from 'react';

export const Example1 = () => 'test';
`,
      },
      {
        caption: 'Example 2',
        content: `
import React from 'react';

export const Example2 = () => 'test';
`,
      },
    ],
    description: 'This is some markdown `description`',
  },
};

const jsResults = [
  {
    kind: 5,
    children: [
      {
        kind: 7,
        children: [
          {
            kind: 6,
            value: 'Component',
          },
        ],
      },
    ],
  },
  {
    kind: 5,
    children: [
      {
        kind: 6,
        value: 'The Name is: TestProp',
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
            value: 'description',
          },
        ],
      },
    ],
  },
  {
    kind: 5,
    children: [
      {
        kind: 6,
        value: 'This is some markdown `description`',
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
            value: 'location',
          },
        ],
      },
    ],
  },
  {
    kind: 5,
    children: [
      {
        kind: 8,
        children: [
          {
            kind: 6,
            value: 'defined in ',
          },
          {
            kind: 9,
            children: [
              {
                kind: 6,
                value:
                  '@structured-types/api-docs/packages/api-docs/testfile.tsx',
              },
            ],
            url: 'https://github.com/ccontrols/structured-types/tree/master/packages/api-docs/testfile.tsx#L10',
            loc: {
              filePath: 'testfile.tsx',
              loc: {
                start: {
                  line: 10,
                  col: 12,
                },
                end: {
                  line: 10,
                  col: 20,
                },
              },
            },
          },
        ],
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
            value: 'Custom Properties',
          },
        ],
      },
    ],
  },
  {
    kind: 5,
    children: [
      {
        kind: 11,
        value: 'tuple',
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
            value: 'NumArr',
          },
        ],
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
            value: 'Samples',
          },
        ],
      },
    ],
  },
  {
    kind: 5,
    children: [
      {
        kind: 10,
        value:
          "\nimport React from 'react';\n\nexport const Example1 = () => 'test';\n",
      },
    ],
  },
  {
    kind: 5,
    children: [
      {
        kind: 10,
        value:
          "\nimport React from 'react';\n\nexport const Example2 = () => 'test';\n",
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
            value: 'Hello',
          },
        ],
      },
    ],
  },
  {
    kind: 5,
    children: [
      {
        kind: 6,
        value: 'The Name is: TestProp',
      },
    ],
  },
];
const jsonResult = [
  {
    kind: 5,
    children: [
      {
        kind: 7,
        children: [
          {
            kind: 6,
            value: 'Component',
          },
        ],
      },
    ],
  },
  {
    kind: 4,
    depth: 2,
    children: [
      {
        kind: 6,
        value: 'TestProp',
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
            value: 'description',
          },
        ],
      },
    ],
  },
  {
    kind: 5,
    children: [
      {
        kind: 6,
        value: 'This is some markdown `description`',
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
            value: 'location',
          },
        ],
      },
    ],
  },
  {
    kind: 5,
    children: [
      {
        kind: 8,
        children: [
          {
            kind: 6,
            value: 'defined in ',
          },
          {
            kind: 9,
            children: [
              {
                kind: 6,
                value:
                  '@structured-types/api-docs/packages/api-docs/testfile.tsx',
              },
            ],
            url: 'https://github.com/ccontrols/structured-types/tree/master/packages/api-docs/testfile.tsx#L10',
            loc: {
              filePath: 'testfile.tsx',
              loc: {
                start: {
                  line: 10,
                  col: 12,
                },
                end: {
                  line: 10,
                  col: 20,
                },
              },
            },
          },
        ],
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
            value: 'Custom Properties',
          },
        ],
      },
    ],
  },
  {
    kind: 5,
    children: [
      {
        kind: 11,
        value: 'tuple',
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
            value: 'NumArr',
          },
        ],
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
            value: 'Samples',
          },
        ],
      },
    ],
  },
  {
    kind: 5,
    children: [
      {
        kind: 10,
        value:
          "\nimport React from 'react';\n\nexport const Example1 = () => 'test';\n",
      },
    ],
  },
  {
    kind: 5,
    children: [
      {
        kind: 10,
        value:
          "\nimport React from 'react';\n\nexport const Example2 = () => 'test';\n",
      },
    ],
  },
];

describe('sections', () => {
  it('javascript', async () => {
    const { config } =
      (await apiDocsConfig(path.join(__dirname, 'js', 'api-docs.config.js'))) ||
      {};
    const docs = await propsToDocumentation(input, config);
    expect(docs).toEqual(jsResults);
  });
  it('yaml', async () => {
    const { config } =
      (await apiDocsConfig(
        path.join(__dirname, 'yaml', 'api-docs.config.yaml'),
      )) || {};
    const docs = await propsToDocumentation(input, config);
    expect(docs).toMatchObject(jsonResult);
  });
  it('json', async () => {
    const { config } =
      (await apiDocsConfig(
        path.join(__dirname, 'json', 'api-docs.config.json'),
      )) || {};
    const docs = await propsToDocumentation(input, config);
    expect(docs).toMatchObject(jsonResult);
  });
});
