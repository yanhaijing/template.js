# [precompiler](https://github.com/yanhaijing/template.js/blob/master/packages/precompiler)
[![](https://img.shields.io/badge/Powered%20by-jslib%20base-brightgreen.svg)](https://github.com/yanhaijing/jslib-base)

[template.js](https://github.com/yanhaijing/template.js)的模板预编译器

## 兼容性
单元测试保证支持如下环境：

| IE   | CH   | FF   | SF   | OP   | IOS  | Android   | Node  |
| ---- | ---- | ---- | ---- | ---- | ---- | ---- | ----- |
| 6+   | 29+ | 55+  | 9+   | 50+  | 9+   | 4+   | 4+ |

**注意：编译代码依赖ES5环境，对于ie6-8需要引入[es5-shim](http://github.com/es-shims/es5-shim/)才可以兼容，可以查看[demo/demo-global.html](./demo/demo-global.html)中的例子**

## 使用者指南

通过npm下载安装代码

```bash
$ npm install --save @templatejs/precompiler
```

如果你是node环境

```js
const precompiler = require('@templatejs/precompiler');

const tpl = `
<div><%=a%></div>
`;

// return a render function string like
// function render(data) { return '<div>' + data['a'] + '</div>'}
precompiler.precompile(tpl);
```

支持的参数

```js
// sTag 开始标签
// eTag 结束标签
// escape 是否默认转移输出变量
// expression 获取template运行时的表达式，默认为 template
// compress 是否对html进行压缩
// tplName 模板文件的名字，方便报错时的提示
precompiler.precompile(tpl, {sTag: '<#', eTag: '#>', escape: true});
```

## 贡献者列表

[contributors](https://github.com/yanhaijing/template.js/graphs/contributors)

## 更新日志
[CHANGELOG.md](https://github.com/yanhaijing/template.js/blob/master/CHANGELOG.md)

## 计划列表
[TODO.md](https://github.com/yanhaijing/template.js/blob/master/TODO.md)