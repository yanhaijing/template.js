

import { assign } from '@jsmini/extend';
import { precompile, PrecompileOption } from '@templatejs/precompiler';

export interface Options extends PrecompileOption{
    sandbox?: boolean,
};

module.exports = function(content, file, conf){
    const config: Options = assign({
        expression: conf.global || 'template',
        tplName: file.id,
    }, conf);

    const source = precompile(content, config);

    return source;
};
