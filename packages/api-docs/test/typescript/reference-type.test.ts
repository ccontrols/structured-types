import path from 'path';
import { analyzeFiles } from '@structured-types/api';
import { propsToDocumentation } from '../../src';

describe('reference-type', () => {
  it('enum', async () => {
    const props = analyzeFiles([path.resolve(__dirname, `reference-type.ts`)]);
    const results = await propsToDocumentation(props, {
      sections: ['props'],
    });
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
                    kind: 9,
                    children: [
                      {
                        kind: 11,
                        value: 'stringProp',
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
                    value: 'stringProp description',
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
                        value: 'numberProp*',
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
                    value: '4',
                  },
                ],
              },
              {
                kind: 3,
                children: [
                  {
                    kind: 6,
                    value: 'numberProp description',
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
                        value: 'objectProp*',
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
                        kind: 11,
                        value: 'type',
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
                            value: 'sex',
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
                            value: '"male"',
                          },
                          {
                            kind: 6,
                            value: ' | ',
                          },
                          {
                            kind: 11,
                            value: '"female"',
                          },
                        ],
                      },
                      {
                        kind: 13,
                        summary: [
                          {
                            kind: 11,
                            value: 'c',
                          },
                          {
                            kind: 6,
                            value: '*',
                          },
                        ],
                        children: [
                          {
                            kind: 12,
                            children: [
                              {
                                kind: 11,
                                value: 'system',
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
                                value: 'boolean',
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
                    value: '',
                  },
                ],
              },
              {
                kind: 3,
                children: [
                  {
                    kind: 6,
                    value: 'objectProp description',
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
                        value: 'fnProp*',
                      },
                    ],
                  },
                ],
              },
              {
                kind: 3,
                children: [
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
                    kind: 13,
                    summary: [
                      {
                        kind: 11,
                        value: 'p',
                      },
                      {
                        kind: 6,
                        value: '*',
                      },
                    ],
                    children: [
                      {
                        kind: 13,
                        summary: [
                          {
                            kind: 11,
                            value: 'config',
                          },
                          {
                            kind: 6,
                            value: '*',
                          },
                        ],
                        children: [
                          {
                            kind: 12,
                            children: [
                              {
                                kind: 11,
                                value: 'system',
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
                    kind: 6,
                    value: ')',
                  },
                  {
                    kind: 6,
                    value: ' => ',
                  },
                  {
                    kind: 13,
                    summary: [
                      {
                        kind: 11,
                        value: 'type',
                      },
                    ],
                    children: [
                      {
                        kind: 13,
                        summary: [
                          {
                            kind: 11,
                            value: 'state',
                          },
                          {
                            kind: 6,
                            value: '*',
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
                    value: '',
                  },
                ],
              },
              {
                kind: 3,
                children: [
                  {
                    kind: 6,
                    value: 'function property',
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
                        value: 'arrProp*',
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
                    value: '[',
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
                    kind: 11,
                    value: 'number',
                  },
                  {
                    kind: 6,
                    value: ']',
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
                    value: 'array property',
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
