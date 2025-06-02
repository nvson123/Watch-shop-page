import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import instance from '@/api/axiosIntance';
import { QUERY_KEY } from '../stores/key';

interface Order {
  id: string;
  totalPrice: number;
  status: string;
}

interface MetaData {
  totalItems: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
}

interface OrdersResponse {
  data: Order[];
  meta: MetaData;
  statusCounts: Record<string, number>;
  totalDeliveredAmount: number;
}

export const fetchOrders = async (params: {
  page?: number;
  limit?: number;
  status?: string;
  sortBy?: string;
  order?: string;
}): Promise<OrdersResponse> => {
  try {
    const res = await instance.get<OrdersResponse>('/orders', { params });

    if (res.status < 200 || res.status >= 300) {
      throw new Error(
        `Error while fetching orders - status code: ${res.status}`
      );
    }

    return res.data;
  } catch (error: any) {
    console.error(
      'Error while fetching orders:',
      error.response?.data || error.message
    );
    throw error;
  }
};

// Hook lấy đơn hàng với tham số từ query
export const useFetchOrders = (params: FetchOrdersParams) => {
  const query = useQuery<OrdersResponse>({
    queryKey: ['orders', params],
    queryFn: () => fetchOrders(params),
    enabled: !!params, // Chỉ kích hoạt query nếu params không rỗng
  });

  return {
    ...query,
    totalDeliveredAmount: query.data?.totalDeliveredAmount || 0, // Tổng giá trị đã giao hàng
    statusCounts: query.data?.statusCounts || {}, // Đếm trạng thái đơn hàng
  };
};

// Hook thứ hai: Dành cho danh sách đơn hàng với meta (có phân trang)
export const useFetchOrdersStatus = (params: FetchOrdersParams) => {
  const query = useQuery<OrdersResponse>({
    queryKey: ['orders', params],
    queryFn: () => fetchOrders(params),
    enabled: !!params,
  });

  return {
    ...query,
    data: query.data?.data || [], // Dữ liệu đơn hàng
    meta: query.data?.meta || {
      totalItems: 0,
      totalPages: 0,
      currentPage: 0,
      pageSize: 10,
    }, // Phân trang mặc định
    totalDeliveredAmount: query.data?.totalDeliveredAmount || 0, // Tổng giá trị đã giao hàng
    statusCounts: query.data?.statusCounts || {}, // Đếm trạng thái đơn hàng
  };
};

export const useFetchSuccessfulOrderCount = () => {
  return useQuery({
    queryKey: ['successfulOrderCount'],
    queryFn: async () => {
      const { data } = await instance.get('/count-successful-orders'); // Đảm bảo endpoint chính xác
      return {
        successfulOrders: data.successfulOrders,
        totalDeliveredAmount: data.totalDeliveredAmount,
      };
    },
  });
};

// Hook lấy tất cả đơn hàng
export const useFetchOrderAll = () => {
  const [listOrder, setListOrder] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalDeliveredAmount, setTotalDeliveredAmount] = useState(0);
  const [statusCounts, setStatusCounts] = useState<Record<string, number>>({}); // Thêm trạng thái đếm đơn hàng

  useEffect(() => {
    const fetchAllOrders = async () => {
      try {
        const response = await fetchOrders({});
        setListOrder(response.data);
        setTotalDeliveredAmount(response.totalDeliveredAmount);
        setStatusCounts(response.statusCounts); // Lưu lại statusCounts
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAllOrders();
  }, []);

  return { listOrder, loading, error, totalDeliveredAmount, statusCounts };
};

// Hàm lấy đơn hàng theo userId
export const fetchOrdersByUserId = async (
  userId: string
): Promise<OrdersResponse> => {
  try {
    console.log(`Fetching orders for userId: ${userId}`);
    const res = await instance.get<OrdersResponse>(`/orders/${userId}`);

    if (res.status !== 200 && res.status !== 201) {
      throw new Error(
        `Error while fetching orders - status code: ${res.status}`
      );
    }

    return res.data;
  } catch (error: any) {
    console.error('Error while fetching orders by userId:', error.message);
    throw new Error('Error while fetching orders');
  }
};

// Hook lấy đơn hàng theo userId
export const useFetchOrdersByUserId = (
  userId: string,
  page: number = 1,
  limit: number = 10
) => {
  return useQuery({
    queryKey: [QUERY_KEY.FETCH_ORDERS_BY_USER, userId, page, limit], // Thêm page và limit vào queryKey để đảm bảo cache đúng
    queryFn: () => fetchOrdersByUserId(userId, page, limit),
    enabled: !!userId, // Chỉ gọi khi có userId
  });
};
