# 变更日志

## 3.0.0-alpha.0 / 2023-11-19

- feat: 支持 nodejs esm exports
- feat: 支持 sourceMap
- 升级 jslib-base 为 2.3.2
- 升级 @jsmini/extend 0.5.0
- 升级 @jsmini/type 0.11.0
- parcel-plugin-template 改为单独发包，从 yarn workspace 和 lerna publish 移出

## 2.10.0 / 2023-11-18

- rollup-plugin-templatejs 插件
  - 去掉 expression 参数，现在默认import runtime 不需要了

## 2.9.0 / 2023-10-3

- 添加对 parcel v2 的支持
- 新增 parcel-transformer-template 插件

## 2.8.3 / 2023-10-2

- 修复 parcel v1 demo

## 2.8.2 / 2023-10-1

- 升级 browserify v17 demo
- 升级 esbuild v0.19 demo
- 升级 parcel v1.12 demo
- 升级 rollup v3 demo
- 升级 vite v4.4 demo

## 2.8.1 / 2023-10-1

- 修复 cli new demo error
- 升级 webpack demo 为 webpack5

## 2.8.0 / 2023-9-18

- 添加对 esbuild 的支持

## 2.7.0 / 2023-9-17

- 添加对 rspack 的支持

## 2.6.0 / 2023-9-16

- 添加对 vite 的支持

## 2.5.0 / 2020-8-6

- 增加@template/cli 工具

## 2.4.2 / 2020-7-5

- 修复未传入属性，会访问到原型链属性的 bug
  - in 判断改为 hasOwnProperty 判断
  - 详细讨论见[#39](https://github.com/yanhaijing/template.js/issues/39)

## 2.4.1 / 2020-7-1

- 修复属性为徦值时，比如 0 false ''，获取不到的问题，[#39](https://github.com/yanhaijing/template.js/issues/39)

## 2.4.0 / 2019-12-15

- 添加对`browserify`的支持

## 2.3.0 / 2019-12-15

- 添加对`parcel`的支持

## 2.2.1 / 2019-12-08

- @parser 修复对 crlf 换行符的支持

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

- [template.js](https://github.com/yanhaijing/template.js/blob/master/packages/template/CHANGELOG.md)
- [fis-parser-template](https://github.com/yanhaijing/template.js/blob/master/packages/fis-parser-template/CHANGELOG.md)
- [template-loader](https://github.com/yanhaijing/template.js/blob/master/packages/template-loader/CHANGELOG.md)
- [rollup-plugin-templatejs](https://github.com/yanhaijing/template.js/blob/master/packages/rollup-plugin-templatejs/CHANGELOG.md)
