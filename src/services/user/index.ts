import apiClient from '@/lib/http';
import userAxios from '@/network/userAxios';
import { useUserStore } from '@/store/userStore';

export const fetchUserInfo = async () => {
    try {
        const response = await apiClient.get('/account');
        return response.data;
    } catch {
        throw new Error('Not Found Data');
    }
};

export const loginUser = async (username: string, password: string) => {
    try {
        const response = await userAxios.post('/identityusers/login', {
            username,
            password,
        });
        if (response.status === 200) {
            return response.data.data;
        }
        throw new Error('Đăng nhập không thành công');
    } catch (error) {
        throw error;
    }
};

export const getInformation = async (username: string) => {
    const setUserInfo = useUserStore.getState().setUserInfo;
    try {
        const response = await userAxios.get(`/identityusers/information?username=${username}`);
        setUserInfo(response.data.data);
        return response.data.data;
    } catch (error) {
        console.log(error);
    }
};
