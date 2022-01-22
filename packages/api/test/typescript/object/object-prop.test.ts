import path from 'path';
import { parseFiles } from '../../../src/index';

describe('object', () => {
  it('default-prop-component', () => {
    const results = parseFiles([
      path.resolve(__dirname, 'default-prop-component.ts'),
    ]);
    expect(results).toMatchObject({
      def: {
        name: 'def',
        kind: 26,
        properties: [
          {
            name: 'myprop',
            parent: {
              name: 'Component',
            },
            alias: 'Shorthand',
            type: 'Component',
            kind: 11,
          },
        ],
      },
    });
  });
  it('default-prop-value', () => {
    const results = parseFiles([
      path.resolve(__dirname, 'default-prop-value.ts'),
    ]);
    expect(results).toEqual({
      def: {
        name: 'def',
        kind: 26,
        properties: [
          {
            name: 'myprop',
            parent: {
              name: 'ShorthandObj',
            },
            kind: 26,
            alias: 'shorthand',
            properties: [
              {
                name: 'name',
                parent: {
                  name: 'ShorthandObj',
                },
                kind: 1,
                value: 'name',
                description: 'initialized shorthand prop',
              },
              {
                name: 'address',
                parent: {
                  name: 'ShorthandObj',
                },
                kind: 1,
                value: '1022 Glover str',
              },
            ],
          },
        ],
      },
    });
  });
  it('shorthand-prop', () => {
    const results = parseFiles([path.resolve(__dirname, 'shorthand-prop.ts')]);
    expect(results).toEqual({
      default: {
        name: 'default',
        kind: 26,
        properties: [
          {
            name: 'name',
            kind: 1,
            description: 'initialized shorthand prop',
            value: 'name',
            parent: {
              name: 'ShorthandObj',
            },
          },
          {
            name: 'address',
            kind: 1,
            value: '1022 Glover str',
            parent: {
              name: 'ShorthandObj',
            },
          },
        ],
      },
    });
  });
  it('typed-object', () => {
    const results = parseFiles([path.resolve(__dirname, 'typed-object.ts')]);
    expect(results).toEqual({
      urls: {
        name: 'urls',
        kind: 26,
        properties: [
          {
            name: 'social',
            properties: [
              {
                name: 'google',
                properties: [
                  {
                    name: 'url',
                    parent: {
                      name: 'Site',
                    },
                    kind: 1,
                    value: 'https://google.com',
                  },
                ],
                type: 'Site',
                kind: 15,
              },
              {
                name: 'facebook',
                properties: [
                  {
                    name: 'url',
                    parent: {
                      name: 'Site',
                    },
                    kind: 1,
                    value: 'https://facebook.com',
                  },
                ],
                type: 'Site',
                kind: 15,
              },
            ],
            kind: 26,
          },
        ],
      },
    });
  });
  it('initialized', () => {
    const results = parseFiles([path.resolve(__dirname, 'initialized.ts')]);
    expect(results).toEqual({
      initializedObj: {
        kind: 26,
        properties: [
          {
            kind: 2,
            value: 12,
            name: 'a',
          },
          {
            kind: 1,
            value: 'test',
            name: 'b',
          },
        ],
        name: 'initializedObj',
        description: 'initialized object',
      },
    });
  });

  it('export-const', () => {
    const results = parseFiles([path.resolve(__dirname, 'export-const.ts')]);
    expect(results).toEqual({
      obj: {
        kind: 26,
        value: undefined,
        name: 'obj',
        description: 'exported undefined object',
      },
    });
  });
});
