module.exports = {
  name: 'book-controller',
  path: './main.js',
  exception: {
    handler: require('../../utils/error/exceptionHandler')
  },
  handlers: {
    create: {
      needProtocolRef: false,
      params: [
        '_protocolRef.request.data',
        '_protocolRef.request.files'
      ],
    },
    readAll: {
      needProtocolRef: false,
      params: [],
    },
    readById: {
      needProtocolRef: false,
      params: [
        '_inputData.params'
      ],
    },
    update: {
      needProtocolRef: false,
      params: [
        '_protocolRef.request.data',
        '_protocolRef.request.files'
      ],
    },
    delete: {
      needProtocolRef: false,
      params: [
        '_inputData.params'
      ],
    },
    getComments: {
      needProtocolRef: false,
      params: [
        '_inputData.params'
      ],
    },
    search: {
      needProtocolRef: false,
      params: [
        '_protocolRef.request.data'
        // '_inputData.queryString'
      ],
    },
  }
};   
