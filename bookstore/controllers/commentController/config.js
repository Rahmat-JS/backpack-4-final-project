module.exports = {
  name: 'comment-controller',
  path: './main.js',
  handlers: {
    leaveComment: {
      needProtocolRef: false,
      params: [
        '_protocolRef.request.data'
      ],
    },
    getComments: {
      needProtocolRef: false,
      params: [
        '_inputData.params'
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
