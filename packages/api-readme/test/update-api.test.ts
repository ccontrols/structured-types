import path from 'path';
import fs from 'fs';
import { runCliTests } from './run-cli-tests';

describe('create own api docs', () => {
  const filePath = path.resolve(__dirname, 'README.md');
  runCliTests('api-readme', filePath, [], () => {
    const contents = fs.readFileSync(filePath, 'utf8');
    expect(contents).toMatchSnapshot();
  });

  //runCliTests('api-readme', path.resolve(__dirname, '../../../site/README.md'));
  //runCliTests('api-readme', path.resolve(__dirname, '../../api/README.md'));
  // runCliTests(
  //   'api-readme',
  //   path.resolve(__dirname, '../../api-docs/README.md'),
  // );
  //runCliTests('api-readme', path.resolve(__dirname, '../README.md'));
});
