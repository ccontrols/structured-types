import path from 'path';
import { parseFiles } from '../../../src/index';

describe('params', () => {
  it('default-string', () => {
    const results = parseFiles([path.resolve(__dirname, 'default-string.js')]);
    expect(results).toEqual({
      sayHello: {
        name: 'sayHello',
        kind: 11,
        parameters: [
          {
            name: 'somebody',
            description: "Somebody's name.",
            kind: 1,
            value: 'John Doe',
            optional: true,
          },
        ],
        returns: {
          kind: 12,
        },
      },
    });
  });
  it('default-numeric', () => {
    const results = parseFiles([path.resolve(__dirname, 'default-numeric.js')]);
    expect(results).toEqual({
      m: {
        name: 'm',
        kind: 11,
        parameters: [
          {
            name: 'x',
            description: 'd4 damage',
            kind: 2,
            optional: true,
            value: 1,
          },
        ],
        returns: {
          kind: 12,
        },
      },
    });
  });

  it('optional', () => {
    const results = parseFiles([path.resolve(__dirname, 'optional.js')]);
    expect(results).toEqual({
      sayHello: {
        name: 'sayHello',
        kind: 11,
        parameters: [
          {
            name: 'somebody',
            description: "Somebody's name.",
            kind: 1,
            optional: true,
          },
        ],
        description: 'An optional parameter (using JSDoc syntax)',
        returns: {
          kind: 12,
        },
      },
    });
  });
  it('name-type-description', () => {
    const results = parseFiles([
      path.resolve(__dirname, 'name-type-description.js'),
    ]);
    expect(results).toEqual({
      sayHello: {
        name: 'sayHello',
        kind: 11,
        parameters: [
          {
            kind: 1,
            name: 'somebody',
            description: "Somebody's name.",
          },
        ],
        returns: {
          kind: 12,
        },
      },
    });
  });

  it('with-hyphen-description', () => {
    const results = parseFiles([
      path.resolve(__dirname, 'with-hyphen-description.js'),
    ]);
    expect(results).toEqual({
      sayHello: {
        name: 'sayHello',
        kind: 11,
        parameters: [
          {
            kind: 1,
            name: 'somebody',
            description: "Somebody's name.",
          },
        ],
        returns: {
          kind: 12,
        },
      },
    });
  });

  it('name and type', () => {
    const results = parseFiles([path.resolve(__dirname, 'name-type.js')]);
    expect(results).toEqual({
      sayHello: {
        name: 'sayHello',
        kind: 11,
        parameters: [
          {
            kind: 1,
            name: 'somebody',
          },
        ],
        returns: {
          kind: 12,
        },
      },
    });
  });
  it('only param', () => {
    const results = parseFiles([path.resolve(__dirname, 'just-param.js')]);
    expect(results).toEqual({
      sayHello: {
        name: 'sayHello',
        kind: 11,
        parameters: [
          {
            name: 'somebody',
          },
        ],
        returns: {
          kind: 12,
        },
      },
    });
  });
});
