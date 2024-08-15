module.exports = {
  name: 'book-controller',
  path: './main.js',
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
      params: [
        '_inputData.queryString'
      ],
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
  }
};   
