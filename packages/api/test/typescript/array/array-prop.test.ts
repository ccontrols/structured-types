import path from 'path';
import { parseFiles } from '../../../src/index';

describe('array', () => {
  it('objects', () => {
    const results = parseFiles([path.resolve(__dirname, 'objects.ts')]);

    expect(results).toEqual({
      arrType: {
        name: 'arrType',
        kind: 16,
        properties: [
          {
            kind: 14,
            properties: [
              {
                kind: 1,
                name: 'm',
              },
            ],
            name: 'Internal',
            type: 'Internal',
          },
        ],
        deprecated: true,
        description: 'type array of interface type',
      },
    });
  });
  it('array-new', () => {
    const results = parseFiles([path.resolve(__dirname, 'array-new.ts')]);

    expect(results).toEqual({
      ArrayNew: {
        kind: 16,
        value: [
          {
            kind: 1,
            value: 'red',
          },
          {
            kind: 1,
            value: 'green',
          },
          {
            kind: 1,
            value: 'blue',
          },
        ],
        name: 'ArrayNew',
        description: 'create a new array object',
      },
    });
  });
  it('array-keyword', () => {
    const results = parseFiles([path.resolve(__dirname, 'array-keyword.ts')]);
    expect(results).toEqual({
      ArrayKeyword: {
        name: 'ArrayKeyword',
        kind: 16,
        properties: [
          {
            kind: 1,
          },
        ],
        value: [
          {
            kind: 1,
            value: 'test',
          },
        ],
        description: 'Array keyword of type string initialized',
      },
    });
  });

  it('strings-const', () => {
    const results = parseFiles([path.resolve(__dirname, 'string-const.ts')]);
    expect(results).toEqual({
      arrString: {
        name: 'arrString',
        kind: 16,
        properties: [
          {
            kind: 1,
          },
        ],
        value: [
          {
            kind: 1,
            value: 'one',
          },
          {
            kind: 1,
            value: 'two',
          },
        ],
        description: 'this is an array of strings',
      },
    });
  });
  it('initialized-strings', () => {
    const results = parseFiles([
      path.resolve(__dirname, 'initialized-strings.ts'),
    ]);
    expect(results).toEqual({
      names: {
        name: 'names',
        kind: 16,
        value: [
          {
            kind: 1,
            value: 'Alice',
          },
          {
            kind: 1,
            value: 'Bob',
          },
          {
            kind: 1,
            value: 'Eve',
          },
        ],
        description: 'const array of strings',
      },
    });
  });
});
