# template.js文档
template.js 一款javascript模板引擎，简单，好用。

template.js遵循简单好用的原则，所有接口都设计简单，职责单一，仅负责核心功能，其它附加功能代理给用户。

## 模版语法
可在html代码中使用javascript代码，同smarty同理。

### 表达式
开始标签和结束标签（如：<% 与 %>）包裹起来的语句则为模板的逻辑表达式。

### 输出表达式
默认输出(是否转码有escape参数决定)：

	<%=content%>

不编码输出：
	
	<%:=content%>

对输出内容进行HTML转义:

	<%:h=content%>

对输出内容进行URL编码：

	<%:u=content%>

**注：编码可以防止数据中含有 HTML 字符串，避免引起 XSS 攻击。**

## template*

唯一入口函数，支持编译和渲染，在传统浏览器环境会占用template全局变量。

template函数会返回渲染数据的字符串，若缺省数据会返回编译后的函数，可多次调用，传入不同数据，返回不同结果，适用于多次渲染同一模版的情况，提高性能。

- tpl {string} 必须 带编译的模版字符串
- [data] {object} 可选 要渲染的数据
- return {function|string} 若缺省data返回函数，否则返回字符串

[演示](../demo/basic.html)

## template.config
配置template.js的自定义选项。

- option {Object} 配置的对象参数
- return {Object} 配置对象的镜像

### 可配置参数

- sTag {String} 开始标签 默认为 '<%'
- eTag {String} 结束标签 默认为 '%>'
- compress {Boolean} 是否压缩输出的html 默认为false
- escape {Boolean} 默认是否对输出内容进行html转义 默认为true

[演示](../demo/config.html)

## template.noConflict+
在以原是方式使用template.js时会存在改函数（在模块化开发环境中不会存在），用来释放template.js占用的全局变量template。同时会返回template。

- return {Function} template

