import path from 'path';
import { parseFiles } from '../../src/index';

describe('loc', () => {
  it('loc', () => {
    const results = parseFiles([path.resolve(__dirname, 'loc.ts')], {
      collectSourceInfo: true,
      collectInnerLocations: true,
    }) as any;

    expect(results.JSDocPropTag.loc.loc).toEqual({
      start: {
        line: 4,
        col: 18,
      },
      end: {
        line: 4,
        col: 30,
      },
    });
    expect(results.JSDocPropTag.properties[0].loc.loc).toEqual({
      start: {
        line: 8,
        col: 3,
      },
      end: {
        line: 8,
        col: 6,
      },
    });

    expect(results.JSDocPropTag.properties[1].loc.loc).toEqual({
      start: {
        line: 12,
        col: 3,
      },
      end: {
        line: 12,
        col: 10,
      },
    });
  });
});
