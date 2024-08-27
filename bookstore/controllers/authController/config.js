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
      needProtocolRef: true,
      params: [
        '_protocolRef.request.data',
      ]
    }
  }
};   
