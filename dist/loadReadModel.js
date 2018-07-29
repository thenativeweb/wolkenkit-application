'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fs = require('fs'),
    path = require('path'),
    _require = require('util'),
    promisify = _require.promisify;


var access = promisify(fs.access),
    readdir = promisify(fs.readdir),
    stat = promisify(fs.stat);

var loadReadModel = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(_ref) {
    var directory = _ref.directory;

    var readModel, readModelDirectory, modelTypes, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, modelType, modelTypeDirectory, statsModelType, modelFiles, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, modelFile, modelFileFull, statsModel, modelName, implementation, configuration;

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
            readModel = {
              configuration: {},
              implementation: {}
            };
            readModelDirectory = path.join(directory, 'server', 'readModel');
            _context.prev = 4;
            _context.next = 7;
            return access(readModelDirectory, fs.constants.R_OK);

          case 7:
            _context.next = 14;
            break;

          case 9:
            _context.prev = 9;
            _context.t0 = _context['catch'](4);

            if (!(_context.t0.code === 'ENOENT')) {
              _context.next = 13;
              break;
            }

            return _context.abrupt('return', readModel);

          case 13:
            throw _context.t0;

          case 14:
            _context.next = 16;
            return readdir(readModelDirectory);

          case 16:
            modelTypes = _context.sent;
            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context.prev = 20;
            _iterator = (0, _getIterator3.default)(modelTypes);

          case 22:
            if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
              _context.next = 79;
              break;
            }

            modelType = _step.value;
            modelTypeDirectory = path.join(readModelDirectory, modelType);
            _context.next = 27;
            return stat(modelTypeDirectory);

          case 27:
            statsModelType = _context.sent;

            if (statsModelType.isDirectory()) {
              _context.next = 30;
              break;
            }

            return _context.abrupt('continue', 76);

          case 30:

            readModel.configuration[modelType] = {};
            readModel.implementation[modelType] = {};

            _context.next = 34;
            return readdir(modelTypeDirectory);

          case 34:
            modelFiles = _context.sent;
            _iteratorNormalCompletion2 = true;
            _didIteratorError2 = false;
            _iteratorError2 = undefined;
            _context.prev = 38;
            _iterator2 = (0, _getIterator3.default)(modelFiles);

          case 40:
            if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
              _context.next = 62;
              break;
            }

            modelFile = _step2.value;

            if (!(path.extname(modelFile) !== '.js')) {
              _context.next = 44;
              break;
            }

            return _context.abrupt('continue', 59);

          case 44:
            modelFileFull = path.join(modelTypeDirectory, modelFile);
            _context.next = 47;
            return stat(modelFileFull);

          case 47:
            statsModel = _context.sent;

            if (statsModel.isFile()) {
              _context.next = 50;
              break;
            }

            return _context.abrupt('continue', 59);

          case 50:
            modelName = path.basename(modelFile, '.js');

            /* eslint-disable global-require */

            implementation = require(modelFileFull);
            /* eslint-enable global-require */

            if (implementation.fields) {
              _context.next = 54;
              break;
            }

            throw new Error('Fields are missing from readModel/' + modelType + '/' + modelName + '.');

          case 54:
            if (implementation.projections) {
              _context.next = 56;
              break;
            }

            throw new Error('Projections are missing from readModel/' + modelType + '/' + modelName + '.');

          case 56:
            configuration = {};


            readModel.configuration[modelType][modelName] = configuration;
            readModel.implementation[modelType][modelName] = implementation;

          case 59:
            _iteratorNormalCompletion2 = true;
            _context.next = 40;
            break;

          case 62:
            _context.next = 68;
            break;

          case 64:
            _context.prev = 64;
            _context.t1 = _context['catch'](38);
            _didIteratorError2 = true;
            _iteratorError2 = _context.t1;

          case 68:
            _context.prev = 68;
            _context.prev = 69;

            if (!_iteratorNormalCompletion2 && _iterator2.return) {
              _iterator2.return();
            }

          case 71:
            _context.prev = 71;

            if (!_didIteratorError2) {
              _context.next = 74;
              break;
            }

            throw _iteratorError2;

          case 74:
            return _context.finish(71);

          case 75:
            return _context.finish(68);

          case 76:
            _iteratorNormalCompletion = true;
            _context.next = 22;
            break;

          case 79:
            _context.next = 85;
            break;

          case 81:
            _context.prev = 81;
            _context.t2 = _context['catch'](20);
            _didIteratorError = true;
            _iteratorError = _context.t2;

          case 85:
            _context.prev = 85;
            _context.prev = 86;

            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }

          case 88:
            _context.prev = 88;

            if (!_didIteratorError) {
              _context.next = 91;
              break;
            }

            throw _iteratorError;

          case 91:
            return _context.finish(88);

          case 92:
            return _context.finish(85);

          case 93:
            return _context.abrupt('return', readModel);

          case 94:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[4, 9], [20, 81, 85, 93], [38, 64, 68, 76], [69,, 71, 75], [86,, 88, 92]]);
  }));

  return function loadReadModel(_x) {
    return _ref2.apply(this, arguments);
  };
}();

module.exports = loadReadModel;