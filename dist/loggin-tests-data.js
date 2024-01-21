"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.logTestResults = exports.logTestCaseData = exports.logSuiteDescription = exports.logSpecFileName = exports.logFailedTestsOnlyOnceOnRetry = exports.log = exports.doesModuleExist = void 0;
var _Color = _interopRequireDefault(require("./color-text/Color.ts"));
var _reporterConfiguration = require("./reporter-configuration.ts");
var _stylingTerminal = require("./color-text/styling-terminal.ts");
var _filteringTests = require("./filtering-tests.ts");
var _logginErrorMessage = require("./loggin-error-message.ts");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw new Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw new Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
var doesModuleExist = exports.doesModuleExist = function doesModuleExist(moduleName) {
  try {
    require.resolve("".concat(process.cwd(), "/").concat(moduleName));
    return true;
  } catch (e) {
    return false;
  }
};
var isPlaywrightConfigJSOrTS = doesModuleExist("playwright.config.ts") ? "playwright.config.ts" : "playwright.config.js";

/**
 * Get the config from playwright.config.ts   
 */
var userPlaywrightConfigFile = "".concat(process.cwd(), "/").concat(isPlaywrightConfigJSOrTS);
var defineConfig = await function (specifier) {
  return new Promise(function (r) {
    return r("".concat(specifier));
  }).then(function (s) {
    return _interopRequireWildcard(require(s));
  });
}(userPlaywrightConfigFile);

/**
 * Log the results of the function
 * Resuses the console.log function
 * We just simplified the name of the method to log
 * @param data
 */
var log = exports.log = function log() {
  var _console;
  (_console = console).log.apply(_console, arguments);
};

/**
 * Log the name of the spec file only once
 * Example output:
 * `
 * login.spec.ts: - this here is the spec file name
 *  Login page
 *    1. ✓ Login with valid credentials [1:1](100ms)
 *    2. ✓ Login with invalid credentials [2:1](100ms)
 * logout.spec.ts: - this here is the spec file name
 * Logout page
 *   1. ✓ Logout with valid credentials [1:1](100ms)
 *   2. ✓ Logout with invalid credentials [2:1](100ms)
 * `
 * @param specFileName
 */
var logSpecFileName = exports.logSpecFileName = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(specFileName) {
    var reporterOptions, specFileNameColor, _reporterOptions$base;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          // @ts-ignore
          reporterOptions = (0, _reporterConfiguration.getReporterOptions)(defineConfig["default"].reporter);
          if (reporterOptions !== undefined) {
            specFileNameColor = reporterOptions !== null && reporterOptions !== void 0 && (_reporterOptions$base = reporterOptions.baseColors) !== null && _reporterOptions$base !== void 0 && _reporterOptions$base.specFileNameColor ? reporterOptions.baseColors.specFileNameColor : undefined;
          }
          if ((reporterOptions === null || reporterOptions === void 0 ? void 0 : reporterOptions.ignoreColors) === true) {
            log("".concat(specFileName, ":"));
          } else if (specFileNameColor !== undefined) {
            log("".concat(_Color["default"].text(specFileName)[specFileNameColor]().valueOf(), ":"));
          } else {
            log("".concat(_Color["default"].text(specFileName).cyan().valueOf(), ":"));
          }
        case 3:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function logSpecFileName(_x) {
    return _ref.apply(this, arguments);
  };
}();

/**
 * Log the name of the suite only once
 * Example output:
 * `
 * login.spec.ts:
 *  Login page -  `This here is the suite description`
 *    1. ✓ Login with valid credentials [1:1](100ms)
 *    2. ✓ Login with invalid credentials [2:1](100ms)
 * `
 * @param suiteName
 */
var logSuiteDescription = exports.logSuiteDescription = function logSuiteDescription(suiteName) {
  // @ts-ignore
  var reporterOptions = (0, _reporterConfiguration.getReporterOptions)(defineConfig["default"].reporter);
  var suiteDescriptionColor;
  if (reporterOptions !== undefined) {
    var _reporterOptions$base2;
    suiteDescriptionColor = reporterOptions !== null && reporterOptions !== void 0 && (_reporterOptions$base2 = reporterOptions.baseColors) !== null && _reporterOptions$base2 !== void 0 && _reporterOptions$base2.suiteDescriptionColor ? reporterOptions.baseColors.suiteDescriptionColor : undefined;
  }
  if (reporterOptions !== null && reporterOptions !== void 0 && reporterOptions.ignoreColors) {
    log("  ".concat(suiteName));
  } else if (suiteDescriptionColor !== undefined) {
    log("  ".concat(_Color["default"].text(suiteName)[suiteDescriptionColor]().underscore().valueOf()));
  } else {
    log("  ".concat(_Color["default"].text(suiteName).cyan().underscore().valueOf()));
  }
};

/**
 * Log the test case data
 * Example output:
 * `    1. ✓ Login with valid credentials [1:1](100ms)`
 * @param count
 * @param test
 */
var logTestCaseData = exports.logTestCaseData = function logTestCaseData(count, test) {
  var status = (0, _stylingTerminal.setIconAndColorPerTestStatus)(test.status);
  var duration = _Color["default"].text("(".concat(test.duration, "ms)")).gray().dim().valueOf();
  var counter = "".concat(_Color["default"].text("".concat(count, ".")).gray().valueOf());
  // @ts-ignore
  var reporterOptions = (0, _reporterConfiguration.getReporterOptions)(defineConfig["default"].reporter);
  var testCaseTitleColor;
  if (reporterOptions !== undefined) {
    var _reporterOptions$base3;
    testCaseTitleColor = reporterOptions !== null && reporterOptions !== void 0 && (_reporterOptions$base3 = reporterOptions.baseColors) !== null && _reporterOptions$base3 !== void 0 && _reporterOptions$base3.testCaseTitleColor ? reporterOptions.baseColors.testCaseTitleColor : undefined;
  }
  var title;
  if (test.status === "failed") {
    if (test.retries) {
      title = _Color["default"].text(test.title).red().valueOf() + _Color["default"].text(" (".concat(test.retries, " retries + 1 (by default))")).magenta().valueOf();
    } else {
      title = _Color["default"].text(test.title).red().valueOf();
    }
  } else if (test.status === "skipped") {
    title = _Color["default"].text(test.title).yellow().valueOf();
  } else {
    if (reporterOptions !== null && reporterOptions !== void 0 && reporterOptions.ignoreColors) {
      title = test.title;
    } else if (testCaseTitleColor !== undefined) {
      title = _Color["default"].text(test.title)[testCaseTitleColor]().valueOf();
    } else {
      title = _Color["default"].text(test.title).white().valueOf();
    }
  }
  var rowAndCol = "".concat(_Color["default"].text("[".concat(test.line, ":").concat(test.column, "]")).gray().valueOf());
  log("   ".concat(counter, " ").concat(status, " ").concat(title, " ").concat(rowAndCol).concat(duration));
};

/**
 * Log the test results of all the run tests
 * @param allTests
 */
var logTestResults = exports.logTestResults = function logTestResults(allTests) {
  var testCounter = 0;
  allTests.forEach(function (specFile) {
    logSpecFileName(specFile.getSpecName());
    specFile.getSuiteTests().forEach(function (suite) {
      logSuiteDescription(suite.getSuiteDescription());
      suite.getTestCases().forEach(function (test) {
        //TODO: filter getTests() here failed tests that were retried and failed again
        testCounter++;
        logTestCaseData(testCounter, test);
      });
    });
  });
  log(_stylingTerminal.lineBreak);
};

/**
 * Log the failed tests only once when they were retried
 * @param failedTests
 * @param retries
 */
var logFailedTestsOnlyOnceOnRetry = exports.logFailedTestsOnlyOnceOnRetry = function logFailedTestsOnlyOnceOnRetry(failedTests, retries) {
  if (retries > 0) {
    var filteredFailedTests = (0, _filteringTests.filterOutDuplicateFailedTestsOnRetry)(failedTests);
    (0, _logginErrorMessage.logTestError)(filteredFailedTests, retries > 0);
  }
};