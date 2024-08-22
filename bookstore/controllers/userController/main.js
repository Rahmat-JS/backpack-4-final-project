const BaseController = require('@partFramework/baseController');
const User = require('../../models/userModel');
// const {after} = require('@partFramework/decorators');
// const AfterDecorators = require('../../decorators/after')

exports.controller = class UserController extends BaseController {

    #userService;
    #utilsService
    #orderService;
    constructor(core, schema, config, userService, utilsService, orderService) {
        super(core, schema, config);
        this.#userService = userService;
        this.#utilsService = utilsService;
        this.#orderService = orderService;
    }

    async create(body) {
        const newUser = new User(
            body.firstName,
            body.lastName,
            body.username,
            body.email,
            await this.#utilsService.hashPassword(body.password),
            [] // on creation, user has no orders
        );
        return await this.#userService.create(newUser);
    }

    async readById(params) {
        return await this.#userService.readById(params.id);
    }

    async update(body) { // TODO: you should complete this after implementing decorators
        const oldUserData = await this.#userService.readById(body.id).data;
        const user = oldUserData.body;
        if (!user) {
            return await oldUserData;
        }
        const updatedUser = new User(
            body.firstName || oldUserData.firstName,
            body.lastName || oldUserData.lastName,
            body.username || oldUserData.username,
            body.email || oldUserData.email,
            body.password ? await this.#utilsService.hashPassword(body.password) : oldUserData.password
        );
        return await this.#userService.update(body.id, updatedUser);
    }

    // @after(AfterDecorators.somefunction)
    async readAll() {
        return await this.#userService.readAll();
    }

    async delete(params) {
        return await this.#userService.delete(params.id);
    }

    async ordersByUserId(params) {
        const orders = [];

        return {"message": "Not implemented yet!"};

        const user = await this.#userService.readById(params.id);
        
        // TODO: if user not found return 404
        
        user.orders.forEach(async (orderId) => {
            const {id, keys, body} = await this.#orderService.readById(orderId);
            orders.push({
                'id': id,
                'details': body
            });
        });
        return orders;
    }
}

exports.introduceToLoader = BaseController.exportedProperties(require('./schema'), require('./config'));
