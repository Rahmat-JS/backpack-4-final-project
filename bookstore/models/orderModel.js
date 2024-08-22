class BookWhenToBuy {
  constructor(bookId, count, price) {
    this.bookId = bookId;
    this.count = count;
    this.price = price;
  }
}

class Order {
  constructor(userId, booksInformations) {
    this.userId = userId;
    this.booksInformations = booksInformations;
    this.totoalPrice;
    this.date;
    this.confirmed;
  }
};


module.exports = {
  BookWhenToBuy,
  Order
}