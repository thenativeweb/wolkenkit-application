'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var fs = require('fs'),
    path = require('path'),
    _require = require('util'),
    promisify = _require.promisify;

var access = promisify(fs.access);

var directoryTree = require('directory-tree');

var MAX_TREE_TRANSFORM_DEPTH = {
  // flows/flow[.js, /index.js]
  flows: 1,
  // readModel/api/projection[.js, /index.js]
  readModel: 2,
  // writeModel/context/aggregate[.js, /index.js]
  writeModel: 2
};

var transformTree = function transformTree(nodes) {
  var maxDepth = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var currentDepth = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

  if (!nodes) {
    throw new Error('Nodes are missing.');
  }

  var result = {};
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = nodes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var node = _step.value;
      var name = path.basename(node.name, '.js');
      var maxTreeTransformDepth = MAX_TREE_TRANSFORM_DEPTH[name];

      if (maxTreeTransformDepth) {
        result[name] = transformTree(node.children, maxTreeTransformDepth, 1);
      } else if (node.children) {
        if (maxDepth) {
          if (currentDepth + 1 <= maxDepth) {
            result[name] = transformTree(node.children, maxDepth, currentDepth + 1);
          } else {
            result[name] = {};
          }
        } else {
          result[name] = transformTree(node.children);
        }
      } else {
        result[name] = {};
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return != null) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return result;
};

var getDirectoryTree =
/*#__PURE__*/
function () {
  var _ref2 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(_ref) {
    var directory, serverDirectory, tree;
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
            serverDirectory = path.join(directory, 'server');
            _context.next = 6;
            return access(serverDirectory, fs.constants.R_OK);

          case 6:
            tree = directoryTree(serverDirectory, {
              extensions: /\.js$/
            });
            return _context.abrupt("return", transformTree([tree]));

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function getDirectoryTree(_x) {
    return _ref2.apply(this, arguments);
  };
}();

module.exports = getDirectoryTree;