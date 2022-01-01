import path from 'path';
import { runCliTests } from './run-cli-tests';

describe('create own api docs', () => {
  const filePath = path.resolve(__dirname, 'README.md');
  runCliTests('api-readme', filePath, []);
});
