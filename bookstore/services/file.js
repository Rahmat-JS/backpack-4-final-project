const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');

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
