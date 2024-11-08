import axios from 'axios';

const createUserAxiosInstance = () => {
    const USER_TOKEN = localStorage.getItem('userToken');

    const headers = {
        'Content-Type': 'application/json',
        ...(USER_TOKEN && { Authorization: `Bearer ${USER_TOKEN}` }),
    };

    return axios.create({
        baseURL: 'http://localhost:5170/api/v1',
        headers: headers,
        timeout: 10000,
    });
};

const userAxios = createUserAxiosInstance();

userAxios.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            console.error('User API Error:', error.response.status, error.response.data);
        } else {
            console.error('Network Error:', error.message);
        }
        return Promise.reject(error);
    }
);

export default userAxios;
