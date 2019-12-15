# [template.js](https://github.com/yanhaijing/template.js)
[![](https://img.shields.io/badge/Powered%20by-jslib%20base-brightgreen.svg)](https://github.com/yanhaijing/jslib-base)
[![Build Status](https://travis-ci.org/yanhaijing/template.js.svg?branch=master)](https://travis-ci.org/yanhaijing/template.js)
[![license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/yanhaijing/template.js/blob/master/LICENSE)

一款javascript模板引擎，简单，好用，支持webpack, rollup, parcel, browserify, fis和gulp

## 特性

- JS原生语法，模版解析，编译，渲染
- 支持所有浏览器及Node，支持TypeScript
- 预编译支持主流打包工具
- 自定义配置、修饰符、函数
- 支持数据过滤
- 异常捕获功能
- 子模版
- 沙箱模式

## 使用者指南
template.js是比拼接字符串更好的方式

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
    list: [
        {name: "yan"},
        {name: "haijing"}
    ]
};
```

渲染输出

```html
<ul>
    <li>yan</li>
    <li>haijing</li>
</ul>
```

template.js支持多种使用方式，选择自己的方式

- 原生web与Node，可以查看 [template_js](https://github.com/yanhaijing/template.js/blob/master/packages/template)
- webpack，可以查看 [template-loader](https://github.com/yanhaijing/template.js/blob/master/packages/template-loader)
- rollup，可以查看 [rollup-plugin-templatejs](https://github.com/yanhaijing/template.js/blob/master/packages/rollup-plugin-templatejs)
- parcel，可以查看 [parcel-plugin-template](https://github.com/yanhaijing/template.js/blob/master/packages/parcel-plugin-template)
- fis，可以查看 [fis-parser-template](https://github.com/yanhaijing/template.js/blob/master/packages/fis-parser-template)
- browserify，可以查看 [browserify-templatejs](https://github.com/yanhaijing/template.js/blob/master/packages/browserify-templatejs)
- gulp [gulp-templatejs](https://github.com/yanhaijing/template.js/blob/master/packages/gulp-templatejs)
- 不支持的平台，可以自己写一个插件，请查看 [@templatejs/precompiler](https://github.com/yanhaijing/template.js/blob/master/packages/precompiler)

其他packages简介

- [@templatejs/runtime](https://github.com/yanhaijing/template.js/blob/master/packages/runtime) template.js 的运行时，给precompiler生成的渲染函数提供运行时支持
- [@templatejs/parser](https://github.com/yanhaijing/template.js/blob/master/packages/parser) template.js 的模板解析器

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
