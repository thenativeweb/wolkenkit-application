'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var Value = require('validate-value');

var getDirectoryTree = require('./getDirectoryTree');

var validateDirectory =
/*#__PURE__*/
function () {
  var _ref2 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(_ref) {
    var directory, directoryTree, value;
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
            value.validate(directoryTree, {
              valueName: '.',
              separator: '/'
            });

          case 8:
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