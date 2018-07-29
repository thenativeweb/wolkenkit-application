'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fs = require('fs'),
    _require = require('util'),
    promisify = _require.promisify;


var Application = require('./Application'),
    extendWriteModel = require('./extendWriteModel'),
    loadFlows = require('./loadFlows'),
    loadReadModel = require('./loadReadModel'),
    loadWriteModel = require('./loadWriteModel');

var access = promisify(fs.access);

var applicationCache = {};

var applicationManager = {
  load: function () {
    var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(_ref) {
      var directory = _ref.directory;
      var cachedApplication, flows, readModel, writeModel, extendedWriteModel, application;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (directory) {
                _context.next = 2;
                break;
              }

              throw new Error('Directory is missing.');

            case 2:
              cachedApplication = applicationCache[directory];

              if (!cachedApplication) {
                _context.next = 5;
                break;
              }

              return _context.abrupt('return', cachedApplication);

            case 5:
              _context.next = 7;
              return access(directory, fs.constants.R_OK);

            case 7:
              _context.next = 9;
              return loadFlows({ directory: directory });

            case 9:
              flows = _context.sent;
              _context.next = 12;
              return loadReadModel({ directory: directory });

            case 12:
              readModel = _context.sent;
              _context.next = 15;
              return loadWriteModel({ directory: directory });

            case 15:
              writeModel = _context.sent;
              extendedWriteModel = extendWriteModel({ writeModel: writeModel });
              application = new Application({
                flows: flows,
                readModel: readModel,
                writeModel: extendedWriteModel
              });


              applicationCache[directory] = application;

              return _context.abrupt('return', application);

            case 20:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function load(_x) {
      return _ref2.apply(this, arguments);
    }

    return load;
  }()
};

module.exports = applicationManager;