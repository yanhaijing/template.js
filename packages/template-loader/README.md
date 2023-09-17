# [template-loader](https://github.com/yanhaijing/template.js/blob/master/packages/template-loader)

[![](https://img.shields.io/badge/Powered%20by-jslib%20base-brightgreen.svg)](https://github.com/yanhaijing/jslib-base)

[template.js](https://github.com/yanhaijing/template.js)的 webpack 编译 loader，同时支持在 rspack 使用。

## 安装

```bash
$ npm install --save @templatejs/runtime # 安装template运行时
$ npm install --save-dev templatejs-loader # 安装template编译插件
```

## webpack 配置

配置参数同[template.js](https://github.com/yanhaijing/template.js/blob/master/doc/api.md#templateconfig)参数一样，其中 expression 参数会作为获取 template 的表达式。

webpack 4-5，在 webpack.config.js 配置文件中增加如下内容：

```js
module.exports = {
    module: {
        rules: [
            {
                test: /\.tmpl/,
                use: [
                    {
                        loader: 'templatejs-loader',
                        options: {
                            sTag: '<%',
                            eTag: '%>',
                            expression: 'require("@templatejs/runtime").default'
                        }
                    }
                ]
            }
        ]
    }
};
```

webpack 1-3，在 webpack.config.js 配置文件中增加如下内容：

```js
loaders: [
    {
        test: /\.tmpl/,
        loader: "templatejs-loader",
        query: {
            sTag: "<#",
            eTag: "#>",
            sandbox: false, // 沙箱模式
            expression: 'require("@templatejs/runtime").default', // webpack 2-4
            // expression: 'require("@templatejs/runtime")' // webpack 1
        },
    },
];
```

新建模版文件 demo.tmpl

```
<div>
    <#=abc#>
</div>
```

在 js 中`require`模版文件，并渲染

```js
var tpl = require("./demo.tmpl");

document.getElementById("test").innerHTML = tpl({ abc: "yanhaijing" });
```

## rspack 配置

配置参数同[template.js](https://github.com/yanhaijing/template.js/blob/master/doc/api.md#templateconfig)参数一样，其中 expression 参数会作为获取 template 的表达式。

在 rspack.config.js 配置文件中增加如下内容：

```js
module.exports = {
    module: {
        rules: [
            {
                test: /\.tmpl/,
                use: [
                    {
                        loader: "templatejs-loader",
                        options: {
                            sTag: "<%",
                            eTag: "%>",
                            expression:
                                'require("@templatejs/runtime").default',
                        },
                    },
                ],
            },
        ],
    },
};
```

新建模版文件 demo.tmpl

```
<div>
    <#=abc#>
</div>
```

在 js 中`require`模版文件，并渲染

```js
var tpl = require("./demo.tmpl");

document.getElementById("test").innerHTML = tpl({ abc: "yanhaijing" });
```

## 贡献者列表

[contributors](https://github.com/yanhaijing/template.js/graphs/contributors)

## :gear: 更新日志

[CHANGELOG.md](https://github.com/yanhaijing/template.js/blob/master/CHANGELOG.md)

## :airplane: 计划列表

[TODO.md](https://github.com/yanhaijing/template.js/blob/master/TODO.md)

## 相关链接

-   [webpack](http://webpack.github.io/)
