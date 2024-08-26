const BaseController = require('@partFramework/baseController');

exports.controller = class AdminController extends BaseController {
  
  #dbService;
  constructor(core, schema, config, dbService) {
    super(core, schema, config);
    this.#dbService = dbService;
  }

  async getAllTables() {
    return await this.#dbService.getAllTables();
  }

  async createAllTables() {
    return await this.#dbService.createAllTables();
  }

  async dropAllTables() {
    return await this.#dbService.dropAllTables();
  }

}

exports.introduceToLoader = BaseController.exportedProperties(require('./schema'), require('./config'));
