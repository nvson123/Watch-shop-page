import instance from '../../api/axiosIntance';
import { toast } from '@medusajs/ui';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { AxiosError } from 'axios';

// Định nghĩa kiểu cho phản hồi đăng nhập (tùy chỉnh theo cấu trúc phản hồi của API)
interface LoginResponse {
  status_code: number;
  error_code?: string;
  message?: string;
  token?: string; // Token nếu API trả về để sử dụng cho xác thực
  user: { _id: string; role: string };
}

export default function useLoginMutation() {
  const navigate = useNavigate();

  const loginMutation = useMutation<LoginResponse, AxiosError, Ilogin>({
    mutationFn: async ({ email, password }: Ilogin) => {
      try {
        const response = await instance.post<LoginResponse>('/signin', {
          email,
          password,
        });
        localStorage.setItem('user', JSON.stringify(response.data));
        return response.data;
      } catch (error) {
        // Kiểm tra nếu lỗi là AxiosError và có phản hồi từ API
        if (error instanceof AxiosError && error.response) {
          throw new Error(
            error.response.data?.message || 'Kiểm tra lại thông tin đăng nhập'
          );
        }
        throw new Error('Đã xảy ra lỗi không xác định');
      }
    },

    onSuccess: data => {
      if (data.status_code === 400) {
        toast.error('Đăng nhập', {
          description: 'Thông tin đăng nhập không chính xác',
        });
        return;
      }
      setTimeout(() => {
        toast.success('Đăng nhập', {
          description: 'Bạn đã đăng nhập thành công',
          duration: 1000,
        });
      }, 100);
      // Lưu trữ thông tin người dùng và token (nếu có)
      localStorage.setItem('userId', data.user._id);
      if (data.token) {
        localStorage.setItem('token', data.token);
      }

      // Điều hướng dựa vào vai trò của người dùng
      if (data.user.role === 'admin') {
        toast.success('Đăng nhập', {
          description: 'Bạn đã đăng nhập thành công vào trang quản trị',
          duration: 1000,
        });
        setTimeout(() => {
          void navigate({ to: '/' });
        }, 2000); // Hoãn điều hướng để thông báo có thời gian hiển thị
      } else {
        void navigate({ to: '/' });
      }
    },

    onError: (error: Error) => {
      toast.error('Đăng nhập', {
        description: error.message || 'Đã xảy ra lỗi trong quá trình đăng nhập',
        duration: 3000,
      });
    },
  });

  return { loginMutation };
}
