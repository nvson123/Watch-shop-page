import { useEffect } from 'react';
import instance from '@/api/axiosIntance';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useSocket } from '../socket/useSocket';

export const useFetchProductBySlug = (slug: string) => {
  const queryClient = useQueryClient();
const socket = useSocket();
  const { data, isLoading, isError } = useQuery(
    ['product', slug], // queryKey gồm slug để định danh duy nhất
    async () => {
      const response = await instance.get(`/products/slug/${slug}`);
      if (response.data && response.data.product) {
        return response.data.product;
      } else {
        throw new Error('Dữ liệu sản phẩm không có');
      }
    },
    {
      enabled: !!slug, // Chỉ thực thi query nếu slug không rỗng
    }
  );

  useEffect(() => {
    const handleCartUpdate = () => {
      queryClient.invalidateQueries(['products']);
    };

    socket.on('update-cart', handleCartUpdate);

    return () => {
      socket.off('update-cart', handleCartUpdate);
    };
  }, [queryClient]);

  return { data, isLoading, isError };
};
