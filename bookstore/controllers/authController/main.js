const BaseController = require('@partFramework/baseController');
const User = require('../../models/userModel');
const ManualException = require('../../utils/error/Exception');

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
        try {
            const newUser = new User(
                body.firstName,
                body.lastName,
                body.username,
                body.email,
                await this.#utilsService.hashPassword(body.password),
            );
            
            const output = {'message': {}};
            output.message.atlas = await this.#userService.create(newUser);;
            output.message.authenticate = await this.#authService.addAuthEntity(body.username, body.password);
            output.message.samad = await this.#authService.addToSamad(body.username);
            output.message.role = await this.#authService.assignUserToRole(body.username, 'normal');
            output.statusCode = 201;
            return output;
        } catch(error) {
            throw error;
        }
    }

    async login(body) {
        try {
            const output = {};
            output.userStatus = await this.#authService.authenticate(body.username, body.password);
            output.token = await this.#authService.getUserToken(body.username, body.password);
            output.statusCode = 200;
            return output;
        } catch(error) {
            throw error;
        }
    }
}

exports.introduceToLoader = BaseController.exportedProperties(require('./schema'), require('./config'));
