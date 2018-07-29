'use strict';

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Application = function Application(_ref) {
  var flows = _ref.flows,
      readModel = _ref.readModel,
      writeModel = _ref.writeModel;
  (0, _classCallCheck3.default)(this, Application);

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
};

module.exports = Application;