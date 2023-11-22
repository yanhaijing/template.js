/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-explicit-any */
import path from 'path';
import fs from 'fs';
import { precompile, PrecompileOption } from '@templatejs/precompiler';
import through from 'through';

const filenamePattern = /\.(tmpl)$/;

const wrap = function (template: string) {
  return (
    'var template = require("@templatejs/runtime");\nmodule.exports = ' +
    template +
    ';'
  );
};
module.exports = function (file: string) {
  if (!filenamePattern.test(file)) return through();

  let templateOption: PrecompileOption = {
    tplName: path.basename(file),
    // expression: 'require("@templatejs/runtime")',
  };

  const filepath = path.resolve(process.cwd(), 'template.config.json');

  if (fs.existsSync(filepath)) {
    templateOption = Object.assign(templateOption, require(filepath), {
      expression: 'template',
    });
  }

  let input = '';
  const write = function (buffer: any) {
    input += buffer;
  };

  const end = function (this: any) {
    this.queue(wrap(precompile(input, templateOption)));
    this.queue(null);
  };

  return through(write, end);
};
