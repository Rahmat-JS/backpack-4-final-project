const BaseController = require('@partFramework/baseController');
const { Order, BookWhenToBuy } = require('../../models/orderModel');

exports.controller = class OrderController extends BaseController {

    #orderService;
    #bookService;
    constructor(core, schema, config, orderService, bookService) {
        super(core, schema, config);
        this.#orderService = orderService;
        this.#bookService = bookService;
    }

    async #getBookWhenToBuyInstance(bookId, count) {
        const book = this.#bookService.readById(bookId);
        return new BookWhenToBuy(bookId, count, book.price);
    }

    async create(body) {
        const dateTimeNow = new Date(); // current date and time
        const totalPrice = 0;
        const bookArray = [];

        // body['booksInformations'].forEach(async (element) => { // for each book in order
        //     const book = await this.#getBookWhenToBuyInstance(
        //         element.id,
        //         element.count
        //     );
        //     bookArray.push(book);
        //     totalPrice += (book.price * book.count);
        // });
        
        const newOrder = new Order(
            body.userId,
            
            // bookArray,
            body.booksInformations,

            totalPrice,
            dateTimeNow,
            false // not confirmed in default
        );
        return await this.#orderService.create(newOrder);
    }

    async readAll() {
        return await this.#orderService.readAll();
    }

    async readById(params) {
        return await this.#orderService.readById(params.id);
    }

    async approval(body) {
        const orderToApproval = this.readById(body.id).data.body; // get order to approval
        orderToApproval.confirmed = body.confirmed;
        return await this.#orderService.update(body.id, orderToApproval);
    }

    async delete(params) {
        return await this.#orderService.delete(params.id);
    }

}

exports.introduceToLoader = BaseController.exportedProperties(require('./schema'), require('./config'));
