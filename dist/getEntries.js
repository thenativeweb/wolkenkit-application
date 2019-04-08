'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var path = require('path');

var getDirectoryTree = require('./getDirectoryTree');

var requireRecursive = function requireRecursive(directoryTree, currentPath) {
  var result = {};

  var _arr = Object.keys(directoryTree);

  for (var _i = 0; _i < _arr.length; _i++) {
    var key = _arr[_i];
    var subTree = directoryTree[key];
    var nextPath = path.join(currentPath, key);

    if (Object.keys(subTree).length) {
      result[key] = requireRecursive(subTree, nextPath);
    } else {
      // eslint-disable-next-line global-require
      result[key] = require(nextPath);
    }
  }

  return result;
};

var getEntries =
/*#__PURE__*/
function () {
  var _ref2 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(_ref) {
    var directory, directoryTree, entries;
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
            return getDirectoryTree({
              directory: directory
            });

          case 5:
            directoryTree = _context.sent;
            entries = requireRecursive(directoryTree, directory);
            return _context.abrupt("return", entries);

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function getEntries(_x) {
    return _ref2.apply(this, arguments);
  };
}();

module.exports = getEntries;