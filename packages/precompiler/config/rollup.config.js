// rollup.config.js
// commonjs
var common = require('./rollup.js');

module.exports = {
    input: 'src/index.ts',
    output: {
        file: 'dist/index.js',
        format: 'cjs',
        // When export and export default are not used at the same time, set legacy to true.
        // legacy: true,
        banner: common.banner,
    },
    plugins: [
        common.getCompiler({
            tsconfigOverride: { compilerOptions : { declaration: true, module: 'ES2015' } },
            useTsconfigDeclarationDir: true
        })
    ]
};
