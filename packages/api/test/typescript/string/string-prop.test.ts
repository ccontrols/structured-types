import path from 'path';
import { parseFiles } from '../../../src/index';
describe('string', () => {
  it('default export', () => {
    const results = parseFiles([path.resolve(__dirname, 'default-export.ts')]);
    expect(results).toEqual({
      default: {
        kind: 1,
        description: 'export default variable',
        name: 'mystring',
      },
    });
  });
  it('initializer', () => {
    const results = parseFiles([path.resolve(__dirname, 'initializer.ts')]);

    expect(results).toEqual({
      s: {
        kind: 1,
        description: 'initialiazed string variable',
        value: 'a',
        name: 's',
      },
    });
  });

  it('named-export', () => {
    const results = parseFiles([path.resolve(__dirname, 'named-export.ts')]);

    expect(results).toEqual({
      str: {
        kind: 1,
        name: 'mystring',
      },
    });
  });
});
