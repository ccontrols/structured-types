const parserNames = [
  'structured-types',
  'react-docgen-typescript',
  'react-docgen',
  'jsdoc',
  'typedoc',
  'ts-json-schema-generator',
  'documentation',
] as const;

export type ParserNames = typeof parserNames[number];
