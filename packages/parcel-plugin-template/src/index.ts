/* eslint-disable @typescript-eslint/explicit-function-return-type */
module.exports = bundler => {
    bundler.addAssetType('tmpl', require.resolve('./template'));
};