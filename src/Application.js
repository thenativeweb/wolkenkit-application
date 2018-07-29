'use strict';

class Application {
  constructor ({ flows, readModel, writeModel }) {
    if (!flows) {
      throw new Error('Flows are missing.');
    }
    if (!flows.configuration) {
      throw new Error('Flows configuration is missing.');
    }
    if (!flows.implementation) {
      throw new Error('Flows implementation is missing.');
    }
    if (!readModel) {
      throw new Error('Read model is missing.');
    }
    if (!readModel.configuration) {
      throw new Error('Read model configuration is missing.');
    }
    if (!readModel.implementation) {
      throw new Error('Read model implementation is missing.');
    }
    if (!writeModel) {
      throw new Error('Write model is missing.');
    }
    if (!writeModel.configuration) {
      throw new Error('Write model configuration is missing.');
    }
    if (!writeModel.implementation) {
      throw new Error('Write model implementation is missing.');
    }

    this.configuration = {
      flows: flows.configuration,
      readModel: readModel.configuration,
      writeModel: writeModel.configuration
    };

    this.flows = flows.implementation;
    this.readModel = readModel.implementation;
    this.writeModel = writeModel.implementation;
  }
}

module.exports = Application;
