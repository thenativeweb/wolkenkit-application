'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var path = require('path');

var cloneDeep = require('lodash/cloneDeep'),
    merge = require('lodash/merge'),
    noop = require('lodash/noop'),
    requireDir = require('require-dir');

var templates = requireDir(path.join(__dirname, 'templates'), {
  recurse: true
});

var extendEntries = function extendEntries(_ref) {
  var entries = _ref.entries;

  if (!entries) {
    throw new Error('Entries are missing.');
  }

  var extendedEntries = cloneDeep(entries);

  var _arr = Object.entries(extendedEntries.server.writeModel);

  for (var _i = 0; _i < _arr.length; _i++) {
    var _arr$_i = (0, _slicedToArray2.default)(_arr[_i], 2),
        contextName = _arr$_i[0],
        contextDefinition = _arr$_i[1];

    var _arr2 = Object.entries(contextDefinition);

    for (var _i2 = 0; _i2 < _arr2.length; _i2++) {
      var _arr2$_i = (0, _slicedToArray2.default)(_arr2[_i2], 2),
          aggregateName = _arr2$_i[0],
          aggregateDefinition = _arr2$_i[1];

      aggregateDefinition.initialState.isAuthorized = merge({
        commands: {},
        events: {}
      }, aggregateDefinition.initialState.isAuthorized);

      var _arr3 = Object.entries(templates.writeModel.commands);

      for (var _i3 = 0; _i3 < _arr3.length; _i3++) {
        var _arr3$_i = (0, _slicedToArray2.default)(_arr3[_i3], 2),
            commandName = _arr3$_i[0],
            commandDefinition = _arr3$_i[1];

        if (aggregateDefinition.commands[commandName]) {
          throw new Error("Reserved command name '".concat(commandName, "' used in server/writeModel/").concat(contextName, "/").concat(aggregateName, "."));
        }

        aggregateDefinition.commands[commandName] = commandDefinition;
      }

      var _arr4 = Object.entries(templates.writeModel.events);

      for (var _i4 = 0; _i4 < _arr4.length; _i4++) {
        var _arr4$_i = (0, _slicedToArray2.default)(_arr4[_i4], 2),
            eventName = _arr4$_i[0],
            eventDefinition = _arr4$_i[1];

        if (aggregateDefinition.events[eventName]) {
          throw new Error("Reserved event name '".concat(eventName, "' used in server/writeModel/").concat(contextName, "/").concat(aggregateName, "."));
        }

        aggregateDefinition.events[eventName] = eventDefinition;
      }

      var _arr5 = Object.keys(aggregateDefinition.commands);

      for (var _i5 = 0; _i5 < _arr5.length; _i5++) {
        var commandName = _arr5[_i5];
        aggregateDefinition.initialState.isAuthorized.commands[commandName] = merge({
          forAuthenticated: false,
          forPublic: false
        }, aggregateDefinition.initialState.isAuthorized.commands[commandName]);
        var eventNameFailed = "".concat(commandName, "Failed");
        var eventNameRejected = "".concat(commandName, "Rejected");

        if (aggregateDefinition.events[eventNameFailed]) {
          throw new Error("Reserved event name '".concat(eventNameFailed, "' used in server/writeModel/").concat(contextName, "/").concat(aggregateName, "."));
        }

        if (aggregateDefinition.events[eventNameRejected]) {
          throw new Error("Reserved event name '".concat(eventNameRejected, "' used in server/writeModel/").concat(contextName, "/").concat(aggregateName, "."));
        }

        aggregateDefinition.events[eventNameFailed] = noop;
        aggregateDefinition.events[eventNameRejected] = noop;
      }

      var _arr6 = Object.keys(aggregateDefinition.events);

      for (var _i6 = 0; _i6 < _arr6.length; _i6++) {
        var eventName = _arr6[_i6];
        aggregateDefinition.initialState.isAuthorized.events[eventName] = merge({
          forAuthenticated: false,
          forPublic: false
        }, aggregateDefinition.initialState.isAuthorized.events[eventName]);
      }
    }
  }

  return extendedEntries;
};

module.exports = extendEntries;