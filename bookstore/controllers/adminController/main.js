const BaseController = require('@partFramework/baseController');

exports.controller = class AdminController extends BaseController {

    #dbService;
    #authService;
    constructor(core, schema, config, dbService, authService) {
        super(core, schema, config);
        this.#dbService = dbService;
        this.#authService = authService;
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

    getAuthInfo() {
        return this.#authService.getConfigInfo();
    }

}

exports.introduceToLoader = BaseController.exportedProperties(require('./schema'), require('./config'));
