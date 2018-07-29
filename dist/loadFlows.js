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

var loadFlows = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(_ref) {
    var directory = _ref.directory;

    var flows, flowsDirectory, flowFiles, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, flowFile, flowFileFull, stats, flowName, implementation, configuration;

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
            flows = {
              configuration: {},
              implementation: {}
            };
            flowsDirectory = path.join(directory, 'server', 'flows');
            _context.prev = 4;
            _context.next = 7;
            return access(flowsDirectory, fs.constants.R_OK);

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

            return _context.abrupt('return', flows);

          case 13:
            throw _context.t0;

          case 14:
            _context.next = 16;
            return readdir(flowsDirectory);

          case 16:
            flowFiles = _context.sent;
            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context.prev = 20;
            _iterator = (0, _getIterator3.default)(flowFiles);

          case 22:
            if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
              _context.next = 49;
              break;
            }

            flowFile = _step.value;

            if (!(path.extname(flowFile) !== '.js')) {
              _context.next = 26;
              break;
            }

            return _context.abrupt('continue', 46);

          case 26:
            flowFileFull = path.join(flowsDirectory, flowFile);
            _context.next = 29;
            return stat(flowFileFull);

          case 29:
            stats = _context.sent;

            if (stats.isFile()) {
              _context.next = 32;
              break;
            }

            return _context.abrupt('continue', 46);

          case 32:
            flowName = path.basename(flowFile, '.js');

            /* eslint-disable global-require */

            implementation = require(flowFileFull);
            /* eslint-enable global-require */

            if (implementation.reactions) {
              _context.next = 36;
              break;
            }

            throw new Error('Reactions are missing in flows/' + flowName + '.');

          case 36:
            if (!(implementation.identity || implementation.initialState || implementation.transitions)) {
              _context.next = 43;
              break;
            }

            if (implementation.identity) {
              _context.next = 39;
              break;
            }

            throw new Error('Identity is missing from flows/' + flowName + '.');

          case 39:
            if (implementation.initialState) {
              _context.next = 41;
              break;
            }

            throw new Error('Initial state is missing from flows/' + flowName + '.');

          case 41:
            if (implementation.transitions) {
              _context.next = 43;
              break;
            }

            throw new Error('Transitions are missing from flows/' + flowName + '.');

          case 43:
            configuration = {};


            flows.configuration[flowName] = configuration;
            flows.implementation[flowName] = implementation;

          case 46:
            _iteratorNormalCompletion = true;
            _context.next = 22;
            break;

          case 49:
            _context.next = 55;
            break;

          case 51:
            _context.prev = 51;
            _context.t1 = _context['catch'](20);
            _didIteratorError = true;
            _iteratorError = _context.t1;

          case 55:
            _context.prev = 55;
            _context.prev = 56;

            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }

          case 58:
            _context.prev = 58;

            if (!_didIteratorError) {
              _context.next = 61;
              break;
            }

            throw _iteratorError;

          case 61:
            return _context.finish(58);

          case 62:
            return _context.finish(55);

          case 63:
            return _context.abrupt('return', flows);

          case 64:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[4, 9], [20, 51, 55, 63], [56,, 58, 62]]);
  }));

  return function loadFlows(_x) {
    return _ref2.apply(this, arguments);
  };
}();

module.exports = loadFlows;