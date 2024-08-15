module.exports = {
  name: 'tag-controller',
  path: './main.js',
  handlers: {
    create: {
      needProtocolRef: false,
      params: [
        '_protocolRef.request.data'
      ],
    },
    readAll: {
      needProtocolRef: false,
      params: [],
    },
    update: {
      needProtocolRef: false,
      params: [
        '_protocolRef.request.data'
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
