const { uploadFile } = require('../controllers/fileController');

const handleRequest = (req, res) => {
    if (req.method === 'POST' && req.url === '/upload') {
        uploadFile(req, res);
    } else {
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.end('مسیر یافت نشد');
    }
};

module.exports = {
    handleRequest
};
