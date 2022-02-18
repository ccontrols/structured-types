import path from 'path';
import { parseFiles, FunctionProp, ClassLikeProp } from '../../../src';

describe('docs-story-props', () => {
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
