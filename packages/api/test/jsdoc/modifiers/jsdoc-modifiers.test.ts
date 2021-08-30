import path from 'path';
import { parseFiles } from '../../../src/index';

describe('modifiers', () => {
  it('readonly', () => {
    const results = parseFiles([path.resolve(__dirname, 'readonly.js')]);
    expect(results).toEqual({
      pieOptions: {
        name: 'pieOptions',
        kind: 26,
        properties: [
          {
            kind: 1,
            name: 'plain',
            value: 'pie',
            description: 'Plain.',
          },
          {
            kind: 22,
            name: 'aLaMode',
            description: 'A la mode.',
            readonly: true,
          },
        ],
        description: 'Options for ordering a delicious slice of pie.',
      },
    });
  });
  it('public', () => {
    const results = parseFiles([path.resolve(__dirname, 'public.js')]);
    expect(results).toEqual({
      Documents: {
        name: 'Documents',
        kind: 26,
        properties: [
          {
            kind: 2,
            name: 'Newspaper',
            value: 1,
            description: 'An ordinary newspaper.',
          },
          {
            kind: 2,
            name: 'Diary',
            value: 2,
            description: 'My diary.',
            visibility: 'public',
          },
        ],
      },
    });
  });
  it('protected', () => {
    const results = parseFiles([path.resolve(__dirname, 'protected.js')]);
    expect(results).toEqual({
      Documents: {
        name: 'Documents',
        kind: 26,
        properties: [
          {
            kind: 2,
            name: 'Newspaper',
            value: 1,
            description: 'An ordinary newspaper.',
          },
          {
            kind: 2,
            name: 'Diary',
            value: 2,
            description: 'My diary.',
            visibility: 'protected',
          },
        ],
      },
    });
  });
  it('private', () => {
    const results = parseFiles([path.resolve(__dirname, 'private.js')]);
    expect(results).toEqual({
      Documents: {
        name: 'Documents',
        kind: 26,
        properties: [
          {
            kind: 2,
            name: 'Newspaper',
            value: 1,
            description: 'An ordinary newspaper.',
          },
          {
            kind: 2,
            name: 'Diary',
            value: 2,
            description: 'My diary.',
            visibility: 'private',
          },
        ],
      },
    });
  });
});
