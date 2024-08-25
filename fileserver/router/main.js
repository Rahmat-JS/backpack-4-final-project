const { saveFile, deleteFile } = require('../controllers/fileController');
const EventEmitter = require('events');

class Router extends EventEmitter {
    router(req, res) {
        const method = req.method.toLowerCase();
        const path = req.url.split('?')[0];
        this.emit(`${method} ${path}`, req, res);
    }
}

const router = new Router();
try{

    router.on('post /upload', (req, res) => {
        saveFile(req, res);
    });
    
    router.on('delete /delete/:fileName', (req, res) => {
        const filename = req.url.split('/').pop();
        deleteFile(filename, res);
    });
}
catch(err){
    router.on('default', (req, res) => {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    });

}


module.exports = (req, res) => {
    const path = req.url.split('?')[0];
    const eventKey = `${req.method.toLowerCase()} ${path.startsWith('/delete/') ? '/delete/:fileName' : path}`;

    if (router.listenerCount(eventKey) > 0) {
        router.router(req, res);
    } else {
        router.emit('default', req, res);
    }
};

