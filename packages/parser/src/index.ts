import { extendDeep } from '@jsmini/extend';

interface Opt {
    sTag: string,
    eTag: string,
    escape: boolean,
}
const defaultOpt = { sTag: '<%', eTag: '%>', escape: true};

export function parse(tpl: string, opt: Opt = defaultOpt): string {
    const { sTag, eTag, escape } = extendDeep({}, defaultOpt, opt) as Opt;

    tpl = String(tpl);

    let code = '';

    function parsehtml(line) {
        // 单双引号转义，换行符替换为空格
        line = line.replace(/('|")/g, '\\$1');
        const lineList = line.split('\n');
        let code = '';
        for (var i = 0; i < lineList.length; i++) {
            code += ';__code__ += ("' + lineList[i] + (i === lineList.length - 1 ? '")\n' : '\\n")\n');
        }
        return code;
    }
    function parsejs(line) {              
        //var reg = /^(:?)(.*?)=(.*)$/;
        var reg = /^(?:=|(:.*?)=)(.*)$/
        var html;
        var arr;
        var modifier;

        // = := :*=
        // :h=123 [':h=123', 'h', '123']
        if (arr = reg.exec(line)) {
            html = arr[2]; // 输出
            if (Boolean(arr[1])) {
                // :开头
                modifier = arr[1].slice(1);
            } else {
                // = 开头
                modifier = escape ? 'h' : '';
            }

            return ';__code__ += __modifierMap__["' + modifier + '"](typeof (' + html + ') !== "undefined" ? (' + html + ') : "")\n';
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
            code += parsejs(token[0]);
            if (token[1]) {
                code += parsehtml(token[1]);
            }
        }
    }
    return code;
}