'use strict';

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var cloneDeep = require('lodash/cloneDeep'),
    merge = require('lodash/merge');

var commands = require('./templates/writeModel/commands'),
    events = require('./templates/writeModel/events');

var extendWriteModel = function extendWriteModel(_ref) {
  var writeModel = _ref.writeModel;

  if (!writeModel) {
    throw new Error('Write model is missing.');
  }

  var extendedWriteModel = cloneDeep(writeModel);

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = (0, _getIterator3.default)((0, _keys2.default)(extendedWriteModel.configuration)), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var context = _step.value;
      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = (0, _getIterator3.default)((0, _keys2.default)(extendedWriteModel.configuration[context])), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var aggregate = _step3.value;

          // Add system commands.
          var _iteratorNormalCompletion4 = true;
          var _didIteratorError4 = false;
          var _iteratorError4 = undefined;

          try {
            for (var _iterator4 = (0, _getIterator3.default)((0, _keys2.default)(commands)), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
              var command = _step4.value;

              if (extendedWriteModel.configuration[context][aggregate].commands[command]) {
                throw new Error('Reserved command name \'' + command + '\' used in extendedWriteModel/' + context + '/' + aggregate + '.');
              }

              extendedWriteModel.configuration[context][aggregate].commands[command] = {};
              extendedWriteModel.implementation[context][aggregate].commands[command] = commands[command];
            }

            // Add system events.
          } catch (err) {
            _didIteratorError4 = true;
            _iteratorError4 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion4 && _iterator4.return) {
                _iterator4.return();
              }
            } finally {
              if (_didIteratorError4) {
                throw _iteratorError4;
              }
            }
          }

          var _iteratorNormalCompletion5 = true;
          var _didIteratorError5 = false;
          var _iteratorError5 = undefined;

          try {
            for (var _iterator5 = (0, _getIterator3.default)((0, _keys2.default)(events)), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
              var event = _step5.value;

              if (extendedWriteModel.configuration[context][aggregate].events[event]) {
                throw new Error('Reserved event name \'' + event + '\' used in extendedWriteModel/' + context + '/' + aggregate + '.');
              }

              extendedWriteModel.configuration[context][aggregate].events[event] = {};
              extendedWriteModel.implementation[context][aggregate].events[event] = events[event];
            }

            // Add authorization.
          } catch (err) {
            _didIteratorError5 = true;
            _iteratorError5 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion5 && _iterator5.return) {
                _iterator5.return();
              }
            } finally {
              if (_didIteratorError5) {
                throw _iteratorError5;
              }
            }
          }

          var _iteratorNormalCompletion6 = true;
          var _didIteratorError6 = false;
          var _iteratorError6 = undefined;

          try {
            for (var _iterator6 = (0, _getIterator3.default)((0, _keys2.default)(extendedWriteModel.implementation[context][aggregate].commands)), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
              var _command = _step6.value;

              extendedWriteModel.implementation[context][aggregate].initialState.isAuthorized = merge({
                commands: (0, _defineProperty3.default)({}, _command, { forAuthenticated: false, forPublic: false })
              }, extendedWriteModel.implementation[context][aggregate].initialState.isAuthorized);
            }
          } catch (err) {
            _didIteratorError6 = true;
            _iteratorError6 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion6 && _iterator6.return) {
                _iterator6.return();
              }
            } finally {
              if (_didIteratorError6) {
                throw _iteratorError6;
              }
            }
          }

          var _iteratorNormalCompletion7 = true;
          var _didIteratorError7 = false;
          var _iteratorError7 = undefined;

          try {
            for (var _iterator7 = (0, _getIterator3.default)((0, _keys2.default)(extendedWriteModel.implementation[context][aggregate].events)), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
              var _event = _step7.value;

              extendedWriteModel.implementation[context][aggregate].initialState.isAuthorized = merge({
                events: (0, _defineProperty3.default)({}, _event, { forAuthenticated: false, forPublic: false })
              }, extendedWriteModel.implementation[context][aggregate].initialState.isAuthorized);
            }
          } catch (err) {
            _didIteratorError7 = true;
            _iteratorError7 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion7 && _iterator7.return) {
                _iterator7.return();
              }
            } finally {
              if (_didIteratorError7) {
                throw _iteratorError7;
              }
            }
          }
        }
      } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion3 && _iterator3.return) {
            _iterator3.return();
          }
        } finally {
          if (_didIteratorError3) {
            throw _iteratorError3;
          }
        }
      }
    }

    // Add ...Failed and ...Rejected events.
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = (0, _getIterator3.default)((0, _keys2.default)(extendedWriteModel.configuration)), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var _context = _step2.value;
      var _iteratorNormalCompletion8 = true;
      var _didIteratorError8 = false;
      var _iteratorError8 = undefined;

      try {
        for (var _iterator8 = (0, _getIterator3.default)((0, _keys2.default)(extendedWriteModel.configuration[_context])), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
          var _aggregate = _step8.value;
          var _iteratorNormalCompletion9 = true;
          var _didIteratorError9 = false;
          var _iteratorError9 = undefined;

          try {
            for (var _iterator9 = (0, _getIterator3.default)((0, _keys2.default)(extendedWriteModel.configuration[_context][_aggregate].commands)), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
              var _command2 = _step9.value;

              extendedWriteModel.configuration[_context][_aggregate].events[_command2 + 'Failed'] = {};
              extendedWriteModel.configuration[_context][_aggregate].events[_command2 + 'Rejected'] = {};
            }
          } catch (err) {
            _didIteratorError9 = true;
            _iteratorError9 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion9 && _iterator9.return) {
                _iterator9.return();
              }
            } finally {
              if (_didIteratorError9) {
                throw _iteratorError9;
              }
            }
          }
        }
      } catch (err) {
        _didIteratorError8 = true;
        _iteratorError8 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion8 && _iterator8.return) {
            _iterator8.return();
          }
        } finally {
          if (_didIteratorError8) {
            throw _iteratorError8;
          }
        }
      }
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2.return) {
        _iterator2.return();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }

  return extendedWriteModel;
};

module.exports = extendWriteModel;