import path from 'path';
import { parseFiles } from '../../../src/index';

describe('custom-tests', () => {
  it('webpack-config', () => {
    const results = parseFiles([path.resolve(__dirname, 'webpack-config.ts')]);

    expect(results).toMatchSnapshot({});
  });
});
