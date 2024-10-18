import { useQuery } from "@tanstack/react-query";
import apiClient from "../../../network/axios";

// Hàm dùng chung để fetch dữ liệu từ API
const useFetchData = (queryKey: string[], url: string, resultKey?: string) => {
  return useQuery({
    queryKey,
    queryFn: async () => {
      const response = await apiClient.get(url);
      // Nếu resultKey tồn tại, trả về dữ liệu từ key này, ngược lại trả về toàn bộ data
      return resultKey ? response.data[resultKey] : response.data;
    },
  });
};

export default useFetchData;
