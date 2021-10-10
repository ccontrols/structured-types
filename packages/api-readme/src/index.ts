import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import * as yargs from 'yargs';
import remark from 'remark';
import toc from 'remark-toc';
import { cosmiconfigSync } from 'cosmiconfig';
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
    .option('c', {
      alias: 'config',
      describe: 'Configuration file full path',
      type: 'string',
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
  const configFileName = options.c;
  const configExplorer = cosmiconfigSync('apireadme');
  const configResult = configFileName
    ? configExplorer.load(configFileName)
    : configExplorer.search(path.dirname(fileName));

  if (options.log) {
    console.log('processing file:', chalk.red(path.resolve(fileName)));
    if (configResult) {
      console.log(
        'with custom configuration:',
        chalk.red(configResult.filepath),
      );
    }
  }
  let r = remark().use(insertTSDoc(fileName, configResult)).use(insertOverview);
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
