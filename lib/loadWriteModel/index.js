'use strict';

const fs = require('fs'),
      path = require('path');

const _ = require('lodash');

const commandBuilder = require('./commandBuilder'),
      eventBuilder = require('./eventBuilder');

const loadCommands = function (aggregateFile) {
  const commands = {};

  /* eslint-disable global-require */
  Object.keys(require(aggregateFile).commands).forEach(command => {
    /* eslint-enable global-require */
    commands[command] = {};
  });

  return commands;
};

const loadEvents = function (aggregateFile) {
  const events = {};

  /* eslint-disable global-require */
  Object.keys(require(aggregateFile).events).forEach(event => {
    /* eslint-enable global-require */
    events[event] = {};
  });

  return events;
};

const loadAggregates = function (contextDirectory, options) {
  const aggregates = {};

  /* eslint-disable no-sync */
  fs.readdirSync(contextDirectory).forEach(aggregateName => {
    /* eslint-enable no-sync */
    const aggregateFile = path.join(contextDirectory, aggregateName);

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

    if (options && options.loadSource) {
      /* eslint-disable global-require */
      aggregates[path.basename(aggregateName, '.js')] = require(aggregateFile);
      /* eslint-enable global-require */
    }
  });

  return aggregates;
};

const loadContexts = function (writeModelDirectory, options) {
  const contexts = {};

  /* eslint-disable no-sync */
  fs.readdirSync(writeModelDirectory).forEach(contextName => {
    /* eslint-enable no-sync */
    const contextDirectory = path.join(writeModelDirectory, contextName);

    /* eslint-disable no-sync */
    if (!fs.statSync(contextDirectory).isDirectory()) {
      /* eslint-enable no-sync */
      return;
    }

    contexts[contextName] = loadAggregates(contextDirectory, options);
  });

  return contexts;
};

const attachAuthorizationInitialState = function (writeModel, options) {
  if (!options || !options.loadSource) {
    return;
  }

  Object.keys(writeModel).forEach(contextName => {
    const context = writeModel[contextName];

    Object.keys(context).forEach(aggregateName => {
      const aggregate = context[aggregateName],
            commands = {},
            events = {};

      Object.keys(aggregate.commands).forEach(commandName => {
        commands[commandName] = {
          forAuthenticated: false,
          forPublic: false
        };
      });

      Object.keys(aggregate.events).forEach(eventName => {
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

const attachTransferOwnership = function (writeModel, options) {
  Object.keys(writeModel).forEach(contextName => {
    const context = writeModel[contextName];

    Object.keys(context).forEach(aggregateName => {
      const aggregate = context[aggregateName];

      aggregate.commands.transferOwnership = {};
      aggregate.events.transferredOwnership = {};

      if (options && options.loadSource) {
        aggregate.commands.transferOwnership = commandBuilder.transferOwnership;
        aggregate.events.transferredOwnership = eventBuilder.transferredOwnership;
      }
    });
  });
};

const attachAuthorize = function (writeModel, options) {
  Object.keys(writeModel).forEach(contextName => {
    const context = writeModel[contextName];

    Object.keys(context).forEach(aggregateName => {
      const aggregate = context[aggregateName];

      aggregate.commands.authorize = {};
      aggregate.events.authorized = {};

      if (options && options.loadSource) {
        aggregate.commands.authorize = commandBuilder.authorize;
        aggregate.events.authorized = eventBuilder.authorized;
      }
    });
  });
};

const attachFailedAndRejectedEvents = function (writeModel) {
  Object.keys(writeModel).forEach(contextName => {
    const context = writeModel[contextName];

    Object.keys(context).forEach(aggregateName => {
      const aggregate = context[aggregateName];

      Object.keys(aggregate.commands).forEach(commandName => {
        aggregate.events[`${commandName}Failed`] = {};
        aggregate.events[`${commandName}Rejected`] = {};
      });
    });
  });
};

const loadWriteModel = function (writeModelDirectory, options) {
  if (!writeModelDirectory) {
    throw new Error('Write model directory is missing.');
  }

  const writeModel = loadContexts(writeModelDirectory, options);

  // Attach additional commands and events.
  attachTransferOwnership(writeModel, options);
  attachAuthorize(writeModel, options);

  // These functions require all commands to be attached.
  attachAuthorizationInitialState(writeModel, options);
  attachFailedAndRejectedEvents(writeModel);

  return writeModel;
};

module.exports = loadWriteModel;
