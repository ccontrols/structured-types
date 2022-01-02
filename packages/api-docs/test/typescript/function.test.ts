import path from 'path';
import { analyzeFiles } from '@structured-types/api';
import { propsToDocumentation } from '../../src';

describe('function', () => {
  it('function-no-params', async () => {
    const props = analyzeFiles([
      path.resolve(__dirname, `function-no-params.ts`),
    ]);
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
            children: [],
          },
          {
            kind: 2,
            children: [],
          },
        ],
      },
    ]);
  });
});
