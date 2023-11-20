# [esbuild-plugin-templatejs](https://github.com/yanhaijing/template.js/blob/master/packages/esbuild-plugin-templatejs)

[![](https://img.shields.io/badge/Powered%20by-jslib%20base-brightgreen.svg)](https://github.com/yanhaijing/jslib-base)

[template.js](https://github.com/yanhaijing/template.js)的 esbuild 编译插件。

## 安装

```bash
$ npm install --save @templatejs/runtime # 安装template运行时
$ npm install --save-dev esbuild-plugin-templatejs # 安装template编译插件
```

## 配置

配置参数同[template.js](https://github.com/yanhaijing/template.js/blob/master/doc/api.md#templateconfig)参数一样，其中 expression 参数会作为获取 template 的表达式。

这里有一个通过 tempalte cli 创建的 vue 项目的示例：

https://github.com/yanhaijing/template.js/tree/master/packages/cli/template/esbuild/base

在esbuild配置文件，添加如下内容：

```js
import * as esbuild from 'esbuild';
import templatejs from 'esbuild-plugin-templatejs';

await esbuild.build({
  entryPoints: ['./src/app.js'],
  bundle: true,
  outfile: './dist/index.js',
  plugins: [
    templatejs({
      sTag: '<%',
      eTag: '%>',
      expression: 'require("@templatejs/runtime")',
    }),
  ],
});
```

新建模版文件 demo.tmpl

```html
<div><#=abc#></div>
```

在 js 中`import`模版文件，并渲染

```js
import tpl from './demo.tmpl';

document.getElementById('test').innerHTML = tpl({ abc: 'yanhaijing' });
```

## 贡献者列表

[contributors](https://github.com/yanhaijing/template.js/graphs/contributors)

## :gear: 更新日志

[CHANGELOG.md](https://github.com/yanhaijing/template.js/blob/master/CHANGELOG.md)

## :airplane: 计划列表

[TODO.md](https://github.com/yanhaijing/template.js/blob/master/TODO.md)
