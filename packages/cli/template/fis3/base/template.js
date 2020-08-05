/*!
 * @templatejs/runtime 0.1.0 (https://github.com/yanhaijing/runtime)
 * API https://github.com/yanhaijing/runtime/blob/master/doc/api.md
 * Copyright 2017-2019 yanhaijing. All Rights Reserved
 * Licensed under MIT (https://github.com/yanhaijing/runtime/blob/master/LICENSE)
 */

(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global.template = factory());
  }(this, (function () { 'use strict';
  
    /*!
     * @jsmini/type 0.9.2 (https://github.com/jsmini/type)
     * API https://github.com/jsmini/type/blob/master/doc/api.md
     * Copyright 2017-2019 jsmini. All Rights Reserved
     * Licensed under MIT (https://github.com/jsmini/type/blob/master/LICENSE)
     */
  
    function _typeof(obj) {
      if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
        _typeof = function (obj) {
          return typeof obj;
        };
      } else {
        _typeof = function (obj) {
          return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
        };
      }
  
      return _typeof(obj);
    }
  
    var toString = Object.prototype.toString;
    function type(x) {
      var strict = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      strict = !!strict; // fix typeof null = object
  
      if (x === null) {
        return 'null';
      }
  
      var t = _typeof(x); // 严格模式 区分NaN和number
  
  
      if (strict && t === 'number' && isNaN(x)) {
        return 'nan';
      } // number string boolean undefined symbol
  
  
      if (t !== 'object') {
        return t;
      }
  
      var cls;
      var clsLow;
  
      try {
        cls = toString.call(x).slice(8, -1);
        clsLow = cls.toLowerCase();
      } catch (e) {
        // ie下的 activex对象
        return 'object';
      }
  
      if (clsLow !== 'object') {
        if (strict) {
          // 区分NaN和new Number
          if (clsLow === 'number' && isNaN(x)) {
            return 'NaN';
          } // 区分 String() 和 new String()
  
  
          if (clsLow === 'number' || clsLow === 'boolean' || clsLow === 'string') {
            return cls;
          }
        }
  
        return clsLow;
      }
  
      if (x.constructor == Object) {
        return clsLow;
      } // Object.create(null)
  
  
      try {
        // __proto__ 部分早期firefox浏览器
        if (Object.getPrototypeOf(x) === null || x.__proto__ === null) {
          return 'object';
        }
      } catch (e) {} // ie下无Object.getPrototypeOf会报错
      // function A() {}; new A
  
  
      try {
        var cname = x.constructor.name;
  
        if (typeof cname === 'string') {
          return cname;
        }
      } catch (e) {} // 无constructor
      // function A() {}; A.prototype.constructor = null; new A
  
  
      return 'unknown';
    }
  
    /*!
     * @jsmini/is 0.8.5 (https://github.com/jsmini/is)
     * API https://github.com/jsmini/is/blob/master/doc/api.md
     * Copyright 2017-2019 jsmini. All Rights Reserved
     * Licensed under MIT (https://github.com/jsmini/is/blob/master/LICENSE)
     */
    function isObject(x) {
      return type(x) === 'object';
    }
    function isFunction(x) {
      return type(x) === 'function';
    }
    var isArray = isFunction(Array.isArray) ? Array.isArray : function isArray(x) {
      return type(x) === 'array';
    };
  
    /*!
     * @jsmini/extend 0.3.3 (https://github.com/jsmini/extend)
     * API https://github.com/jsmini/extend/blob/master/doc/api.md
     * Copyright 2017-2019 jsmini. All Rights Reserved
     * Licensed under MIT (https://github.com/jsmini/extend/blob/master/LICENSE)
     */
  
    function hasOwnProp(obj, key) {
      return Object.prototype.hasOwnProperty.call(obj, key);
    }
  
    var assign = isFunction(Object.assign) ? Object.assign : function assign(target) {
      if (!isObject(target)) {
        throw new TypeError('assign first param must is object');
      }
  
      for (var i = 0; i < (arguments.length <= 1 ? 0 : arguments.length - 1); i++) {
        var source = i + 1 < 1 || arguments.length <= i + 1 ? undefined : arguments[i + 1];
  
        if (isObject(source)) {
          for (var key in source) {
            if (hasOwnProp(source, key)) {
              target[key] = source[key];
            }
          }
        }
      }
  
      return target;
    };
    function extend() {
      return assign.apply(void 0, arguments);
    }
  
    var o = {
        sTag: '<%',
        eTag: '%>',
        compress: false,
        escape: true,
        error: function () { } //错误回调
    };
    function clone() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return extend.apply(null, [{}].concat(args));
    }
    function nothing(param) {
        return param;
    }
    function encodeHTML(source) {
        return String(source)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/\\/g, '&#92;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }
    var functionMap = {}; //内部函数对象
    //修饰器前缀
    var modifierMap = {
        '': function (param) { return nothing(param); },
        'h': function (param) { return encodeHTML(param); },
        'u': function (param) { return encodeURI(param); }
    };
    function consoleAdapter(cmd, msg) {
        typeof console !== 'undefined' && console[cmd] && console[cmd](msg);
    }
    function runtime() { }
    runtime.config = function (option) {
        if (type(option) === 'object') {
            o = extend(o, option);
        }
        return clone(o);
    };
    runtime.compress = function (html) {
        return String(html).replace(/\s+/g, ' ').replace(/<!--[\w\W]*?-->/g, '');
    };
    runtime.handelError = function handelError(e) {
        var message = 'template.js error\n\n';
        for (var key in e) {
            message += '<' + key + '>\n' + e[key] + '\n\n';
        }
        message += '<message>\n' + e.message + '\n\n';
        consoleAdapter('error', message);
        o.error(e);
        function error() {
            return 'template.js error';
        }
        error.toString = function () {
            return '__code__ = "template.js error"';
        };
        return error;
    };
    runtime.registerFunction = function (name, fn) {
        if (typeof name !== 'string') {
            return clone(functionMap);
        }
        if (type(fn) !== 'function') {
            return functionMap[name];
        }
        return functionMap[name] = fn;
    };
    runtime.unregisterFunction = function (name) {
        if (typeof name !== 'string') {
            return false;
        }
        delete functionMap[name];
        return true;
    };
    runtime.registerModifier = function (name, fn) {
        if (typeof name !== 'string') {
            return clone(modifierMap);
        }
        if (type(fn) !== 'function') {
            return modifierMap[name];
        }
        return modifierMap[name] = fn;
    };
    runtime.unregisterModifier = function (name) {
        if (typeof name !== 'string') {
            return false;
        }
        delete modifierMap[name];
        return true;
    };
    runtime.encodeHTML = encodeHTML;
    runtime.functionMap = functionMap;
    runtime.modifierMap = modifierMap;
    runtime.o = o;
  
    return runtime;
  
  })));
  