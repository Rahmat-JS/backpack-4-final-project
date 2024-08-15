const http = require('http');
const { handleRequest } = require('./routes/main');

const server = http.createServer(handleRequest);

server.listen(3000, () => {
    console.log('Server running at http://127.0.0.1:3000/');
});
