import axios from "axios";
const getHeaders = () => {
    const token = localStorage.getItem("token");
    
    // Create an empty headers object
    const headers = {};
    
    // Check if the token exists, if so set the Authorization header
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }
    
    return headers;
};
export default axios.create({
    // const token = localStorage.getItem("token")
    // baseURL: 'http://127.0.0.1:8000/api',
    baseURL: 'http://143.244.180.220:8001/api',
    // baseURL: 'http://167.172.151.37:8001/api',
    
    // headers: {
    //     'Authorization': `Bearer ${localStorage.getItem("token")}`,  // Include the token in the Authorization header
    // },
    headers: getHeaders(),

});


