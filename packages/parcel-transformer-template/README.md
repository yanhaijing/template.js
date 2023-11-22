# [parcel-transformer-template](https://github.com/yanhaijing/template.js/blob/master/packages/parcel-transformer-template)

[![](https://img.shields.io/badge/Powered%20by-jslib%20base-brightgreen.svg)](https://github.com/yanhaijing/jslib-base)

[template.js](https://github.com/yanhaijing/template.js)的 parcel v2 编译插件。

## 安装

```bash
$ npm install --save @templatejs/runtime # 安装template运行时
$ npm install --save-dev parcel-transformer-template # 安装template编译插件
```

## 配置

在 .parcelrc 中添加如下配置即可：

```json
{
  "extends": "@parcel/config-default",
  "transformers": {
    "*.tmpl": ["parcel-transformer-template"]
  }
}
```

配置参数同[template.js](https://github.com/yanhaijing/template.js/blob/master/doc/api.md#templateconfig)参数一样，其中expression参数会作为获取template的表达式。

可以通过`template.config.json`文件自定义配置，示例如下：

```json
{
  "sTag": "<#",
  "eTag": "#>",
  "sandbox": false // 沙箱模式
}
```

新建模版文件demo.tmpl(后缀名必须为tmpl)

```html
<div><#=abc#></div>
```

在js中`import`模版文件，并渲染

```js
import tpl from './demo.tmpl';

document.getElementById('test').innerHTML = tpl({ abc: 'yanhaijing' });
```

## 贡献者列表

[contributors](https://github.com/yanhaijing/template.js/graphs/contributors)

## :gear: 更新日志

[CHANGELOG.md](https://github.com/yanhaijing/template.js/blob/master/CHANGELOG.md)

## :airplane: 计划列表

[TODO.md](https://github.com/yanhaijing/template.js/blob/master/TODO.md)
