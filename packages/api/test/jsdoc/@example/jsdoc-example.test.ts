import path from 'path';
import { parseFiles } from '../../../src/index';

describe('@example', () => {
  it('caption', () => {
    const results = parseFiles([path.resolve(__dirname, 'caption.js')]);
    expect(results).toEqual({
      method1: {
        name: 'method1',
        kind: 11,
        parameters: [
          {
            kind: 17,
            name: 'a',
          },
          {
            kind: 17,
            name: 'b',
          },
        ],
        description: 'Solves equations of the form a * x = b',
        examples: [
          {
            caption: 'Example usage of method1.',
            content: '// returns 2\nglobalNS.method1(5, 10);',
          },
        ],
        returns: {
          description: 'Returns the value of x for the equation.',
          kind: 2,
          optional: true,
        },
      },
    });
  });
  it('examples', () => {
    const results = parseFiles([path.resolve(__dirname, 'examples.js')]);
    expect(results).toEqual({
      method1: {
        name: 'method1',
        kind: 11,
        parameters: [
          {
            kind: 17,
            name: 'a',
          },
          {
            kind: 17,
            name: 'b',
          },
        ],
        description: 'Solves equations of the form a * x = b',
        examples: [
          {
            content: '// returns 2\nglobalNS.method1(5, 10);',
          },
          {
            content: '// returns 3\nglobalNS.method(5, 15);',
          },
        ],
        returns: {
          description: 'Returns the value of x for the equation.',
          kind: 2,
          optional: true,
        },
      },
    });
  });
});
