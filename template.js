/*!
 * template.js v0.4.0 (https://github.com/yanhaijing/template.js)
 * Copyright 2015 yanhaijing. All Rights Reserved
 * Licensed under MIT (https://github.com/yanhaijing/template.js/blob/master/MIT-LICENSE.txt)
 */
;(function(root, factory) {
    var template = factory(root);
    if (typeof define === 'function' && define.amd) {
        // AMD
        define('template', function() {
            return template;
        });
    } else if (typeof exports === 'object') {
        // Node.js
        module.exports = template;
    } else {
        // Browser globals
        var _template = root.template;

        template.noConflict = function() {
            if (root.template === template) {
                root.template = _template;
            }

            return template;
        };
        root.template = template;
    }
}(this, function(root) {
    'use strict';
    var o = {
        sTag: '<%',//开始标签
        eTag: '%>',//结束标签
        compress: false,//是否压缩html
        escape: true, //默认输出是否进行HTML转义
        error: function (e) {}//错误回调
    };
    var toString = {}.toString;

    function getType(x) {
        if(x === null){
            return 'null';
        }

        var t= typeof x;

        if(t !== 'object'){
            return t;
        }

        var c = toString.call(x).slice(8, -1).toLowerCase();
        if(c !== 'object'){
            return c;
        }

        if(x.constructor==Object){
            return c;
        }

        return 'unkonw';
    }

    function isObject(obj) {
        return getType(obj) === 'object';
    }
    function isFunction(fn) {
        return getType(fn) === 'function';
    }
    function extend() {
        var target = arguments[0] || {};
        var arrs = Array.prototype.slice.call(arguments, 1);
        var len = arrs.length;
     
        for (var i = 0; i < len; i++) {
            var arr = arrs[i];
            for (var name in arr) {
                target[name] = arr[name];
            }
     
        }
        return target;
    }
    function encodeHTML(source) {
        return String(source)
            .replace(/&/g,'&amp;')
            .replace(/</g,'&lt;')
            .replace(/>/g,'&gt;')
            .replace(/\\/g,'&#92;')
            .replace(/"/g,'&quot;')
            .replace(/'/g,'&#39;');
    };
    function compress(html) {
        return html.replace(/\s+/g, ' ').replace(/<!--[\w\W]*?-->/g, '');
    }
    function trim(str) {
        return isFunction(str.trim) ? str.trim() : str.replace(/^\s+|\s+$/g, '');
    }
    function handelError(e) {
        var message = 'template.js error\n\n';

        for (var key in e) {
            message += '<' + key + '>\n' + e[key] + '\n\n';
        }
        message += '<message>\n' + e.message + '\n\n';
        console && console.error && console.error(message);

        o.error(e);

        return function () {
            return 'template.js error';
        };
    }
    function parse(tpl, opt) {
        var code = '';
        var sTag = opt.sTag;
        var eTag = opt.eTag;
        var escape = opt.escape;
        function parsehtml(line) {
            // 双引号转义，换行符替换为空格
            line = line.replace(/"/g, '\\"').replace(/\n/g, ' ');
            return ';__r__.push("' + line + '")\n';
        }
        function parsejs(line) {              
            var html;
            if (line.search(/^=/) !== -1) {
                //默认输出
                html = line.slice(1);
                html = escape ? ('encodeHTML(' + html + ')') : html;
                return ';__r__.push(' + html + ')\n';
            }

            if (line.search(/^:h=/) !== -1) {
                //HTML转义输出
                html = line.slice(3);
                return ';__r__.push(encodeHTML(' + html + '))\n';
            }

            if (line.search(/^:=/) !== -1) {
                //不转义
                html = line.slice(2);
                return ';__r__.push(' + html + ')\n';
            }

            if (line.search(/^:u=/) !== -1) {
                //URL转义
                html = line.slice(3);
                return ';__r__.push(encodeURI(' + html + '))\n';
            }

            //原生js
            return ';' + line + '\n';
        }

        var tokens = tpl.split(sTag);

        for (var i = 0, len = tokens.length; i < len; i++) {
            var token = tokens[i].split(eTag);

            if (token.length === 1) {
                code += parsehtml(token[0]);
            } else {
                code += parsejs(token[0], true);
                if (token[1]) {
                    code += parsehtml(token[1]);
                }
            }
        }

        return code;
    }
    function compiler(tpl, opt) {
        var mainCode = parse(tpl, opt);

        var headerCode = '\n"use strict";\nvar __r__ = [];\n';

        var footerCode = ';return __r__.join("");\n';

        var code = headerCode + mainCode + footerCode;

        console.log('function (data) {', code, '}');

        code = code.replace(/[\n]/g, '');
        console.log(code);
        var Render = function (data) {
            var keyArr = [];
            var valArr = [];
            data.encodeHTML = encodeHTML;
            for(var key in data) {
                keyArr.push('"' + key + '"');
                valArr.push(data[key]);
            }
            var source = 'new Function(' + keyArr.join(',') + ', \'' + code + '\')';
            console.log(source);
            var fn = eval(source);
            return fn.apply(null, valArr);
        }
        console.log(Render.toString());
        return Render;
        
        // try {
        //     var Render = new Function('__data__', '__encodeHTML__', code); 
        // } catch(e) {
        //     e.temp = 'function anonymous(__data__, __encodeHTML__) {' + code + '}';
        //     throw e;
        // }  
    }
    function compile(tpl, opt) {
        opt = extend({}, o, opt);

        try {
            var Render = compiler(tpl, opt);
        } catch(e) {
            e.name = 'CompileError';
            e.tpl = tpl;
            e.render = e.temp;
            delete e.temp;
            return handelError(e);
        }

        function render(data) {
            try {
                var html = Render(data, encodeHTML);
                html = opt.compress ? compress(html) : html;
                return html;
            } catch(e) {
                e.name = 'RenderError';
                e.tpl = tpl;
                e.render = Render.toString();
                return handelError(e);
            }            
        }

        render.toString = function () {
            return Render.toString();
        };
        return render;
    }
    function template(tpl, data) {
        if (typeof tpl !== 'string') {
            return '';
        }

        var fn = compile(tpl);
        if (!isObject(data)) {
            return fn;
        }

        return fn(data);
    }

    template.config = function (option) {
        if (isObject(option)) {
            o = extend(o, option);
        }
        
        return extend({}, o);
    };

    template.__encodeHTML = encodeHTML;
    template.__compile = compile;
    template.version = '0.4.0';
    return template;
}));
