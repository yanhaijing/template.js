import { parse } from '@templatejs/parser';
import { extendDeep } from '@jsmini/extend';
import esprima from 'esprima';
import { traverse, Syntax } from 'estraverse';

function getIdentifierName(node) {
    return node && node.name;
}

function getAssignmentPatternName(node) {
    if (node.left === Syntax.Identifier) {
        return [getIdentifierName(node.left)];
    }
    if (node.left === Syntax.ArrayPattern) {
        return getArrayPatternName(node.left);
    }
    if (node.left === Syntax.ObjectPattern) {
        return getObjectPatternName(node.left);
    }
}
function getRestElementName(node) {
    if (node.argument.type === Syntax.Identifier) {
        return [getIdentifierName(node.argument)];
    }
    if (node.argument.type === Syntax.ArrayPattern) {
        return [getArrayPatternName(node.argument)];
    }
    if (node.argument.type === Syntax.ObjectPattern) {
        return [getObjectPatternName(node.argument)];
    }
}
function getArrayPatternName(node) {
    return node.elements.reduce((prev, element) => {
        if (element.type === Syntax.Identifier) {
            return prev.concat(getIdentifierName(element));
        }
        if (element.type === Syntax.AssignmentPattern) {
            return prev.concat(getAssignmentPatternName(element));
        }
        if (element.type === Syntax.ArrayPattern) {
            return prev.concat(getArrayPatternName(element));
        }
        if (element.type === Syntax.ObjectPattern) {
            return prev.concat(getObjectPatternName(element));
        }
        if (element.type === Syntax.RestElement) {
            return prev.concat(getRestElementName(element));
        }
    }, []);
}
function getObjectPatternName(node) {
    return node.propreties.reduce((prev, property) => {
        const value = property.value;
        if (value.type === Syntax.Identifier) {
            return prev.concat(getIdentifierName(value));
        }
        if (value.type === Syntax.AssignmentPattern) {
            return prev.concat(getAssignmentPatternName(value));
        }
        if (value.type === Syntax.ArrayPattern) {
            return prev.concat(getArrayPatternName(value));
        }
        if (value.type === Syntax.ObjectPattern) {
            return prev.concat(getObjectPatternName(value));
        }
    }, []);
}
function getVariableDeclaratorName(node) {
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
    return [];
}
function getParamsName(params) {
    return params.reduce((prev, param) => {
        if (param.type === Syntax.Identifier) {
            return prev.concat(getIdentifierName(param));
        }
        if (param.type === Syntax.AssignmentPattern) {
            return prev.concat(getAssignmentPatternName(param));
        }
        if (param.type === Syntax.ArrayPattern) {
            return prev.concat(getArrayPatternName(param));
        }
        if (param.type === Syntax.ObjectPattern) {
            return prev.concat(getObjectPatternName(param));
        }
    }, []);
}
function inContextStack(cs, name) {
    let i = cs.length;
    while(i--) {
        if (cs[i].varList.indexOf(name) !== -1) {
            return true;
        }
    }

    return false;
}
function hasContext(type) {
    return [
        Syntax.ArrowFunctionExpression,
        Syntax.FunctionDeclaration,
        Syntax.FunctionExpression,
        Syntax.ForStatement,
        Syntax.ForInStatement,
        Syntax.ForOfStatement,
        Syntax.BlockStatement,
    ].indexOf(type) !== -1;
}

interface Opt {
    sTag: string,
    eTag: string,
    escape: boolean,
    expression: string,
    compress: boolean,
    tplName: string,
}
const defaultOpt = {
    sTag: '<%',
    eTag: '%>',
    escape: true,
    compress: false,
    expression: 'template',
    tplName: 'unknown.tpl',
};

export function precompile(tpl: string, opt: Opt = defaultOpt): string {
    const code = parse(tpl);

    const { expression, compress, tplName } = extendDeep({}, defaultOpt, opt) as Opt;

    let ast = esprima.parseScript(code)
            
    // hasContext()
    // { type: '', varList: [] }
    let contextStack = [{
        type: 'template',
        varList: ['__code__', '__encodeHTML__', '__modifierMap__'],
    }, {
        type: 'root',
        varList: [],
    }];

    let unVarList = [];

    traverse(ast, {
        enter(node, parent){
            const type = node.type;
            let currentContext = contextStack[contextStack.length - 1];
            if (hasContext(type)) {
                currentContext = {
                    type: type,
                    varList: []
                };
                contextStack.push(currentContext);

                if ([
                    Syntax.ArrowFunctionExpression,
                    Syntax.FunctionDeclaration,
                    Syntax.FunctionExpression
                ].indexOf(type) !== -1) {
                    // 放入函数名字
                    if (node.id) {
                        currentContext.varList.push(getIdentifierName(node.id));
                    }
                    currentContext.varList = currentContext.varList.concat(getParamsName(node.params));
                }
            }
            else if (type === Syntax.VariableDeclarator) {
                currentContext.varList = currentContext.varList.concat(getVariableDeclaratorName(node))
            } else if (type === Syntax.Identifier) {
                // todo check 是否在 context stack
                if (inContextStack(contextStack, node.name)) {
                    return;
                }
                // a.b b return
                if (parent.type === Syntax.MemberExpression && parent.object !== node) {
                    return;
                }

                const name = getIdentifierName(node);
                if (unVarList.indexOf(name) === -1) {
                    unVarList.push(name);
                }
            }
        },
        leave(node, parent){
            if (hasContext(node.type)) {
                contextStack.pop();
            }
        }
    });
  
var source = `
function render(__data__) {
    var __root__ = (typeof self === 'object' && self.self === self && self) ||
        (typeof global === 'object' && global.global === global && global) ||
        this;
    ${unVarList.map(name => `    var ${name} = __data__['${name}'] || __root__['${name}'];`).join('\n')}
    try {
        var __code__ = '';
        var __encodeHTML__ = ${expression}.__encodeHTML;
        ${code}

        return ${compress ? `${expression}.__compress(__code__)`: `__code__`};
    } catch(e) {
        e.name = 'RenderError';
        e.tpl = '${tplName}';
        ${expression}.__handelError(e);
        return 'template.js error';
    }
}`;

    return source;
}