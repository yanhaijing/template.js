/* eslint-disable */
var expect = require('expect.js');

// js 测试源文件
var runtime = require('../src/index.ts').default;
console.log(runtime)
describe('单元测试', function() {
    this.timeout(1000);

    describe('encodeHTML', function() {
        it('相等', function() {
            expect(runtime.encodeHTML('&')).to.equal('&amp;');
            expect(runtime.encodeHTML('<')).to.equal('&lt;');
            expect(runtime.encodeHTML('>')).to.equal('&gt;');
            expect(runtime.encodeHTML('\\')).to.equal('&#92;');
            expect(runtime.encodeHTML('"')).to.equal('&quot;');
            expect(runtime.encodeHTML('\'')).to.equal('&#39;');
        });
    });
});
