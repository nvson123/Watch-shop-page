import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '../stores/key';
import instance from '@/api/axiosIntance';

// Hàm fetch bình luận từ API theo productId
export const fetchComments = async (productId: string) => {
  try {
    // Gọi API lấy tất cả bình luận cho sản phẩm
    const res = await instance.get<{ data: Comment[] }>(`/comments/product/${productId}`);
    
    if (res.status !== 200) {
      throw new Error(`Error fetching comments: ${res.status}`);
    }

    return res.data; // Dữ liệu bao gồm cả bình luận và thông tin người dùng
  } catch (error: any) {
    throw new Error('Error fetching comments');
  }
};

// Hook `useFetchComments` sử dụng `useQuery` để gọi API lấy bình luận theo productId
export const useFetchComments = (productId: string) => {
  return useQuery({
    queryKey: [QUERY_KEY.FETCH_COMMENT_BY_PRODUCT, productId], // Sử dụng productId để làm key
    queryFn: () => fetchComments(productId),
    enabled: !!productId, // Chỉ gọi API khi productId đã có giá trị
  });
};
