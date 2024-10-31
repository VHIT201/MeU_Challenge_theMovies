import axios from 'axios';
// const API_KEY = import.meta.env.VITE_API_KEY;
// const API_KEY = "2f30a285847bcb6a4f1befca239cfc20";
// // const API_TOKEN = import.meta.env.VITE_API_TOKEN;
// const API_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyZjMwYTI4NTg0N2JjYjZhNGYxYmVmY2EyMzljZmMyMCIsIm5iZiI6MTcyNzE3MDMwOC4wNjgzMDEsInN1YiI6IjY2ZjIyYTc2ZGUyZDUyZGZiZDhkNjJmNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.LsbQe7RIJpuLjBGl5huNheOodieA0REwmOXzgLus7JM";

const API_KEY = 'ae722869d6f14e76aebfb0d1fd961dd7';
const API_TOKEN =
    'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZTcyMjg2OWQ2ZjE0ZTc2YWViZmIwZDFmZDk2MWRkNyIsIm5iZiI6MTczMDM4NDkxMi42OTg3MDgzLCJzdWIiOiI2NmRhN2NiMDY4NjNjNGY4OWUzNGQyNDciLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.J4mw1lUY3rabyho55AsqCQcjl0FOnGx4tqXKcjHfyag';

const apiClient = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
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
    },
);

export default apiClient;
