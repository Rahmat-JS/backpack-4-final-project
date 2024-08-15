const { saveFile, getFile, deleteFile } = require('../controllers/fileController');

const router = (req, res) => {
    if (req.method === 'POST' && req.url === '/upload') {
        saveFile(req, res);
    } else if (req.method === 'GET' && req.url.startsWith('/getFile')) {
        getFile(req, res);
    } else if (req.method === 'DELETE' && req.url.startsWith('/delete/')) {
        const fileName = req.url.split('/').pop();
        deleteFile(fileName, res);
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }
};

module.exports = router;
