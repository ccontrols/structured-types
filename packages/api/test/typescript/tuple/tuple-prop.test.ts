import path from 'path';
import { parseFiles } from '../../../src/index';
describe('tuple', () => {
  it('optional', () => {
    const results = parseFiles([path.resolve(__dirname, 'optional-member.ts')]);
    expect(results).toEqual({
      OptionalTuple: {
        name: 'OptionalTuple',
        kind: 6,
        properties: [
          {
            kind: 3,
          },
          {
            kind: 1,
          },
          {
            optional: true,
            kind: 2,
          },
        ],
        description: 'tuple with an optional member',
      },
    });
  });
  it('spread member', () => {
    const results = parseFiles([path.resolve(__dirname, 'spread-member.ts')]);
    expect(results).toEqual({
      SpreadTuple: {
        name: 'SpreadTuple',
        description: 'spread member of tuple',
        kind: 6,
        properties: [
          {
            kind: 7,
            prop: {
              kind: 16,
              properties: [
                {
                  kind: 3,
                },
              ],
            },
          },
          {
            kind: 1,
          },
          {
            kind: 2,
          },
        ],
      },
    });
  });

  it('simple tuple', () => {
    const results = parseFiles([path.resolve(__dirname, 'simple.ts')]);
    expect(results).toEqual({
      Tuple: {
        kind: 6,
        name: 'Tuple',
        description: 'simple tuple',
        properties: [
          {
            kind: 1,
          },
          {
            kind: 2,
          },
        ],
      },
    });
  });
});
