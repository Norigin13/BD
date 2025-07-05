import axios from "axios";

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// làm 1 hd gì đó trc khi call api
const handleBefore = (config) => {
  const token = localStorage.getItem("token")?.replaceAll('"', "");
  config.headers["Authorization"] = `Bearer ${token}`;
  return config;
};

const handleError = (error) => {
  console.error("API Request Error:", error); // Thêm log để kiểm tra lỗi
  return Promise.reject(error);
};

api.interceptors.request.use(handleBefore, handleError);

export default api;