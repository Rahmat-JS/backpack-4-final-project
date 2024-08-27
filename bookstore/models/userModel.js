module.exports = class User {
  constructor(firstName, lastName, username, email, password) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.username = username;
    this.email = email;
    this.password = password;
    this.orders = []; // on creation, user has no orders
    this.role = 'normal'
  }
}