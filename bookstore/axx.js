const axios = require('axios');

(async () => {
    try {
        const url = 'https://authentication.college.apipart.ir/service/authentication@7/authEntry';

        // Define the JSON body to send with the request
        const data = {
            "system": "musa_ku_taghi",
            "fields": {
                "username": "faadfwefcw",
                "password": "g23gqgrgea"
            },
            "status": "active"
        };

        // Define the headers
        const headers = {
            'Content-Type': 'application/json',  // Set the Content-Type to application/json
            'user': 'musa_ku_taghi',             // Custom header
            'pass': 'Q2r!5vM9%k'                 // Custom header
        };

        // Make the PUT request with the given URL, data, and headers
        const response = await axios.put(url, data, { headers });

        // Output the response to the console
        console.log(response.data?.data);
        // console.log(JSON.stringify(response.data, null, 2));
    } catch (error) {
        console.error('Error occurred:', error.message);
        if (error.response) {
            // If the error response exists, log more details
            console.error('Response data:', error.response.data);
            console.error('Status code:', error.response.status);
            console.error('Headers:', error.response.headers);
        }
    }
})();
