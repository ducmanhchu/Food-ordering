import axios from 'axios';

const axiosClient = axios.create({
    baseURL: 'http://localhost:8000/tlu',
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosClient.interceptors.response.use(
    (response) => response.data, 
    (error) => Promise.reject(error.response?.data || error)
);

export default axiosClient;
