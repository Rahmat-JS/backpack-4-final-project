const PartFramework = require('partFramework');

// services
const BookService = require('./services/book');
const FileService = require('./services/file');
const UserService = require('./services/user');
const CommentService = require('./services/comment');
const TagService = require('./services/tag');
const OrderService = require('./services/order');
const UtilsService = require('./services/utils');
const DBService = require('./database/db');

class Program {
  #core;
  #config;
  #servers;
  #controllers = './controllers';
  #middlewares = './middlewares';
  #controllerPackages = [];

  constructor(projectConfig) {
    this.#config = projectConfig;
    this.#core = new PartFramework(this.#config);
    this.#servers = this.#config.servers;
  }

  #loadManualControllers() {}

  async #loadDependencies() {
    await this.#core.loader.load('BookService', BookService);
    await this.#core.loader.load('FileService', FileService);
    await this.#core.loader.load('TagService', TagService);
    await this.#core.loader.load('CommentService', CommentService);
    await this.#core.loader.load('UserService', UserService);
    await this.#core.loader.load('OrderService', OrderService);
    await this.#core.loader.load('OrderService', OrderService);
    await this.#core.loader.load('UtilsService', UtilsService);

    await this.#core.loader.loadTwoLevel('atlasInterface', require('partModuleDelta').AI)
      .injectGlobalConfig(require('./configs/global/partModuleDelta.config').introduceToLoader.config.global)
      .injectInstanceConfig(require('./configs/instance/partModuleDelta.config').introduceToLoader.config.instance);

    await this.#core.loader.load('atlasInterfaceInDB', DBService)
      .injectRef('atlasInterface'); // manual load
  }

  async #loadControllers() {
    return this.#core.loader.loadControllersByPath(this.#controllers);
  }

  async #loadServers() {
    return this.#core.loader.loadServers(this.#servers);
  }

  async #loadControllerPackages() {
    if (this.#controllerPackages.length) {
      return this.#core.loader.loadControllerPackages(this.#controllerPackages);
    }
  }

  async #loadMiddleware() {
    return this.#core.loader.loadMiddlewaresByPath(this.#middlewares);
  }

  async run() {
    await this.#core.init();
    await this.#loadControllers();
    await this.#loadControllerPackages();
    this.#loadDependencies();
    this.#loadManualControllers();
    await this.#loadMiddleware();
    await this.#loadServers();
  }
}

module.exports = Program;