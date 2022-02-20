import path from 'path';
import { parseFiles, FunctionProp, ClassLikeProp } from '../../../src';

describe('docs-story-props', () => {
  it('name-shortcut', () => {
    const result = parseFiles(
      [path.resolve(__dirname, 'name-shortcut.docs.tsx')],
      {
        collectSourceInfo: 'body',
        collectInnerLocations: true,
        collectParametersUsage: true,
      },
    );
    expect(
      ((result.selectProp as FunctionProp)['parameters']?.[0] as ClassLikeProp)
        .properties,
    ).toMatchObject([
      {
        name: 'value',
        usage: [
          {
            start: {
              line: 4,
              col: 26,
            },
            end: {
              line: 4,
              col: 31,
            },
          },
        ],
        kind: 17,
        loc: {
          loc: {
            start: {
              line: 3,
              col: 30,
            },
            end: {
              line: 3,
              col: 35,
            },
          },
        },
      },
    ]);
  });
  it('react-props', () => {
    const result = parseFiles(
      [path.resolve(__dirname, 'react-props.docs.tsx')],
      {
        collectSourceInfo: 'body',
        collectInnerLocations: true,
        collectParametersUsage: true,
      },
    );
    expect(
      ((result.myStory as FunctionProp)['parameters']?.[0] as ClassLikeProp)
        .properties,
    ).toMatchObject([
      {
        name: 'age',
        usage: [
          {
            start: {
              line: 4,
              col: 18,
            },
            end: {
              line: 4,
              col: 21,
            },
          },
          {
            start: {
              line: 5,
              col: 17,
            },
            end: {
              line: 5,
              col: 20,
            },
          },
        ],
        kind: 17,
        loc: {
          loc: {
            start: {
              line: 2,
              col: 27,
            },
            end: {
              line: 2,
              col: 30,
            },
          },
        },
      },
    ]);
  });
  it('simple-usage', () => {
    const result = parseFiles(
      [path.resolve(__dirname, 'simple-usage.docs.tsx')],
      {
        collectSourceInfo: 'body',
        collectInnerLocations: true,
        collectParametersUsage: true,
      },
    );
    expect(
      ((result.story as FunctionProp)['parameters']?.[0] as ClassLikeProp)
        .properties,
    ).toMatchObject([
      {
        name: 'name',
        usage: [
          {
            start: {
              line: 1,
              col: 36,
            },
            end: {
              line: 1,
              col: 40,
            },
          },
        ],
        kind: 17,
        loc: {
          loc: {
            start: {
              line: 1,
              col: 25,
            },
            end: {
              line: 1,
              col: 29,
            },
          },
        },
      },
    ]);
  });
  it('deconstructed-story-props', () => {
    const result = parseFiles(
      [path.resolve(__dirname, 'deconstructed-props.docs.tsx')],
      {
        collectSourceInfo: 'body',
        collectInnerLocations: true,
        collectParametersUsage: true,
      },
    );
    expect(
      ((result.story as FunctionProp)['parameters']?.[0] as ClassLikeProp)
        .properties,
    ).toMatchObject([
      {
        name: 'name',
        usage: [
          {
            start: {
              line: 4,
              col: 29,
            },
            end: {
              line: 4,
              col: 33,
            },
          },
        ],
        kind: 17,
        loc: {
          loc: {
            start: {
              line: 3,
              col: 25,
            },
            end: {
              line: 3,
              col: 29,
            },
          },
        },
      },
      {
        name: 'age',
        usage: [
          {
            start: {
              line: 4,
              col: 47,
            },
            end: {
              line: 4,
              col: 50,
            },
          },
        ],
        kind: 17,
        loc: {
          loc: {
            start: {
              line: 3,
              col: 31,
            },
            end: {
              line: 3,
              col: 34,
            },
          },
        },
      },
    ]);
  });
});
