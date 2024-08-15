const fs = require('fs');
const path = require('path');
const formidable = require('formidable');

const uploadsDir = path.join(__dirname, '../uploads');


function saveFile(req, res) {
    const form = new formidable.IncomingForm();
    form.uploadDir = uploadsDir;
    form.keepExtensions = true;

    form.parse(req, (err, fields, files) => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Error uploading file');
            return;
        }

        const file = files.file[0];

        if (!file || !file.originalFilename) {
            res.writeHead(400, { 'Content-Type': 'text/plain' });
            res.end('File upload failed');
            return;
        }

        const newFileName = file.newFilename;
        const fileExtension = path.extname(file.originalFilename);
        const finalPath = path.join(uploadsDir, newFileName + fileExtension);

        fs.rename(file.filepath, finalPath, (err) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Error uploading file');
                return;
            }

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
                filePath: finalPath,
                fileName: newFileName + fileExtension
            }));
        });
    });
}


function deleteFile(fileName, res) {
    const filePath = path.join(uploadsDir, fileName);

    if (fs.existsSync(filePath)) {
        fs.unlink(filePath, (err) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Error deleting file');
                return;
            }

            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('File deleted successfully');
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('File not found');
    }
}

module.exports = { saveFile, deleteFile };
