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
    function compile(tpl) {
        var reg = /<%(.*?)%>/g;
        var regblock = /(^( )?(if|for|else|switch|case|break|{|}))(.*)?/g;
        var match;
        var point = 0;
        var code = '';
        function add(line, js) {
            js? code += line.match(regblock) ? line + '\n' : 'com_yanhaijing_templatejs_r.push(' + line + ');\n' :
                    code += 'com_yanhaijing_templatejs_r.push("' + line.replace(/"/g, '\\"') + '");\n';        
        }
        while(match = reg.exec(tpl)){
            add(tpl.slice(point, match.index));
            add(match[1], true);
            point = match.index + match[0].length;
        }
        add(tpl.substr(point, tpl.length - point));

        code = '\nvar r = (function (com_yanhaijing_templatejs_data) {var com_yanhaijing_templatejs_str = "", com_yanhaijing_templatejs_r = [];\nfor(var key in com_yanhaijing_templatejs_data) {\ncom_yanhaijing_templatejs_str+=("var " + key + "=com_yanhaijing_templatejs_data[\'" + key + "\'];");\n}\neval(com_yanhaijing_templatejs_str);\n' + code + ';\nreturn com_yanhaijing_templatejs_r}(data));\nreturn r.join("");';
        return new Function('data', code.replace(/[\r\t\n]/g, ''));
    }
    function template(tpl, data) {
        if (typeof tpl !== 'string') {
            return '';
        }

        var fn = compile(tpl);
        console.log(fn);
        if (Object.prototype.toString.call(data) !== '[object Object]') {
            return function (data) {
                fn.call(null, data);
            };
        }

        return fn.call(null, data);
    }
    template.version = 0.1.0;
    return template;
}));