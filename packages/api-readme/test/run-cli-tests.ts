//import fs from 'fs';
const mockArgv = require('mock-argv');

import run from '../src';

export const runCliTests = (
  testName: string,
  fileName: string,
  args: string[] = [],
  callback?: () => void,
): void => {
  it(
    testName,
    async () => {
      await mockArgv([...args, '-f', fileName, '-l', 'false'], async () => {
        await run();
        if (callback) {
          callback();
        } else {
          expect(true).toBe(true);
        }
        // const content = fs.readFileSync(fileName, 'utf8');
        // expect(content).toMatchSnapshot();
      });
    },
    500000,
  );
};
