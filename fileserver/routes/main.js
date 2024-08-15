const http = require('http');
const FileController = require('../controllers/fileController');

const router = (req, res) => {
    if (req.method === 'POST' && req.url === '/upload') {
        FileController.uploadFile(req, res);
    } else if (req.method === 'GET' && req.url.startsWith('/file/')) {
        FileController.getFile(req, res);
    } else {
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.end('صفحه یافت نشد');
    }
};

const server = http.createServer(router);

server.listen(3000, '127.0.0.1', () => {
    console.log('Server running at http://127.0.0.1:3000/');
});
