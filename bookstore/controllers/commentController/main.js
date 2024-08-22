const BaseController = require('@partFramework/baseController');
const Comment = require('../../models/commentModel');

exports.controller = class CommentController extends BaseController {

    #commentService;
    #bookService;
    constructor(core, schema, config, commentService, bookService) {
        super(core, schema, config);
        this.#commentService = commentService;
        this.#bookService = bookService;
    }

    async leaveComment(body) {
        const dateTimeNow = new Date();
        const newComment = new Comment(
            body.userid,
            body.bookid,
            body.content,
            dateTimeNow,
            false // no published default
        );
        
        const result = await this.#commentService.create(newComment);
        this.#bookService.addComment(body.bookid, result.data.id);
        return result;
    }

    async getComments() {
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
