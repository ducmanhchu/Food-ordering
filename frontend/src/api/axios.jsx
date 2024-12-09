import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://127.0.0.1:8000/tlu",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

axiosClient.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject(error.response?.data || error)
);

const token = localStorage.getItem("access_token");  // Đảm bảo lấy token từ localStorage

axiosClient.interceptors.request.use(
  (config) => {
    if (token && !config.url.includes("/login/") && !config.url.includes("/register/")) {
      config.headers["Authorization"] = `Bearer ${token}`;  // Gửi token trong header Authorization
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


export default axiosClient;
