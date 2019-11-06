# 文档

## runtime.config
配置template.js的自定义选项。

- option {Object} 配置的对象参数
- return {Object} 配置对象的镜像

可配置参数

- sTag {String} 开始标签 默认为 '<%'
- eTag {String} 结束标签 默认为 '%>'
- compress {Boolean} 是否压缩输出的html 默认为false
- escape {Boolean} 默认是否对输出内容进行html转义 默认为true

## runtime.registerFunction 
注册自定义函数功能。

- name {String} 自定义函数的名字，如果缺省会返回全部已注册的函数
- fn {Function} 自定义函数，如果缺省会返回名称为name的函数
- return {Object|Function} 对象或函数

## runtime.unregisterFunction
取消自定义函数功能。

- name {String} 取消自定义函数的名字
- return {Boolean} 是否成功

## runtime.registerModifier 
注册自定义修复器功能。

- name {String} 自定义修复器的名字，如果缺省会返回全部已注册的修复器
- fn {Function} 自定义修复器，如果缺省会返回名称为name的修复器
- return {Object|Function} 对象或函数

## runtime.unregisterModifier
取消自定义修复器功能。

- name {String} 取消自定义修饰器的名字
- return {Boolean} 是否成功