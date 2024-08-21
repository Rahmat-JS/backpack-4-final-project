module.exports = class Comment {
  constructor(userid, bookid, content, date, published) {
    this.userid = userid;
    this.bookid = bookid;
    this.content = content;
    this.date = date;
    this.published = published;
  }
};