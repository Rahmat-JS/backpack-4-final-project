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

        console.log('Parsed fields:', fields);
        console.log('Parsed files:', files);

        const file = files.file[0];

        if (!file || !file.filepath) {
            console.error('File or filepath is missing');
            res.writeHead(400, {'Content-Type': 'text/plain'});
            res.end('فایلی ارسال نشده است');
            return;
        }

        
        console.log('originalFilename:', file.originalFilename);

        const oldPath = file.filepath; 
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

        fs.rename(oldPath, newPath, (err) => {
            if (err) {
                console.error('Error during file rename:', err);
                res.writeHead(500, {'Content-Type': 'text/plain'});
                res.end('خطای سرور');
                return;
            }
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.end('فایل آپلود شد');
        });
    });
};

module.exports = {
    uploadFile
};
