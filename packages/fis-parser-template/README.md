# [fis-parser-template](https://github.com/yanhaijing/template.js/blob/master/packages/fis-parser-template)
[![](https://img.shields.io/badge/Powered%20by-jslib%20base-brightgreen.svg)](https://github.com/yanhaijing/jslib-base)

[template.js](https://github.com/yanhaijing/template.js)的fis编译插件。

## 安装

```bash
$ npm install --save @templatejs/runtime # 安装template运行时
# $ npm install --save template_js # 也可以安装template
$ npm install -g fis-parser-template
```

## 配置
配置参数同[template.js](https://github.com/yanhaijing/template.js/blob/master/doc/api.md#templateconfig)参数一样，其中global参数代表template.js的全局名称。

fis2

``` js
    //设置编译器
    fis.config.merge({
        modules: {
            parser: {
                tmpl: 'template' // tmpl后缀的使用fis-parser-template处理
            }
        }
    });
	
	//自定义参数
    fis.config.merge({
        settings: {
            parser: {
                template: {
                    sTag: '<%',
                    eTag: '%>',
                    global: 'template'
                }
            }
        }
    });
```
fis3

```js
fis.match('**.tmpl', {
    parser: fis.plugin('template', {
        sTag: '<%',
        eTag: '%>',
        global: 'template'
    }),
    isJsLike: true,
    release : false
});
```

js中如何使用

```js
const template = require('@templatejs/runtime');
const tpl = __inline('xxx.tmpl');

const html = tpl({ /* data */ });
```

## 贡献者列表

[contributors](https://github.com/yanhaijing/template.js/graphs/contributors)

## :gear: 更新日志
[CHANGELOG.md](https://github.com/yanhaijing/template.js/blob/master/CHANGELOG.md)

## :airplane: 计划列表
[TODO.md](https://github.com/yanhaijing/template.js/blob/master/TODO.md)

## 谁在使用

- [jr58](https://github.com/mengxiangrui/jr58)
- [fis3-base](https://github.com/yanhaijing/fis3-base)

## 相关链接

- [fis](http://fis.baidu.com/)