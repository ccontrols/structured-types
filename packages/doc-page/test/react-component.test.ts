import { propsToDocumentation } from '../src';
describe('react-component', () => {
  it('NumArray', () => {
    const results = propsToDocumentation({
      NumArray: {
        name: 'NumArray',
        loc: {
          line: 10,
          col: 12,
        },
        kind: 4,
        properties: [
          {
            kind: 6,
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
        description: 'this is an array `GEE`',
      },
    });
    expect(results).toEqual([
      {
        kind: 4,
        depth: 2,
        children: [
          {
            kind: 6,
            value: 'NumArray',
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
                kind: 11,
                children: [
                  {
                    kind: 6,
                    value: 'union',
                  },
                ],
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
            value: 'this is an array `GEE`',
          },
        ],
      },
      {
        kind: 6,
        value: '[',
      },
      {
        kind: 11,
        children: [
          {
            kind: 6,
            value: 'string',
          },
        ],
      },
      {
        kind: 6,
        value: ', ',
      },
      {
        kind: 11,
        children: [
          {
            kind: 6,
            value: 'number',
          },
        ],
      },
      {
        kind: 6,
        value: ']',
      },
      {
        kind: 6,
        value: ' | ',
      },
      {
        kind: 11,
        children: [
          {
            kind: 6,
            value: 'string',
          },
        ],
      },
      {
        kind: 6,
        value: ' | ',
      },
      {
        kind: 11,
        children: [
          {
            kind: 6,
            value: 'number',
          },
        ],
      },
    ]);
  });
  it('CandlestickChartLine', () => {
    const results = propsToDocumentation({
      CandlestickChartLine: {
        name: 'CandlestickChartLine',
        kind: 11,
        parameters: [
          {
            kind: 15,
            type: 'CandlestickChartLineProps',
            properties: [
              {
                name: 'color',
                optional: true,
                kind: 1,
                description: 'my color',
              },
              {
                name: 'x',
                kind: 2,
              },
              {
                name: 'y',
                kind: 2,
              },
            ],
            name: 'CandlestickChartLineProps',
          },
        ],
      },
    });

    expect(results).toEqual([
      {
        kind: 4,
        depth: 2,
        children: [
          {
            kind: 6,
            value: 'CandlestickChartLine',
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
                kind: 11,
                children: [
                  {
                    kind: 6,
                    value: 'function',
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        kind: 4,
        depth: 3,
        children: [
          {
            kind: 7,
            children: [
              {
                kind: 6,
                value: 'parameters',
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
                    kind: 11,
                    children: [
                      {
                        kind: 6,
                        value: 'CandlestickChartLineProps*',
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
                    value: '{ ',
                  },
                  {
                    kind: 11,
                    children: [
                      {
                        kind: 6,
                        value: 'color',
                      },
                    ],
                  },
                  {
                    kind: 6,
                    value: ': ',
                  },
                  {
                    kind: 11,
                    children: [
                      {
                        kind: 6,
                        value: 'string',
                      },
                    ],
                  },
                  {
                    kind: 6,
                    value: ', ',
                  },
                  {
                    kind: 11,
                    children: [
                      {
                        kind: 6,
                        value: 'x',
                      },
                    ],
                  },
                  {
                    kind: 6,
                    value: ': ',
                  },
                  {
                    kind: 11,
                    children: [
                      {
                        kind: 6,
                        value: 'number',
                      },
                    ],
                  },
                  {
                    kind: 6,
                    value: ', ',
                  },
                  {
                    kind: 11,
                    children: [
                      {
                        kind: 6,
                        value: 'y',
                      },
                    ],
                  },
                  {
                    kind: 6,
                    value: ': ',
                  },
                  {
                    kind: 11,
                    children: [
                      {
                        kind: 6,
                        value: 'number',
                      },
                    ],
                  },
                  {
                    kind: 6,
                    value: ' }',
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
