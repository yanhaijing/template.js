/**
 * node环境demo
 */
var template = require('../../template.js');
var tpl = '<div><%=name%></div>';

console.log(template(tpl, {name: 'yanhaijing'}));
