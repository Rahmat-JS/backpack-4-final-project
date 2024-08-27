const http = require('http');
const router = require('./router/main');
const url = require('url');
const path = require("path");
const fs = require("fs");
const port = 3000;

const serverconection = (req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;

    if (pathname.startsWith('/uploads')) {
        const filepath = path.join(__dirname, pathname);
        fs.readFile(filepath, (err, data) => {
            if (err) {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.write('<h1>404 Not Found</h1>');
                res.end();
            } else {
                res.writeHead(200);
                res.write(data);
                res.end();
            }
        });
    } else {
        router(req, res);
    }
};

const server = http.createServer(serverconection);

server.listen(port, () => {
    console.log(`Server running at http://127.0.0.1:${port}/`);
});
