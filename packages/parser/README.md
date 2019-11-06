# [parser](https://github.com/yanhaijing/template.js/blob/master/packages/parser)
[![](https://img.shields.io/badge/Powered%20by-jslib%20base-brightgreen.svg)](https://github.com/yanhaijing/jslib-base)

[template.js](https://github.com/yanhaijing/template.js)的模板编译器

## 兼容性
单元测试保证支持如下环境：

| IE   | CH   | FF   | SF   | OP   | IOS  | Android   | Node  |
| ---- | ---- | ---- | ---- | ---- | ---- | ---- | ----- |
| 6+   | 29+ | 55+  | 9+   | 50+  | 9+   | 4+   | 0.10+ |

**注意：编译代码依赖ES5环境，对于ie6-8需要引入[es5-shim](http://github.com/es-shims/es5-shim/)才可以兼容，可以查看[demo/demo-global.html](./demo/demo-global.html)中的例子**

## 使用者指南

通过npm下载安装代码

```bash
$ npm install --save @templatejs/parser
```

如果你是node环境

```js
const parser = require('@templatejs/parser');

const tpl = `
<div><%=a%></div>
`;

parser.parse(tpl); // return a render string like '<div>' + a + '</div>'
```

支持的参数

```js
// sTag 开始标签
// eTag 结束标签
// escape 是否默认转移输出变量
parser.parse(tpl, {sTag: '<#', eTag: '#>', escape: true});
```

## 文档
[API](https://github.com/yanhaijing/template.js/blob/master/./doc/api.md)

## 贡献者列表

[contributors](https://github.com/yanhaijing/template.js/graphs/contributors)

## 更新日志
[CHANGELOG.md](https://github.com/yanhaijing/template.js/blob/master/TODO.md/CHANGELOG.md)

## 计划列表
[TODO.md](https://github.com/yanhaijing/template.js/blob/master/TODO.md)