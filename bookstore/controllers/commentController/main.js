const BaseController = require('@partFramework/baseController');
const Comment = require('../../models/commentModel');

exports.controller = class CommentController extends BaseController {

    #commentService;
    #bookService;
    #userService;
    constructor(core, schema, config, commentService, bookService, userService) {
        super(core, schema, config);
        this.#commentService = commentService;
        this.#bookService = bookService;
        this.#userService = userService;
    }

    async leaveComment(body) {

        // if user not exist
        const userResponse = await this.#userService.readById(body.userId);
        if(userResponse.statusCode != 200)
            return userResponse;
        // if book not exist
        const bookResponse = await this.#bookService.readById(body.bookId);
        if(bookResponse.statusCode != 200)
            return bookResponse;

        const dateTimeNow = new Date(); // current time
        const newComment = new Comment(
            body.userId,
            body.bookId,
            body.content,
            dateTimeNow,
            false // no published default
        );
        
        const result = await this.#commentService.create(newComment);
        this.#bookService.addComment(body.bookId, result['data']);
        return result;
    }

    async getAllComments() {
        return await this.#commentService.readAll();
    }

    async getCommentById(params) {
        return await this.#commentService.readById(params.id);
    }

    async publishedComment(body) {
        return await this.#commentService.published(
            body.id,
            body.published == 'true' ? true : false
        );
    }

    async delete(params) {
        return await this.#commentService.delete(params.id);
    }
}

exports.introduceToLoader = BaseController.exportedProperties(require('./schema'), require('./config'));
