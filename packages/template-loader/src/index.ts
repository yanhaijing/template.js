/* eslint-disable @typescript-eslint/no-explicit-any */
import { getOptions } from 'loader-utils';
import { assign } from '@jsmini/extend';
import { precompile, PrecompileOption } from '@templatejs/precompiler';

export interface Options extends PrecompileOption {}

function getLoaderConfig(loaderContext: any): Options {
  const config = getOptions(loaderContext) || {};
  return assign(
    {
      expression: 'require("@templatejs/runtime").default',
    },
    config,
  );
}

export default function (tpl: string): string {
  const config = getLoaderConfig(this);
  config.tplName = this.resourcePath.split('/').pop();
  const source = precompile(tpl, config);

  return 'module.exports = ' + source;
}
