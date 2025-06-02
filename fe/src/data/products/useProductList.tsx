import { useQuery } from '@tanstack/react-query';
import instance from '@/api/axiosIntance';
import { QUERY_KEY } from '../stores/key';
import { useEffect, useState } from 'react';

// Hàm fetch sản phẩm từ API
export const fetchProduct = async (params: ProductParams) => {
  try {
    console.log('Fetching products with params:', params); // Log các tham số request
    const res = await instance.get<{
      data: Product[];
      meta: MetaData;
    }>('/products', { params });

    console.log('Response from server:', res); // Log chi tiết response từ server

    // Thay đổi điều kiện kiểm tra để chấp nhận cả mã 200 và 201
    if (res.status !== 200 && res.status !== 201) {
      console.error('Unexpected status code:', res.status, res.statusText);
      throw new Error(
        `Error while fetching products - status code: ${res.status}`
      );
    }

    return res.data;
  } catch (error: any) {
    // Log chi tiết lỗi để kiểm tra thêm
    if (error.response) {
      console.error('Response error:', error.response.data);
    } else {
      console.error('Request error:', error.message);
    }
    throw new Error('Error while fetching products');
  }
};

// Hook `useFetchProducts` sử dụng `useQuery` để gọi API
export const useFetchProducts = (params: ProductParams) => {
  return useQuery({
    queryKey: [QUERY_KEY.FETCH_PRODUCT, params],
    queryFn: () => fetchProduct(params),
    enabled: !!params,
  });
};

export const useFetchProductAll = () => {
  const [listProduct, setListProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await instance.get('/product');
        setListProduct(response.data.data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return { listProduct, loading, error };
};

export const fetchCategory = async () => {
  try {
    console.log('Fetching categories...'); // Log các tham số request
    const res = await instance.get<{
      map(
        arg0: (category: Category) => import('react/jsx-runtime').JSX.Element
      ): import('react').ReactNode;
      data: Category[];
    }>('/categories');

    // Kiểm tra mã trạng thái
    if (res.status !== 200 && res.status !== 201) {
      console.error('Unexpected status code:', res.status, res.statusText);
      throw new Error(
        `Error while fetching categories - status code: ${res.status}`
      );
    }

    return res.data; // Đảm bảo rằng bạn trả về đúng dữ liệu
  } catch (error: any) {
    // Log chi tiết lỗi để kiểm tra thêm
    if (error.response) {
      console.error('Response error:', error.response.data);
    } else {
      console.error('Request error:', error.message);
    }
    throw new Error('Error while fetching categories');
  }
};

// Hook `useFetchCategory` sử dụng `useQuery` để gọi API
export const useFetchCategory = () => {
  return useQuery({
    queryKey: [QUERY_KEY.FETCH_CATEGORIES],
    queryFn: fetchCategory, // Gọi hàm fetchCategory
  });
};

export const fetchCategoryShow = async () => {
  try {
    console.log('Fetching categories...'); // Log các tham số request
    const res = await instance.get<{
      map(
        arg0: (category: Category) => import('react/jsx-runtime').JSX.Element
      ): import('react').ReactNode;
      data: Category[];
    }>('/category');

    // Kiểm tra mã trạng thái
    if (res.status !== 200 && res.status !== 201) {
      console.error('Unexpected status code:', res.status, res.statusText);
      throw new Error(
        `Error while fetching categories - status code: ${res.status}`
      );
    }

    return res.data; // Đảm bảo rằng bạn trả về đúng dữ liệu
  } catch (error: any) {
    // Log chi tiết lỗi để kiểm tra thêm
    if (error.response) {
      console.error('Response error:', error.response.data);
    } else {
      console.error('Request error:', error.message);
    }
    throw new Error('Error while fetching categories');
  }
};

// Hook `useFetchCategory` sử dụng `useQuery` để gọi API
export const useFetchCategoryShow = () => {
  return useQuery({
    queryKey: [QUERY_KEY.FETCH_CATEGORIES],
    queryFn: fetchCategoryShow, // Gọi hàm fetchCategory
  });
};
