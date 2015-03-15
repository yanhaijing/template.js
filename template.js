/*!
 * template.js v0.3.1 (https://github.com/yanhaijing/template.js)
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
    function isObj(obj) {
        return Object.prototype.toString.call(obj) === '[object Object]';
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
    function analyze(tpl, opt) {
        var code = '';
        var sTag = opt.sTag;
        var eTag = opt.eTag;
        function add(line, js) {
            //非js
            if (!js) {
                code += '__r__.push("' + line.replace(/"/g, '\\"') + '");\n';
                return 0;
            }   
            //原生js
            if (line.search(/^(:|=)/) === -1) {
                code += line + '\n';
                return 1;
            }
            var html;
            if (line.search(/^=/) !== -1) {
                //默认输出
                html = line.slice(1);
                html = opt.escape ? ('__encodeHTML__(' + html + ')') : html;
                code += '__r__.push(' + html + ');\n';
                return 2;
            } else if (line.search(/^:h=/) !== -1) {
                //HTML转义输出
                html = line.slice(3);
                code += '__r__.push(__encodeHTML__(' + html + '));\n';
                return 3;
            } else if (line.search(/^:=/) !== -1) {
                //不转义
                html = line.slice(2);
                code += '__r__.push(' + html + ');\n';
                return 4;
            } else if (line.search(/^:u=/) !== -1) {
                //URL转义
                html = line.slice(3);
                code += '__r__.push(encodeURI(' + html + '));\n';
                return 5;
            }

            return -1;
        }

        var tokens = tpl.split(sTag);

        for (var i = 0, len = tokens.length; i < len; i++) {
            var token = tokens[i].split(eTag);

            if (token.length === 1) {
                add(token[0]);
            } else {
                add(token[0], true);
                if (token[1]) {
                    add(token[1]);
                }
            }
        }

        return code;
    }
    function compiler(tpl, opt) {
        var mainCode = analyze(tpl, opt);

        var headerCode = '\n' + 
        'var r = (' + 
            'function (__data__, __encodeHTML__) {' + 
                'var __str__ = "", __r__ = [];\n' + 
                'for(var key in __data__) {\n' + 
                    '__str__+=("var " + key + "=__data__[\'" + key + "\'];");\n' + 
                '}\n' + 
                'eval(__str__);\n';

        var footerCode = ';\n' + 
                'return __r__;\n' + 
            '}(__data__, __encodeHTML__));\n' + 
        'return r.join("");';

        var code = headerCode + mainCode + footerCode;

        code = code.replace(/[\r\t\n]/g, '');
        try {
            var Render = new Function('__data__', '__encodeHTML__', code); 
            return Render;
        } catch(e) {
            e.temp = 'function anonymous(__data__, __encodeHTML__) {' + code + '}';
            throw e;
        }  
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
        if (!isObj(data)) {
            return fn;
        }

        return fn(data);
    }

    template.config = function (option) {
        if (isObj(option)) {
            o = extend(o, option);
        }
        
        return extend({}, o);
    };

    template.__encodeHTML = encodeHTML;
    template.__compile = compile;
    template.version = '0.3.1';
    return template;
}));