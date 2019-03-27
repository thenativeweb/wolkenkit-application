'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var cloneDeep = require('lodash/cloneDeep'),
    noop = require('lodash/noop');

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

      var _arr3 = Object.keys(aggregateDefinition.commands);

      for (var _i3 = 0; _i3 < _arr3.length; _i3++) {
        var commandName = _arr3[_i3];
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
    }
  }

  return extendedEntries;
};

module.exports = extendEntries;