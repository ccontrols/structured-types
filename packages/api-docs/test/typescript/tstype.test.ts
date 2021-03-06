import path from 'path';
import { analyzeFiles } from '@structured-types/api';
import { propsToDocumentation } from '../../src';

describe('ts-type', () => {
  it('record partial', async () => {
    const props = analyzeFiles([path.resolve(__dirname, `type_record.ts`)]);
    const results = await propsToDocumentation(props);
    expect(results).toEqual([
      {
        kind: 4,
        depth: 2,
        children: [
          {
            kind: 6,
            value: 'RecordProps',
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
                    kind: 9,
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
                    kind: 9,
                    children: [
                      {
                        kind: 11,
                        value: 'Partial',
                      },
                    ],
                  },
                  {
                    kind: 6,
                    value: '<',
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
                    value: ', ',
                  },
                  {
                    kind: 11,
                    value: 'string',
                  },
                  {
                    kind: 6,
                    value: '>',
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
    ]);
  });
});
