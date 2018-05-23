webpackJsonp([0],{

/***/ 0:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_router__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__core_request__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__core_event__ = __webpack_require__(119);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils_settings__ = __webpack_require__(140);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__utils_event_names__ = __webpack_require__(139);
// app.js






App({
  router: {
    type: Object
  },
  request: new __WEBPACK_IMPORTED_MODULE_1__core_request__["a" /* default */](),
  event: new __WEBPACK_IMPORTED_MODULE_2__core_event__["a" /* default */](),
  settings: new __WEBPACK_IMPORTED_MODULE_3__utils_settings__["a" /* default */](),
  eventNames: new __WEBPACK_IMPORTED_MODULE_4__utils_event_names__["a" /* default */](),

  Pages: ['pages/index/index', 'pages/xml2can/xml2can'],

  onLaunch: function onLaunch() {
    this.router = new __WEBPACK_IMPORTED_MODULE_0__core_router__["a" /* default */](this.Pages, '');
  }

});

/***/ }),

/***/ 105:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__plugins_es6_promise__ = __webpack_require__(112);



/**
 * 网络请求类
 */


var Request = function () {
  function Request() {
    __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default()(this, Request);

    this.TIMEOUT = 60000;
  }
  // 微信请求的默认超时时间


  __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default()(Request, [{
    key: '_fetchCookie',


    // 取出 Cookie 中 kSeesionId 并保存
    value: function _fetchCookie(response) {
      var cookie = '';
      if ('Set-Cookie' in response.header) {
        cookie = response.header['Set-Cookie'];
      } else if ('set-cookie' in response.header) {
        cookie = response.header['set-cookie'];
      }
      return cookie;
    }
  }, {
    key: '_sliceHeader',
    value: function _sliceHeader(cookie, key) {
      var regex = new RegExp(key + '=((\\w)+);');
      var results = regex.exec(cookie);
      if (results && results[1]) {
        return results[1];
      }
      return null;
    }

    // 取出 Cookie 中 kSeesionId 并保存

  }, {
    key: '_saveKSessionId',
    value: function _saveKSessionId(response) {
      var cookie = this._fetchCookie(response);
      var tmpKSessionId = this._sliceHeader(cookie, 'KSESSIONID');
      if (tmpKSessionId) {
        getApp().sessionData.minaCookie.kSessionId = tmpKSessionId;
      }
      var qhdi = this._sliceHeader(cookie, 'qhdi');
      if (qhdi) {
        getApp().sessionData.minaCookie.qhdi = qhdi;
      }
      var qhssokey = this._sliceHeader(cookie, 'qhssokey');
      if (qhssokey) {
        getApp().sessionData.minaCookie.qhssokey = qhssokey;
      }
      var qhssokeyid = this._sliceHeader(cookie, 'qhssokeyid');
      if (qhssokeyid) {
        getApp().sessionData.minaCookie.qhssokeyid = qhssokeyid;
      }
      var qhssokeycheck = this._sliceHeader(cookie, 'qhssokeycheck');
      if (qhssokeycheck) {
        getApp().sessionData.minaCookie.qhssokeycheck = qhssokeycheck;
      }
      wx.setStorage({
        key: 'minaCookie',
        data: getApp().sessionData.minaCookie
      });
    }
  }, {
    key: '_request',
    value: function _request(method, path, data, header) {
      var _this = this;

      var server = getApp().settings.SERVER_ADDRESS;
      var userAgent = getApp().settings.MP_USER_AGENT;
      var minaCookieString = '';
      if (getApp().sessionData.minaCookie) {
        if (getApp().sessionData.minaCookie.kSessionId) {
          minaCookieString += 'KSESSIONID=' + getApp().sessionData.minaCookie.kSessionId + ';';
        }
        if (getApp().sessionData.minaCookie.qhdi) {
          minaCookieString += 'qhdi=' + getApp().sessionData.minaCookie.qhdi + ';';
        }
        if (getApp().sessionData.minaCookie.qhssokey) {
          minaCookieString += 'qhssokey=' + getApp().sessionData.minaCookie.qhssokey + ';';
        }
        if (getApp().sessionData.minaCookie.qhssokeyid) {
          minaCookieString += 'qhssokeyid=' + getApp().sessionData.minaCookie.qhssokeyid + ';';
        }
        if (getApp().sessionData.minaCookie.qhssokeycheck) {
          minaCookieString += 'qhssokeycheck=' + getApp().sessionData.minaCookie.qhssokeycheck + ';';
        }
      }
      return new __WEBPACK_IMPORTED_MODULE_3__plugins_es6_promise__["default"](function (resolve, reject) {
        wx.request({
          url: server + path,
          method: method,
          data: data,
          header: __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({
            'content-type': 'application/json',
            APIVERS: 'com.qunhe.instdeco.service.tob-xiaoyi',
            Cookie: minaCookieString,
            'MP-User-Agent': userAgent
          }, header),
          success: function success(response) {
            console.log(path + ' >> ');
            console.log(response);
            if (response.statusCode === 200) {
              _this._saveKSessionId(response);
              var result = response.data;

              if (result.hasOwnProperty('c')) {
                if (result.c === '0') {
                  if ('d' in result) {
                    resolve(result.d);
                  } else {
                    resolve({});
                  }
                } else {
                  reject(result.c, result.m);
                }
              } else {
                resolve(result);
              }
            } else if (response.statusCode === 401) {
              // 登录过期，清除本地登录信息
              console.log('401 logout');
              getApp().showToast('登录过期，请重新登录');
              getApp().logout();
              reject(response.statusCode);
            } else {
              reject(response.statusCode);
            }
          },
          fail: function fail() {
            reject(new Error('请求失败'));
          }
        });
      });
    }
  }, {
    key: 'get',
    value: function get(path) {
      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var header = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      return this._request('GET', path, data, header);
    }
  }, {
    key: 'post',
    value: function post(path) {
      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var header = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      return this._request('POST', path, data, header);
    }
  }, {
    key: 'delete',
    value: function _delete(path) {
      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var header = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      return this._request('DELETE', path, data, header);
    }
  }, {
    key: 'put',
    value: function put(path) {
      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var header = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      return this._request('PUT', path, data, header);
    }
  }]);

  return Request;
}();

/* harmony default export */ __webpack_exports__["a"] = (Request);

/***/ }),

/***/ 112:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process, global, module) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_typeof__ = __webpack_require__(13);

!function (t, e) {
  "object" == (typeof exports === "undefined" ? "undefined" : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_typeof__["default"])(exports)) && "undefined" != typeof module ? module.exports = e() : "function" == typeof define && __webpack_require__(113) ? define(e) : t.ES6Promise = e();
}(this, function () {
  "use strict";
  function t(t) {
    var e = typeof t === "undefined" ? "undefined" : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_typeof__["default"])(t);return null !== t && ("object" === e || "function" === e);
  }function e(t) {
    return "function" == typeof t;
  }function n(t) {
    B = t;
  }function r(t) {
    G = t;
  }function o() {
    return function () {
      return process.nextTick(a);
    };
  }function i() {
    return "undefined" != typeof z ? function () {
      z(a);
    } : c();
  }function s() {
    var t = 0,
        e = new J(a),
        n = document.createTextNode("");return e.observe(n, { characterData: !0 }), function () {
      n.data = t = ++t % 2;
    };
  }function u() {
    var t = new MessageChannel();return t.port1.onmessage = a, function () {
      return t.port2.postMessage(0);
    };
  }function c() {
    var t = setTimeout;return function () {
      return t(a, 1);
    };
  }function a() {
    for (var t = 0; t < W; t += 2) {
      var e = V[t],
          n = V[t + 1];e(n), V[t] = void 0, V[t + 1] = void 0;
    }W = 0;
  }function f() {
    try {
      var t = Function("return this")().require("vertx");return z = t.runOnLoop || t.runOnContext, i();
    } catch (e) {
      return c();
    }
  }function l(t, e) {
    var n = this,
        r = new this.constructor(p);void 0 === r[Z] && O(r);var o = n._state;if (o) {
      var i = arguments[o - 1];G(function () {
        return P(o, r, i, n._result);
      });
    } else E(n, r, t, e);return r;
  }function h(t) {
    var e = this;if (t && "object" == (typeof t === "undefined" ? "undefined" : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_typeof__["default"])(t)) && t.constructor === e) return t;var n = new e(p);return g(n, t), n;
  }function p() {}function v() {
    return new TypeError("You cannot resolve a promise with itself");
  }function d() {
    return new TypeError("A promises callback cannot return that same promise.");
  }function _(t) {
    try {
      return t.then;
    } catch (e) {
      return nt.error = e, nt;
    }
  }function y(t, e, n, r) {
    try {
      t.call(e, n, r);
    } catch (o) {
      return o;
    }
  }function m(t, e, n) {
    G(function (t) {
      var r = !1,
          o = y(n, e, function (n) {
        r || (r = !0, e !== n ? g(t, n) : S(t, n));
      }, function (e) {
        r || (r = !0, j(t, e));
      }, "Settle: " + (t._label || " unknown promise"));!r && o && (r = !0, j(t, o));
    }, t);
  }function b(t, e) {
    e._state === tt ? S(t, e._result) : e._state === et ? j(t, e._result) : E(e, void 0, function (e) {
      return g(t, e);
    }, function (e) {
      return j(t, e);
    });
  }function w(t, n, r) {
    n.constructor === t.constructor && r === l && n.constructor.resolve === h ? b(t, n) : r === nt ? (j(t, nt.error), nt.error = null) : void 0 === r ? S(t, n) : e(r) ? m(t, n, r) : S(t, n);
  }function g(e, n) {
    e === n ? j(e, v()) : t(n) ? w(e, n, _(n)) : S(e, n);
  }function A(t) {
    t._onerror && t._onerror(t._result), T(t);
  }function S(t, e) {
    t._state === $ && (t._result = e, t._state = tt, 0 !== t._subscribers.length && G(T, t));
  }function j(t, e) {
    t._state === $ && (t._state = et, t._result = e, G(A, t));
  }function E(t, e, n, r) {
    var o = t._subscribers,
        i = o.length;t._onerror = null, o[i] = e, o[i + tt] = n, o[i + et] = r, 0 === i && t._state && G(T, t);
  }function T(t) {
    var e = t._subscribers,
        n = t._state;if (0 !== e.length) {
      for (var r = void 0, o = void 0, i = t._result, s = 0; s < e.length; s += 3) {
        r = e[s], o = e[s + n], r ? P(n, r, o, i) : o(i);
      }t._subscribers.length = 0;
    }
  }function M(t, e) {
    try {
      return t(e);
    } catch (n) {
      return nt.error = n, nt;
    }
  }function P(t, n, r, o) {
    var i = e(r),
        s = void 0,
        u = void 0,
        c = void 0,
        a = void 0;if (i) {
      if (s = M(r, o), s === nt ? (a = !0, u = s.error, s.error = null) : c = !0, n === s) return void j(n, d());
    } else s = o, c = !0;n._state !== $ || (i && c ? g(n, s) : a ? j(n, u) : t === tt ? S(n, s) : t === et && j(n, s));
  }function x(t, e) {
    try {
      e(function (e) {
        g(t, e);
      }, function (e) {
        j(t, e);
      });
    } catch (n) {
      j(t, n);
    }
  }function C() {
    return rt++;
  }function O(t) {
    t[Z] = rt++, t._state = void 0, t._result = void 0, t._subscribers = [];
  }function k() {
    return new Error("Array Methods must be provided an Array");
  }function F(t) {
    return new ot(this, t).promise;
  }function Y(t) {
    var e = this;return new e(U(t) ? function (n, r) {
      for (var o = t.length, i = 0; i < o; i++) {
        e.resolve(t[i]).then(n, r);
      }
    } : function (t, e) {
      return e(new TypeError("You must pass an array to race."));
    });
  }function q(t) {
    var e = this,
        n = new e(p);return j(n, t), n;
  }function D() {
    throw new TypeError("You must pass a resolver function as the first argument to the promise constructor");
  }function K() {
    throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
  }function L() {
    var t = void 0;if ("undefined" != typeof global) t = global;else if ("undefined" != typeof self) t = self;else try {
      t = Function("return this")();
    } catch (e) {
      throw new Error("polyfill failed because global object is unavailable in this environment");
    }var n = t.Promise;if (n) {
      var r = null;try {
        r = Object.prototype.toString.call(n.resolve());
      } catch (e) {}if ("[object Promise]" === r && !n.cast) return;
    }t.Promise = it;
  }var N = void 0;N = Array.isArray ? Array.isArray : function (t) {
    return "[object Array]" === Object.prototype.toString.call(t);
  };var U = N,
      W = 0,
      z = void 0,
      B = void 0,
      G = function G(t, e) {
    V[W] = t, V[W + 1] = e, W += 2, 2 === W && (B ? B(a) : X());
  },
      H = "undefined" != typeof window ? window : void 0,
      I = H || {},
      J = I.MutationObserver || I.WebKitMutationObserver,
      Q = "undefined" == typeof self && "undefined" != typeof process && "[object process]" === {}.toString.call(process),
      R = "undefined" != typeof Uint8ClampedArray && "undefined" != typeof importScripts && "undefined" != typeof MessageChannel,
      V = new Array(1e3),
      X = void 0;X = Q ? o() : J ? s() : R ? u() : void 0 === H && "function" == "function" ? f() : c();var Z = Math.random().toString(36).substring(2),
      $ = void 0,
      tt = 1,
      et = 2,
      nt = { error: null },
      rt = 0,
      ot = function () {
    function t(t, e) {
      this._instanceConstructor = t, this.promise = new t(p), this.promise[Z] || O(this.promise), U(e) ? (this.length = e.length, this._remaining = e.length, this._result = new Array(this.length), 0 === this.length ? S(this.promise, this._result) : (this.length = this.length || 0, this._enumerate(e), 0 === this._remaining && S(this.promise, this._result))) : j(this.promise, k());
    }return t.prototype._enumerate = function (t) {
      for (var e = 0; this._state === $ && e < t.length; e++) {
        this._eachEntry(t[e], e);
      }
    }, t.prototype._eachEntry = function (t, e) {
      var n = this._instanceConstructor,
          r = n.resolve;if (r === h) {
        var o = _(t);if (o === l && t._state !== $) this._settledAt(t._state, e, t._result);else if ("function" != typeof o) this._remaining--, this._result[e] = t;else if (n === it) {
          var i = new n(p);w(i, t, o), this._willSettleAt(i, e);
        } else this._willSettleAt(new n(function (e) {
          return e(t);
        }), e);
      } else this._willSettleAt(r(t), e);
    }, t.prototype._settledAt = function (t, e, n) {
      var r = this.promise;r._state === $ && (this._remaining--, t === et ? j(r, n) : this._result[e] = n), 0 === this._remaining && S(r, this._result);
    }, t.prototype._willSettleAt = function (t, e) {
      var n = this;E(t, void 0, function (t) {
        return n._settledAt(tt, e, t);
      }, function (t) {
        return n._settledAt(et, e, t);
      });
    }, t;
  }(),
      it = function () {
    function t(e) {
      this[Z] = C(), this._result = this._state = void 0, this._subscribers = [], p !== e && ("function" != typeof e && D(), this instanceof t ? x(this, e) : K());
    }return t.prototype["catch"] = function (t) {
      return this.then(null, t);
    }, t.prototype["finally"] = function (t) {
      var e = this,
          n = e.constructor;return e.then(function (e) {
        return n.resolve(t()).then(function () {
          return e;
        });
      }, function (e) {
        return n.resolve(t()).then(function () {
          throw e;
        });
      });
    }, t;
  }();return it.prototype.then = l, it.all = F, it.race = Y, it.resolve = h, it.reject = q, it._setScheduler = n, it._setAsap = r, it._asap = G, it.polyfill = L, it.Promise = it, it;
});
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(110), __webpack_require__(111), __webpack_require__(2)(module)))

/***/ }),

/***/ 119:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_typeof__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_set__ = __webpack_require__(120);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_set___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_set__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass__);





/**
 * 小程序页面之间通信的 event
 * 目前只实现一个事件对应一个方法
 */
var Event = function () {
  function Event() {
    __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck___default()(this, Event);

    this.events = {};
  }

  __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass___default()(Event, [{
    key: 'on',
    value: function on(event, fn) {
      if (typeof fn !== 'function' || !event) {
        return;
      }
      if (!this.events[event]) {
        this.events[event] = new __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_set___default.a();
      }
      this.events[event].add(fn);
    }
  }, {
    key: 'emit',
    value: function emit(event, data) {
      if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_typeof__["default"])(this.events[event]) !== 'object') {
        return;
      }
      console.log('emit ' + event);
      this.events[event].forEach(function (element) {
        if (typeof element === 'function') {
          element(data);
        }
      });
    }
  }, {
    key: 'off',
    value: function off(event, fn) {
      if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_typeof__["default"])(this.events[event]) !== 'object' || typeof fn !== 'function') {
        return;
      }
      this.events[event].delete(fn);
    }
  }]);

  return Event;
}();

/* harmony default export */ __webpack_exports__["a"] = (Event);

/***/ }),

/***/ 139:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__);


var EventNames = function EventNames() {
  __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default()(this, EventNames);

  this.USER_INFO_UPDATE = 'user_info_update';
  this.LOGOUT = 'logout';
  this.LOGIN = 'login';
  this.LOGIN_FAILED = 'login_failed';
};

/* harmony default export */ __webpack_exports__["a"] = (EventNames);

/***/ }),

/***/ 140:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__);


var Settings = function Settings() {
  __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default()(this, Settings);

  this.VERSION = '1.0';
};

/* harmony default export */ __webpack_exports__["a"] = (Settings);

/***/ }),

/***/ 52:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_json_stringify__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_json_stringify___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_json_stringify__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_keys__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_keys___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_keys__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass__);




/**
 * 路由类
 */
var ROUTER_PREFIX = 'https://www.kujiale.com';

var Router = function () {
  /**
   * 初始化路由
   * @param {*} pagePaths 所有页面的路由表信息
   * @param {*} webViewPath webView页面的路由信息
   */
  function Router(pagePaths, webViewPath) {
    __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck___default()(this, Router);

    this.pagePaths = pagePaths;
    this.webViewPath = webViewPath;
  }

  /**
   * 组装本地页面的路由信息
   * @param {*} pageName 本地的页面名，注意默认在 /pages 目录下，并且页面目录和页面需要命名一致
   * @param {*} query query 值
   */


  __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass___default()(Router, [{
    key: 'nativePage',
    value: function nativePage(pageName, query) {
      var url = ROUTER_PREFIX + '/pages/' + pageName + '/' + pageName;
      if (query !== undefined && __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_keys___default()(query).length > 0) {
        url += '?';
        for (var key in query) {
          url += key + '=' + query[key] + '&';
        }
      }
      return url;
    }
  }, {
    key: 'navigateTo',
    value: function navigateTo(routePath) {
      var url = routePath;
      if (!(typeof url === 'string')) {
        return;
      }

      // 如果在 pages 里面有定义这个 path, 直接跳转小程序页面
      if (url.startsWith(ROUTER_PREFIX)) {
        var path = url.slice(ROUTER_PREFIX.length + 1, url.indexOf('?') > 0 ? url.indexOf('?') : url.length);
        if (this.pagePaths.indexOf(path) > -1) {
          console.log('navigate to local page ' + url.slice(ROUTER_PREFIX.length));
          wx.navigateTo({
            url: url.slice(ROUTER_PREFIX.length)
          });
        } else {
          this._jumpToWebView(url);
        }
      } else {
        this._jumpToWebView(url);
      }
    }
  }, {
    key: '_jumpToWebView',
    value: function _jumpToWebView(url) {
      console.log('jump to web page ' + url);
      var encodedUrl = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_json_stringify___default()(encodeURIComponent(url));
      wx.navigateTo({
        url: '/pages/web-page/web-page?url=' + encodedUrl + '&from=mp'
      });
    }
  }]);

  return Router;
}();

/* harmony default export */ __webpack_exports__["a"] = (Router);

/***/ })

},[0]);
//# sourceMappingURL=main.js.map