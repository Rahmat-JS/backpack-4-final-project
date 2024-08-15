const formidable = require('formidable');
const path = require('path');
const fs = require('fs');

const uploadFile = (req, res) => {
    const form = new formidable.IncomingForm();
    form.uploadDir = path.join(__dirname, '../uploads');
    form.keepExtensions = true;

    form.parse(req, (err, fields, files) => {
        if (err) {
            console.error('Error during form parsing:', err);
            res.writeHead(500, {'Content-Type': 'text/plain'});
            res.end('خطای سرور');
            return;
        }

        const file = files.file[0];

        if (!file || !file.filepath) {
            console.error('File or filepath is missing');
            res.writeHead(400, {'Content-Type': 'text/plain'});
            res.end('فایلی ارسال نشده است');
            return;
        }

        const originalFilename = file.originalFilename;
        const ext = path.extname(originalFilename);

        if (!originalFilename || !ext) {
            console.error('Invalid filename or extension');
            res.writeHead(400, {'Content-Type': 'text/plain'});
            res.end('نام فایل یا پسوند فایل نامعتبر است');
            return;
        }

        const newFileName = Date.now() + ext;
        const newPath = path.join(form.uploadDir, newFileName);

        fs.rename(file.filepath, newPath, (err) => {
            if (err) {
                console.error('Error during file rename:', err);
                res.writeHead(500, {'Content-Type': 'text/plain'});
                res.end('خطای سرور');
                return;
            }
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.end(`فایل با نام ${newFileName} آپلود شد`);
        });
    });
};

const getFile = (req, res) => {
    const fileName = req.url.split('/').pop();
    const filePath = path.join(__dirname, '../uploads', fileName);

    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            console.error('File does not exist:', fileName);
            res.writeHead(404, {'Content-Type': 'text/plain'});
            res.end('فایل یافت نشد');
            return;
        }

        res.writeHead(200, {'Content-Type': 'application/octet-stream'});
        fs.createReadStream(filePath).pipe(res);
    });
};

module.exports = {
    uploadFile,
    getFile
};
