import { ParserOption } from '@templatejs/parser';
import { type } from '@jsmini/type';
import { extend } from '@jsmini/extend';

export interface Option extends ParserOption {
    compress?: boolean;
    error?: (e: any) => void;
}
let o: Option = {
    sTag: '<%',//开始标签
    eTag: '%>',//结束标签
    compress: false,//是否压缩html
    escape: true, //默认输出是否进行HTML转义
    error: function () {}//错误回调
};

function clone(...args: any[]): object {
    return extend.apply(null, [{}].concat(args));
}

function nothing<T>(param: T): T{
    return param;
}
function encodeHTML(source: string) {
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
    '': function (param: any) { return nothing(param); },
    'h': function (param: any) { return encodeHTML(param); },
    'u': function (param: any) { return encodeURI(param); }
};

function consoleAdapter(cmd: string, msg: string) {
    typeof console !== 'undefined' && console[cmd] && console[cmd](msg);
}

function runtime() {}

runtime.config = function (option: Option): Option {
    if (type(option) === 'object') {
        o = extend(o, option) as Option;
    }
    return clone(o) as Option;
};
runtime.compress = function (html: string) {
    return String(html).replace(/\s+/g, ' ').replace(/<!--[\w\W]*?-->/g, '');
};
runtime.handelError = function handelError(e: Error) {
    let message = 'template.js error\n\n';

    for (let key in e) {
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
    };
    return error;
};
runtime.registerFunction = function (name: string, fn: (param: any) => any) {
    if (typeof name !== 'string') {
        return clone(functionMap);
    }
    if (type(fn) !== 'function') {
        return functionMap[name];
    }

    return functionMap[name] = fn;
};
runtime.unregisterFunction = function (name: string): boolean {
    if (typeof name !== 'string') {
        return false;
    }
    delete functionMap[name];
    return true;
};
runtime.registerModifier = function (name: string, fn: (param: any) => any) {
    if (typeof name !== 'string') {
        return clone(modifierMap);
    }
    if (type(fn) !== 'function') {
        return modifierMap[name];
    }

    return modifierMap[name] = fn;
};
runtime.unregisterModifier = function (name: string): boolean {
    if (typeof name !== 'string') {
        return false;
    }
    delete modifierMap[name];
    return true;
};

runtime.encodeHTML = encodeHTML;
runtime.functionMap = functionMap;
runtime.modifierMap = modifierMap;
runtime.o = o;

export default runtime;