import path from 'path';
import { analyzeFiles } from '@structured-types/api';
import { propsToDocumentation, apiDocsConfig } from '../../../src';

describe('columns', () => {
  const jsonResults = {
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
                value: 'Property',
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
                value: 'Default',
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
                kind: 11,
                value: 'm*',
              },
            ],
          },
          {
            kind: 3,
            children: [
              {
                kind: 11,
                value: 'string',
              },
            ],
          },
          {
            kind: 3,
            children: [
              {
                kind: 11,
                value: '"hello"',
              },
            ],
          },
          {
            kind: 3,
            children: [
              {
                kind: 6,
                value: 'interface member property',
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
                value: 'n',
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
                kind: 6,
                value: '{ ',
              },
              {
                kind: 11,
                value: 'a',
              },
              {
                kind: 6,
                value: ': ',
              },
              {
                kind: 11,
                value: 'boolean',
              },
              {
                kind: 6,
                value: ' }',
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
                value: '',
              },
            ],
          },
          {
            kind: 3,
            children: [
              {
                kind: 6,
                value: '',
              },
            ],
          },
        ],
      },
    ],
  };
  it('json', () => {
    const { config } =
      apiDocsConfig(path.join(__dirname, 'json', 'api-docs.config.json')) || {};
    const props = analyzeFiles([path.resolve(__dirname, `props.ts`)]);
    const docs = propsToDocumentation(props, {
      ...config,
      sections: ['props'],
    });
    expect(docs[1]).toMatchObject(jsonResults);
  });
  it('yaml', () => {
    const { config } =
      apiDocsConfig(path.join(__dirname, 'yaml', 'api-docs.config.yaml')) || {};
    const props = analyzeFiles([path.resolve(__dirname, `props.ts`)]);
    const docs = propsToDocumentation(props, {
      ...config,
      sections: ['props'],
    });
    expect(docs[1]).toMatchObject(jsonResults);
  });

  it('javascript', () => {
    const { config } =
      apiDocsConfig(path.join(__dirname, 'js', 'api-docs.config.js')) || {};
    const props = analyzeFiles([path.resolve(__dirname, `props.ts`)]);
    const docs = propsToDocumentation(props, {
      ...config,
      sections: ['props'],
    });
    expect(docs[1]).toEqual({
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
                  value: 'Property',
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
                  value: 'Default',
                },
              ],
            },
            {
              kind: 3,
              children: [
                {
                  kind: 6,
                  value: 'Props props',
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
                  kind: 5,
                  children: [
                    {
                      kind: 6,
                      value: 'The Name is: m',
                    },
                  ],
                },
              ],
            },
            {
              kind: 3,
              children: [
                {
                  kind: 11,
                  value: 'string',
                },
              ],
            },
            {
              kind: 3,
              children: [
                {
                  kind: 11,
                  value: '"hello"',
                },
              ],
            },
            {
              kind: 3,
              children: [
                {
                  kind: 6,
                  value: 'interface member property',
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
                  kind: 5,
                  children: [
                    {
                      kind: 6,
                      value: 'The Name is: n',
                    },
                  ],
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
                  kind: 6,
                  value: '{ ',
                },
                {
                  kind: 11,
                  value: 'a',
                },
                {
                  kind: 6,
                  value: ': ',
                },
                {
                  kind: 11,
                  value: 'boolean',
                },
                {
                  kind: 6,
                  value: ' }',
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
                  value: '',
                },
              ],
            },
            {
              kind: 3,
              children: [
                {
                  kind: 6,
                  value: '',
                },
              ],
            },
          ],
        },
      ],
    });
  });
});
