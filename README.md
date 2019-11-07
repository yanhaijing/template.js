# [parser](https://github.com/yanhaijing/template.js)
[![](https://img.shields.io/badge/Powered%20by-jslib%20base-brightgreen.svg)](https://github.com/yanhaijing/jslib-base)

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

## 贡献者列表

[contributors](https://github.com/yanhaijing/template.js/graphs/contributors)

## 更新日志
[CHANGELOG.md](https://github.com/yanhaijing/template.js/blob/master/TODO.md/CHANGELOG.md)

## 计划列表
[TODO.md](https://github.com/yanhaijing/template.js/blob/master/TODO.md)