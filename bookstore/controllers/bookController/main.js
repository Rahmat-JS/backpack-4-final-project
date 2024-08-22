const BaseController = require('@partFramework/baseController');
const Book = require('../../models/bookModel');
const fs = require("fs")

exports.controller = class BookController extends BaseController {

    #bookService;
    #fileService;
    #commentService;
    #tagService;
    constructor(core, schema, config, bookService, fileService, commentService, tagService) {
        super(core, schema, config);
        this.#bookService = bookService;
        this.#fileService = fileService;
        this.#commentService = commentService;
        this.#tagService = tagService;
    };

    #getBookInstance(body, tags, imagePath, imageName) {
        return new Book(
            body.name,
            body.author,
            body.publishYear,
            body.price,
            body.abstract,

            // tags, // ids of tags
            body.tags, // TODO: update tags to ids of tags
            
            body.count,
            [], // on creation, book has no comments
            imagePath,
            imageName
        );
    }

    #getTagIds(tags) {
        const tagIds = [];
        tags.forEach(async (tag) => {
            const tagId = await this.#tagService.getId(tag);
            tagIds.push(tagId);
        });
        return tagIds;
    }

    async create(body, files) {

        // const frameworkFilePath = files[0].path;
        // const uploadResponse = await this.#fileService.uploadFile(frameworkFilePath)
        // const imagePath = uploadResponse['filePath'];
        // const imageName = uploadResponse['fileName'];

        const imagePath = 'should be updated';
        const imageName = 'should be updated';

        // const tagIds = this.#getTagIds(body.tags);
        // const newBook = this.#getBookInstance(body, tagIds, imagePath, imageName);
        const newBook = this.#getBookInstance(body, null, imagePath, imageName); // TODO: update tags to ids of tags

        const result = await this.#bookService.create(newBook, body.tags);
        // fs.unlinkSync(frameworkFilePath);
        return result;
    }

    async readAll() {
        return await this.#bookService.readAll();
    }

    async readById(params) {
        return await this.#bookService.readById(params.id);
    }

    async update(body, files) {
        const oldBook = await this.#bookService.readById(body.id);

        // TODO: if book not found return 404

        const updatedBook = this.#getBookInstance(
            body.name || oldBook.name,
            body.author || oldBook.author,
            body.publishYear || oldBook.publishYear,
            body.price || oldBook.price,
            body.abstract || oldBook.abstract,
            body.tags || oldBook.tags, // TODO: update tags
            body.count || oldBook.count,
            body.comments || oldBook.comments,
            oldBook.imagePath, // image path should not be changed
            oldBook.imageName // image name should not be changed
        );
        // TODO : update image if new image is uploaded

        return await this.#bookService.update(body.id, updatedBook, body.tags);
    }

    async delete(params) {
        // TODO: delete image from file system
        // TODO: delete comments of this book
        return await this.#bookService.delete(params.id);
    }

    async getComments(params) {
        const comments = [];

        // return {"message": "Not implemented yet!"};

        const book = await this.#bookService.readById(params.id);

        // TODO: if book not found return 404

        book.comments.forEach(async (commentId) => {
            const {id, keys, body} = await this.#commentService.readById(commentId);
            comments.push({
                'id': id,
                'details': body
            });
        })
        return comments;
    }

    async search(data) {
        // TODO: implement search in bookService
        // return {"message": "Not implemented yet!"};

        const searchItems = {
            'name': data.name,
            'author': data.author,
            'tags': data.tags
        };

        return await this.#bookService.search(searchItems);
    }

}

exports.introduceToLoader = BaseController.exportedProperties(require('./schema'), require('./config'));
