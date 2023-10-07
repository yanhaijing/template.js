# [template.js](https://github.com/yanhaijing/template.js)

[![](https://img.shields.io/badge/Powered%20by-jslib%20base-brightgreen.svg)](https://github.com/yanhaijing/jslib-base)
[![license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/yanhaijing/template.js/blob/master/LICENSE)

[English](./README.md) | 简体中文

一款 javascript 模板引擎，简单，好用，支持 webpack, rspack, vite, esbuild, rollup, parcel, browserify, fis 和 gulp。

## 特性

-   JS 原生语法，模版解析，编译，渲染
-   支持所有浏览器及 Node，支持 TypeScript
-   预编译支持主流打包工具
-   自定义配置、修饰符、函数
-   支持数据过滤
-   异常捕获功能
-   子模版
-   沙箱模式
-   支持 JIT 和 AOT 两种编译模式
-   提供 cli 集成化工具
-   提供编辑器插件支持

## 使用者指南

template.js 是比拼接字符串更好的方式，点击使用[codesandbox](https://codesandbox.io/s/template-js-demo-6xgjxw?file=/src/index.mjs)快速体验效果。

模板例子

```
<ul>
    <%for(var i = 0; i < list.length; i++) {%>
        <li><%:=list[i].name%></li>
    <%}%>
</ul>
```

数据例子

```js
const data = {
    list: [{ name: "yan" }, { name: "haijing" }],
};
```

渲染输出

```html
<ul>
    <li>yan</li>
    <li>haijing</li>
</ul>
```

template.js 支持的编辑器插件

| 编辑器   | 插件                                                                                      |
| -------- | ----------------------------------------------------------------------------------------- |
| Vscode   | [高亮插件](https://marketplace.visualstudio.com/items?itemName=yanhaijing1234.templatejs) |
| Sublime  | [高亮插件](https://packagecontrol.io/packages/templatejs)                                 |
| Atom     | [高亮插件](https://atom.io/packages/language-templatejs)                                  |
| WebStorm | TODO                                                                                      |

通过 cli 工具快速初始化项目

```bash
$ npx @templatejs/cli new myapp
# 选择对应的平台
# ❯ webpack
#   rspack
#   vite
#   rollup
#   esbuild
#   parcel
#   fis3
#   browserify
#   gulp
#   browser
```

如果已有项目，可以选择对应的插件，template.js 支持多种使用方式

| 平台             | 插件                                                                                                                             |
| ---------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| webpack / rspack | [template-loader](https://github.com/yanhaijing/template.js/blob/master/packages/template-loader)                                |
| vite / rollup    | [rollup-plugin-templatejs](https://github.com/yanhaijing/template.js/blob/master/packages/rollup-plugin-templatejs)              |
| esbuild           | [esbuild-plugin-templatejs](https://github.com/yanhaijing/template.js/blob/master/packages/esbuild-plugin-templatejs)                  |
| parcel           | [parcel-plugin-template](https://github.com/yanhaijing/template.js/blob/master/packages/parcel-plugin-template)                  |
| fis              | [fis-parser-template](https://github.com/yanhaijing/template.js/blob/master/packages/fis-parser-template)                        |
| browserify       | [browserify-templatejs](https://github.com/yanhaijing/template.js/blob/master/packages/browserify-templatejs)                    |
| gulp             | [gulp-templatejs](https://github.com/yanhaijing/template.js/blob/master/packages/gulp-templatejs)                                |
| 原生 web 与 Node.js | [template_js](https://github.com/yanhaijing/template.js/blob/master/packages/template)                                           |
| 不支持的平台     | 可以自己写一个插件，请查看 [@templatejs/precompiler](https://github.com/yanhaijing/template.js/blob/master/packages/precompiler) |

其他 packages 简介

-   [@templatejs/runtime](https://github.com/yanhaijing/template.js/blob/master/packages/runtime) template.js 的运行时，给 precompiler 生成的渲染函数提供运行时支持
-   [@templatejs/parser](https://github.com/yanhaijing/template.js/blob/master/packages/parser) template.js 的模板解析器
-   [template-vscode](https://github.com/yanhaijing/template-vscode) template.js 的 vscode 插件

## 开发者指南

本项目使用 lerna 来管理多个插件，lerna 常用命令如下，注意这里不能缺省`npx`前缀：

```bash
$ npx lerna init # 初始化
$ npx lerna create @templatejs/parser # 创建一个package
$ npx lerna add yargs --scope=@templatejs/parser # 给package安装依赖
$ npx lerna list # 列出所有的包
$ npx lerna bootstrap # 安装全部依赖
$ npx lerna link # 建立全部软连接
$ npx lerna changed # 列出下次发版lerna publish 要更新的包
$ npx lerna publish # 会打tag，上传git,上传npm
```

发布步骤，修改 changelog

```bash
$ yarn test
$ yarn build
$ npx lerna publish
```

## 贡献者列表

[contributors](https://github.com/yanhaijing/template.js/graphs/contributors)

## 更新日志

[CHANGELOG.md](https://github.com/yanhaijing/template.js/blob/master/CHANGELOG.md)

## 计划列表

[TODO.md](https://github.com/yanhaijing/template.js/blob/master/TODO.md)

## 谁在使用

-   [百度知道](http://zhidao.baidu.com/)
-   [百度经验](http://jingyan.baidu.com/)
-   [百度师傅](http://shifu.baidu.com/)
-   美团外卖
-   猿辅导
-   [58 金融](https://npm.taobao.org/package/jr58)
-   神州泰岳
-   优信

想了解都有谁在使用，[点击这里](https://github.com/yanhaijing/template.js/issues/6)。

## 相关链接

-   [BaiduTemplate](http://tangram.baidu.com/BaiduTemplate/)
-   [artTemplate](https://github.com/aui/artTemplate/)
-   [Juicer](https://github.com/PaulGuo/Juicer)
-   [handlebarsjs](http://handlebarsjs.com/)
-   [PUG(原 Jade)](https://pugjs.org/api/getting-started.html)
-   [EJS](https://ejs.co/)
-   [只有 20 行 Javascript 代码！手把手教你写一个页面模板引擎](https://juejin.im/entry/56258da860b294bcf7955883)
