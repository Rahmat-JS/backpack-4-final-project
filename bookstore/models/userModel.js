module.exports = class User {
  constructor(firstName, lastName, username, email, password, orders) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.username = username;
    this.email = email;
    this.password = password;
    this.orders = orders;
  }
}