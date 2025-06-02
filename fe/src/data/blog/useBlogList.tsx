import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '../stores/key';
import instance from '@/api/axiosIntance';

// Hàm fetch danh sách bài viết từ API
export const fetchPosts = async (params: PostParams) => {
  try {
    console.log('Fetching posts with params:', params);
    const res = await instance.get<{ data: Post[]; meta: MetaData }>('/posts', {
      params,
    });

    if (res.status !== 200 && res.status !== 201) {
      throw new Error(
        `Error while fetching posts - status code: ${res.status}`
      );
    }

    return res.data;
  } catch (error: any) {
    console.error('Error while fetching posts:', error.message);
    throw new Error('Error while fetching posts');
  }
};
// Hook `useFetchPosts` để gọi API và lấy danh sách bài viết

export const useFetchPosts = (params: PostParams) => {
  return useQuery({
    queryKey: [QUERY_KEY.FETCH_POSTS, params],
    queryFn: () => fetchPosts(params),
    enabled: !!params, // Ensures the query runs only if params are provided
  });
};
