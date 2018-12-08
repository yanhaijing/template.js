# [template.js](https://github.com/yanhaijing/template.js) [![Build Status](https://travis-ci.org/yanhaijing/template.js.svg?branch=master)](https://travis-ci.org/yanhaijing/template.js) [![release](https://img.shields.io/badge/release-v0.7.1-orange.svg)](https://github.com/yanhaijing/template.js/releases/tag/v0.7.1) [![license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/yanhaijing/template.js/blob/master/MIT-LICENSE.txt)

[English](./README.md) | 简体中文

一款javascript模板引擎，简单，好用，支持webpack和fis。

## 功能概述

提供一套模板语法，用户可以写一个模板区块，每次根据传入的数据，生成对应数据产生的HTML片段，渲染不同的效果。

## 特性

- 模版编译，渲染
- 支持所有主流浏览器及Node（UMD）
- JavaScript原生语法
- 丰富的自定义配置
- 支持数据过滤
- 异常捕获功能
- 伪子模版
- 功能专一，简单好用

## 兼容性

- Node 0.10+
- Safari 6+ (Mac)
- iOS 5+ Safari
- Chrome 23+ (Windows, Mac, Android, iOS, Linux, Chrome OS)
- Firefox 4+ (Windows, Mac, Android, Linux)
- Internet Explorer 6+ (Windows, Windows Phone)
- Opera 10+ (Windows, linux, Android)

## 下载
第一种方法，推荐使用npm安装和更新

```bash
$ npm install template_js
```

第二种方法，或者你也可以在GitHub，下载源文件或压缩包

## 如何使用？
支持全局变量、AMD、commonjs、es6等模块系统

### 传统用法

```html
<script src="template.js"></script>
<script>
    window.template()
</script>
```

### AMD

```js
require(['template'], function (template) {
    template()
});
```

### commonjs

```js
var template = require('template_js')
```

## 快速上手

### 编写模版

使用一个type="text/html"的script标签存放模板，或者放到字符串中：

```html
<script id="tpl" type="text/html">
<ul>
    <%for(var i = 0; i < list.length; i++) {%>
    <li><%:=list[i].name%></li>
    <%}%>
</ul>
</script>
```

### 渲染模板

```js
var tpl = document.getElementById('tpl').innerHTML;
template(tpl, {list: [{name: "yan"},{name: "haijing"}]});
```

输出结果：

```html
<ul>
    <li>yan</li>
    <li>haijing</li>
</ul>
```

更多例子，请见[demo](demo)目录。

## 文档

[API](doc/api.md)

## 测试
template.js 包含完整的单元测试和性能测试。详情请见[test](test)目录。

## 自动化
### Fis
template.js从0.2.0开始支持[fis](http://fis.baidu.com/)，详情请看[这里](https://github.com/yanhaijing/fis-parser-template)。

### webpack
template.js从0.6.1开始支持[webpack](http://webpack.github.io/)，详情请看[这里](https://github.com/yanhaijing/template-loader)

## 贡献指南

如果你想为template.js贡献代码，请采用fork + pull request 方式，并在发起pr前先将master上超前的代码rebase到自己的分支上。

在目录运行如下命令，完成验证测试编译过程，确保无误：

```bash
$ npm install -g mocha@~2.3.4 # 安装mocha
$ npm install # 安装依赖
$ mocha test # 运行测试代码
```

### 发布npm

```  bash
$ npm publish
```

## 报告问题

- [Issues](https://github.com/yanhaijing/template.js/issues "report question")

## 贡献者

- [yanhaijing](http://yanhaijing.com "yanhaijing")

## 为什么会有这个项目

已经有了那么多现成的模板引擎，为什么我还要重新发明轮子呢。其实主要是《[只有20行Javascript代码！手把手教你写一个页面模板引擎](http://blog.jobbole.com/56689/)》读这篇文章的产物，并结合了BaiduTemplate和artTemplate的特色，还有我自己的一些想法。还在等什么，赶紧来尝试吧。

## 更新日志

[CHANGELOG.md](CHANGELOG.md)

## 计划列表
[TODO.md](TODO.md)

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
- [Juicer](http://juicer.name/)
- [handlebarsjs](http://handlebarsjs.com/)
- [Jade](http://jade-lang.com/)
