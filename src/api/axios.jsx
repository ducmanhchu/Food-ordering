import axios from 'axios';

const axiosClient = axios.create({
    baseURL: 'https://jellybellywikiapi.onrender.com/api', // API Test
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosClient.interceptors.response.use(
    (response) => response.data, 
    (error) => Promise.reject(error.response?.data || error)
);

export default axiosClient;
