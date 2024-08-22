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

    async update(body) {
        const result = await this.#userService.readById(body.id);
        if(result.statusCode != 200)
            return result;

        const oldUser = result['data']['body'];
        const updatedUser = new User(
            body.firstName || oldUser.firstName,
            body.lastName || oldUser.lastName,
            body.username || oldUser.username,
            body.email || oldUser.email,
            body.password ? await this.#utilsService.hashPassword(body.password) : oldUser.password
        );
        return await this.#userService.update(body.id, updatedUser);
    }

    async readAll() {
        return await this.#userService.readAll();
    }

    async delete(params) {
        return await this.#userService.delete(params.id);
    }

    async ordersByUserId(params) {
        const userData = await this.#userService.readById(params.id);
        
        if(userData.statusCode != 200) {
            return userData;
        }
        // return 'hey...'        
        const orders = [];
        const orderIds = userData['data']['body']['orders'];
        for(const orderId of orderIds) {
            const {id, keys, body} = await this.#orderService.readById(orderId);
            orders.push({
                'id': id,
                'details': body
            });
        }
        return {
            "data": orders,
            "message": `${orders.length} order found successfully`,
            'statusCode': 200
        };
    }
}

exports.introduceToLoader = BaseController.exportedProperties(require('./schema'), require('./config'));
