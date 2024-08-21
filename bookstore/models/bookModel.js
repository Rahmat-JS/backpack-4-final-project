module.exports = class Book {
  constructor(name, author, publishyear, price, abstract, tags, count, imagePath, imageName) {
    this.name = name;
    this.author = author;
    this.publishyear = publishyear;
    this.price = price;
    this.abstract = abstract;
    this.tags = tags;
    this.count = count;
    this.imagePath = imagePath;
    this.imageName = imageName;
  }
};