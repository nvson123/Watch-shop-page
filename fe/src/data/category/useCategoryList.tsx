import { useQuery } from '@tanstack/react-query';
import instance from '@/api/axiosIntance';
import { QUERY_KEY } from '../stores/key';

// Hàm fetch danh mục từ API
export const fetchCategory = async (params: CategoryParams) => {
  try {
    console.log('Fetching categories with params:', params); 
    const res = await instance.get<{
      data: Category[];
      meta: MetaData;
    }>('/categories', { params });

    console.log('Response from server:', res); 

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


export const useFetchCategories = (params: CategoryParams) => {
  return useQuery({
    queryKey: [QUERY_KEY.FETCH_CATEGORIES, params],
    queryFn: () => fetchCategory(params),
    enabled: !!params,
  });
};

export const fetchCategoryById = async (_id: string): Promise<Category> => {
  try {
    const res: Category = await instance.get(`/categorys/${_id}`);
    if (res.status !== 200) {
      throw new Error('Error while fetching category');
    }
    return res.data;
  } catch (error) {
    console.error('Error while fetching category:', error);
    throw error;
  }
};

export const useFetchCategoryById = (_id: string) => {
  return useQuery({
    queryKey: [QUERY_KEY.FETCH_CATEGORIES, _id],
    queryFn: () => fetchCategoryById(_id),
  });
};
