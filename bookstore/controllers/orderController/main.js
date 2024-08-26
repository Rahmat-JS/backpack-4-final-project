const BaseController = require('@partFramework/baseController');
const { Order, BookWhenToBuy } = require('../../models/orderModel');

exports.controller = class OrderController extends BaseController {

    #orderService;
    #bookService;
    #userService;
    constructor(core, schema, config, orderService, bookService, userService) {
        super(core, schema, config);
        this.#orderService = orderService;
        this.#bookService = bookService;
        this.#userService = userService;
    }

    async #getBookWhenToBuyInstance(bookId, count) {
        const book = this.#bookService.readById(bookId);
        return new BookWhenToBuy(bookId, count, book.price);
    }

    async create(body) {
        const dateTimeNow = new Date(); // current date and time
        let totalPrice = 0;
        const bookArray = [];

        // if user not exist
        const userResponse = await this.#userService.readById(body.userId);
        if(userResponse.statusCode != 200)
            return userResponse;

        for(const bookIdAndCount of body['booksInformations']) { // for each book in order

            // if book not exist
            const bookResponse = await this.#bookService.readById(bookIdAndCount['id']);
            if(bookResponse.statusCode != 200)
                return bookResponse;

            
            const readBook = bookResponse['data']['body'];
            // if number of books not enough
            if(Number(readBook['count']) < Number(bookIdAndCount['count']))
                return {
                    'data': null,
                    'message': `The number of books with ID ${bookIdAndCount.id} is not enough`,
                    'statusCode': 400
                }

            const bookWhenBuy = await this.#getBookWhenToBuyInstance(
                bookIdAndCount.id,
                bookIdAndCount.count
            );
            bookArray.push(bookWhenBuy);
            totalPrice += (Number(readBook['price']) * Number(bookIdAndCount.count));
        }

        
        const newOrder = new Order(
            body.userId,
            bookArray,
            totalPrice,
            dateTimeNow,
            false // not confirmed in default
        );

        const result = await this.#orderService.create(newOrder);
        this.#userService.addOrder(body.userId, result['data']);
        return result;
    }

    async readAll() {
        return await this.#orderService.readAll();
    }

    async readById(params) {
        return await this.#orderService.readById(params.id);
    }

    async approval(body) {
        const orderToApprovalData = await this.#orderService.readById(body.id); // get order to approval
        if(orderToApprovalData.statusCode != 200)
            return orderToApprovalData; // 404 or 500 response

        const orderToApproval = orderToApprovalData['data']['body'];
        orderToApproval.confirmed = body.confirmed == 'true' ? true : false;
        return await this.#orderService.update(body.id, orderToApproval);
    }

    async delete(params) {
        return await this.#orderService.delete(params.id);
    }

}

exports.introduceToLoader = BaseController.exportedProperties(require('./schema'), require('./config'));
