const PartFramework = require('partFramework');

class Program {
  #core;
  #config;
  #servers;
  #controllers = './controllers';
  // #middlewares = './middlewares';
  #controllerPackages = [];

  constructor(projectConfig) {
    this.#config = projectConfig;
    this.#core = new PartFramework(this.#config);
    this.#servers = this.#config.servers;
  }

  #loadManualControllers() {}

  #loadDependencies() {}

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

  // async #loadMiddleware() {
    // return this.#core.loader.loadMiddlewaresByPath(this.#middlewares);
  // }

  async run() {
    await this.#core.init();
    await this.#loadControllers();
    await this.#loadControllerPackages();
    this.#loadDependencies();
    this.#loadManualControllers();
    // await this.#loadMiddleware();
    await this.#loadServers();
  }
}

module.exports = Program;