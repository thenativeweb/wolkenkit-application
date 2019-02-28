'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var ApplicationCache =
/*#__PURE__*/
function () {
  function ApplicationCache() {
    (0, _classCallCheck2.default)(this, ApplicationCache);
    this.applications = {};
  }

  (0, _createClass2.default)(ApplicationCache, [{
    key: "set",
    value: function set(_ref) {
      var directory = _ref.directory,
          application = _ref.application;

      if (!directory) {
        throw new Error('Directory is missing.');
      }

      if (!application) {
        throw new Error('Application is missing.');
      }

      this.applications[directory] = application;
    }
  }, {
    key: "get",
    value: function get(_ref2) {
      var directory = _ref2.directory;

      if (!directory) {
        throw new Error('Directory is missing.');
      }

      return this.applications[directory];
    }
  }]);
  return ApplicationCache;
}();

module.exports = ApplicationCache;