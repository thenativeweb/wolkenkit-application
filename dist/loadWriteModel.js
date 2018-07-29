'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

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

var loadWriteModel = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(_ref) {
    var directory = _ref.directory;

    var writeModel, writeModelDirectory, contexts, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, context, contextDirectory, statsContext, aggregateFiles, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, aggregateFile, aggregateFileFull, statsAggregate, aggregateName, implementation, configuration, _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, command, _iteratorNormalCompletion4, _didIteratorError4, _iteratorError4, _iterator4, _step4, event;

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
            writeModel = {
              configuration: {},
              implementation: {}
            };
            writeModelDirectory = path.join(directory, 'server', 'writeModel');
            _context.prev = 4;
            _context.next = 7;
            return access(writeModelDirectory, fs.constants.R_OK);

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

            return _context.abrupt('return', writeModel);

          case 13:
            throw _context.t0;

          case 14:
            _context.next = 16;
            return readdir(writeModelDirectory);

          case 16:
            contexts = _context.sent;
            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context.prev = 20;
            _iterator = (0, _getIterator3.default)(contexts);

          case 22:
            if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
              _context.next = 119;
              break;
            }

            context = _step.value;
            contextDirectory = path.join(writeModelDirectory, context);
            _context.next = 27;
            return stat(contextDirectory);

          case 27:
            statsContext = _context.sent;

            if (statsContext.isDirectory()) {
              _context.next = 30;
              break;
            }

            return _context.abrupt('continue', 116);

          case 30:

            writeModel.configuration[context] = {};
            writeModel.implementation[context] = {};

            _context.next = 34;
            return readdir(contextDirectory);

          case 34:
            aggregateFiles = _context.sent;
            _iteratorNormalCompletion2 = true;
            _didIteratorError2 = false;
            _iteratorError2 = undefined;
            _context.prev = 38;
            _iterator2 = (0, _getIterator3.default)(aggregateFiles);

          case 40:
            if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
              _context.next = 102;
              break;
            }

            aggregateFile = _step2.value;

            if (!(path.extname(aggregateFile) !== '.js')) {
              _context.next = 44;
              break;
            }

            return _context.abrupt('continue', 99);

          case 44:
            aggregateFileFull = path.join(contextDirectory, aggregateFile);
            _context.next = 47;
            return stat(aggregateFileFull);

          case 47:
            statsAggregate = _context.sent;

            if (statsAggregate.isFile()) {
              _context.next = 50;
              break;
            }

            return _context.abrupt('continue', 99);

          case 50:
            aggregateName = path.basename(aggregateFile, '.js');

            /* eslint-disable global-require */

            implementation = require(aggregateFileFull);
            /* eslint-enable global-require */

            if (implementation.initialState) {
              _context.next = 54;
              break;
            }

            throw new Error('Initial state is missing from writeModel/' + context + '/' + aggregateName + '.');

          case 54:
            if (implementation.commands) {
              _context.next = 56;
              break;
            }

            throw new Error('Commands are missing from writeModel/' + context + '/' + aggregateName + '.');

          case 56:
            if (implementation.events) {
              _context.next = 58;
              break;
            }

            throw new Error('Events are missing from writeModel/' + context + '/' + aggregateName + '.');

          case 58:
            configuration = {
              commands: {},
              events: {}
            };
            _iteratorNormalCompletion3 = true;
            _didIteratorError3 = false;
            _iteratorError3 = undefined;
            _context.prev = 62;


            for (_iterator3 = (0, _getIterator3.default)((0, _keys2.default)(implementation.commands)); !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
              command = _step3.value;

              configuration.commands[command] = {};
            }
            _context.next = 70;
            break;

          case 66:
            _context.prev = 66;
            _context.t1 = _context['catch'](62);
            _didIteratorError3 = true;
            _iteratorError3 = _context.t1;

          case 70:
            _context.prev = 70;
            _context.prev = 71;

            if (!_iteratorNormalCompletion3 && _iterator3.return) {
              _iterator3.return();
            }

          case 73:
            _context.prev = 73;

            if (!_didIteratorError3) {
              _context.next = 76;
              break;
            }

            throw _iteratorError3;

          case 76:
            return _context.finish(73);

          case 77:
            return _context.finish(70);

          case 78:
            _iteratorNormalCompletion4 = true;
            _didIteratorError4 = false;
            _iteratorError4 = undefined;
            _context.prev = 81;
            for (_iterator4 = (0, _getIterator3.default)((0, _keys2.default)(implementation.events)); !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
              event = _step4.value;

              configuration.events[event] = {};
            }

            _context.next = 89;
            break;

          case 85:
            _context.prev = 85;
            _context.t2 = _context['catch'](81);
            _didIteratorError4 = true;
            _iteratorError4 = _context.t2;

          case 89:
            _context.prev = 89;
            _context.prev = 90;

            if (!_iteratorNormalCompletion4 && _iterator4.return) {
              _iterator4.return();
            }

          case 92:
            _context.prev = 92;

            if (!_didIteratorError4) {
              _context.next = 95;
              break;
            }

            throw _iteratorError4;

          case 95:
            return _context.finish(92);

          case 96:
            return _context.finish(89);

          case 97:
            writeModel.configuration[context][aggregateName] = configuration;
            writeModel.implementation[context][aggregateName] = implementation;

          case 99:
            _iteratorNormalCompletion2 = true;
            _context.next = 40;
            break;

          case 102:
            _context.next = 108;
            break;

          case 104:
            _context.prev = 104;
            _context.t3 = _context['catch'](38);
            _didIteratorError2 = true;
            _iteratorError2 = _context.t3;

          case 108:
            _context.prev = 108;
            _context.prev = 109;

            if (!_iteratorNormalCompletion2 && _iterator2.return) {
              _iterator2.return();
            }

          case 111:
            _context.prev = 111;

            if (!_didIteratorError2) {
              _context.next = 114;
              break;
            }

            throw _iteratorError2;

          case 114:
            return _context.finish(111);

          case 115:
            return _context.finish(108);

          case 116:
            _iteratorNormalCompletion = true;
            _context.next = 22;
            break;

          case 119:
            _context.next = 125;
            break;

          case 121:
            _context.prev = 121;
            _context.t4 = _context['catch'](20);
            _didIteratorError = true;
            _iteratorError = _context.t4;

          case 125:
            _context.prev = 125;
            _context.prev = 126;

            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }

          case 128:
            _context.prev = 128;

            if (!_didIteratorError) {
              _context.next = 131;
              break;
            }

            throw _iteratorError;

          case 131:
            return _context.finish(128);

          case 132:
            return _context.finish(125);

          case 133:
            return _context.abrupt('return', writeModel);

          case 134:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[4, 9], [20, 121, 125, 133], [38, 104, 108, 116], [62, 66, 70, 78], [71,, 73, 77], [81, 85, 89, 97], [90,, 92, 96], [109,, 111, 115], [126,, 128, 132]]);
  }));

  return function loadWriteModel(_x) {
    return _ref2.apply(this, arguments);
  };
}();

module.exports = loadWriteModel;