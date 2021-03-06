import path from 'path';
import { parseFiles } from '../../../src/index';

describe('summary', () => {
  it('summary tag', () => {
    const results = parseFiles([path.resolve(__dirname, 'summary.js')]);
    expect(results).toEqual({
      bloviate: {
        name: 'bloviate',
        kind: 11,
        summary: 'A concise summary.',
        returns: {
          kind: 12,
          optional: true,
        },
        description:
          'A very long, verbose, wordy, long-winded, tedious, verbacious, tautological,\nprofuse, expansive, enthusiastic, redundant, flowery, eloquent, articulate,\nloquacious, garrulous, chatty, extended, babbling description.',
      },
    });
  });
});
