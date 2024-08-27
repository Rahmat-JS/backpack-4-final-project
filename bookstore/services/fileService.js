const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');
const ManualException = require('../utils/error/Exception');


module.exports = class FileService {

    async uploadFile(filePath) {
        const formData = new FormData();
        formData.append('file', fs.createReadStream(filePath));

        try {
            const response = await axios.post('http://127.0.0.1:3000/upload', formData, {
                headers: formData.getHeaders()
            });
            return response.data;
        } catch (error) {
            console.error('Error uploading file:', error.message);
            throw error;
        }
    }

    async deleteFile(fileName) {
        try {
            const response = await axios.delete(`http://127.0.0.1:3000/delete/${fileName}`);
            console.log('file deleted successfully!');
        } catch(error) {
            throw new ManualException(500, `There is a problem on the server side, please contact support.`, error.message);
        }
    }
}
