# 变更日志

## 3.1.4 / 2023-11-19

- browserify-templatejs 插件
  - feat: 去掉 expression 参数，现在自动添加 require @templatejs/runtime
- esbuild-plugin-templatejs 插件
  - feat: 去掉 expression 参数，现`在自动添加 import @templatejs/runtime
  - fix: tplName 在windows下显示不正确
- gulp-templatejs 插件
  - feat: 去掉 expression 参数，现在自动添加 require @templatejs/runtime
  - fix: Buffer() is deprecated
- parcel-transformer-template 插件
  - feat: 去掉 expression 参数，现在自动添加 import @templatejs/runtime
  - fix: tplName 只显示文件名，不再显示全路径
- rollup-plugin-templatejs 插件
  - fix: tplName 在windows下显示不正确
- template-loader 插件
  - feat: 去掉 expression 参数，现在自动添加 require @templatejs/runtime
  - fix: tplName 在windows下显示不正确
  - fix: 不同版本 webpack export defalut 处理错误问题
- fix: 修复打包文件的 banner 信息
- fix: cli template 升级为 3.x
- fix: 修复插件 peerDependencies 为 3.x

## 3.0.0-alpha.0 / 2023-11-19

- feat: 支持 nodejs esm exports
- feat: 支持 sourceMap
- refact: 升级 jslib-base 为 2.3.2
- refact: 升级 @jsmini/extend 0.5.0
- refact: 升级 @jsmini/type 0.11.0
- refact: parcel-plugin-template 改为单独发包，从 yarn workspace 和 lerna publish 移出

## 2.10.0 / 2023-11-18

- rollup-plugin-templatejs 插件
  - feat: 去掉 expression 参数，现在自动添加 import @templatejs/runtime

## 2.9.0 / 2023-10-3

- feat: 添加对 parcel v2 的支持
  - 新增 parcel-transformer-template 插件

## 2.8.3 / 2023-10-2

- fix: 修复 parcel v1 demo

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
