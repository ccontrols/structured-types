import path from 'path';
import { analyzeFiles } from '@structured-types/api';
import { propsToDocumentation } from '../../src';

describe('enum', () => {
  it('enum', async () => {
    const props = analyzeFiles([path.resolve(__dirname, `enum.ts`)]);
    const results = await propsToDocumentation(props);
    expect(results).toEqual([
      {
        kind: 4,
        depth: 2,
        children: [
          {
            kind: 6,
            value: 'PropKind',
          },
        ],
      },
      {
        kind: 7,
        children: [
          {
            kind: 11,
            value: 'enum',
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
                value: 'properties',
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
                    value: 'Value',
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
                        value: 'String*',
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
                    value: 'number',
                  },
                ],
              },
              {
                kind: 3,
                children: [
                  {
                    kind: 11,
                    value: '1',
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
                        value: 'Number*',
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
                    value: 'number',
                  },
                ],
              },
              {
                kind: 3,
                children: [
                  {
                    kind: 11,
                    value: '2',
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
                        value: 'Boolean*',
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
                    value: 'number',
                  },
                ],
              },
              {
                kind: 3,
                children: [
                  {
                    kind: 11,
                    value: '3',
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
