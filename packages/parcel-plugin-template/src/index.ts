/* eslint-disable @typescript-eslint/no-explicit-any */
module.exports = (bundler: any) => {
  bundler.addAssetType('tmpl', require.resolve('./template'));
};
