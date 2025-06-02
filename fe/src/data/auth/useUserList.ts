import { useQuery } from '@tanstack/react-query';
import instance from '../../api/axiosIntance';
import { QUERY_KEY } from '../stores/key';
import { useEffect, useState } from 'react';

export interface User {
  _id: string;
  username: string;
  email: string;
  avatar: string;
  role: string;
  status: 'ACTIVE' | 'BLOCKED';
}

// Hàm fetch users từ API
export const fetchUsers = async () => {
  try {
    console.log('Fetching users...'); // Log để kiểm tra request
    const res = await instance.get<{ data: User[] }>('/users');

    console.log('Response from server:', res); // Log chi tiết response từ server

    if (res.status !== 200 && res.status !== 201) {
      console.error('Unexpected status code:', res.status, res.statusText);
      throw new Error(`Error while fetching users - status code: ${res.status}`);
    }

    return res.data;
  } catch (error: any) {
    if (error.response) {
      console.error('Response error:', error.response.data);
    } else {
      console.error('Request error:', error.message);
    }
    throw new Error('Error while fetching users');
  }
};

// Hook `useFetchUsers` sử dụng `useQuery` để gọi API
export const useFetchUsers = () => {
  return useQuery({
    queryKey: [QUERY_KEY.FETCH_USERS],
    queryFn: fetchUsers,
  });
};

// Hook để lấy tất cả users (không sử dụng `useQuery`)
export const useFetchAllUsers = () => {
  const [listUsers, setListUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const res = await instance.get<{ data: User[] }>('/users');
        setListUsers(res.data.data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAllUsers();
  }, []);

  return { listUsers, loading, error };
};
