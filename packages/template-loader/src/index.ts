/* eslint-disable @typescript-eslint/no-explicit-any */
import path from 'path';
import { getOptions } from 'loader-utils';
import { assign } from '@jsmini/extend';
import { precompile, PrecompileOption } from '@templatejs/precompiler';

export interface Options extends PrecompileOption {}

function getLoaderConfig(loaderContext: any): Options {
  const config = getOptions(loaderContext) || {};
  return assign(config, {
    expression: 'template',
  });
}

export default function (tpl: string): string {
  const config = getLoaderConfig(this);
  config.tplName = path.basename(this.resourcePath);
  const source = precompile(tpl, config);

  return (
    'var template = require("@templatejs/runtime");\ntemplate = template.default ? template.default : template;\nmodule.exports = ' +
    source
  );
}
