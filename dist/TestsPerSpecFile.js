"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TestsPerSpecFile = exports.SuiteTestCases = void 0;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var SuiteTestCases = exports.SuiteTestCases = /*#__PURE__*/function () {
  function SuiteTestCases(suiteDescription) {
    _classCallCheck(this, SuiteTestCases);
    this.suiteDescription = suiteDescription;
    this.tests = [];
  }
  _createClass(SuiteTestCases, [{
    key: "getSuiteDescription",
    value: function getSuiteDescription() {
      return this.suiteDescription;
    }
  }, {
    key: "setSuiteDescription",
    value: function setSuiteDescription(suiteDescription) {
      this.suiteDescription = suiteDescription;
    }
  }, {
    key: "getTestCases",
    value: function getTestCases() {
      return this.tests;
    }
  }, {
    key: "setTestCases",
    value: function setTestCases(tests) {
      this.tests = tests;
    }
  }, {
    key: "addTestCase",
    value: function addTestCase(test) {
      this.tests.push(test);
    }
  }]);
  return SuiteTestCases;
}();
var TestsPerSpecFile = exports.TestsPerSpecFile = /*#__PURE__*/function () {
  function TestsPerSpecFile(specName) {
    _classCallCheck(this, TestsPerSpecFile);
    this.specName = specName;
    this.suiteTests = [];
  }
  _createClass(TestsPerSpecFile, [{
    key: "setSuiteTests",
    value: function setSuiteTests(testCases) {
      this.suiteTests = testCases;
    }
  }, {
    key: "setSpecName",
    value: function setSpecName(specName) {
      this.specName = specName;
    }
  }, {
    key: "getSpecName",
    value: function getSpecName() {
      return this.specName;
    }
  }, {
    key: "getSuiteTests",
    value: function getSuiteTests() {
      return this.suiteTests;
    }
  }, {
    key: "addTestCases",
    value: function addTestCases(testCase) {
      this.suiteTests.push(testCase);
    }
  }]);
  return TestsPerSpecFile;
}();