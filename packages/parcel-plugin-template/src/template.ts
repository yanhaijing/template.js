const path = require('path');
const fs = require('fs');
import { precompile, PrecompileOption } from '@templatejs/precompiler';
const HTMLAsset = require('parcel-bundler/src/Asset');

class TmplAsset extends HTMLAsset {
    templateOption: PrecompileOption;
    constructor(name: string, options) {
        super(name, options);
        this.type = 'js';

        this.templateOption = {tplName: this.basename, expression: 'require("@templatejs/runtime").default'};
        const filepath = path.resolve(options.rootDir, 'template.config.json');

        if (fs.existsSync(filepath)) {
            const obj = require(filepath);
            this.templateOption = Object.assign(this.templateOption, obj);
        }
        
    }

    parse(code: string) {
        return precompile(code, this.templateOption);
    }

    async generate() {
        return `module.exports = ${this.ast}`;
    }
}

module.exports = TmplAsset;