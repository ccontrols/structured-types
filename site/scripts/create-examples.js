const fs = require('fs');
const path = require('path');

const traverseFolder = (folder, examples) => {
  const files = fs.readdirSync(folder);

  files.forEach((fileName) => {
    const filePath = path.resolve(folder, fileName);
    const stat = fs.statSync(filePath);
    if (
      !filePath.includes('.test.') &&
      !fileName.startsWith('__') &&
      !fileName.startsWith('fixtures')
    ) {
      if (stat.isFile()) {
        const content = fs.readFileSync(filePath, 'utf8');
        examples[fileName] = content;
      } else {
        const subFolder = {};
        traverseFolder(filePath, subFolder);
        examples[fileName] = subFolder;
      }
    }
  });
};

const examplesFolder = path.resolve(__dirname, '../../', 'packages/api/test');
const examples = {};
traverseFolder(examplesFolder, examples);
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
