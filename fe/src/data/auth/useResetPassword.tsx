import instance from '../../api/axiosIntance';
import { toast } from '@medusajs/ui';
import { AxiosError } from 'axios';

export const fetchUpdateNewPassword = async (newPassword: string) => {
  try {
    const response = await instance.post('/update-new-password', {
      newPassword,
    });

    toast.success('Cập nhật mật khẩu thành công', {
      description:
        'Mật khẩu của bạn đã được cập nhật thành công. Vui lòng đăng nhập lại.',
    });

    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      console.log(error.message);
      toast.error('Cập nhật mật khẩu thất bại', {
        description: error.response.data?.message || 'Vui lòng thử lại sau.',
      });
    } else {
      toast.error('Đã xảy ra lỗi không xác định', {
        description: 'Vui lòng thử lại sau.',
      });
    }
  }
};

export const requestResetPassword = async (email: string) => {
  try {
    const response = await instance.post('/request-reset-password', {
      email,
    });
    toast.success('Yêu cầu đặt lại mật khẩu thành công', {
      description: 'Vui lòng kiểm tra email của bạn để đặt lại mật khẩu',
    });
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      toast.error('Yêu cầu đặt lại mật khẩu thất bại', {
        description:
          error.response.data?.message ||
          'Đã xảy ra lỗi trong quá trình yêu cầu đặt lại mật khẩu',
      });
    } else {
      toast.error('Đã xảy ra lỗi không xác định', {
        description: 'Vui lòng thử lại sau',
      });
    }
  }
};

export const checkValidCode = async (code: string) => {
  try {
    const response = await instance.post('/check-valid-code', {
      code,
    });
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      console.log(error.message);
    }
  }
};
