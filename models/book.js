class Book {
  constructor(
    id,
    name,
    author,
    date,
    price,
    abstract,
    publishyear,
    tags,
    count,
    imagePath
  ) {
    this.id = id;
    this.name = name;
    this.author = author;
    this.date = date;
    this.price = price;
    this.abstract = abstract;
    this.publishyear = publishyear;
    this.tags = tags;
    this.count = count;
    this.imagePath = imagePath;
  }
}

module.exports = {
  Book,
};
