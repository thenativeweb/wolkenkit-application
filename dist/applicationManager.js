'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var Application = require('./Application'),
    ApplicationCache = require('./ApplicationCache'),
    extendEntries = require('./extendEntries'),
    getEntries = require('./getEntries'),
    validateDirectory = require('./validateDirectory'),
    validateEntries = require('./validateEntries');

var applicationCache = new ApplicationCache();
var applicationManager = {
  validate: function () {
    var _validate = (0, _asyncToGenerator2.default)(
    /*#__PURE__*/
    _regenerator.default.mark(function _callee(_ref) {
      var directory;
      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              directory = _ref.directory;

              if (directory) {
                _context.next = 3;
                break;
              }

              throw new Error('Directory is missing.');

            case 3:
              _context.next = 5;
              return validateDirectory({
                directory: directory
              });

            case 5:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    function validate(_x) {
      return _validate.apply(this, arguments);
    }

    return validate;
  }(),
  load: function () {
    var _load = (0, _asyncToGenerator2.default)(
    /*#__PURE__*/
    _regenerator.default.mark(function _callee2(_ref2) {
      var directory, cachedApplication, entries, extendedEntries, application;
      return _regenerator.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              directory = _ref2.directory;

              if (directory) {
                _context2.next = 3;
                break;
              }

              throw new Error('Directory is missing.');

            case 3:
              cachedApplication = applicationCache.get({
                directory: directory
              });

              if (!cachedApplication) {
                _context2.next = 6;
                break;
              }

              return _context2.abrupt("return", cachedApplication);

            case 6:
              _context2.next = 8;
              return validateDirectory({
                directory: directory
              });

            case 8:
              _context2.next = 10;
              return getEntries({
                directory: directory
              });

            case 10:
              entries = _context2.sent;
              _context2.next = 13;
              return validateEntries({
                entries: entries
              });

            case 13:
              extendedEntries = extendEntries({
                entries: entries
              });
              application = new Application({
                entries: extendedEntries
              });
              applicationCache.set({
                directory: directory,
                application: application
              });
              return _context2.abrupt("return", application);

            case 17:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    function load(_x2) {
      return _load.apply(this, arguments);
    }

    return load;
  }()
};
module.exports = applicationManager;