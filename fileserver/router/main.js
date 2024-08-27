const { saveFile, deleteFile } = require('../controllers/fileController');
const EventEmitter = require('events');

class Router extends EventEmitter {
    matchRoute(eventKey, path) {
        const eventParts = eventKey.split('/');
        const pathParts = path.split('/');

        if (eventParts.length !== pathParts.length) {
            return false;
        }

        let params = {};

        for (let i = 0; i < eventParts.length; i++) {
            if (eventParts[i].startsWith(':')) {
                params[eventParts[i].substring(1)] = pathParts[i];
            } else if (eventParts[i] !== pathParts[i]) {
                return false;
            }
        }

        return params;
    }

    router(req, res) {
        const method = req.method.toLowerCase();
        const path = req.url.split('?')[0];
        const eventKey = `${method} ${path.startsWith('/delete/') ? '/delete/:fileName' : path}`;
        const params = this.matchRoute(eventKey, `${method} ${path}`);

        if (params) {
            req.params = params;
            this.emit(eventKey, req, res);
        } else {
            this.emit(`${method} ${path}`, req, res);
        }
    }
}

const router = new Router();

router.on('post /upload', (req, res) => {
    saveFile(req, res);
});

router.on('delete /delete/:fileName', (req, res) => {
    deleteFile(req, res);
});

router.on('default', (req, res) => {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
});

module.exports = (req, res) => {
    const path = req.url.split('?')[0];
    const eventKey = `${req.method.toLowerCase()} ${path.startsWith('/delete/') ? '/delete/:fileName' : path}`;

    if (router.listenerCount(eventKey) > 0) {
        router.router(req, res);
    } else {
        router.emit('default', req, res);
    }
};
