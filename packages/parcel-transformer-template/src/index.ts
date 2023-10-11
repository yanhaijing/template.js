/* eslint-disable quotes */
/* eslint-disable @typescript-eslint/no-object-literal-type-assertion */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Transformer } from "@parcel/plugin";
import { precompile, PrecompileOption } from "@templatejs/precompiler";

export default new Transformer({
    async loadConfig({ config }) {
        let { contents, filePath } = await config.getConfig([
            "template.config.json",
        ]);

        return contents;
    },

    async transform({ asset, config }) {
        asset.filePath;
        // Retrieve the asset's source code and source map.
        let source = await asset.getCode();
        // let sourceMap = await asset.getMap();

        // Run it through some compiler, and set the results
        // on the asset.
        let code = precompile(source, {
            tplName: asset.filePath,
            ...(config as PrecompileOption),
        });

        asset.type = 'js';
        asset.setCode(`export default ${code}`);
        // asset.setMap(map);

        // Return the asset
        return [asset];
    },
});
