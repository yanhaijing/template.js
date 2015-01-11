var t = template;

module('template.js');
QUnit.test( "template", function( assert ) {
    assert.ok(typeof t('') === 'function', '编译');

    var tpl1 = '<div>123</div>';
    assert.ok(t(tpl1, {}) === tpl1, "简单html");

    var tpl2 = '<div><%=name%></div>';
    assert.ok(t(tpl2, {name: 123}) === '<div>123</div>', '输出简答变量');
    var tpl2 = '<div><%=html%></div>';
    assert.ok(t(tpl2, {html: '<div id="test">'}) === '<div>&lt;div id=&quot;test&quot;&gt;</div>', '输出html');

    var tpl3 = '<div><%:=text%></div>';
    assert.ok(t(tpl3, {text: '<div>'}) === '<div><div></div>', '输出变量');

    var tpl3 = '<%:u=url%>';
    assert.ok(t(tpl3, {url: 'http://yanhaijing.com?page=颜海镜'}) === 'http://yanhaijing.com?page=%E9%A2%9C%E6%B5%B7%E9%95%9C', '输出url');

    var tpl = '<%var name = 123;%><%=name%>';
    console.log(t(tpl, {}));
    assert.ok(t(tpl, {}) === '123', '自定义变量');

    var tpl = '<%for(var i = 0; i < 2; i++) {%>a<%}%>';
    assert.ok(t(tpl, {}) === 'aa', 'for语句');

    var tpl = '<%if (1) {%>a<%}%>';
    assert.ok(t(tpl, {}) === 'a', 'if语句');

    var tpl = '<%var a = 3;while(a--) {%>a<%}%>';
    assert.ok(t(tpl, {}) === 'aaa', 'while语句');
});

QUnit.test( "template.config", function( assert ) {
    var tpl = '<#=name%>';
    t.config({sTag: '<#'});
    assert.ok(t(tpl, {name: 123}) === '123', 'sTag');

    var tpl = '<%=name#>';
    t.config({sTag: '<%', eTag: '#>'});
    assert.ok(t(tpl, {name: 123}) === '123', 'eTag');

    var tpl = '<div> </div>';
    t.config({sTag: '<%', eTag: '%>', compress: true});
    assert.ok(t(tpl, {}) === '<div></div>', 'compress');
});