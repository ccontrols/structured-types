import path from 'path';
import { parseFiles } from '../../../src/index';

describe('enum', () => {
  it('string enum', () => {
    const results = parseFiles([path.resolve(__dirname, 'string-enum.ts')]);
    expect(results).toEqual({
      StringEnums: {
        name: 'StringEnums',
        kind: 5,
        properties: [
          {
            name: 'Up',
            kind: 1,
            value: 'UP',
          },
          {
            name: 'Down',
            kind: 1,
            value: 'DOWN',
          },
          {
            name: 'Left',
            kind: 1,
            value: 'LEFT',
          },
          {
            name: 'Right',
            kind: 1,
            value: 'RIGHT',
            description: 'right enum property',
          },
        ],
        description: 'string values enum',
      },
    });
  });
  it('initialized enum', () => {
    const results = parseFiles([path.resolve(__dirname, 'initialized.ts')]);
    expect(results).toEqual({
      InitializedEnum: {
        description: 'this is an enum with an initialized element',
        kind: 5,
        name: 'InitializedEnum',
        properties: [
          {
            description: 'enum starts at 1',
            name: 'Up',
            kind: 2,
            value: 1,
          },
          {
            description: 'second element',
            name: 'Down',
          },
          {
            name: 'Left',
          },
          {
            name: 'Right',
          },
        ],
      },
    });
  });
});
