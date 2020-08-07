# 变更日志

## 2.5.0 / 2020-8-6

- 增加@template/cli工具

## 2.4.2 / 2020-7-5

- 修复未传入属性，会访问到原型链属性的bug
    - in判断改为hasOwnProperty判断
    - 详细讨论见[#39](https://github.com/yanhaijing/template.js/issues/39)

## 2.4.1 / 2020-7-1

- 修复属性为徦值时，比如0 false ''，获取不到的问题，[#39](https://github.com/yanhaijing/template.js/issues/39)

## 2.4.0 / 2019-12-15

- 添加对`browserify`的支持

## 2.3.0 / 2019-12-15

- 添加对`parcel`的支持

## 2.2.1 / 2019-12-08

- @parser 修复对crlf换行符的支持

## 2.2.0 / 2019-11-18

- 添加预编译插件对`sandbox`模式的支持

## 2.1.0 / 2019-11-17

- 完成`gulp-templatejs`

## 2.0.0 / 2019-11-8

- 完成`@templatejs/parser`
- 完成`@templatejs/runtime`
- 完成`@templatejs/precompiler`
- 完成`template_js`
- 完成`fis-parser-template`
- 完成`template-loader`
- 完成`rollup-plugin-templatejs`

## 2.0 之前的变更日志

- [template.js](https://github.com/yanhaijing/template.js/blob/master/packages/template/TODO.md)
- [fis-parser-template](https://github.com/yanhaijing/template.js/blob/master/packages/fis-parser-template/TODO.md)
- [template-loader](https://github.com/yanhaijing/template.js/blob/master/packages/template-loader/TODO.md)
- [rollup-plugin-templatejs](https://github.com/yanhaijing/template.js/blob/master/packages/rollup-plugin-templatejs/TODO.md)