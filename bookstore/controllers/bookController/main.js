const BaseController = require('@partFramework/baseController');

exports.controller = class BookController extends BaseController {
  
  constructor(core, schema, config) {
    super(core, schema, config);
    
  }

  async create(body, files) {
  // async create(body) {
    return {
      message: 'book created!',
      data: body.name
    }
  }

  async readAll(queryString) {

  }

  async readById(params) {


  }

  async update(body, files) {

  }

  async delete(params) {

  }
}

exports.introduceToLoader = BaseController.exportedProperties(require('./schema'), require('./config'));
