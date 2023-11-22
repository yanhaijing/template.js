/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable quotes */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Transformer } from '@parcel/plugin';
import path from 'path';
import { precompile, PrecompileOption } from '@templatejs/precompiler';

export default new Transformer({
  async loadConfig({ config }) {
    const { contents, filePath } =
      (await config.getConfig(['template.config.json'])) ?? {};

    return contents;
  },

  async transform({ asset, config }) {
    asset.filePath;
    // Retrieve the asset's source code and source map.
    const source = await asset.getCode();
    // let sourceMap = await asset.getMap();

    // Run it through some compiler, and set the results
    // on the asset.
    const code = precompile(source, {
      tplName: path.basename(asset.filePath),
      ...(config as PrecompileOption),
      expression: 'template',
    });

    asset.type = 'js';
    asset.setCode(
      `import template from '@templatejs/runtime';\nexport default ${code}`,
    );
    // asset.setMap(map);

    // Return the asset
    return [asset];
  },
});
