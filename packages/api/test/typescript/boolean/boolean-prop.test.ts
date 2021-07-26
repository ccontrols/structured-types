import path from 'path';
import { parseFiles } from '../../../src/index';

describe('boolean', () => {
  it('export named boolean', () => {
    const results = parseFiles([path.resolve(__dirname, 'named-export.ts')]);
    expect(results).toEqual({ bool: { kind: 3, name: 'bool' } });
  });
  it('false boolean', () => {
    const results = parseFiles([
      path.resolve(__dirname, 'initialized-false.ts'),
    ]);
    expect(results).toEqual({
      bool: {
        kind: 3,
        value: false,
        name: 'bool',
        description: 'boolean variable initialized to false',
      },
    });
  });
  it('true boolean', () => {
    const results = parseFiles([
      path.resolve(__dirname, 'initialized-true.ts'),
    ]);

    expect(results).toEqual({
      bool: {
        kind: 3,
        value: true,
        name: 'bool',
        description: 'boolean variable initialized to true',
      },
    });
  });
});
