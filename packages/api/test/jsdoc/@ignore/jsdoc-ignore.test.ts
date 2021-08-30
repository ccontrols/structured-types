import path from 'path';
import { parseFiles } from '../../../src/index';

describe('@ignore', () => {
  it('ignore member', () => {
    const results = parseFiles([path.resolve(__dirname, 'member-ignore.js')]);
    expect(results).toEqual({
      Clothes: {
        name: 'Clothes',
        kind: 26,
        properties: [],
      },
    });
  });
  it('ignore class', () => {
    const results = parseFiles([path.resolve(__dirname, 'class-ignore.js')]);
    expect(results).toEqual({});
  });
});
