import apiClient from "@/lib/http";

export const fetchUserInfo = async () => {
    try {
      const response = await apiClient.get('/account');
      return response.data;
    } catch {
      throw new Error("Not Found Data");
    }
};