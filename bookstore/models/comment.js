module.exports = class Comment {
  constructor(id, userid, bookid, content) {
    this.id = id;
    this.userid = userid;
    this.bookid = bookid;
    this.content = content;
  }
};