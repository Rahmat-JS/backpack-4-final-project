const BaseController = require('@partFramework/baseController');

exports.controller = class TagController extends BaseController {
  
  constructor(core, schema, config) {
    super(core, schema, config);
    
  }

  sampleFirstMethod(args) {
    return 'hello world';
  }
}

exports.introduceToLoader = BaseController.exportedProperties(require('./schema'), require('./config'));
