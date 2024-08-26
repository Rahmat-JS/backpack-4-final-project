module.exports = class AfterDecorators {
    
  static async passwordDeleterForList(result) {
    const usersList = result.data;

    usersList.forEach((Element) => {
      delete Element.body.password;
    });

    return usersList;
  }

  static async passwordDeleterForOne(result) {
    delete result.data.body.password;

    return result;
  }

  static async getConfirmedOrders(result) {
    // TODO: implement your code ...

    return result;
  }

  static async getPublishedComments(result) {
    // TODO: implement your code ...

    return result;
  }
};

// function passwordDeleterForList(result) {
//     console.log('Hi I am extra mention!\n', result.data);

//     // TODO: implement your code ...

//     return result;
// }

// module.exports = {
//     passwordDeleterForList
// };
