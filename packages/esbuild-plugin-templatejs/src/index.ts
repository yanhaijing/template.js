/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
import fs from 'fs';
import path from 'path';
import { precompile, PrecompileOption } from '@templatejs/precompiler';
import { OnLoadResult, PluginBuild } from 'esbuild';

export default function (options: PrecompileOption = {}) {
  return {
    name: 'templatejs',
    setup(build: PluginBuild) {
      build.onLoad({ filter: /\.(tmpl)$/ }, async (args) => {
        const template = await fs.promises.readFile(args.path, 'utf8');
        options.tplName = path.basename(args.path);
        const source = precompile(template, {
          ...options,
          expression: 'template',
        });
        const compiled = `import template from '@templatejs/runtime';\nexport default ${source}`;
        return { contents: compiled, loader: 'js' } as OnLoadResult;
      });
    },
  };
}
