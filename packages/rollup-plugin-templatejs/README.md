# [rollup-plugin-templatejs](https://github.com/yanhaijing/template.js/blob/master/packages/rollup-plugin-templatejs)

[![](https://img.shields.io/badge/Powered%20by-jslib%20base-brightgreen.svg)](https://github.com/yanhaijing/jslib-base)

[template.js](https://github.com/yanhaijing/template.js)的 rollup 编译插件，同时支持在 vite 使用。

## 安装

```bash
$ npm install --save @templatejs/runtime # 安装template运行时
$ npm install --save-dev rollup-plugin-templatejs # 安装template编译插件
```

## vite 配置

配置参数同[template.js](https://github.com/yanhaijing/template.js/blob/master/doc/api.md#templateconfig)参数一样，其中 expression 参数会作为获取 template 的表达式。

这里有一个通过 tempalte cli 创建的 vue 项目的示例：

https://github.com/yanhaijing/template.js/tree/master/packages/cli/template/vite/base

```js
import { defineConfig } from "vite";
import template from "rollup-plugin-templatejs";

export default defineConfig({
    plugins: [
        {
            ...template({
                sTag: "<#",
                eTag: "#>",
                expression: 'require("@templatejs/runtime")', // 获取template的表达式，如 `window.template`
                sandbox: false, // 沙箱模式
                include: ["**/*.tmpl"], // 默认值
                exclude: "node_modules/**", // 默认值
            }),
            enforce: "pre",
        },
    ],
});
```

新建模版文件 demo.tmpl

```html
<div><#=abc#></div>
```

在 js 中`import`模版文件，并渲染

```js
import tpl from "./demo.tmpl";

document.getElementById("test").innerHTML = tpl({ abc: "yanhaijing" });
```

## rollup 配置

配置参数同[template.js](https://github.com/yanhaijing/template.js/blob/master/doc/api.md#templateconfig)参数一样，其中 expression 参数会作为获取 template 的表达式。

```js
const template = require('rollup-plugin-templatejs');

module.exports = {
    // 省略其他配置
    plugins: [
        template({
            sTag: "<#",
            eTag: "#>",
            expression: 'require("@templatejs/runtime")', // 获取template的表达式，如 `window.template`
            sandbox: false, // 沙箱模式
            include: ["**/*.tmpl"], // 默认值
            exclude: "node_modules/**", // 默认值
        }),
    ],
};
```

新建模版文件 demo.tmpl

```html
<div><#=abc#></div>
```

在 js 中`import`模版文件，并渲染

```js
import tpl from "./demo.tmpl";

document.getElementById("test").innerHTML = tpl({ abc: "yanhaijing" });
```

## 贡献者列表

[contributors](https://github.com/yanhaijing/template.js/graphs/contributors)

## :gear: 更新日志

[CHANGELOG.md](https://github.com/yanhaijing/template.js/blob/master/CHANGELOG.md)

## :airplane: 计划列表

[TODO.md](https://github.com/yanhaijing/template.js/blob/master/TODO.md)
