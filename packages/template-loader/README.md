# [template-loader](https://github.com/yanhaijing/template.js/blob/master/packages/template-loader)
[![](https://img.shields.io/badge/Powered%20by-jslib%20base-brightgreen.svg)](https://github.com/yanhaijing/jslib-base)

[template.js](https://github.com/yanhaijing/template.js)的webpack编译loader。

## 安装

```bash
$ npm install --save @templatejs/runtime # 安装template运行时
$ npm install --save-dev templatejs-loader # 安装template编译插件
```

## 配置
配置参数同[template.js](https://github.com/yanhaijing/template.js/blob/master/doc/api.md#templateconfig)参数一样，其中expression参数会作为获取template的表达式。

```js
loaders: [
    {
        test: /\.tmpl/,
        loader: "templatejs-loader",
        query: {
            sTag: '<#',
            eTag: '#>',
            expression: 'require("@templatejs/runtime").default' // webpack 2-4
            // expression: 'require("@templatejs/runtime")' // webpack 1
        }
    }
]
```
新建模版文件demo.tmpl

```
<div>
    <#=abc#>
</div>
```
在js中`require`模版文件，并渲染

```js
var tpl = require('./demo.tmpl');

document.getElementById('test').innerHTML = tpl({abc: 'yanhaijing'});
```

## 贡献者列表

[contributors](https://github.com/yanhaijing/template.js/graphs/contributors)

## :gear: 更新日志
[CHANGELOG.md](https://github.com/yanhaijing/template.js/blob/master/CHANGELOG.md)

## :airplane: 计划列表
[TODO.md](https://github.com/yanhaijing/template.js/blob/master/TODO.md)

## 相关链接

- [webpack](http://webpack.github.io/)