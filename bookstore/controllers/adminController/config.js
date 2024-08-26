module.exports = {
  name: 'admin-controller',
  path: './main.js',
  exception: {
    handler: require('../../utils/error/exceptionHandler')
  },
  handlers: {
    getAllTables: {
      needProtocolRef: false,
      params: [],
    },
    dropAllTables: {
      needProtocolRef: true,
      params: []
    },
    createAllTables: {
      needProtocolRef: true,
      params: []
    },
  }
};   
