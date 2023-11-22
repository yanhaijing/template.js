import tpl from './demo.tmpl';

const html = tpl({ name: 'yanhaijing' });

document.getElementById('container').innerHTML = html;

console.log(html);
