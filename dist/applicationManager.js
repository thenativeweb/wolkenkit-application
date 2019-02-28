'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var Application = require('./Application'),
    ApplicationCache = require('./ApplicationCache'),
    extendEntries = require('./extendEntries'),
    getEntries = require('./getEntries'),
    validateStructure = require('./validateStructure');

var applicationCache = new ApplicationCache();
var applicationManager = {
  load: function () {
    var _load = (0, _asyncToGenerator2.default)(
    /*#__PURE__*/
    _regenerator.default.mark(function _callee(_ref) {
      var directory, cachedApplication, entries, extendedEntries, application;
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
              cachedApplication = applicationCache.get({
                directory: directory
              });

              if (!cachedApplication) {
                _context.next = 6;
                break;
              }

              return _context.abrupt("return", cachedApplication);

            case 6:
              entries = getEntries({
                directory: directory
              });
              validateStructure({
                entries: entries
              });
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
              return _context.abrupt("return", application);

            case 12:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    function load(_x) {
      return _load.apply(this, arguments);
    }

    return load;
  }()
};
module.exports = applicationManager;