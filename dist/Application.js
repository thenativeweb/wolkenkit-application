'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var Application = function Application(_ref) {
  var entries = _ref.entries;
  (0, _classCallCheck2.default)(this, Application);

  if (!entries) {
    throw new Error('Entries are missing.');
  }

  this.configuration = {
    writeModel: {},
    readModel: {},
    flows: {}
  };
  this.writeModel = {};
  this.readModel = {};
  this.flows = {};

  var _arr = Object.entries(entries.server.writeModel);

  for (var _i = 0; _i < _arr.length; _i++) {
    var _arr$_i = (0, _slicedToArray2.default)(_arr[_i], 2),
        contextName = _arr$_i[0],
        contextDefinition = _arr$_i[1];

    this.configuration.writeModel[contextName] = {};
    this.writeModel[contextName] = {};

    var _arr4 = Object.entries(contextDefinition);

    for (var _i4 = 0; _i4 < _arr4.length; _i4++) {
      var _arr4$_i = (0, _slicedToArray2.default)(_arr4[_i4], 2),
          aggregateName = _arr4$_i[0],
          aggregateDefinition = _arr4$_i[1];

      this.configuration.writeModel[contextName][aggregateName] = {
        commands: {},
        events: {}
      };
      this.writeModel[contextName][aggregateName] = aggregateDefinition;

      var _arr5 = Object.keys(aggregateDefinition.commands);

      for (var _i5 = 0; _i5 < _arr5.length; _i5++) {
        var commandName = _arr5[_i5];
        this.configuration.writeModel[contextName][aggregateName].commands[commandName] = {};
      }

      var _arr6 = Object.keys(aggregateDefinition.events);

      for (var _i6 = 0; _i6 < _arr6.length; _i6++) {
        var eventName = _arr6[_i6];
        this.configuration.writeModel[contextName][aggregateName].events[eventName] = {};
      }
    }
  }

  var _arr2 = Object.entries(entries.server.readModel);

  for (var _i2 = 0; _i2 < _arr2.length; _i2++) {
    var _arr2$_i = (0, _slicedToArray2.default)(_arr2[_i2], 2),
        modelType = _arr2$_i[0],
        modelTypeDefinition = _arr2$_i[1];

    this.configuration.readModel[modelType] = {};
    this.readModel[modelType] = {};

    var _arr7 = Object.entries(modelTypeDefinition);

    for (var _i7 = 0; _i7 < _arr7.length; _i7++) {
      var _arr7$_i = (0, _slicedToArray2.default)(_arr7[_i7], 2),
          modelName = _arr7$_i[0],
          modelDefinition = _arr7$_i[1];

      this.configuration.readModel[modelType][modelName] = {};
      this.readModel[modelType][modelName] = modelDefinition;
    }
  }

  var _arr3 = Object.entries(entries.server.flows);

  for (var _i3 = 0; _i3 < _arr3.length; _i3++) {
    var _arr3$_i = (0, _slicedToArray2.default)(_arr3[_i3], 2),
        flowName = _arr3$_i[0],
        flowDefinition = _arr3$_i[1];

    this.configuration.flows[flowName] = {};
    this.flows[flowName] = flowDefinition;
  }
};

module.exports = Application;