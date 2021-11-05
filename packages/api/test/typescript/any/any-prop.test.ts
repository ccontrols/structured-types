import path from 'path';
import { parseFiles } from '../../../src/index';

describe('any', () => {
  it('regex', () => {
    const results = parseFiles([path.resolve(__dirname, 'regex.ts')]);
    expect(results).toEqual({
      phoneRegex: {
        name: 'phoneRegex',
        kind: 28,
        type: 'RegExp',
        value: '/^\\+?(\\d+\\s)*\\d+$/',
      },
    });
  });
  it('export-const', () => {
    const results = parseFiles([path.resolve(__dirname, 'export-const.ts')]);
    expect(results).toEqual({
      a: {
        kind: 17,
        description: 'this is any type',
        value: 'as',
        name: 'a',
      },
    });
  });
});
