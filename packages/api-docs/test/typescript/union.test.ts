import path from 'path';
import { analyzeFiles } from '@structured-types/api';
import { propsToDocumentation } from '../../src';

describe('union', () => {
  it('array of union', () => {
    const props = analyzeFiles([path.resolve(__dirname, `union_array.ts`)]);
    const results = propsToDocumentation(props);
    expect(results).toEqual([
      {
        kind: 4,
        depth: 2,
        children: [
          {
            kind: 6,
            value: 'UnionedProps',
          },
        ],
      },
      {
        kind: 7,
        children: [
          {
            kind: 11,
            value: 'type',
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
            ],
          },
          {
            kind: 2,
            children: [
              {
                kind: 3,
                children: [
                  {
                    kind: 3,
                    children: [
                      {
                        kind: 11,
                        value: 'sections',
                      },
                    ],
                  },
                ],
              },
              {
                kind: 3,
                children: [
                  {
                    kind: 3,
                    children: [
                      {
                        kind: 6,
                        value: '(',
                      },
                      {
                        kind: 6,
                        value: '"title"',
                      },
                      {
                        kind: 6,
                        value: ' | ',
                      },
                      {
                        kind: 6,
                        value: '"type"',
                      },
                      {
                        kind: 6,
                        value: ')',
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
        ],
      },
    ]);
  });
});
