import path from 'path';
import { parseFiles } from '../../../src/index';

describe('any', () => {
  it('async-function', () => {
    const results = parseFiles([path.resolve(__dirname, 'async-function.ts')]);
    expect(results).toEqual({
      f: {
        name: 'f',
        kind: 11,
        async: true,
        parameters: [
          {
            name: 'filePath',
            optional: true,
            kind: 1,
          },
        ],
        returns: {
          type: 'Promise',
          generics: [
            {
              kind: 3,
            },
          ],
          kind: 15,
          optional: true,
        },
        description: 'this is an async function',
      },
    });
  });
});
