const BaseController = require('@partFramework/baseController');
const User = require('../../models/userModel');

exports.controller = class AuthController extends BaseController {

    #authService;
    #userService;
    #utilsService;
    constructor(core, schema, config, authService, userService, utilsService) {
        super(core, schema, config);
        this.#authService = authService;
        this.#userService = userService;
        this.#utilsService = utilsService;
    }

    async signUp(body) {
        const newUser = new User(
            body.firstName,
            body.lastName,
            body.username,
            body.email,
            await this.#utilsService.hashPassword(body.password),
        );
        
        // await this.#userService.create(newUser);
        return await this.#authService.addAuthEntity(body.username, body.password);
        await this.#authService.addToSamad();
        await this.#authService.assignUserToRole();
    }

    async login(body) {
        return await this.#authService.login();
    }
}

exports.introduceToLoader = BaseController.exportedProperties(require('./schema'), require('./config'));
