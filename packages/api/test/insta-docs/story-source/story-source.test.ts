import path from 'path';
import fs from 'fs';
import {
  parseFiles,
  SourcePositions,
  FunctionProp,
  PropType,
} from '../../../src/index';
const extractSource = (
  source?: string,
  loc?: SourcePositions,
): string | undefined => {
  if (loc && source) {
    const { start, end } = loc || {};
    if (start && end) {
      const lines = source.split('\n');

      if (start.line === end.line) {
        return lines[start.line - 1].substring(start.col - 1, end.col - 1);
      } else {
        const startLine = lines[start.line - 1];
        const endLine = lines[end.line - 1];
        if (startLine !== undefined && endLine !== undefined) {
          return [
            startLine.substring(start.col - 1),
            ...lines.slice(start.line, end.line - 1),
            endLine.substring(0, end.col - 1),
          ].join('\n');
        }
      }
    }
  }
  return undefined;
};

const runTest = (file: string, fnName: string): [string, PropType] => {
  const fileName = path.resolve(__dirname, file);
  const result = parseFiles([fileName], {
    collectSourceInfo: 'body',
    collectInnerLocations: true,
    collectParametersUsage: true,
  });
  const value = result[fnName];
  const filePath = value?.loc?.filePath;
  if (filePath) {
    return [fs.readFileSync(filePath, 'utf-8'), value];
  }
  return ['', value];
};
describe('story-source', () => {
  it('redirect', () => {
    const [fileContent, value] = runTest('redirect.tsx', 'assigned');
    expect(extractSource(fileContent, value.loc?.loc)).toEqual(
      "() {\n  return '';\n}",
    );
  });
  it('assigned-var', () => {
    const [fileContent, value] = runTest('assigned-var.tsx', 'assigned');
    expect(extractSource(fileContent, value.loc?.loc)).toEqual(
      "() {\n  return '';\n}",
    );
  });
  it('async', () => {
    const [fileContent, value] = runTest('async.docs.tsx', 'asyncStory');
    expect(extractSource(fileContent, value.loc?.loc)).toEqual(
      "() => {\n  const response = await fetch(\n    'http://dummy.restapiexample.com/api/v1/employee/1',\n  );\n  const { data } = await response.json();\n  // eslint-disable-next-line react/display-name\n  return () => <h2>{`Hello, my name is ${data.employee_name}.`}</h2>;\n}",
    );
  });
  it('story-source', () => {
    const [fileContent, value] = runTest('story-source.tsx', 'fnStory');

    expect(extractSource(fileContent, value.loc?.loc)).toEqual(
      "() {\n  return '';\n}",
    );
  });
  it('single-line', () => {
    const [fileContent, value] = runTest('single-line.tsx', 'singleLine');
    expect(extractSource(fileContent, value.loc?.loc)).toEqual(
      '(text: string): string =>\n  `this is my text variable ${text}`',
    );
    expect((value as FunctionProp).parameters).toMatchObject([
      {
        name: 'text',
        loc: {
          loc: {
            start: {
              line: 1,
              col: 28,
            },
            end: {
              line: 1,
              col: 32,
            },
          },
        },
        usage: [
          {
            start: {
              line: 2,
              col: 31,
            },
            end: {
              line: 2,
              col: 35,
            },
          },
        ],
        kind: 1,
      },
    ]);
  });
});
