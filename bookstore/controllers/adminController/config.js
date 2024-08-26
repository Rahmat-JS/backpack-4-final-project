module.exports = {
  name: 'admin-controller',
  path: './main.js',
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
