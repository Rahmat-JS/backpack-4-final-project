const BaseController = require('@partFramework/baseController');
const fs = require("fs")
const Book = require('../../models/book');
const BookService = require('../../services/book')
const FileService = require("../../services/file");
const { log } = require('util');

exports.controller = class BookController extends BaseController {
  
  constructor(core, schema, config) {
    super(core, schema, config);
    this.BookService = new BookService();
    this.FIleservice = new FileService();
  };

  async create(body, files) {

    const FrameworkFilePath = files[0].path;
    const upload_response =  await this.FIleservice.uploadFile(FrameworkFilePath)
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

    this.BookService.create(newbook);
    const fileName = path.basename(FrameworkFilePath);

    fs.unlink(FrameworkFilePath,(err)=>{
      if(err){
        console.log(err);
        
      }
      else{
        console.log(`${fileName} deleted....`);

      }
    })


  
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
