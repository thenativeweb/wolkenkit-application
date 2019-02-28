'use strict';

class Application {
  constructor ({ entries }) {
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

    for (const [ contextName, contextDefinition ] of Object.entries(entries.server.writeModel)) {
      this.configuration.writeModel[contextName] = {};
      this.writeModel[contextName] = {};

      for (const [ aggregateName, aggregateDefinition ] of Object.entries(contextDefinition)) {
        this.configuration.writeModel[contextName][aggregateName] = {
          commands: {},
          events: {}
        };
        this.writeModel[contextName][aggregateName] = aggregateDefinition;

        for (const commandName of Object.keys(aggregateDefinition.commands)) {
          this.configuration.writeModel[contextName][aggregateName].commands[commandName] = {};
        }
        for (const eventName of Object.keys(aggregateDefinition.events)) {
          this.configuration.writeModel[contextName][aggregateName].events[eventName] = {};
        }
      }
    }

    for (const [ modelType, modelTypeDefinition ] of Object.entries(entries.server.readModel)) {
      this.configuration.readModel[modelType] = {};
      this.readModel[modelType] = {};

      for (const [ modelName, modelDefinition ] of Object.entries(modelTypeDefinition)) {
        this.configuration.readModel[modelType][modelName] = {};
        this.readModel[modelType][modelName] = modelDefinition;
      }
    }

    for (const [ flowName, flowDefinition ] of Object.entries(entries.server.flows)) {
      this.configuration.flows[flowName] = {};
      this.flows[flowName] = flowDefinition;
    }
  }
}

module.exports = Application;
