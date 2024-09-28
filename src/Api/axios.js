import axios from "axios";

export default axios.create({
    // const token = localStorage.getItem("token")
    // baseURL: 'http://127.0.0.1:8000/api',
    baseURL: 'http://143.244.180.220:8001/api',
    
    headers: {
        'Authorization': `Bearer ${localStorage.getItem("token")}`,  // Include the token in the Authorization header
    },

});


