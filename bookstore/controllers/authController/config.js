module.exports = {
  name: 'auth-controller',
  path: './main.js',
  handlers: {
    sampleFirstMethod: {
      needProtocolRef: false,
      params: [
        '_protocolRef.request.postData',
      ],
    },
    sampleSecondMethod: {
      needProtocolRef: true,
      params: []
    },
    http_sendStream: {
      needProtocolRef: false,
      params: [
        '_protocolRef.request',
        '_protocolRef.response',
        '_inputData'
      ],
    }
  }
};   
