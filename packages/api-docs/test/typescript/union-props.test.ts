import path from 'path';
import { analyzeFiles } from '@structured-types/api';
import { propsToDocumentation } from '../../src';

describe('union-props', () => {
  it('union_props', async () => {
    const props = analyzeFiles([path.resolve(__dirname, `union_props.ts`)]);
    const results = await propsToDocumentation(props, { sections: ['props'] });
    expect(results).toEqual([
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
                    value: 'Parent',
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
                        value: 'age*',
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
                        value: 'name*',
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
                    kind: 9,
                    children: [
                      {
                        kind: 11,
                        value: 'ParentProps',
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
