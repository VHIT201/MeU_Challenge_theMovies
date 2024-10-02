import axios from 'axios';

const API_KEY = import.meta.env.VITE_API_KEY;
const API_TOKEN = import.meta.env.VITE_API_TOKEN;


const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${API_TOKEN}`, 
  },
  params: {
    api_key: API_KEY, 
  },
  timeout: 10000, 
});

// Thêm interceptor để xử lý lỗi và logging
apiClient.interceptors.response.use(
  (response) => {
    // Xử lý response
    return response;
  },
  (error) => {
    // Xử lý lỗi (ví dụ: refresh token hoặc logging)
    if (error.response) {
      console.error('API Error:', error.response.status, error.response.data);
    } else {
      console.error('Network Error:', error.message);
    }
    return Promise.reject(error);
  }
);

export default apiClient;
