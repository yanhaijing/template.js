/* eslint-disable */
var expect = require('expect.js');

// js 测试源文件
var detectVar = require('../src/index.ts').detectVar;

describe('单元测试', function() {
    this.timeout(1000);

    describe('detectVar', function() {
        it('内置变量', function() {
            expect(detectVar('console.log(__code__, __encodeHTML__, __modifierMap__, __runtime__)'))
            .to.eql(['console']);
        });
        
        it('变量探测', function() {
            expect(detectVar('console.log(yan1, yan2, yan3)')).to.eql(['console', 'yan1', 'yan2', 'yan3']);
        });
        
        it('变量声明', function() {
            expect(detectVar('var a1 = 1; console.log(a1, a2)')).to.eql(['console', 'a2']);

            expect(detectVar('var [a1] = 1; console.log(a1, a2)')).to.eql(['console', 'a2']);
            expect(detectVar('var [a1 = 1] = 1; console.log(a1, a2)')).to.eql(['console', 'a2']);
            expect(detectVar('var [[a1]] = 1; console.log(a1, a2)')).to.eql(['console', 'a2']);
            expect(detectVar('var [...a1] = 1; console.log(a1, a2)')).to.eql(['console', 'a2']);
            expect(detectVar('var [{a1}] = 1; console.log(a1, a2)')).to.eql(['console', 'a2']);

            expect(detectVar('var {a1} = 1; console.log(a1, a2)')).to.eql(['console', 'a2']);
            expect(detectVar('var {a1 = 1} = 1; console.log(a1, a3)')).to.eql(['console', 'a3']);
            // todo fix
            expect(detectVar('var {a2: a1} = 1; console.log(a1, a3)')).to.eql(['a2', 'console', 'a3']);
            expect(detectVar('var {a2: {a1}} = 1; console.log(a1, a3)')).to.eql(['a2', 'console', 'a3']);
            expect(detectVar('var {a2: [a1]} = 1; console.log(a1, a3)')).to.eql(['a2', 'console', 'a3']);
        });
        
        it('块作用域', function() {
            // block
            expect(detectVar('var a1 = 1; { console.log(a1) }')).to.eql(['console']);

            // for
            expect(detectVar('for (let i = 0; ;) { console.log(i) }')).to.eql(['console']);

            // for in
            expect(detectVar('for (let i in obj) { console.log(i) }')).to.eql(['obj', 'console']);
            
            // for of
            expect(detectVar('for (let i of obj) { console.log(i) }')).to.eql(['obj', 'console']);
        });
        
        it('函数作用域', function() {
            // function
            expect(detectVar('function f1(a1) { console.log(a1, f1)}')).to.eql(['console']);
            expect(detectVar('function f1([a1]) { console.log(a1, f1)}')).to.eql(['console']);
            expect(detectVar('function f1({a1}) { console.log(a1, f1)}')).to.eql(['console']);
            expect(detectVar('function f1(a1 = 1) { console.log(a1, f1)}')).to.eql(['console']);
            expect(detectVar('function f1([a1] = 1) { console.log(a1, f1)}')).to.eql(['console']);
            expect(detectVar('function f1({a1} = 1) { console.log(a1, f1)}')).to.eql(['console']);
            expect(detectVar('function f1(...a1) { console.log(a1, f1)}')).to.eql(['console']);
            expect(detectVar('function f1(...[a1]) { console.log(a1, f1)}')).to.eql(['console']);
            expect(detectVar('function f1(...{a1}) { console.log(a1, f1)}')).to.eql(['console']);

            // function expression
            expect(detectVar('const f1 = function f1(a1) { console.log(a1, f1)}')).to.eql(['console']);

            // arrow function
            expect(detectVar('const f1 = (a1) => { console.log(a1, f1)}')).to.eql(['console']);
        });
    });
});
