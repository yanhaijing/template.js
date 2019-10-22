import { type } from '@jsmini/type';
import { extend } from '@jsmini/extend';

export interface Option {
    sTag: string,
    eTag: string,
    compress: boolean,
    escape: boolean,
    error: Function,
}
let o: Option = {
    sTag: '<%',//开始标签
    eTag: '%>',//结束标签
    compress: false,//是否压缩html
    escape: true, //默认输出是否进行HTML转义
    error: function (e) {}//错误回调
};

function clone(...args: any[]) {
    return extend.apply(null, [{}].concat(args));
}

function nothing<T>(param: T): T{
    return param;
}
function encodeHTML(source: string): string {
    return String(source)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/\\/g, '&#92;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

const functionMap = {}; //内部函数对象
//修饰器前缀
const modifierMap = {
    '': function (param) { return nothing(param) },
    'h': function (param) { return encodeHTML(param) },
    'u': function (param) { return encodeURI(param) }
};

function consoleAdapter(cmd, msg) {
    typeof console !== 'undefined' && console[cmd] && console[cmd](msg);
}

function runtime() {}
runtime.config = function (option: Option): Option {
    if (type(option) === 'object') {
        o = extend(o, option) as Option;
    }
    return clone(o);
};
runtime.compress = function (html: string): string {
    return html.replace(/\s+/g, ' ').replace(/<!--[\w\W]*?-->/g, '');
}
runtime.handelError = function handelError(e) {
    var message = 'template.js error\n\n';

    for (var key in e) {
        message += '<' + key + '>\n' + e[key] + '\n\n';
    }
    message += '<message>\n' + e.message + '\n\n';
    consoleAdapter('error', message);

    o.error(e);
    function error() {
        return 'template.js error';
    }
    error.toString = function () {
        return '__code__ = "template.js error"';
    }
    return error;
}
runtime.registerFunction = function (name: string, fn: Function) {
    if (typeof name !== 'string') {
        return clone(functionMap);
    }
    if (type(fn) !== 'function') {
        return functionMap[name];
    }

    return functionMap[name] = fn;
}
runtime.unregisterFunction = function (name: string): boolean {
    if (typeof name !== 'string') {
        return false;
    }
    delete functionMap[name];
    return true;
}
runtime.registerModifier = function (name: string, fn: Function) {
    if (typeof name !== 'string') {
        return clone(modifierMap);
    }
    if (type(fn) !== 'function') {
        return modifierMap[name];
    }

    return modifierMap[name] = fn;
}
runtime.unregisterModifier = function (name: string): boolean {
    if (typeof name !== 'string') {
        return false;
    }
    delete modifierMap[name];
    return true;
}
runtime.encodeHTML = encodeHTML;
runtime.functionMap = functionMap;
runtime.modifierMap = modifierMap;
runtime.o = o;

export default runtime;