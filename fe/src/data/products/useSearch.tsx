import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from '../stores/key';
import instance from '@/api/axiosIntance';


interface SearchParams {
  search: string;
  limit?: number;
  page?: number;
}

interface Product {
  id: string;
  name: string;
  // Thêm các trường khác nếu cần
}

interface SearchResponse {
  data: Product[];
  meta: {
    totalItems: number;
    totalPages: number;
    currentPage: number;
    limit: number;
  };
}

export const fetchSearchResults = async (params: SearchParams): Promise<SearchResponse> => {
  try {
    // Đảm bảo endpoint là "/products/search" và params được truyền đúng
    const response = await instance.get<SearchResponse>("/search", { params });
    if (response.status !== 200 && response.status !== 201) {
      throw new Error(`Unexpected status code: ${response.status}`);
    }
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Error fetching search results");
  }
};


export const useSearch = (searchTerm: string, limit = 10, page = 1) => {
  return useQuery({
    queryKey: [QUERY_KEY.SEARCH_PRODUCT, searchTerm, limit, page],
    queryFn: () => fetchSearchResults({ search: searchTerm, limit, page }),
    enabled: searchTerm.trim().length >= 2, // Chỉ gọi API nếu từ khóa có độ dài >= 2
    staleTime: 5 * 60 * 1000, // Giữ kết quả trong 5 phút
  });
};
