const BaseController = require('@partFramework/baseController');
const User = require('../../models/user');
const {after} = require('@partFramework/decorators');
const {passwordDeleter} = require('../../decorators/after')

exports.controller = class UserController extends BaseController {

    #userService;
    #utilsService
    constructor(core, schema, config, UserService, UtilsService) {
        super(core, schema, config);
        this.#userService = UserService;
        this.#utilsService = UtilsService;
    }

    async create(body) {
        const newUser = new User(
            this.#utilsService.getUUID(),
            body.username,
            body.email,
            this.#utilsService.hashPassword(body.password)
        );
        return this.#userService.create(newUser);
    }

    async readById(params) {
        return this.#userService.readById(params.id);
    }

    async update(body) {
        const oldUserData = await this.#userService.readById(body.id);
        const user = oldUserData.data;
        if (!user) {
            return oldUserData;
        }
        const updatedUser = new User(
            body.id,
            body.username || oldUserData.username,
            body.email || oldUserData.email,
            password ? this.#utilsService.hashPassword(body.password) : oldUserData.password
        );
        return this.#userService.update(updatedUser);
    }

    @after(passwordDeleter)
    async readAll() {
        return this.#userService.readAll();
    }

    async delete(params) {
        return this.#userService.delete(params.id);
    }

}

exports.introduceToLoader = BaseController.exportedProperties(require('./schema'), require('./config'));
