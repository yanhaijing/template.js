module.exports = bundler => {
    bundler.addAssetType('tmpl', require.resolve('./template'));
};