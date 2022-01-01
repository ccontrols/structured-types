import path from 'path';
import { analyzeFiles } from '@structured-types/api';
import { propsToDocumentation } from '../../src';

describe('const', () => {
  it('string-const', async () => {
    const props = analyzeFiles([path.resolve(__dirname, `const.ts`)]);
    const results = await propsToDocumentation(props);
    expect(results).toEqual([
      {
        kind: 4,
        depth: 2,
        children: [
          {
            kind: 6,
            value: 'STRING_CONST',
          },
        ],
      },
      {
        kind: 7,
        children: [
          {
            kind: 11,
            value: 'string',
          },
          {
            kind: 6,
            value: ' = "TEST"',
          },
        ],
      },
    ]);
  });
});
