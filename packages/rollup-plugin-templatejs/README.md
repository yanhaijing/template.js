# [rollup-plugin-templatejs](https://github.com/yanhaijing/template.js/blob/master/rollup-plugin-templatejs)
[![](https://img.shields.io/badge/Powered%20by-jslib%20base-brightgreen.svg)](https://github.com/yanhaijing/jslib-base)

[template.js](https://github.com/yanhaijing/template.js)的rollup编译插件。

## 安装

``` bash
$ npm install --save @templatejs/runtime # 安装template运行时
$ npm install --save-dev rollup-plugin-templatejs # 安装template编译插件
```

## 配置
配置参数同[template.js](https://github.com/yanhaijing/template.js/blob/master/doc/api.md#templateconfig)参数一样，其中expression参数会作为获取template的表达式。

```js
import template from 'rollup-plugin-templatejs';

module.exports = {
    // 省略其他配置
    plugins: [
        template({
            sTag: '<#',
            eTag: '#>',
            expression: 'require("@templatejs/runtime")', // 获取template的表达式，如 `window.template`
            include: ['**/*.tmpl'], // 默认值
            exclude: 'node_modules/**', // 默认值
        })
    ]
};
```

新建模版文件demo.tmpl

```html
<div>
    <#=abc#>
</div>
```

在js中`require`模版文件，并渲染

```js
import tpl from './demo.tmpl';

document.getElementById('test').innerHTML = tpl({abc: 'yanhaijing'});
```

## 贡献者列表

[contributors](https://github.com/yanhaijing/template.js/graphs/contributors)

## :gear: 更新日志
[CHANGELOG.md](https://github.com/yanhaijing/template.js/blob/master/CHANGELOG.md)

## :airplane: 计划列表
[TODO.md](https://github.com/yanhaijing/template.js/blob/master/TODO.md)