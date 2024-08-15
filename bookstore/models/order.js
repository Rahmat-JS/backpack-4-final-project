module.exports = class Order {
  constructor(id, bookid, userid, date) {
    this.id = id;
    this.bookid = bookid;
    this.userid = userid;
    this.date = date;
  }
};