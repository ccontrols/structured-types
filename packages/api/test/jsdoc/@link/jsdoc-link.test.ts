import path from 'path';
import { parseFiles } from '../../../src/index';

describe('@link', () => {
  it('link-text', () => {
    const results = parseFiles([path.resolve(__dirname, 'link-text.js')]);
    expect(results).toEqual({
      myFunction: {
        name: 'myFunction',
        kind: 11,
        description:
          "See [MyClass](#MyClass) and [MyClass's foo property](MyClass#foo).\nAlso, check out [Google](http://www.google.com) and\n[GitHub](https://github.com).",
        returns: {
          kind: 12,
        },
      },
    });
  });
});
