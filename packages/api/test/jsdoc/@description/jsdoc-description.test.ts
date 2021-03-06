import path from 'path';
import { parseFiles } from '../../../src/index';

describe('@description', () => {
  const expected = {
    add: {
      kind: 11,
      description: 'Add two numbers.',
      parameters: [
        { name: 'a', kind: 17 },
        { name: 'b', kind: 17 },
      ],
      name: 'add',
      returns: {
        kind: 17,
        optional: true,
      },
    },
  };
  it('desc-tag', () => {
    const results = parseFiles([path.resolve(__dirname, 'desc-tag.js')]);
    expect(results).toEqual(expected);
  });
  it('description-tag', () => {
    const results = parseFiles([path.resolve(__dirname, 'description-tag.js')]);
    expect(results).toEqual(expected);
  });
  it('comment', () => {
    const results = parseFiles([path.resolve(__dirname, 'comment.js')]);
    expect(results).toEqual(expected);
  });
});
