const BaseController = require('@partFramework/baseController');
const Book = require('../../models/bookModel');
const fs = require("fs")
const {after} = require('@partFramework/decorators');
const AfterDecorators = require('../../decorators/after');
// const { Agent } = require('http');

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
            tags, // ids of tags
            body.count,
            [], // on creation, book has no comments
            `http://127.0.0.1:3000/uploads/${imageName}`,
            imageName
        );
    }

    async #getTagIds(tags) {
        const tagIds = [];
        // IMPORTANT NOTE: don't use forEach function for it
        for(const tag of tags) {
            const id = await this.#tagService.getId(tag);
            tagIds.push(id);
        }
        return tagIds;
    }

    async create(body, files) {

        const frameworkFilePath = files[0].path;
        const uploadResponse = await this.#fileService.uploadFile(frameworkFilePath)
        const imagePath = uploadResponse['filePath'];
        const imageName = uploadResponse['fileName'];

        const tagIds = await this.#getTagIds(body.tags);
        const newBook = this.#getBookInstance(body, tagIds, imagePath, imageName);
        const result = await this.#bookService.create(newBook, body.tags);
        fs.unlinkSync(frameworkFilePath);
        return result;
    }

    async readAll() {
        return await this.#bookService.readAll();
    }

    async readById(params) {
        return await this.#bookService.readById(params.id);
    }

    async update(body, files) {
        const result = await this.#bookService.readById(body.id);
        if(result.statusCode != 200)
            return result;

        const oldBook = result['data']['body'];
        const tags = body.tags ? await this.#getTagIds(body.tags) : oldBook.tags;
        const updatedBook = new Book(
            body.name || oldBook.name,
            body.author || oldBook.author,
            body.publishYear || oldBook.publishYear,
            body.price || oldBook.price,
            body.abstract || oldBook.abstract,
            tags,
            body.count || oldBook.count,
            oldBook.comments, // comments not change by update method
            oldBook.imagePath, // image path should not be changed
            oldBook.imageName // image name should not be changed
        );
        // TODO : update image if new image is uploaded

        const tagNames = [];
        for(const tagID of updatedBook.tags) {
            const result = await this.#tagService.readById(tagID);
            tagNames.push(result['data']['body']['name']);
        }
        return await this.#bookService.update(body.id, updatedBook, tagNames);
    }

    async delete(params) {
        // TODO: delete image from file system

        const result = await this.#bookService.readById(params.id);
        if(result.statusCode == 200) { // deleting comments of book
            result.data.body.comments.forEach(async (commentId) => { // for each comment
                await this.#commentService.delete(commentId);
            });
        }
        return await this.#bookService.delete(params.id);
    }

    @after(AfterDecorators.getPublishedComments)
    async getComments(params) {
        const bookResponse = await this.#bookService.readById(params.id);
        
        if(bookResponse.statusCode == 404) return bookResponse; // book does not exist before
        
        const comments = [];
        const commentsIds = bookResponse['data']['body']['comments'];

        for(const commentId of commentsIds) {
            const commentResponse = await this.#commentService.readById(commentId);
            const {id, keys, body} = commentResponse['data'];
            comments.push({
                'id': id,
                'details': body
            });
        }
        return {
            "data": comments,
            "message": `${comments.length} comment found successfully`,
            'statusCode': 200
        };
    }

    async search(data) {
        const searchItems = {
            'name': data.name,
            'author': data.author,
            'tags': data.tags
        };
        return await this.#bookService.search(searchItems);
    }

}

exports.introduceToLoader = BaseController.exportedProperties(require('./schema'), require('./config'));
