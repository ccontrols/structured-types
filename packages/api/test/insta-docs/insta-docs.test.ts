import path from 'path';
import { parseFiles } from '../../src/index';
//import reactPlugin from '../../src';

describe('insta-docs', () => {
  it('document', () => {
    const result = parseFiles([path.resolve(__dirname, 'document.docs.tsx')], {
      collectSourceInfo: true,
      collectHelpers: true,
    });
    expect(result).toMatchObject({
      assignedProps: {
        name: 'assignedProps',
        loc: {
          filePath:
            '/Users/atanasster/structured-types/packages/api/test/insta-docs/document.docs.tsx',
          loc: {
            start: {
              line: 1,
              col: 14,
            },
            end: {
              line: 1,
              col: 27,
            },
          },
        },
        kind: 11,
        parameters: [
          {
            kind: 26,
            properties: [
              {
                name: 'name',
                kind: 1,
                value: 'steve',
              },
            ],
          },
        ],
        returns: {
          kind: 1,
          optional: true,
        },
      },
    });
  });
});
