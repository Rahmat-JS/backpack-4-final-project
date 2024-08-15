const BaseController = require('@partFramework/baseController');

exports.controller = class CommentController extends BaseController {
  
  constructor(core, schema, config) {
    super(core, schema, config);
    
  }

  async leaveComment(body) {

  }

  async getComments(params) {

  }

  async delete(params) {

  }
}

exports.introduceToLoader = BaseController.exportedProperties(require('./schema'), require('./config'));
