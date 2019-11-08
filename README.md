# [template.js](https://github.com/yanhaijing/template.js)
[![](https://img.shields.io/badge/Powered%20by-jslib%20base-brightgreen.svg)](https://github.com/yanhaijing/jslib-base)
[![Build Status](https://travis-ci.org/yanhaijing/template.js.svg?branch=master)](https://travis-ci.org/yanhaijing/template.js)
[![license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/yanhaijing/template.js/blob/master/LICENSE)

一款javascript模板引擎，简单，好用，支持webpack, rollup和fis

## 使用者指南
template.js包含编译器，预编译期，运行时，web渲染器和各个平台的插件

- 如果你直接使用script来使用template.js，可以查看template_js
- 如果你使用webpack, rollup或者fis，可以直接查看相关的插件
- 如果你对template.js感兴趣，或者想写自己的预编译器，可以查看parser和precompiler

相关packages

- [@templatejs/parser](https://github.com/yanhaijing/template.js/blob/master/packages/parser)
- [@templatejs/runtime](https://github.com/yanhaijing/template.js/blob/master/packages/runtime)
- [@templatejs/precompiler](https://github.com/yanhaijing/template.js/blob/master/packages/precompiler)
- [template_js](https://github.com/yanhaijing/template.js/blob/master/packages/template)
- [fis-parser-template](https://github.com/yanhaijing/template.js/blob/master/packages/fis-parser-template)
- [template-loader](https://github.com/yanhaijing/template.js/blob/master/packages/template-loader)
- [rollup-plugin-templatejs](https://github.com/yanhaijing/template.js/blob/master/packages/rollup-plugin-templatejs)

## 开发者指南
本项目使用lerna来管理多个插件

安装lerna

```bash
$ npm install -g lerna@3.16.4
```

lerna常用命令

```bash
$ lerna init # 初始化
$ lerna create @templatejs/parser # 创建一个package
$ lerna add yargs --scope=@templatejs/parser # 给package安装依赖
$ lerna list # 列出所有的包
$ lerna bootstrap # 安装全部依赖
$ lerna link # 建立全部软连接
$ lerna changed # 列出下次发版lerna publish 要更新的包
$ lerna publish # 会打tag，上传git,上传npm
```

发布步骤，修改changelog

```bash
$ yarn test
$ yarn build
$ lerna publish
```

## 贡献者列表

[contributors](https://github.com/yanhaijing/template.js/graphs/contributors)

## 更新日志
[CHANGELOG.md](https://github.com/yanhaijing/template.js/blob/master/TODO.md/CHANGELOG.md)

## 计划列表
[TODO.md](https://github.com/yanhaijing/template.js/blob/master/TODO.md)

## 谁在使用
- [百度知道](http://zhidao.baidu.com/)
- [百度经验](http://jingyan.baidu.com/)
- [百度师傅](http://shifu.baidu.com/)
- 美团外卖
- [58金融](https://npm.taobao.org/package/jr58)
- 神州泰岳
- 优信

想了解都有谁在使用，[点击这里](https://github.com/yanhaijing/template.js/issues/6)。

## 相关链接

- [BaiduTemplate](http://tangram.baidu.com/BaiduTemplate/)
- [artTemplate](https://github.com/aui/artTemplate/)
- [Juicer](https://github.com/PaulGuo/Juicer)
- [handlebarsjs](http://handlebarsjs.com/)
- [Jade](http://jade-lang.com/)
- [只有20行Javascript代码！手把手教你写一个页面模板引擎](https://juejin.im/entry/56258da860b294bcf7955883)