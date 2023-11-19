// rollup.config.js
const template = require('rollup-plugin-templatejs');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const nodeResolve = require('@rollup/plugin-node-resolve');

module.exports = {
    input: 'app.js',
    output: {
        file: 'dist/index.js',
        format: 'cjs',
        // When export and export default are not used at the same time, set legacy to true.
        // legacy: true,
    },
    plugins: [
        template(),
        nodeResolve({
            main: true,
            extensions: ['.js']
        }),
    ]
};
