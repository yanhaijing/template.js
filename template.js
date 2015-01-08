/**
 * 模版引擎
 */

;(function (root) {
    function add() {

    }
    function compile(tpl) {
        var reg = /<%(.*?)%>/g;
        var regblock = /(^( )?(if|for|else|switch|case|break|{|}))(.*)?/g;
        var match;
        var point = 0;
        var code = 'var r=[];\n';
        function add(line, js) {
            js? code += line.match(regblock) ? line + '\n' : 'r.push(' + line + ');\n' :
                    code += 'r.push("' + line.replace(/"/g, '\\"') + '");\n';        
        }
        while(match = reg.exec(tpl)){
            add(tpl.slice(point, match.index));
            add(match[1], true);
            point = match.index + match[0].length;            
        }
        add(tpl.substr(point, tpl.length - point));
        code += 'return r.join("");';
        return new Function(code.replace(/[\r\t\n]/g, ''));
    }
    function template(tpl, data) {
        if (typeof tpl !== 'string') {
            return '';
        }

        var fn = compile(tpl);

        if (Object.prototype.toString.call(data) !== '[object Object]') {
            return function (data) {
                fn.call(data);
            };
        }

        return fn.call(data);
    }
    var tpl = document.getElementById('tpl').innerHTML;
    console.log(template(tpl, {name: 123}));
}(window));