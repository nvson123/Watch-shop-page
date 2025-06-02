import { useQuery } from '@tanstack/react-query';
import instance from '@/api/axiosIntance';

// Cập nhật hàm fetchPaymentByUserId để nhận page và limit
export const fetchPaymentByUserId = async (
  userId: string,
  page: number,
  limit: number
) => {
  try {
    // Truyền tham số page và limit vào URL
    const res = await instance.get(`/order/${userId}`, {
      params: {
        page,
        limit,
      },
    });

    if (res.status !== 200 && res.status !== 201) {
      console.error('Unexpected status code:', res.status, res.statusText);
      throw new Error(
        `Error while fetching categories - status code: ${res.status}`
      );
    }

    return res.data;
  } catch (error: any) {
    if (error.response) {
      console.error('Response error:', error.response.data);
    } else {
      console.error('Request error:', error.message);
    }
    throw new Error('Error while fetching categories');
  }
};

// Cập nhật hook để nhận page và limit
export const useFetchAddressByUserId = (
  userId: string,
  page: number,
  limit: number
) => {
  return useQuery({
    queryKey: ['payment-online', page, limit], // Thêm page và limit vào queryKey
    queryFn: () => fetchPaymentByUserId(userId, page, limit),
    enabled: !!userId,
  });
};
