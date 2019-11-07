/* eslint-disable */
var expect = require('expect.js');

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

// js 测试源文件
var runtime = _interopDefault(require('../src/index.ts'));

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
