import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import * as yargs from 'yargs';
import remark from 'remark';
import toc from 'remark-toc';
import { insertOverview } from './overview-sections/insert-overview';
import { insertTSDoc } from './tsdoc/insert-tsdoc';
/**
 * create markdown pages from README.md type files
 * command-line arguments
 * @param {string} f - input file name to be processed, default is README.md
 * @param {boolean} t - whether to generate a table of contents, default is true
 * @param {boolean} l - whether to output logs, default is true
 */
export default (): void => {
  const args = yargs
    .help()
    .alias('help', 'h')
    .option('f', {
      alias: 'file',
      describe: 'Input file name',
      type: 'string',
      default: 'README.md',
    })
    .option('t', {
      alias: 'toc',
      describe: 'Generate a table of content',
      type: 'boolean',
      default: true,
    })
    .option('l', {
      alias: 'log',
      describe: 'Enabled logs',
      type: 'boolean',
      default: true,
    });
  const options = args.parse(process.argv);
  const fileName = options.f;
  if (options.log) {
    console.log('processing file:', chalk.red(path.resolve(fileName)));
  }
  let r = remark().use(insertTSDoc(fileName)).use(insertOverview);
  if (options.toc) {
    r = r.use(toc, { tight: true });
  }

  r.process(fs.readFileSync(fileName, 'utf8'), function (err, file) {
    if (err) {
      throw err;
    }
    fs.writeFileSync(fileName, String(file));
  });
};
