const PartFramework = require('partFramework');

// services
const BookService = require('./services/bookService');
const FileService = require('./services/fileService');
const UserService = require('./services/userService');
const CommentService = require('./services/commentService');
const TagService = require('./services/tagService');
const OrderService = require('./services/orderService');
const UtilsService = require('./services/utilsService');
const DBService = require('./database/dbService');

const atlasInterfaceGlobalConfig = require('./configs/global/partModuleDelta.config').global;
const atlasInterfaceInstanceConfig = require('./configs/instance/partModuleDelta.config').instance;

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
    
    await this.#core.loader.loadTwoLevel('atlasInterface', require('partModuleDelta').AI)
      .injectGlobalConfig(atlasInterfaceGlobalConfig)
      .injectInstanceConfig(atlasInterfaceInstanceConfig);
      
    await this.#core.loader.load('dbService', DBService).injectRef('atlasInterface');
    await this.#core.loader.load('bookService', BookService).injectRef('dbService');
    await this.#core.loader.load('tagService', TagService).injectRef('dbService');
    await this.#core.loader.load('commentService', CommentService).injectRef('dbService');
    await this.#core.loader.load('userService', UserService).injectRef('dbService');
    await this.#core.loader.load('orderService', OrderService).injectRef('dbService');
    await this.#core.loader.load('fileService', FileService);
    await this.#core.loader.load('utilsService', UtilsService);
  
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
    this.#loadDependencies();
    await this.#loadControllers();
    await this.#loadControllerPackages();
    this.#loadManualControllers();
    await this.#loadMiddleware();
    await this.#loadServers();
  }
}

module.exports = Program;