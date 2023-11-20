/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as fs from 'fs';
import { precompile, PrecompileOption } from '@templatejs/precompiler';
import { OnLoadResult, PluginBuild } from 'esbuild';

export default function (options: PrecompileOption = {}) {
  return {
    name: 'templatejs',
    setup(build: PluginBuild) {
      build.onLoad({ filter: /\.(tmpl)$/ }, async (args) => {
        const template = await fs.promises.readFile(args.path, 'utf8');
        options.tplName = args.path.split('/').pop();
        const source = precompile(template, options);
        const compiled = `export default ${source}`;
        return { contents: compiled, loader: 'js' } as OnLoadResult;
      });
    },
  };
}
