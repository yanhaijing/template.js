#!/usr/bin/env node

const yargs = require('yargs');

const { log } = require('./util');

const { runInitPrompts } = require('./run-prompts');
const { init } = require('./init');

log();

yargs
  .usage('usage: template [options]')
  .usage('usage: template <command> [options]')
  .example('template new myproject', '新建一个项目 myproject')
  .alias('h', 'help')
  .alias('v', 'version')
  .command(
    ['new', 'n'],
    '新建一个项目',
    function (yargs) {
      return yargs
        .option('force', {
          alias: 'f',
          describe: '强制新建',
        })
        .option('type', {
          alias: 't',
          describe: '项目类型',
        });
    },
    function (argv) {
      runInitPrompts(argv._[1], yargs.argv).then(function (answers) {
        init(argv, answers);
      });
    },
  )
  .demandCommand()
  .epilog('copyright 2013-2020').argv;
