import fs from 'fs';
import path from 'path';
import { parseFiles } from '../../../src';

describe('program-callback', () => {
  it('default-import', () => {
    const parsedFile = path.resolve(__dirname, 'default-import.ts');
    const result = parseFiles(
      [parsedFile],
      {
        collectSourceInfo: 'body',
      },
      {
        hostCallback: (host) => {
          host.readFile = (fileName) => {
            if (fileName === parsedFile) {
              return `
export const myStory = props => (
  <Story
    {...props}
  />
);
`;
            }
            return fs.readFileSync(fileName, 'utf-8');
          };
        },
      },
    );
    expect(result['myStory']?.loc?.loc).toMatchObject({
      start: {
        line: 2,
        col: 24,
      },
      end: {
        line: 6,
        col: 2,
      },
    });
  });
});
