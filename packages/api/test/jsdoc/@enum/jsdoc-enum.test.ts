import path from 'path';
import { parseFiles } from '../../../src/index';

describe('@enum', () => {
  it('numeric-enum', () => {
    const results = parseFiles([path.resolve(__dirname, 'numeric-enum.js')]);
    expect(results).toEqual({
      triState: {
        name: 'triState',
        kind: 5,
        properties: [
          {
            kind: 2,
            name: 'TRUE',
            value: 1,
            description: 'The true value',
          },
          {
            kind: 2,
            name: 'FALSE',
            value: -1,
          },
          {
            kind: 3,
            name: 'MAYBE',
            value: true,
          },
        ],
        description: 'Enum for tri-state values.',
        readonly: true,
      },
    });
  });
});
