/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-var-requires */
const through = require('through-gulp');
const replaceExt = require('replace-ext');
import PluginError from 'plugin-error';
import { extendDeep } from '@jsmini/extend';
import { precompile, PrecompileOption } from '@templatejs/precompiler';

const enum Module {
  Commonjs = 'commonjs',
  // Umd= 'umd',
  // Esm= 'esm',
}

export interface Options extends PrecompileOption {
  module?: Module;
}

const PLUGIN_NAME = 'gulp-templatejs';

function wrapCode(code: string, module: Module) {
  return `var template = require("@templatejs/runtime");\nmodule.exports = ${code}`;
}

function templatejs(options: Options = {}) {
  const { module } = (options = extendDeep(
    {
      module: Module.Commonjs, // commonjs | umd
    },
    options,
  ) as Required<Options>);

  // creating a stream through which each file will pass
  const stream = through(function (file: any, encoding: any, callback: any) {
    // do whatever necessary to process the file
    if (file.isNull()) {
      return callback(null, file);
    }
    if (file.isStream()) {
      this.emit(
        'error',
        new PluginError(PLUGIN_NAME, 'Streaming not supported'),
      );
      return callback();
    }
    // just pipe data next, or just do nothing to process file later in flushFunction
    // never forget callback to indicate that the file has been processed.

    let code = '';
    try {
      const contents = file.contents.toString();
      code = wrapCode(
        precompile(contents, { ...options, expression: 'template' }),
        module,
      );
    } catch (e) {
      this.emit(
        'error',
        new PluginError(PLUGIN_NAME, e as any, {
          fileName: file.path,
        }),
      );
      return callback();
    }

    file.contents = Buffer.from(code);
    file.path = replaceExt(file.path, '.js');

    this.push(file);
    callback();
  });

  // returning the file stream
  return stream;
}

// exporting the plugin
module.exports = templatejs;
