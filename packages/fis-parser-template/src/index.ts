import { assign } from '@jsmini/extend';
import { precompile, PrecompileOption } from '@templatejs/precompiler';

export interface Options extends PrecompileOption{
    global?: string;
}

module.exports = function(content: string, file: any, conf: any): string{
    const config: Options = assign({
        expression: conf.global || 'template',
        tplName: file.id,
    }, conf);

    const source = precompile(content, config);

    return source;
};
