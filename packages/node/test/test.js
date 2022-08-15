var expect = require('expect.js');

// ts 测试编译后文件
var base = require('../src/index.ts');

describe('单元测试', function() {
    this.timeout(1000);

    describe('功能1', function() {
        it('相等', function() {
            expect(base.name).to.equal('base');
        });
    });

    describe('功能2', function() {
        it('不相等', function() {
            expect(base.name).not.to.equal(1);
        });
    });
});
