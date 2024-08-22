module.exports = class Comment {
  constructor(userId, bookId, content, date, published) {
    this.userid = userId;
    this.bookId = bookId;
    this.content = content;
    this.date = date;
    this.published = published;
  }
};