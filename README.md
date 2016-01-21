# [template.js](https://github.com/yanhaijing/template.js) [![Build Status](https://travis-ci.org/yanhaijing/template.js.svg?branch=master)](https://travis-ci.org/yanhaijing/template.js) [![release](https://img.shields.io/badge/release-v0.7.1-orange.svg)](https://github.com/yanhaijing/template.js/releases/tag/v0.7.1) [![spm package](http://spmjs.io/badge/template.js)](http://spmjs.io/package/template.js) [![license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/yanhaijing/template.js/blob/master/MIT-LICENSE.txt)

template.js 一款javascript模板引擎，简单，好用。

## 功能概述

提供一套模板语法，用户可以写一个模板区块，每次根据传入的数据，生成对应数据产生的HTML片段，渲染不同的效果。

## 特性

- 模版编译，渲染
- 支持所有主流浏览器及Node（UMD）
- JavaScript原生语法
- 丰富的自定义配置
- 支持数据过滤
- 异常捕获功能
- 功能专一，简单好用

## 兼容性

- Node 0.10+
- Safari 6+ (Mac)
- iOS 5+ Safari
- Chrome 23+ (Windows, Mac, Android, iOS, Linux, Chrome OS)
- Firefox 4+ (Windows, Mac, Android, Linux, Firefox OS)
- Internet Explorer 6+ (Windows, Windows Phone)
- Opera 10+ (Windows, linux, Android)

## 如何使用？

### 传统用法
	
	<script src="template.js"></script>

### AMD

	require(['template'], function (template) {
		***
	});

### Bower

	$ bower install template.js
	$ bower install git://github.com/yanhaijing/template.js.git

### spm

	$ spm install template.js

### npm

	$ npm install template_js
	$ npm install yanhaijing/template.js

## 快速上手

### 编写模版

使用一个type="text/html"的script标签存放模板，或者放到字符串中：

	<script id="tpl" type="text/html">
	<ul>
		<%for(var i = 0; i < list.length; i++) {%>
		<li><%:=list[i].name%></li>
		<%}%>
	</ul>
	</script>

### 渲染模板

	var tpl = document.getElementById('tpl').innerHTML;
	template(tpl, {list: [{name: "yan"},{name: "haijing"}]});

输出结果：

	<ul>
		<li>yan</li>
		<li>haijing</li>
	</ul>

更多例子，请见[demo](demo)目录。

## 文档

[API](doc/api.md)

## 测试
template.js 包含完整的单元测试和性能测试。详情请见[test](test)目录。

## 自动化
### Fis
template.js从0.2.0开始支持[fis](http://fis.baidu.com/)，详情请看[这里](https://github.com/yanhaijing/fis-parser-template)。

## 贡献指南

如果你想为template.js贡献代码，请采用fork + pull request 方式，并在发起pr前先将master上超前的代码rebase到自己的分支上。

在目录运行如下命令，完成验证测试编译过程，确保无误：

	$ npm install -g mocha@~2.3.4 # 安装mocha
	$ npm install # 安装依赖
	$ mocha test # 运行测试代码
	
### 发布npm
	
	$ npm publish

### 发布spm
临时将package.json中的名字修改为 template.js	

	$ spm publish

### 发布Bower
	
	$ bower register template.js git://github.com/yanhaijing/template.js.git

## 报告问题

- [Issues](https://github.com/yanhaijing/template.js/issues "report question")

## 作者

**yanhaijing**

- [Weibo](http://weibo.com/yanhaijing1234 "yanhaijing's Weibo")
- [Email](mailto:yanhaijing@yeah.net "yanhaijing's Email")
- [Blog](http://yanhaijing.com "yanhaijing's Blog")

## 为什么会有这个项目

已经有了那么多现成的模板引擎，为什么我还要重新发明轮子呢。其实主要是《[只有20行Javascript代码！手把手教你写一个页面模板引擎](http://blog.jobbole.com/56689/)》读这篇文章的产物，并结合了BaiduTemplate和artTemplate的特色，还有我自己的一些想法。如果你像我一样好奇，那么可以尝试。

## 更新日志

[CHANGELOG.md](CHANGELOG.md)

## 计划列表
[TODO.md](TODO.md)

## 谁在使用
- [百度经验](http://jingyan.baidu.com/)
- [百度师傅](http://shifu.baidu.com/)

想了解都有谁在使用，[点击这里](https://github.com/yanhaijing/template.js/issues/6)。

## 相关链接

- [BaiduTemplate](http://tangram.baidu.com/BaiduTemplate/)
- [artTemplate](https://github.com/aui/artTemplate/)
- [Juicer](http://juicer.name/)
- [handlebarsjs](http://handlebarsjs.com/)
- [Jade](http://jade-lang.com/)
