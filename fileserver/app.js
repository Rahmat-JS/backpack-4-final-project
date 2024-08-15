const http = require('http');
const router = require('./router/main');
const port = 3000;

const server = http.createServer((req, res) => {
    router(req, res);
});

server.listen(port, () => {
    console.log(`Server running at http://127.0.0.1:${port}/`);
});
