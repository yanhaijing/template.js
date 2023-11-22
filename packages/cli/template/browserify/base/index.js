const tpl = require('./demo.tmpl');

class App {
  constructor(container) {
    this.container = container;
    this.data = {
      list: [
        {
          text: '预设待办a',
        },
        {
          text: '预设待办b',
        },
        {
          text: '预设待办c',
        },
      ],
    };
    this.bindEvent();
    this.render();
  }
  bindEvent() {
    const that = this;
    document.body.addEventListener('click', function (e) {
      if (e.target.className.indexOf('add-todo') !== -1) {
        e.preventDefault();
        that.data.list.push({
          text: '增加待办' + parseInt(Math.random() * 100, 10),
        });
        that.render();
      }
    });
  }
  render() {
    document.getElementById('container').innerHTML = tpl(this.data);
  }
}

new App();
