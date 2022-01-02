import path from 'path';
import { parseFiles } from '../../../src/index';

describe('custom-tests', () => {
  it('webpack-config', () => {
    const results = parseFiles([path.resolve(__dirname, 'webpack-config.ts')], {
      maxDepth: 7,
    });

    expect(results).toMatchSnapshot();
  });
  it('default-export-jsdoc', () => {
    const results = parseFiles([
      path.resolve(__dirname, 'default-export-jsdoc.ts'),
    ]);

    expect(results).toEqual({
      default: {
        name: 'Interface',
        kind: 14,
        properties: [
          {
            name: 'b',
            kind: 3,
          },
        ],
        description: 'this is an interface',
      },
    });
  });
  it('named-export-jsdoc', () => {
    const results = parseFiles([
      path.resolve(__dirname, 'named-export-jsdoc.ts'),
    ]);

    expect(results).toEqual({
      ExportInterface: {
        name: 'Interface',
        kind: 14,
        properties: [
          {
            name: 'b',
            kind: 3,
          },
        ],
        description: 'this is an interface',
      },
    });
  });
});
