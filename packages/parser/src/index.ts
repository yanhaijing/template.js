import { extendDeep } from '@jsmini/extend';

export interface ParserOption {
  sTag?: string;
  eTag?: string;
  escape?: boolean;
}

const defaultOpt = { sTag: '<%', eTag: '%>', escape: true };

export function parsehtml(line: string) {
  // 单双引号转义
  line = String(line).replace(/('|")/g, '\\$1');
  const lineList = line.split(/\r\n|\n/);
  let code = '';
  for (var i = 0; i < lineList.length; i++) {
    code +=
      ';__code__ += ("' +
      lineList[i] +
      (i === lineList.length - 1 ? '")\n' : '\\n")\n');
  }
  return code;
}

export function parsejs(line: string, escape = true) {
  line = String(line);
  escape = !!escape;

  //var reg = /^(:?)(.*?)=(.*)$/;
  const reg = /^(?:=|(:.*?)=)(.*)$/;
  let html: string;
  let arr: RegExpExecArray | null;
  let modifier: string;

  // = := :*=
  // :h=123 [':h=123', 'h', '123']
  if ((arr = reg.exec(line))) {
    html = arr[2]; // 输出
    if (arr[1]) {
      // :开头
      modifier = arr[1].slice(1);
    } else {
      // = 开头
      modifier = escape ? 'h' : '';
    }

    return (
      ';__code__ += __modifierMap__["' +
      modifier +
      '"](typeof (' +
      html +
      ') !== "undefined" ? (' +
      html +
      ') : "")\n'
    );
  }

  //原生js
  return ';' + line + '\n';
}

export function parse(tpl: string, opt: ParserOption = defaultOpt): string {
  const { sTag, eTag, escape } = extendDeep(
    {},
    defaultOpt,
    opt,
  ) as Required<ParserOption>;

  tpl = String(tpl);

  let code = '';

  const tokens = tpl.split(sTag);

  for (let i = 0, len = tokens.length; i < len; i++) {
    const token = tokens[i].split(eTag);

    if (token.length === 1) {
      // html
      // <div></div>
      code += parsehtml(token[0]);
    } else {
      // js
      // <%= a%>
      code += parsejs(token[0], escape);
      if (token[1]) {
        // js + html
        // <%if () {%> html <%}%>
        code += parsehtml(token[1]);
      }
    }
  }
  return code;
}
