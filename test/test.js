/**
 * @file 测试文件
 * @author 颜海镜
 * @date 2016年1月20日 21:55:57
 */

var expect = require('expect.js');
var template = require('../template.js');
var t = template;

describe('template.js', function() {
    this.timeout(1000);

    describe('template', function() {
        it('编译', function() {
            expect(typeof t('')).to.equal('function');
        });

        it('简单html', function() {
            var tpl1 = '<div>123</div>';
            expect(t(tpl1, {})).to.equal(tpl1);
        });

        it('输出简单变量', function() {
            var tpl2 = '<div><%=name%></div>';
            expect(t(tpl2, {name: 123})).to.equal('<div>123</div>');
        });

        it('输出html', function() {
            var tpl2 = '<div><%=html%></div>';
            expect(t(tpl2, {html: '<div id="test">'})).to.equal('<div>&lt;div id=&quot;test&quot;&gt;</div>');
            
            var tpl2 = '<div><%:h=html%></div>';
            expect(t(tpl2, {html: '<div id="test">'})).to.equal('<div>&lt;div id=&quot;test&quot;&gt;</div>');
        });

        it('输出变量', function() {
            var tpl3 = '<div><%:=text%></div>';
            expect(t(tpl3, {text: '<div>'})).to.equal('<div><div></div>');
        });

        it('输出url', function() {
            var tpl3 = '<%:u=url%>';
            expect(t(tpl3, {url: 'http://yanhaijing.com?page=颜海镜'})).to.equal('http://yanhaijing.com?page=%E9%A2%9C%E6%B5%B7%E9%95%9C');
        });

        it('自定义变量', function() {
            var tpl = '<%var name = 123;%><%=name%>';
            expect(t(tpl, {})).to.equal('123');
        });

        it('省略结尾分号不会报错', function() {
            var tpl = '<%var a = 1%><%=a%>';
            expect(t(tpl, {})).to.equal('1');
        });

        it('if语句', function() {
            var tpl = '<%if (1) {%>a<%}%>';
            expect(t(tpl, {})).to.equal('a');
        });

        it('for语句', function() {
            var tpl = '<%for(var i = 0; i < 2; i++) {%>a<%}%>';
            expect(t(tpl, {})).to.equal('aa');
        });

        it('while语句', function() {
            var tpl = '<%var a = 3;while(a--) {%>a<%}%>';
            expect(t(tpl, {})).to.equal('aaa');
        });
         
        it('引用空变量返回空字符串', function() {
            var tpl = '<%=a%>';
            expect(t(tpl, {})).to.equal('');
        });
    });

    describe('template.config', function() {
        it('sTag & eTag', function() {
            var tpl = '<#=name%>';
            t.config({sTag: '<#'});
            expect(t(tpl, {name: 123})).to.equal('123');

            var tpl = '<%=name#>';
            t.config({sTag: '<%', eTag: '#>'});
            expect(t(tpl, {name: 123})).to.equal('123');
        });
            
        it('compress', function() {
            var tpl = '<div>  </div>';
            t.config({sTag: '<%', eTag: '%>', compress: true});
            expect(t(tpl, {})).to.equal('<div> </div>');
        });

        it('测试escape', function() {
            var tpl = '<%=html%>';
            t.config({sTag: '<%', eTag: '%>', compress: false, escape: false});
            expect(t(tpl, {html: '<div>'})).to.equal('<div>');
        });
    });

    describe('template modifier&function', function() {
        it('registerModifier', function() {
            t.registerModifier('uc', function (data) {
                return data.toUpperCase();
            });
            var tpl = '<%:uc="yan"%>';
            expect(t(tpl, {})).to.equal('YAN');
        });

        it('registerFunction', function() {
            t.registerFunction('upperCase', function (data) {
                return data.toUpperCase();
            });
            var tpl = '<%=upperCase("yan")%>';
            expect(t(tpl, {})).to.equal('YAN');
        });
    });
});
