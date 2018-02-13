'use strict';

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fs = require('fs'),
    path = require('path');

var _ = require('lodash');

var commandBuilder = require('./commandBuilder'),
    eventBuilder = require('./eventBuilder');

var loadCommands = function loadCommands(aggregateFile) {
  var commands = {};

  /* eslint-disable global-require */
  (0, _keys2.default)(require(aggregateFile).commands).forEach(function (command) {
    /* eslint-enable global-require */
    commands[command] = {};
  });

  return commands;
};

var loadEvents = function loadEvents(aggregateFile) {
  var events = {};

  /* eslint-disable global-require */
  (0, _keys2.default)(require(aggregateFile).events).forEach(function (event) {
    /* eslint-enable global-require */
    events[event] = {};
  });

  return events;
};

var loadAggregates = function loadAggregates(contextDirectory, _ref) {
  var _ref$loadSource = _ref.loadSource,
      loadSource = _ref$loadSource === undefined ? false : _ref$loadSource;

  var aggregates = {};

  /* eslint-disable no-sync */
  fs.readdirSync(contextDirectory).forEach(function (aggregateName) {
    /* eslint-enable no-sync */
    var aggregateFile = path.join(contextDirectory, aggregateName);

    /* eslint-disable no-sync */
    if (!fs.statSync(aggregateFile).isFile()) {
      /* eslint-enable no-sync */
      return;
    }
    if (path.extname(aggregateFile) !== '.js') {
      return;
    }

    aggregates[path.basename(aggregateName, '.js')] = {
      commands: loadCommands(aggregateFile),
      events: loadEvents(aggregateFile)
    };

    if (loadSource) {
      /* eslint-disable global-require */
      aggregates[path.basename(aggregateName, '.js')] = require(aggregateFile);
      /* eslint-enable global-require */
    }
  });

  return aggregates;
};

var loadContexts = function loadContexts(writeModelDirectory, _ref2) {
  var _ref2$loadSource = _ref2.loadSource,
      loadSource = _ref2$loadSource === undefined ? false : _ref2$loadSource;

  var contexts = {};

  /* eslint-disable no-sync */
  fs.readdirSync(writeModelDirectory).forEach(function (contextName) {
    /* eslint-enable no-sync */
    var contextDirectory = path.join(writeModelDirectory, contextName);

    /* eslint-disable no-sync */
    if (!fs.statSync(contextDirectory).isDirectory()) {
      /* eslint-enable no-sync */
      return;
    }

    contexts[contextName] = loadAggregates(contextDirectory, { loadSource: loadSource });
  });

  return contexts;
};

var attachAuthorizationInitialState = function attachAuthorizationInitialState(writeModel, _ref3) {
  var _ref3$loadSource = _ref3.loadSource,
      loadSource = _ref3$loadSource === undefined ? false : _ref3$loadSource;

  if (!loadSource) {
    return;
  }

  (0, _keys2.default)(writeModel).forEach(function (contextName) {
    var context = writeModel[contextName];

    (0, _keys2.default)(context).forEach(function (aggregateName) {
      var aggregate = context[aggregateName],
          commands = {},
          events = {};

      (0, _keys2.default)(aggregate.commands).forEach(function (commandName) {
        commands[commandName] = {
          forAuthenticated: false,
          forPublic: false
        };
      });

      (0, _keys2.default)(aggregate.events).forEach(function (eventName) {
        events[eventName] = {
          forAuthenticated: false,
          forPublic: false
        };
      });

      aggregate.initialState = aggregate.initialState || {};
      aggregate.initialState.isAuthorized = aggregate.initialState.isAuthorized || {};

      aggregate.initialState.isAuthorized = {
        owner: undefined,
        commands: _.merge({}, _.cloneDeep(commands), _.cloneDeep(aggregate.initialState.isAuthorized.commands)),
        events: _.merge({}, _.cloneDeep(events), _.cloneDeep(aggregate.initialState.isAuthorized.events))
      };
    });
  });
};

var attachTransferOwnership = function attachTransferOwnership(writeModel, _ref4) {
  var _ref4$loadSource = _ref4.loadSource,
      loadSource = _ref4$loadSource === undefined ? false : _ref4$loadSource;

  (0, _keys2.default)(writeModel).forEach(function (contextName) {
    var context = writeModel[contextName];

    (0, _keys2.default)(context).forEach(function (aggregateName) {
      var aggregate = context[aggregateName];

      aggregate.commands.transferOwnership = {};
      aggregate.events.transferredOwnership = {};

      if (loadSource) {
        aggregate.commands.transferOwnership = commandBuilder.transferOwnership;
        aggregate.events.transferredOwnership = eventBuilder.transferredOwnership;
      }
    });
  });
};

var attachAuthorize = function attachAuthorize(writeModel, _ref5) {
  var _ref5$loadSource = _ref5.loadSource,
      loadSource = _ref5$loadSource === undefined ? false : _ref5$loadSource;

  (0, _keys2.default)(writeModel).forEach(function (contextName) {
    var context = writeModel[contextName];

    (0, _keys2.default)(context).forEach(function (aggregateName) {
      var aggregate = context[aggregateName];

      aggregate.commands.authorize = {};
      aggregate.events.authorized = {};

      if (loadSource) {
        aggregate.commands.authorize = commandBuilder.authorize;
        aggregate.events.authorized = eventBuilder.authorized;
      }
    });
  });
};

var attachFailedAndRejectedEvents = function attachFailedAndRejectedEvents(writeModel) {
  (0, _keys2.default)(writeModel).forEach(function (contextName) {
    var context = writeModel[contextName];

    (0, _keys2.default)(context).forEach(function (aggregateName) {
      var aggregate = context[aggregateName];

      (0, _keys2.default)(aggregate.commands).forEach(function (commandName) {
        aggregate.events[commandName + 'Failed'] = {};
        aggregate.events[commandName + 'Rejected'] = {};
      });
    });
  });
};

var loadWriteModel = function loadWriteModel(writeModelDirectory, _ref6) {
  var _ref6$loadSource = _ref6.loadSource,
      loadSource = _ref6$loadSource === undefined ? false : _ref6$loadSource;

  if (!writeModelDirectory) {
    throw new Error('Write model directory is missing.');
  }

  var writeModel = loadContexts(writeModelDirectory, { loadSource: loadSource });

  // Attach additional commands and events.
  attachTransferOwnership(writeModel, { loadSource: loadSource });
  attachAuthorize(writeModel, { loadSource: loadSource });

  // These functions require all commands to be attached.
  attachAuthorizationInitialState(writeModel, { loadSource: loadSource });
  attachFailedAndRejectedEvents(writeModel);

  return writeModel;
};

module.exports = loadWriteModel;