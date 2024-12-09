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

axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access");

    if (
      token &&
      !config.url.includes("/login/") &&
      !config.url.includes("/register/")
    ) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosClient;
