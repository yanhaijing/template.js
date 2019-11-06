export interface Options extends PrecompileOption{
    sandbox?: boolean,
};

import { getOptions } from 'loader-utils';
import { assign } from '@jsmini/extend';
import { precompile, PrecompileOption } from '@templatejs/precompiler';

function getLoaderConfig(loaderContext) {
  var config = getOptions(loaderContext) || {};
  return assign({
    expression: 'require("@templatejs/runtime").default'
  }, config);
}

export default function(tpl: string) {
    const config: Options = getLoaderConfig(this);
    config.tplName = this.resourcePath.split('/').pop();
    const source = precompile(tpl, config);

    return 'module.exports = ' + source;
}
