'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var fs = require('fs'),
    path = require('path'),
    _require = require('util'),
    promisify = _require.promisify;

var access = promisify(fs.access);

var directoryTree = require('directory-tree'),
    Value = require('validate-value');

var transformTree = function transformTree(nodes) {
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

      if (!node.children) {
        result[name] = {};
        continue;
      }

      result[name] = transformTree(node.children);
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

var validateDirectory =
/*#__PURE__*/
function () {
  var _ref2 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(_ref) {
    var directory, serverDirectory, tree, transformedTree, value;
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
            transformedTree = transformTree([tree]);
            value = new Value({
              type: 'object',
              properties: {
                server: {
                  type: 'object',
                  properties: {
                    writeModel: {
                      type: 'object',
                      patternProperties: {
                        '.*': {
                          type: 'object',
                          patternProperties: {
                            '.*': {
                              type: 'object',
                              properties: {},
                              required: [],
                              additionalProperties: false
                            }
                          },
                          minProperties: 1
                        }
                      },
                      minProperties: 1
                    },
                    readModel: {
                      type: 'object',
                      properties: {
                        lists: {
                          type: 'object',
                          patternProperties: {
                            '.*': {
                              type: 'object',
                              properties: {},
                              required: [],
                              additionalProperties: false
                            }
                          },
                          minProperties: 0
                        }
                      },
                      required: ['lists'],
                      additionalProperties: false
                    },
                    flows: {
                      type: 'object',
                      patternProperties: {
                        '.*': {
                          type: 'object',
                          properties: {},
                          required: [],
                          additionalProperties: false
                        }
                      },
                      minProperties: 0
                    }
                  },
                  required: ['writeModel', 'readModel', 'flows'],
                  additionalProperties: true
                }
              },
              required: ['server'],
              additionalProperties: true
            });
            value.validate(transformedTree, {
              valueName: '.',
              separator: '/'
            });

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function validateDirectory(_x) {
    return _ref2.apply(this, arguments);
  };
}();

module.exports = validateDirectory;