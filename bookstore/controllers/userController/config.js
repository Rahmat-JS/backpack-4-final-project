module.exports = {
  name: 'user-controller',
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