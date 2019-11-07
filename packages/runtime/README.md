# [runtime](https://github.com/yanhaijing/template.js/blob/master/packages/runtime)
[![](https://img.shields.io/badge/Powered%20by-jslib%20base-brightgreen.svg)](https://github.com/yanhaijing/jslib-base)

[template.js](https://github.com/yanhaijing/template.js)的runtime运行时

## :pill: 兼容性
单元测试保证支持如下环境：

| IE   | CH   | FF   | SF   | OP   | IOS  | Android   | Node  |
| ---- | ---- | ---- | ---- | ---- | ---- | ---- | ----- |
| 6+   | 29+ | 55+  | 9+   | 50+  | 9+   | 4+   | 4+ |

**注意：编译代码依赖ES5环境，对于ie6-8需要引入[es5-shim](http://github.com/es-shims/es5-shim/)才可以兼容，可以查看[demo/demo-global.html](./demo/demo-global.html)中的例子**

## :rocket: 使用者指南

通过npm下载安装代码

```bash
$ npm install --save @templatejs/runtime
```

如果你是node环境

```js
var runtime = require('@templatejs/runtime');
```

如果你是webpack等环境

```js
import runtime from '@templatejs/runtime';
```

如果你是requirejs环境

```js
requirejs(['node_modules/@templatejs/runtime/dist/index.aio.js'], function (runtime) {
    // xxx
})
```

如果你是浏览器环境

```html
<script src="node_modules/@templatejs/runtime/dist/index.aio.js"></script>
```

## :bookmark_tabs: 文档
[API](./doc/api.md)

## 贡献者列表

[contributors](https://github.com/yanhaijing/template.js/graphs/contributors)

## :gear: 更新日志
[CHANGELOG.md](https://github.com/yanhaijing/template.js/blob/master/CHANGELOG.md)

## :airplane: 计划列表
[TODO.md](https://github.com/yanhaijing/template.js/blob/master/TODO.md)