const BaseController = require('@partFramework/baseController');

exports.controller = class UserController extends BaseController {
  
  constructor(core, schema, config) {
    super(core, schema, config);
    
  }



}

exports.introduceToLoader = BaseController.exportedProperties(require('./schema'), require('./config'));
