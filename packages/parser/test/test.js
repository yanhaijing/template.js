/* eslint-disable */
var expect = require('expect.js');

// js 测试源文件
var parsehtml = require('../src/index.ts').parsehtml;
var parsejs = require('../src/index.ts').parsejs;
var parse = require('../src/index.ts').parse;

function html2text(html) {
    return ';__code__ += ("' + html + '")\n';
}

function out2text(out, modifier) {
    return ';__code__ += __modifierMap__["' + modifier + '"](typeof (' + out + ') !== "undefined" ? (' + out + ') : "")\n';
}

describe('单元测试', function() {
    this.timeout(1000);

    describe('parsehtml', function() {
        it('param error', function() {
            expect(parsehtml()).to.equal(html2text('undefined'));
        });

        it('normal', function() {
            expect(parsehtml('<div>123</div>')).to.equal(html2text('<div>123</div>'));
            expect(parsehtml('\'"')).to.equal(html2text('\\\'\\"'));
            expect(parsehtml('a\nb')).to.equal(';__code__ += ("a\\n")\n;__code__ += ("b")\n');
        });

        it('line feed', function() {
            expect(parsehtml('123\n123')).to.equal(';__code__ += ("123\\n")\n;__code__ += ("123")\n');
            expect(parsehtml('123\r\n123')).to.equal(';__code__ += ("123\\n")\n;__code__ += ("123")\n');
        });
    });

    describe('parsejs', function() {
        it('param error', function() {
            expect(parsejs()).to.equal(';undefined\n');
        });

        it('normal', function() {
            expect(parsejs('var a = 1')).to.equal(';var a = 1\n');
            expect(parsejs('=a')).to.equal(out2text('a', 'h'));
            expect(parsejs(':=a')).to.equal(out2text('a', ''));
            expect(parsejs(':h=a')).to.equal(out2text('a', 'h'));
            expect(parsejs(':u=a')).to.equal(out2text('a', 'u'));
        });
        
        it('escape', function() {
            expect(parsejs('=a', true)).to.equal(out2text('a', 'h'));
            expect(parsejs('=a', false)).to.equal(out2text('a', ''));
        });
    });

    describe('parse', function() {
        it('param error', function() {
            expect(parse()).to.equal(html2text('undefined'));
            expect(parse(undefined, 213)).to.equal(html2text('undefined'));
        });

        it('normal', function() {
            expect(parse('<div>123</div>')).to.equal(html2text('<div>123</div>'));
            expect(parse('<%=a%>')).to.equal(html2text('') + out2text('a', 'h'));
            expect(parse('<%=a%>123')).to.equal(html2text('') + out2text('a', 'h') + html2text('123'));
        });
        
        it('opt', function() {
            expect(parse('<%=a%>', { sTag: '<%', eTag: '%>'})).to.equal(html2text('') + out2text('a', 'h'));
            expect(parse('<%=a%>', { escape: false })).to.equal(html2text('') + out2text('a', ''));
        });
    });
});
