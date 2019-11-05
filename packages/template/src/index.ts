import { type } from '@jsmini/type';
import { extend } from '@jsmini/extend';
import { parse } from '@templatejs/parser';
import runtime, { Option } from '@templatejs/runtime';

const {
    encodeHTML, compress, handelError, o, functionMap, modifierMap
} = runtime;

function clone(...args: any[]): object {
    return extend.apply(null, [{}].concat(args));
}

function compiler(tpl: string, opt: Option = o): Function {
    var mainCode = parse(tpl, opt);

    var headerCode = '\n' +
        '    var html = (function (__data__, __modifierMap__) {\n' +
        '        var __str__ = "", __code__ = "";\n' +
        '        for(var key in __data__) {\n' +
        '            __str__+=("var " + key + "=__data__[\'" + key + "\'];");\n' +
        '        }\n' +
        '        eval(__str__);\n\n';

    var footerCode = '\n' +
        '        ;return __code__;\n' +
        '    }(__data__, __modifierMap__));\n' +
        '    return html;\n';

    var code = headerCode + mainCode + footerCode;
    code = code.replace(/[\r]/g, ' '); // ie 7 8 会报错，不知道为什么
    try {
        var Render = new Function('__data__', '__modifierMap__', code);
        Render.toString = function () {
            return mainCode;
        };
        return Render;
    } catch (e) {
        e.temp = 'function anonymous(__data__, __modifierMap__) {' + code + '}';
        throw e;
    }
}

function compile(tpl: string, opt: Option = o) {
    opt = clone(o, opt);

    try {
        var Render = compiler(tpl, opt);
    } catch (e) {
        e.name = 'CompileError';
        e.tpl = tpl;
        e.render = e.temp;
        delete e.temp;
        return handelError(e);
    }

    function render(data: object): string {
        data = clone(functionMap, data);
        try {
            var html = Render(data, modifierMap);
            html = opt.compress ? compress(html) : html;
            return html;
        } catch (e) {
            e.name = 'RenderError';
            e.tpl = tpl;
            e.render = Render.toString();
            return handelError(e)();
        }
    }

    render.toString = function () {
        return Render.toString();
    };
    return render;
}

function template(tpl: string, data: object): string;
function template(tpl: string): (data: object) => string;
function template(tpl: string, data?: object) {
    if (typeof tpl !== 'string') {
        return '';
    }

    var fn = compile(tpl);
    if (type(data) !== 'object') {
        return fn;
    }

    return fn(data);
}

template.config = function (option: Option) {
    return runtime.config(option);
};

template.registerFunction = function (name: string, fn: (param: any) => any) {
    return runtime.registerFunction(name, fn);
};
template.unregisterFunction = function (name: string) {
    return runtime.unregisterFunction(name);
};

template.registerModifier = function (name: string, fn: (param: any) => any) {
    return runtime.registerModifier(name, fn);
};
template.unregisterModifier = function (name: string) {
    return runtime.unregisterModifier(name);
};

// 兼容runtime, 预编译插件可以引用runtime，也可以引用template
template.encodeHTML = encodeHTML;
template.compress = compress;
template.handelError = handelError;
template.functionMap = functionMap;
template.modifierMap = modifierMap;

// 兼容旧版本
template.__encodeHTML = encodeHTML;
template.__compress = compress;
template.__handelError = handelError;
template.__compile = compile;
// template.version = '0.7.1';

export default template;