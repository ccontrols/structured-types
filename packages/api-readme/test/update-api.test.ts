import path from 'path';
import { runCliTests } from './run-cli-tests';

describe('create own api docs', () => {
  //runCliTests('api-readme', path.resolve(__dirname, '../../../site/README.md'));
  runCliTests('api-readme', path.resolve(__dirname, '../../api/README.md'));
  //runCliTests('api-readme', path.resolve(__dirname, '../README.md'));
});
