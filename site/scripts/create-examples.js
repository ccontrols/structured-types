const fs = require('fs');
const path = require('path');

const traverseFolder = (folder, files, examples) => {
  files.forEach((fileName) => {
    const filePath = path.resolve(folder, fileName);
    if (
      !filePath.includes('.test.') &&
      !fileName.startsWith('__') &&
      !fileName.startsWith('.') &&
      !fileName.startsWith('fixtures')
    ) {
      const stat = fs.statSync(filePath);
      if (stat.isFile()) {
        const content = fs.readFileSync(filePath, 'utf8');
        examples[fileName] = content;
      } else {
        const subFolder = {};
        const files = fs.readdirSync(filePath);
        if (!files.includes('_site_exclude')) {
          traverseFolder(filePath, files, subFolder);
          examples[fileName] = subFolder;
        }
      }
    }
  });
};

const examplesFolder = path.resolve(__dirname, '../../', 'packages/api/test');
const reactFolder = path.resolve(__dirname, '../../', 'plugins/react/test');

const examples = {};
traverseFolder(examplesFolder, fs.readdirSync(examplesFolder), examples);
examples.react = {};
traverseFolder(reactFolder, fs.readdirSync(reactFolder), examples.react);
examples['react-prop-types'] = {};
const reactPropTypesFolder = path.resolve(
  __dirname,
  '../../',
  'plugins/react-prop-types/test',
);
traverseFolder(
  reactPropTypesFolder,
  fs.readdirSync(reactPropTypesFolder),
  examples['react-prop-types'],
);

fs.writeFileSync(
  path.resolve(__dirname, '../src/api/examples.ts'),
  `
export type Examples = {
  [name: string]: string | Examples;
};
  
export const examples: Examples = ${JSON.stringify(examples, null, 2)};
`,
  'utf8',
);
