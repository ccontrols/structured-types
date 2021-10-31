import { PropTypes } from '@structured-types/api';
import { propsToDocumentation } from '../src';

describe('collapse', () => {
  it('ViewProps', () => {
    const results = propsToDocumentation(
      {
        CandlestickChartLineProps: {
          name: 'CandlestickChartLineProps',
          loc: {
            filePath: 'react-native-wagmi-charts/src/charts/candle/Line.tsx',
            loc: {
              start: {
                line: 12,
                col: 12,
              },
              end: {
                line: 12,
                col: 38,
              },
            },
          },
          kind: 15,
          properties: [
            {
              name: 'opacity',
              parent: {
                name: 'LineProps',
              },
              optional: true,
              loc: {
                filePath:
                  'react-native-wagmi-charts/node_modules/react-native-svg/src/index.d.ts',
                loc: {
                  start: {
                    line: 6,
                    col: 12,
                  },
                  end: {
                    line: 6,
                    col: 23,
                  },
                },
              },
              kind: 4,
              type: 'NumberProp',
            },

            {
              name: 'fillRule',
              parent: {
                name: 'FillProps',
              },
              optional: true,
              loc: {
                filePath:
                  'react-native-wagmi-charts/node_modules/react-native-svg/src/index.d.ts',
                loc: {
                  start: {
                    line: 9,
                    col: 12,
                  },
                  end: {
                    line: 9,
                    col: 21,
                  },
                },
              },
              kind: 4,
              type: 'FillRule',
            },
            {
              name: 'color',
              optional: true,
              loc: {
                filePath:
                  'react-native-wagmi-charts/src/charts/candle/Line.tsx',
                loc: {
                  start: {
                    line: 12,
                    col: 71,
                  },
                  end: {
                    line: 16,
                    col: 8,
                  },
                },
              },
              kind: 1,
              description: 'my color',
            },
            {
              name: 'x',
              kind: 2,
              loc: {
                filePath:
                  'react-native-wagmi-charts/src/charts/candle/Line.tsx',
                loc: {
                  start: {
                    line: 16,
                    col: 18,
                  },
                  end: {
                    line: 17,
                    col: 4,
                  },
                },
              },
            },
            {
              name: 'y',
              kind: 2,
              loc: {
                filePath:
                  'react-native-wagmi-charts/src/charts/candle/Line.tsx',
                loc: {
                  start: {
                    line: 17,
                    col: 13,
                  },
                  end: {
                    line: 18,
                    col: 4,
                  },
                },
              },
            },
          ],
        },
        CandlestickChartLine: {
          name: 'CandlestickChartLine',
          extension: 'react',
          kind: 25,
          loc: {
            filePath: 'react-native-wagmi-charts/src/charts/candle/Line.tsx',
            loc: {
              start: {
                line: 21,
                col: 13,
              },
              end: {
                line: 21,
                col: 34,
              },
            },
          },
          properties: [
            {
              name: 'opacity',
              parent: {
                name: 'LineProps',
              },
              optional: true,
              loc: {
                filePath:
                  'react-native-wagmi-charts/node_modules/react-native-svg/src/index.d.ts',
                loc: {
                  start: {
                    line: 6,
                    col: 12,
                  },
                  end: {
                    line: 6,
                    col: 23,
                  },
                },
              },
              kind: 4,
              type: 'NumberProp',
            },
            {
              name: 'fill',
              parent: {
                name: 'FillProps',
              },
              optional: true,
              loc: {
                filePath:
                  'react-native-wagmi-charts/node_modules/react-native-svg/src/index.d.ts',
                loc: {
                  start: {
                    line: 104,
                    col: 12,
                  },
                  end: {
                    line: 104,
                    col: 18,
                  },
                },
              },
              kind: 4,
              type: 'Color',
            },
            {
              name: 'x',
              parent: {
                name: 'CandlestickChartLineProps',
              },
              kind: 2,
              loc: {
                filePath:
                  'react-native-wagmi-charts/src/charts/candle/Line.tsx',
                loc: {
                  start: {
                    line: 16,
                    col: 18,
                  },
                  end: {
                    line: 17,
                    col: 4,
                  },
                },
              },
            },
            {
              name: 'y',
              parent: {
                name: 'CandlestickChartLineProps',
              },
              kind: 2,
              loc: {
                filePath:
                  'react-native-wagmi-charts/src/charts/candle/Line.tsx',
                loc: {
                  start: {
                    line: 17,
                    col: 13,
                  },
                  end: {
                    line: 18,
                    col: 4,
                  },
                },
              },
            },
          ],
        },
        __helpers: {
          LineProps: {
            name: 'LineProps',
            loc: {
              filePath:
                'react-native-wagmi-charts/node_modules/react-native-svg/src/index.d.ts',
              loc: {
                start: {
                  line: 295,
                  col: 17,
                },
                end: {
                  line: 295,
                  col: 27,
                },
              },
            },
            kind: 14,
            extends: ['CommonPathProps'],
            properties: [
              {
                name: 'opacity',
                optional: true,
                loc: {
                  filePath:
                    'react-native-wagmi-charts/node_modules/react-native-svg/src/index.d.ts',
                  loc: {
                    start: {
                      line: 6,
                      col: 12,
                    },
                    end: {
                      line: 6,
                      col: 23,
                    },
                  },
                },
                kind: 4,
                type: 'NumberProp',
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
                name: 'fill',
                parent: {
                  name: 'FillProps',
                },
                optional: true,
                loc: {
                  filePath:
                    'react-native-wagmi-charts/node_modules/react-native-svg/src/index.d.ts',
                  loc: {
                    start: {
                      line: 104,
                      col: 12,
                    },
                    end: {
                      line: 104,
                      col: 18,
                    },
                  },
                },
                kind: 4,
                type: 'Color',
              },
            ],
          },
          FillProps: {
            name: 'FillProps',
            loc: {
              filePath:
                'react-native-wagmi-charts/node_modules/react-native-svg/src/index.d.ts',
              loc: {
                start: {
                  line: 106,
                  col: 17,
                },
                end: {
                  line: 106,
                  col: 27,
                },
              },
            },
            kind: 14,
            properties: [
              {
                name: 'fill',
                optional: true,
                loc: {
                  filePath:
                    'react-native-wagmi-charts/node_modules/react-native-svg/src/index.d.ts',
                  loc: {
                    start: {
                      line: 104,
                      col: 12,
                    },
                    end: {
                      line: 104,
                      col: 18,
                    },
                  },
                },
                kind: 4,
                type: 'Color',
                properties: [
                  {
                    kind: 2,
                    type: 'int32ARGBColor',
                    loc: {
                      filePath:
                        'react-native-wagmi-charts/node_modules/react-native-svg/src/index.d.ts',
                      loc: {
                        start: {
                          line: 102,
                          col: 12,
                        },
                        end: {
                          line: 102,
                          col: 27,
                        },
                      },
                    },
                  },
                  {
                    kind: 15,
                    type: 'rgbaArray',
                    loc: {
                      filePath:
                        'react-native-wagmi-charts/node_modules/react-native-svg/src/index.d.ts',
                      loc: {
                        start: {
                          line: 98,
                          col: 12,
                        },
                        end: {
                          line: 98,
                          col: 22,
                        },
                      },
                    },
                    generics: [
                      {
                        name: 'number',
                        kind: 2,
                      },
                    ],
                    properties: [
                      {
                        kind: 20,
                        index: {
                          name: 'n',
                          kind: 2,
                        },
                        prop: {
                          type: 'T',
                        },
                      },
                    ],
                    name: 'rgbaArray',
                  },
                  {
                    kind: 1,
                  },
                ],
              },
            ],
          },
        },
      } as PropTypes,
      { extensions: ['react'], collapsed: ['LineProps'] },
    );
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
        kind: 7,
        children: [
          {
            kind: 11,
            value: 'react component',
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
                      'react-native-wagmi-charts/src/charts/candle/Line.tsx#L21',
                  },
                ],
                url: 'react-native-wagmi-charts/src/charts/candle/Line.tsx#L21',
                loc: {
                  filePath:
                    'react-native-wagmi-charts/src/charts/candle/Line.tsx',
                  loc: {
                    start: {
                      line: 21,
                      col: 13,
                    },
                    end: {
                      line: 21,
                      col: 34,
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
                        value: 'x*',
                      },
                    ],
                    loc: {
                      filePath:
                        'react-native-wagmi-charts/src/charts/candle/Line.tsx',
                      loc: {
                        start: {
                          line: 16,
                          col: 18,
                        },
                        end: {
                          line: 17,
                          col: 4,
                        },
                      },
                    },
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
                    kind: 9,
                    children: [
                      {
                        kind: 11,
                        value: 'CandlestickChartLineProps',
                      },
                    ],
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
                        value: 'y*',
                      },
                    ],
                    loc: {
                      filePath:
                        'react-native-wagmi-charts/src/charts/candle/Line.tsx',
                      loc: {
                        start: {
                          line: 17,
                          col: 13,
                        },
                        end: {
                          line: 18,
                          col: 4,
                        },
                      },
                    },
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
                    kind: 9,
                    children: [
                      {
                        kind: 11,
                        value: 'CandlestickChartLineProps',
                      },
                    ],
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
                    value: '...props',
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
                        value: 'LineProps',
                      },
                    ],
                  },
                ],
              },
              {
                kind: 3,
                children: [],
              },
            ],
          },
        ],
      },
    ]);
  });
});
