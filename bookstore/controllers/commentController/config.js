module.exports = {
  name: 'comment-controller',
  path: './main.js',
  exception: {
    handler: require('../../utils/error/exceptionHandler')
  },
  handlers: {
    leaveComment: {
      needProtocolRef: false,
      params: [
        '_protocolRef.request.data'
      ],
    },
    publishedComment: {
      needProtocolRef: false,
      params: [
        '_protocolRef.request.data'
      ],
    },
    getAllComments: {
      needProtocolRef: false,
      params: [],
    },
    getCommentById: {
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
