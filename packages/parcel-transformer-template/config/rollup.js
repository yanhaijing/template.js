var typescript = require('rollup-plugin-typescript2');

var pkg = require('../package.json');

var version = pkg.version;

var banner = 
`/*!
 * ${pkg.name} ${version} (https://github.com/yanhaijing/parcel-transformer-template)
 * API https://github.com/yanhaijing/parcel-transformer-template/blob/master/doc/api.md
 * Copyright 2017-${(new Date).getFullYear()} yanhaijing. All Rights Reserved
 * Licensed under MIT (https://github.com/yanhaijing/parcel-transformer-template/blob/master/LICENSE)
 */
`;

function getCompiler(opt) {
    opt = opt || {
        tsconfigOverride: { compilerOptions : { module: 'ES2015' } }
    }

    return typescript(opt);
}

exports.name = 'parcel-transformer-template';
exports.banner = banner;
exports.getCompiler = getCompiler;
