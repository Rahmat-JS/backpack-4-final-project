module.exports = {
  name: 'order-controller',
  path: './main.js',
  exception: {
    handler: require('../../utils/error/exceptionHandler')
  },
  handlers: {
    create: {
      needProtocolRef: false,
      params: [
        '_protocolRef.request.data',
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
    approval: {
      needProtocolRef: false,
      params: [
        '_protocolRef.request.data',
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
