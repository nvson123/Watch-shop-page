import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '../stores/key';
import instance from '@/api/axiosIntance';
import { Coupon } from '@/types/coupon';

// Hàm fetch danh sách mã giảm giá từ API
export const fetchCoupons = async (params: CouponParams) => {
  try {
    console.log('Fetching coupons with params:', params);
    const res = await instance.get<{ data: Coupon[]; meta: MetaData }>(
      '/get-coupon',
      { params }
    );

    if (res.status !== 200 && res.status !== 201) {
      throw new Error(
        `Error while fetching coupons - status code: ${res.status}`
      );
    }

    return res.data;
  } catch (error: any) {
    console.error('Error while fetching coupons:', error.message);
    throw new Error('Error while fetching coupons');
  }
};

// Hook `useFetchCoupons` để gọi API và lấy danh sách mã giảm giá
export const useFetchCoupons = (params: CouponParams) => {
  return useQuery({
    queryKey: [QUERY_KEY.FETCH_COUPONS, params],
    queryFn: () => fetchCoupons(params),
    enabled: !!params,
  });
};

// Hàm fetch chi tiết mã giảm giá bằng ID
export const fetchCouponById = async (_id: string): Promise<Coupon> => {
  try {
    const res = await instance.get<{ data: Coupon }>(`/coupon/${_id}`);
    if (res.status !== 200) {
      throw new Error('Error while fetching coupon');
    }
    return res.data;
  } catch (error) {
    console.error('Error while fetching coupon:', error);
    throw error;
  }
};

// Hook `useFetchCouponById` để lấy chi tiết mã giảm giá
export const useFetchCouponById = (_id: string) => {
  return useQuery({
    queryKey: [QUERY_KEY.FETCH_COUPON, _id],
    queryFn: () => fetchCouponById(_id),
    enabled: !!_id,
  });
};

export const fetchAvailableCoupons = async (
  orderAmount: number,
  userId: string,
  code?: string // Thêm tham số code (không bắt buộc)
): Promise<Coupon[]> => {
  try {
    const res = await instance.get('/available-coupon', {
      params: { orderAmount, userId, code }, // Gửi orderAmount, userId và code nếu có
    });

    if (res.status !== 200) {
      throw new Error(
        `Error while fetching available coupons - status: ${res.status}`
      );
    }

    // Kiểm tra response có phải là mảng hợp lệ
    if (!Array.isArray(res.data)) {
      throw new Error('Invalid response format from server.');
    }

    return res.data;
  } catch (error: any) {
    console.error('Error fetching available coupons:', error.message);
    throw error;
  }
};

// Hook `useFetchAvailableCoupons` để lấy danh sách mã giảm giá hoặc áp dụng mã cụ thể
// Hook sử dụng để fetch danh sách mã giảm giá khả dụng
export const useFetchAvailableCoupons = (
  orderAmount: number,
  userId: string,
  code?: string // Tham số code không bắt buộc
) => {
  return useQuery({
    queryKey: ['availableCoupons', orderAmount, userId, code], // Bao gồm code vào queryKey nếu có
    queryFn: () => {
      if (!orderAmount || !userId) {
        throw new Error('orderAmount và userId là bắt buộc');
      }
      return fetchAvailableCoupons(orderAmount, userId, code);
    },
    enabled: !!orderAmount && !!userId, // Chỉ kích hoạt nếu orderAmount và userId tồn tại
    onError: error => {
      console.error('Không thể tải mã giảm giá khả dụng:', error);
    },
  });
};

// Hàm fetch người dùng đã sử dụng mã giảm giá cụ thể
export const fetchCouponUsers = async (couponId: string): Promise<User[]> => {
  try {
    const res = await instance.get<{ users: User[] }>(
      `/coupon/${couponId}/users`
    );

    if (res.status !== 200) {
      throw new Error(
        `Không thể tải người dùng của mã giảm giá - trạng thái: ${res.status}`
      );
    }

    return res.data.users;
  } catch (error: any) {
    console.error('Lỗi khi tải người dùng của mã giảm giá:', error.message);
    throw new Error('Không thể tải người dùng của mã giảm giá');
  }
};
