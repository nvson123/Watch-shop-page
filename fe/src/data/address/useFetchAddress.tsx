import { useQuery } from '@tanstack/react-query';
import instance from '@/api/axiosIntance';

export const fetchAddress = async (userId: string) => {
  try {
    console.log('Fetching customer data for userId:', userId);
    const res = await instance.get(`/create-customer/${userId}`);

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

export const useFetchAddress = (userId: string) => {
  return useQuery({
    queryKey: ['customers'],
    queryFn: () => fetchAddress(userId),
    enabled: !!userId,
  });
};
