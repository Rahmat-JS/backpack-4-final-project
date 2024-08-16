const BaseController = require('@partFramework/baseController');
const fs = require("fs")
const FileService = require("../../services/file");
const Book = require('../../models/book');
const BookService = require('../../services/book')

exports.controller = class BookController extends BaseController {
  
  constructor(core, schema, config) {
    super(core, schema, config);
    const BookService = new BookService();
    
    
  }

  async create(body, files) {
    
    const FIleservice = new FileService();
    const FrameworkFilePath = files[0].path;
    const upload_response =  await FIleservice.uploadFile(FrameworkFilePath)
    const ImagePath = upload_response['filePath'];
    const ImageName = upload_response['fileName'];

    const newbook = new Book(
      body.id,
      body.name,
      body.author,
      body.publishyear,
      body.price,
      body.abstract,
      body.tags,
      body.count,
      ImagePath,
      ImageName
    );

    BookService.create(newbook);
    fs.unlinkSync(FrameworkFilePath);

  
  }

  async readAll(queryString) {
    BookService.readAll("book");

  }

  async readById(params) {
    Book.readById(params)


  }

  async update(body, files) {
    Book.update(body, files)
  }

  async delete(params) {
    Book.delete(params)

  }
}

exports.introduceToLoader = BaseController.exportedProperties(require('./schema'), require('./config'));
