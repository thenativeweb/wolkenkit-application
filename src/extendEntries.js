'use strict';

const path = require('path');

const cloneDeep = require('lodash/cloneDeep'),
      merge = require('lodash/merge'),
      noop = require('lodash/noop'),
      requireDir = require('require-dir');

const templates = requireDir(path.join(__dirname, 'templates'), { recurse: true });

const extendEntries = function ({ entries }) {
  if (!entries) {
    throw new Error('Entries are missing.');
  }

  const extendedEntries = cloneDeep(entries);

  for (const [ contextName, contextDefinition ] of Object.entries(extendedEntries.server.writeModel)) {
    for (const [ aggregateName, aggregateDefinition ] of Object.entries(contextDefinition)) {
      aggregateDefinition.initialState.isAuthorized = merge(
        {
          commands: {},
          events: {}
        },
        aggregateDefinition.initialState.isAuthorized
      );

      for (const [ commandName, commandDefinition ] of Object.entries(templates.writeModel.commands)) {
        if (aggregateDefinition.commands[commandName]) {
          throw new Error(`Reserved command name '${commandName}' used in server/writeModel/${contextName}/${aggregateName}.`);
        }

        aggregateDefinition.commands[commandName] = commandDefinition;
      }

      for (const [ eventName, eventDefinition ] of Object.entries(templates.writeModel.events)) {
        if (aggregateDefinition.events[eventName]) {
          throw new Error(`Reserved event name '${eventName}' used in server/writeModel/${contextName}/${aggregateName}.`);
        }

        aggregateDefinition.events[eventName] = eventDefinition;
      }

      for (const commandName of Object.keys(aggregateDefinition.commands)) {
        aggregateDefinition.initialState.isAuthorized.commands[commandName] = merge({
          forAuthenticated: false,
          forPublic: false
        }, aggregateDefinition.initialState.isAuthorized.commands[commandName]);

        const eventNameFailed = `${commandName}Failed`;
        const eventNameRejected = `${commandName}Rejected`;

        if (aggregateDefinition.events[eventNameFailed]) {
          throw new Error(`Reserved event name '${eventNameFailed}' used in server/writeModel/${contextName}/${aggregateName}.`);
        }
        if (aggregateDefinition.events[eventNameRejected]) {
          throw new Error(`Reserved event name '${eventNameRejected}' used in server/writeModel/${contextName}/${aggregateName}.`);
        }

        aggregateDefinition.events[eventNameFailed] = noop;
        aggregateDefinition.events[eventNameRejected] = noop;
      }

      for (const eventName of Object.keys(aggregateDefinition.events)) {
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
