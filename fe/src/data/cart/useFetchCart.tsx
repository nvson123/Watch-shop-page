import { useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import instance from '@/api/axiosIntance';
import { useSocket } from '../socket/useSocket';

export interface CartProduct {
  productId: string; 
  variantId: string;
  name: string;
  price: number;
  priceAtTime?: number;
  quantity: number;
  image: string;
  color?: string;
  size?: string;
}

interface CartData {
  products: CartProduct[];
}

// Hàm fetch giỏ hàng
const fetchCart = async (userId: string): Promise<CartData> => {
  const response = await instance.get(`/cart/${userId}`);
  return response.data;
};

// Hook lấy giỏ hàng và lắng nghe sự kiện
export const useFetchCart = (userId: string) => {
  const queryClient = useQueryClient();
  const socket = useSocket();

  // Fetch giỏ hàng
  const { data, refetch, isLoading, isError, error } = useQuery({
    queryKey: ['cart'],
    queryFn: () => fetchCart(userId),
    enabled: !!userId,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  // Lắng nghe sự kiện update-cart từ socket
  useEffect(() => {
    
    if (!socket) return;
    ;

    const handleCartUpdate = () => {
      queryClient.invalidateQueries({
        queryKey: ['cart'],
      });
    };
    
    socket.on('update-cart', handleCartUpdate);
    return () => {
      socket.off('update-cart', handleCartUpdate);
    };
  }, [socket, queryClient, userId]);

  return { data, refetch, isLoading, isError, error };
};
