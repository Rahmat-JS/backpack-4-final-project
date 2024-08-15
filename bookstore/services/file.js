const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');

module.exports = class FileService {

    async uploadFile(filePath) {
        const formData = new FormData();
        formData.append('file', fs.createReadStream(filePath));

        axios.post('http://127.0.0.1:3000/upload', formData, {
            headers: formData.getHeaders()
        })
            .then(response => {
                return response.data;
            })
            .catch(error => {
                throw new Error(error.message);
            });
    }

    async downloadFile(fileName) {
        axios.get(`http://127.0.0.1:3000/download/${fileName}`, { responseType: 'stream' })
            .then(response => {
                const writer = fs.createWriteStream(`./downloaded_${fileName}`);
                response.data.pipe(writer);

                writer.on('finish', () => {
                    console.log('File downloaded successfully.');
                });

                writer.on('error', (err) => {
                    console.error('Error downloading file:', err.message);
                });
            })
            .catch(error => {
                console.error('Error fetching file:', error.message);
            });
    }

    deleteFile(fileName) {
        axios.delete(`http://127.0.0.1:3000/delete/${fileName}`)
            .then(response => {
                console.log('File deleted successfully:', response.data);
            })
            .catch(error => {
                console.error('Error deleting file:', error.message);
            });
    }

}
