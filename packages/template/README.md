# [template](https://github.com/yanhaijing/template.js/blob/master/packages/template)
[![](https://img.shields.io/badge/Powered%20by-jslib%20base-brightgreen.svg)](https://github.com/yanhaijing/jslib-base)

一款javascript模板引擎，简单，好用，支持webpack, rollup和fis。

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

## :pill: 兼容性
单元测试保证支持如下环境：

| IE   | CH   | FF   | SF   | OP   | IOS  | Android   | Node  |
| ---- | ---- | ---- | ---- | ---- | ---- | ---- | ----- |
| 6+   | 29+ | 55+  | 9+   | 50+  | 9+   | 4+   | 0.10+ |

**注意：编译代码依赖ES5环境，对于ie6-8需要引入[es5-shim](http://github.com/es-shims/es5-shim/)才可以兼容，可以查看[demo/demo-global.html](./demo/demo-global.html)中的例子**

## :rocket: 使用者指南

通过npm下载安装代码

```bash
$ npm install --save template_js
```

如果你是node环境

```js
var template = require('template_js');
```

如果你是webpack等环境

```js
import template from 'template_js';
```

如果你是requirejs环境

```js
requirejs(['node_modules/template_js/dist/index.aio.js'], function (template) {
    // xxx
})
```

如果你是浏览器环境

```html
<script src="node_modules/template_js/dist/index.aio.js"></script>
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

更多例子，请见[demo](https://github.com/yanhaijing/template.js/blob/master/packages/template/demo)目录。

## 自动化
### Fis
template.js从0.2.0开始支持[fis](http://fis.baidu.com/)，详情请看[这里](https://github.com/yanhaijing/template.js/blob/master/packages/fis-parser-template)。

### webpack
template.js从0.6.1开始支持[webpack](https://webpack.js.org/)，详情请看[这里](https://github.com/yanhaijing/template.js/blob/master/packages/template-loader)

### rollup
template.js从0.6.1开始支持[rollup](https://rollupjs.org/guide/en/)，详情请看[这里](https://github.com/yanhaijing/template.js/blob/master/packages/rollup-plugin-templatejs)

## :bookmark_tabs: 文档
[API](https://github.com/yanhaijing/template.js/blob/master/packages/template/doc/api.md)

## 贡献者列表

[contributors](https://github.com/yanhaijing/template/graphs/contributors)

## :gear: 更新日志
[CHANGELOG.md](https://github.com/yanhaijing/template.js/CHANGELOG.md)

## :airplane: 计划列表
[TODO.md](https://github.com/yanhaijing/template.js/TODO.md)

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