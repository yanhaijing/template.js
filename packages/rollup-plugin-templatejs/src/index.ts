import { createFilter } from 'rollup-pluginutils';
import { extendDeep } from '@jsmini/extend';
import { precompile, Option as PrecompileOption } from '@templatejs/precompiler';

export interface Options extends PrecompileOption{
    sandbox?: boolean,
    include?: string[] | string,
    exclude?: string[] | string,
};

export default function (options: Options = {}) {
    const { include, exclude } = options = extendDeep({
        include: ['**/*.tmpl'],
        exclude: 'node_modules/**',
        sandbox: true,
    }, options) as Options;

    const filter = createFilter(include, exclude);

    // var sourceMap = options.sourceMap !== false;

    return {
        transform(tpl: string, id: string) {
            if (!filter(id)) return;

            const source = precompile(tpl, options);
            
            const compiled = `export default ${source}`;

            return {
                code: compiled,
                map: { mappings: '' }
            };
        }
    };
};