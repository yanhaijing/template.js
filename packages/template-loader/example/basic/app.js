var tpl = require('./demo.tmpl');

var html = tpl({
  a: 5,
  b: 5,
  list: [
    {
      name: '颜海镜',
      html: '<div>div</div>',
      url: 'http://yanhaijing.com?颜海镜',
    },
    {
      name: '颜海镜2',
      html: '<p>这里是段落哦</p>',
      url: 'http://yanhaijing.com?颜海镜',
    },
  ],
});

document.getElementById('test').innerHTML = html;
