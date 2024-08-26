module.exports = class Book {
  constructor(name, author, publishYear, price, abstract, tags, count, comments, imagePath, imageName) {
    this.name = name;
    this.author = author;
    this.publishYear = publishYear;
    this.price = price;
    this.abstract = abstract;
    this.tags = tags;
    this.count = count;
    this.comments = comments;
    this.imagePath = imagePath;
    this.imageName = imageName;
  }
};