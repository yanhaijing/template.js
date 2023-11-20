// rollup.config.js
// umd
var nodeResolve = require('@rollup/plugin-node-resolve');
var commonjs = require('@rollup/plugin-commonjs');
var terser = require('@rollup/plugin-terser');
var json = require('@rollup/plugin-json');

var common = require('./rollup.cjs');

module.exports = {
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/index.aio.js',
      format: 'umd',
      // When export and export default are not used at the same time, set legacy to true.
      // legacy: true,
      name: common.name,
      banner: common.banner,
    },
    {
      file: 'dist/index.aio.min.js',
      format: 'umd',
      // legacy: true,
      name: common.name,
      banner: common.banner,
      plugins: [terser()],
    },
  ],
  plugins: [json(), nodeResolve({}), commonjs({}), ...common.getCompiler()],
};
