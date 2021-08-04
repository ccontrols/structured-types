import path from 'path';
import { parseFiles } from '../../../src/index';

describe('see', () => {
  it('inline link', () => {
    const results = parseFiles([path.resolve(__dirname, 'inline-link.js')]);
    expect(results).toEqual({
      bar: {
        name: 'bar',
        kind: 11,
        see: [
          '[foo](#foo) for further information.',
          '[GitHub](https://github.com)',
        ],
        returns: {
          kind: 12,
        },
      },
    });
  });
  it('internal link', () => {
    const results = parseFiles([path.resolve(__dirname, 'internal-link.js')]);
    expect(results).toEqual({
      foo: {
        name: 'foo',
        kind: 11,
        description: 'Both of these will link to the bar function.',
        see: ['[bar](#bar)', 'bar'],
        returns: {
          kind: 12,
        },
      },
    });
  });
  it('direct url in see', () => {
    const results = parseFiles([path.resolve(__dirname, 'pure-url.js')]);
    expect(results).toEqual({
      bar: {
        name: 'bar',
        kind: 11,
        description: 'external link documentation',
        see: ['https://reactjs.org/docs/context.html'],
        returns: {
          kind: 1,
        },
      },
    });
  });
});
