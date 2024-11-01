import apiClient from '@/network/axios';

export const fetchUserInfo = async () => {
    try {
        const response = await apiClient.get('/account');
        return response.data; // Return the data for further use if needed
    } catch (error) {
        console.error('Failed to fetch user info:', error);
        throw error; // Re-throw the error to handle it in the calling function
    }
};
