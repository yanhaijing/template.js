var typescript = require('rollup-plugin-typescript2');

var pkg = require('../package.json');

var version = pkg.version;

var banner = 
`/*!
 * ${pkg.name} ${version} (https://github.com/templatejs/precompiler)
 * API https://github.com/templatejs/precompiler/blob/master/doc/api.md
 * Copyright 2017-${(new Date).getFullYear()} templatejs. All Rights Reserved
 * Licensed under MIT (https://github.com/templatejs/precompiler/blob/master/LICENSE)
 */
`;

function getCompiler(opt) {
    opt = opt || {
        tsconfigOverride: { compilerOptions : { module: 'ES2015' } }
    }

    return typescript(opt);
}

exports.name = 'templatejs_precompiler';
exports.banner = banner;
exports.getCompiler = getCompiler;
