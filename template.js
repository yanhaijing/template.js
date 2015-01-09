/**
 * 模版引擎
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
        compress: false//是否压缩html
    };
    function isObj(obj) {
        return Object.prototype.toString.call(obj) !== '[object Object]';
    }
    function extend() {
        var target = arguments[0] || {};
        var arrs = slice.call(arguments, 1);
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
    function compile(tpl) {
        var reg = new RegExp(o.sTag + '(.*?)' + o.eTag, 'g');// /<%(.*?)%>/g;
        // var regblock = /(^( )?(if|for|else|switch|case|break|{|}))(.*)?/g;
        var match;
        var point = 0;
        var code = '';
        function add(line, js) {
            //非js
            if (!js) {
                code += 'com_yanhaijing_templatejs_r.push("' + line.replace(/"/g, '\\"') + '");\n';
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
                code += 'com_yanhaijing_templatejs_r.push(com_yanhaijing_templatejs_encodeHTML(' + html + '));\n';
                return 2;
            } else if (line.search(/^:=/) !== -1) {
                //不转义
                html = line.slice(2);
                code += 'com_yanhaijing_templatejs_r.push(' + html + ');\n';
                return 3;
            } else if (line.search(/^:u=/) !== -1) {
                //URL转义
                html = line.slice(3);
                code += 'com_yanhaijing_templatejs_r.push(encodeURI(' + html + '));\n';
                return 4;
            }
            return 5;
        }
        while(match = reg.exec(tpl)){
            add(tpl.slice(point, match.index));
            add(match[1], true);
            point = match.index + match[0].length;
        }
        add(tpl.substr(point, tpl.length - point));

        code = '\nvar r = (function (com_yanhaijing_templatejs_data, com_yanhaijing_templatejs_encodeHTML) {var com_yanhaijing_templatejs_str = "", com_yanhaijing_templatejs_r = [];\nfor(var key in com_yanhaijing_templatejs_data) {\ncom_yanhaijing_templatejs_str+=("var " + key + "=com_yanhaijing_templatejs_data[\'" + key + "\'];");\n}\neval(com_yanhaijing_templatejs_str);\n' + code + ';\nreturn com_yanhaijing_templatejs_r}(data, encodeHTML));\nreturn r.join("");';
        console.log(code);
        return new Function('data', 'encodeHTML', code.replace(/[\r\t\n]/g, ''));
    }
    function template(tpl, data) {
        if (typeof tpl !== 'string') {
            return '';
        }

        var fn = compile(tpl);
        if (isObj(data)) {
            return function (data) {
                var html;
                return html = fn.call(null, data, encodeHTML), o.compress ? html.replace(/\s/g, '') : html;
            };
        }
        var html;
        return html = fn.call(null, data, encodeHTML), o.compress ? html.replace(/\s/g, '') : html;
    }
    template.config = function (data) {
        if (!isObj(data)) {
            return 0;
        }
        o = extend(o, data);
        return true;
    };
    template.version = '0.1.0';
    return template;
}));