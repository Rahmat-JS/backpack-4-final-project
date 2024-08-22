class BookWhenToBuy {
  constructor(bookId, count, price) {
    this.bookId = bookId;
    this.count = count;
    this.price = price;
  }
}

class Order {
  constructor(userId, booksInformations, totoalPrice, date, confirmed) {
    this.userId = userId;
    this.booksInformations = booksInformations;
    this.totoalPrice = totoalPrice;
    this.date = date;
    this.confirmed = confirmed;
  }
};


module.exports = {
  BookWhenToBuy,
  Order
}