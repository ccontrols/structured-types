import path from 'path';
import { parseFiles } from '../../../src/index';

describe('union', () => {
  it('members-comments', () => {
    const results = parseFiles([
      path.resolve(__dirname, 'members-comments.ts'),
    ]);
    expect(results).toEqual({
      TextAlignment: {
        name: 'TextAlignment',
        kind: 4,
        properties: [
          {
            kind: 1,
            type: 'Left',
            value: 'left',
            description: 'Left-aligns the text.',
          },
          {
            kind: 1,
            type: 'Right',
            value: 'right',
            description: 'Right-aligns the text.',
          },
          {
            kind: 1,
            type: 'Center',
            value: 'center',
            description: 'Centers the text horizontally.',
          },
        ],
        description: 'Controls the alignment of text when printed.',
      },
    });
  });
  it('export const', () => {
    const results = parseFiles([path.resolve(__dirname, 'export-const.ts')]);
    expect(results).toEqual({
      union: {
        description: 'strings union',
        kind: 4,
        name: 'union',
        properties: [
          {
            kind: 1,
            value: 'this',
          },
          {
            kind: 2,
            value: 1,
          },
          {
            kind: 3,
            value: false,
          },
          {
            kind: 10,
          },
          {
            kind: 8,
          },
        ],
      },
    });
  });
});
