import { createFilter } from 'rollup-pluginutils';
import { extendDeep } from '@jsmini/extend';
import { precompile, PrecompileOption } from '@templatejs/precompiler';

export interface Options extends PrecompileOption {
  include?: string[] | string;
  exclude?: string[] | string;
}

export default function (options: Options = {}): object {
  const { include, exclude } = (options = extendDeep(
    {
      include: ['**/*.tmpl'],
      exclude: 'node_modules/**',
    },
    options,
  ) as Options);

  const filter = createFilter(include, exclude);

  // var sourceMap = options.sourceMap !== false;

  return {
    transform(tpl: string, id: string): object | undefined {
      if (!filter(id)) return;

      options.tplName = id.split('/').pop();

      const source = precompile(tpl, { ...options, expression: 'template' });

      const compiled = `import template from '@templatejs/runtime'; export default ${source}`;

      return {
        code: compiled,
        map: { mappings: '' },
      };
    },
  };
}
