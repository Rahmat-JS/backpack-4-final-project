module.exports = {
  name: 'auth-controller',
  path: './main.js',
  exception: {
    handler: require('../../utils/error/exceptionHandler')
  },
  handlers: {
    signUp: {
      needProtocolRef: false,
      params: [
        '_protocolRef.request.data',
      ],
    },
    login: {
      needProtocolRef: false,
      params: [
        '_protocolRef.request.data',
      ]
    }
  }
};   
