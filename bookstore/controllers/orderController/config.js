module.exports = {
  name: 'order-controller',
  path: './main.js',
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
    readByUser: {
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
