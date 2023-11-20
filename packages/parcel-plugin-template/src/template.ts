/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-var-requires */
import { precompile, PrecompileOption } from '@templatejs/precompiler';
const path = require('path');
const fs = require('fs');
const HTMLAsset = require('parcel-bundler/src/Asset');

class TmplAsset extends HTMLAsset {
  templateOption: PrecompileOption;
  constructor(name: string, options: any) {
    super(name, options);
    this.type = 'js';

    this.templateOption = {
      tplName: this.basename,
      expression: 'require("@templatejs/runtime").default',
    };
    const filepath = path.resolve(options.rootDir, 'template.config.json');

    if (fs.existsSync(filepath)) {
      const obj = require(filepath);
      this.templateOption = Object.assign(this.templateOption, obj);
    }
  }

  parse(code: string): string {
    return precompile(code, this.templateOption);
  }

  async generate(): Promise<string> {
    return `module.exports = ${this.ast}`;
  }
}

module.exports = TmplAsset;
