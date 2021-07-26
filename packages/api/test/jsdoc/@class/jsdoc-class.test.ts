import path from 'path';
import { parseFiles } from '../../../src/index';

describe('@class', () => {
  it('function class', () => {
    const results = parseFiles([path.resolve(__dirname, 'function-class.js')]);
    expect(results).toEqual({
      Person: {
        name: 'Person',
        kind: 13,
        description: 'Creates a new Person.',
      },
    });
  });
});
