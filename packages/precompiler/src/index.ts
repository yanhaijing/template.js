/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { parse, ParserOption } from '@templatejs/parser';
import { extendDeep } from '@jsmini/extend';
import { parseScript, Syntax } from 'esprima';
import { traverse } from 'estraverse';
import * as ESTree from 'estree';

function getIdentifierName(node: ESTree.Identifier): string {
  return node && node.name;
}
function getAssignmentPatternName(
  node: ESTree.AssignmentPattern,
): string[] | undefined {
  if (node.left.type === Syntax.Identifier) {
    return [getIdentifierName(node.left)];
  }
  if (node.left.type === Syntax.ArrayPattern) {
    return getArrayPatternName(node.left);
  }
  if (node.left.type === Syntax.ObjectPattern) {
    return getObjectPatternName(node.left);
  }
}
function getRestElementName(node: ESTree.RestElement): string[] | undefined {
  if (node.argument.type === Syntax.Identifier) {
    return [getIdentifierName(node.argument)];
  }
  if (node.argument.type === Syntax.ArrayPattern) {
    return getArrayPatternName(node.argument);
  }
  if (node.argument.type === Syntax.ObjectPattern) {
    return getObjectPatternName(node.argument);
  }
}
function getArrayPatternName(node: ESTree.ArrayPattern): string[] {
  return node.elements.reduce((prev, element): string[] => {
    if (element.type === Syntax.Identifier) {
      return prev.concat(getIdentifierName(element));
    }
    if (element.type === Syntax.AssignmentPattern) {
      return prev.concat(getAssignmentPatternName(element) ?? []);
    }
    if (element.type === Syntax.ArrayPattern) {
      return prev.concat(getArrayPatternName(element));
    }
    if (element.type === Syntax.ObjectPattern) {
      return prev.concat(getObjectPatternName(element));
    }
    if (element.type === Syntax.RestElement) {
      return prev.concat(getRestElementName(element) ?? []);
    }
    return prev;
  }, [] as string[]);
}
function getObjectPatternName(node: ESTree.ObjectPattern): string[] {
  return node.properties.reduce((prev, property): string[] => {
    const value = property.value;
    if (value.type === Syntax.Identifier) {
      return prev.concat(getIdentifierName(value));
    }
    if (value.type === Syntax.AssignmentPattern) {
      return prev.concat(getAssignmentPatternName(value) ?? []);
    }
    if (value.type === Syntax.ArrayPattern) {
      return prev.concat(getArrayPatternName(value));
    }
    if (value.type === Syntax.ObjectPattern) {
      return prev.concat(getObjectPatternName(value));
    }
    return prev;
  }, [] as string[]);
}
function getVariableDeclaratorName(node: ESTree.VariableDeclarator): string[] {
  const id = node.id;

  if (id.type === Syntax.Identifier) {
    return [getIdentifierName(id)];
  }
  if (id.type === Syntax.ArrayPattern) {
    return getArrayPatternName(id);
  }
  if (id.type === Syntax.ObjectPattern) {
    return getObjectPatternName(id);
  }
  /* istanbul ignore next */
  return [];
}
function getParamsName(params: ESTree.Pattern[]): string[] {
  return params.reduce((prev, param): string[] => {
    if (param.type === Syntax.Identifier) {
      return prev.concat(getIdentifierName(param));
    }
    if (param.type === Syntax.AssignmentPattern) {
      return prev.concat(getAssignmentPatternName(param) ?? []);
    }
    if (param.type === Syntax.ArrayPattern) {
      return prev.concat(getArrayPatternName(param));
    }
    if (param.type === Syntax.ObjectPattern) {
      return prev.concat(getObjectPatternName(param));
    }
    if (param.type === Syntax.RestElement) {
      return prev.concat(getRestElementName(param) ?? []);
    }
    return prev;
  }, [] as string[]);
}
function inContextStack(
  cs: { type: string; varList: string[] }[],
  name: string,
) {
  let i = cs.length;
  while (i--) {
    if (cs[i].varList.indexOf(name) !== -1) {
      return true;
    }
  }

  return false;
}
function hasContext(type: any) {
  return (
    [
      Syntax.ArrowFunctionExpression,
      Syntax.FunctionDeclaration,
      Syntax.FunctionExpression,
      Syntax.ForStatement,
      Syntax.ForInStatement,
      Syntax.ForOfStatement,
      Syntax.BlockStatement,
    ].indexOf(type) !== -1
  );
}

export interface PrecompileOption extends ParserOption {
  expression?: string;
  compress?: boolean;
  tplName?: string;
  sandbox?: boolean;
}

const defaultOpt = {
  compress: false,
  expression: 'template',
  tplName: 'unknown.tpl',
  sandbox: false,
};

export function detectVar(code: string) {
  const ast = parseScript(code);

  // hasContext()
  // { type: '', varList: [] }
  const contextStack = [
    {
      type: 'template',
      varList: ['__code__', '__encodeHTML__', '__modifierMap__', '__runtime__'],
    },
    {
      type: 'root',
      varList: [],
    },
  ];

  const unVarList: string[] = [];

  traverse(ast, {
    enter(node, parent) {
      const type = node.type;
      let currentContext = contextStack[contextStack.length - 1];
      if (hasContext(type)) {
        currentContext = {
          type: type,
          varList: [],
        };
        contextStack.push(currentContext);

        if (
          [
            Syntax.ArrowFunctionExpression,
            Syntax.FunctionDeclaration,
            Syntax.FunctionExpression,
          ].indexOf(type as any) !== -1
        ) {
          // 放入函数名字
          // @ts-ignore
          if (node.id) {
            // @ts-ignore
            currentContext.varList.push(getIdentifierName(node.id));
          }
          // @ts-ignore
          currentContext.varList = currentContext.varList.concat(
            getParamsName((node as ESTree.Function).params),
          );
        }
      } else if (type === Syntax.VariableDeclarator) {
        currentContext.varList = currentContext.varList.concat(
          getVariableDeclaratorName(node),
        );
      } else if (type === Syntax.Identifier) {
        // todo check 是否在 context stack
        // @ts-ignore
        if (inContextStack(contextStack, node.name)) {
          return;
        }
        // a.b b return
        if (
          parent?.type === Syntax.MemberExpression &&
          parent.object !== node
        ) {
          return;
        }

        const name = getIdentifierName(node);
        if (unVarList.indexOf(name) === -1) {
          unVarList.push(name);
        }
      }
    },
    leave(node) {
      if (hasContext(node.type)) {
        contextStack.pop();
      }
    },
  });

  return unVarList;
}

export function generateVarCode(nameList: string[], sandbox: boolean): string {
  function genExpression(objStr: string, keyStr: string) {
    return `__hasOwnProp__.call(${objStr}, '${keyStr}') ? ${objStr}['${keyStr}']`;
  }
  if (sandbox) {
    return nameList
      .map(
        (name) =>
          `    var ${name} = ${genExpression(
            '__data__',
            name,
          )} : ${genExpression('__runtime__.functionMap', name)} : undefined;`,
      )
      .join('\n');
  }

  return nameList
    .map(
      (name) =>
        `    var ${name} = ${genExpression('__data__', name)} : ${genExpression(
          '__runtime__.functionMap',
          name,
        )} : ${genExpression('__root__', name)} : undefined;`,
    )
    .join('\n');
}
/* istanbul ignore next */
export function precompile(
  tpl: string,
  opt: PrecompileOption = defaultOpt,
): string {
  const code = parse(tpl, opt);

  const { expression, compress, tplName, sandbox } = extendDeep(
    {},
    defaultOpt,
    opt,
  ) as Required<PrecompileOption>;

  const unVarList = detectVar(code);

  /* eslint-disable indent, @typescript-eslint/indent */
  const source = `
function render(__data__) {
    var __runtime__ = ${expression};
    var __root__ = (typeof self === 'object' && self.self === self && self) ||
        (typeof global === 'object' && global.global === global && global) ||
        this;
    var __hasOwnProp__ = ({}).hasOwnProperty;

    ${generateVarCode(unVarList, sandbox)}
    
    try {
        var __code__ = '';
        var __modifierMap__ = __runtime__.modifierMap;

        ${code}

        return ${compress ? '__runtime__.compress(__code__)' : '__code__'};
    } catch(e) {
        e.name = 'RenderError';
        e.tpl = '${tplName}';
        __runtime__.handelError(e);
        return 'template.js error';
    }
}`;

  return source;
}
