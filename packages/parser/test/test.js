/* eslint-disable */
var expect = require('expect.js');

// js 测试源文件
var parsehtml = require('../src/index.ts').parsehtml;
var parsejs = require('../src/index.ts').parsejs;
var parse = require('../src/index.ts').parse;

describe('单元测试', function() {
    this.timeout(1000);

    describe('parsehtml', function() {
        it('param error', function() {
            expect(parsehtml()).to.equal(';__code__ += ("undefined")\n');
        });

        it('normal', function() {
            expect(parsehtml('<div>123</div>')).to.equal(';__code__ += ("<div>123</div>")\n');
            expect(parsehtml('\'"')).to.equal(';__code__ += ("\\\'\\"")\n');
            expect(parsehtml('a\nb')).to.equal(';__code__ += ("a\\n")\n;__code__ += ("b")\n');
        });
    });

    describe('parsejs', function() {
        it('param error', function() {
            expect(parsejs()).to.equal(';undefined\n');
        });

        it('normal', function() {
            expect(parsejs('var a = 1')).to.equal(';var a = 1\n');
            expect(parsejs('=a')).to.equal(';__code__ += __modifierMap__["h"](typeof (a) !== "undefined" ? (a) : "")\n');
            expect(parsejs(':=a')).to.equal(';__code__ += __modifierMap__[""](typeof (a) !== "undefined" ? (a) : "")\n');
            expect(parsejs(':h=a')).to.equal(';__code__ += __modifierMap__["h"](typeof (a) !== "undefined" ? (a) : "")\n');
            expect(parsejs(':u=a')).to.equal(';__code__ += __modifierMap__["u"](typeof (a) !== "undefined" ? (a) : "")\n');
        });
        
        it('escape', function() {
            expect(parsejs('=a', true)).to.equal(';__code__ += __modifierMap__["h"](typeof (a) !== "undefined" ? (a) : "")\n');
            expect(parsejs('=a', false)).to.equal(';__code__ += __modifierMap__[""](typeof (a) !== "undefined" ? (a) : "")\n');
        });
    });

    describe('parse', function() {
        it('param error', function() {
            expect(parse()).to.equal(';__code__ += ("undefined")\n');
            expect(parse(undefined, 213)).to.equal(';__code__ += ("undefined")\n');
        });

        it('normal', function() {
            expect(parse('<div>123</div>')).to.equal(';__code__ += ("<div>123</div>")\n');
            expect(parse('<%=a%>')).to.equal(';__code__ += ("")\n;__code__ += __modifierMap__["h"](typeof (a) !== "undefined" ? (a) : "")\n');
            expect(parse('<%=a%>123')).to.equal(';__code__ += ("")\n;__code__ += __modifierMap__["h"](typeof (a) !== "undefined" ? (a) : "")\n;__code__ += ("123")\n');
        });
        
        it('opt', function() {
            expect(parse('<%=a%>', { sTag: '<%', eTag: '%>'})).to.equal(';__code__ += ("")\n;__code__ += __modifierMap__["h"](typeof (a) !== "undefined" ? (a) : "")\n');
            expect(parse('<%=a%>', { escape: false })).to.equal(';__code__ += ("")\n;__code__ += __modifierMap__[""](typeof (a) !== "undefined" ? (a) : "")\n');
        });
    });
});
