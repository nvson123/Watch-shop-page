import instance from '@/api/axiosIntance';
import CustomUser from '@/components/useroder/custom-menu';
import { ChevronRightMini } from '@medusajs/icons';
import { Button, Input, toast } from '@medusajs/ui';
import { createFileRoute, Link } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

export const Route = createFileRoute('/_layout/change_password/')({
  component: PasswordUser,
});

function PasswordUser() {
  const [user, setUser] = useState<Iuser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<Iaccount>({
    mode: 'onChange',
  });

  const fetchUserInfo = async () => {
    const userId = localStorage.getItem('userId'); // Lấy userId từ localStorage

    if (!userId) {
      setLoading(false);
      return;
    }

    try {
      const response = await instance.get(`/user/info/${userId}`, {
        headers: {
          'user-id': userId, // Thêm userId vào header
        },
      });

      if (!response || !response.data || !response.data.user) {
        throw new Error(
          'Không thể lấy thông tin người dùng hoặc dữ liệu người dùng bị thiếu'
        );
      }

      setUser(response.data.user);
    } catch (err: any) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserInfo(); // Gọi fetchUserInfo khi component mount
  }, []);

  const onSubmit = async (data: any) => {
    const userId = localStorage.getItem('userId'); // Lấy userId từ localStorage

    if (!userId) {
      toast.error('User ID is missing');
      return;
    }

    // Kiểm tra các trường trống
    if ((data.newPassword || data.confirmPassword) && !data.oldPassword) {
      toast.error('Mật khẩu cũ là bắt buộc khi thay đổi mật khẩu mới');
      return;
    }

    if (
      (data.newPassword && !data.confirmPassword) ||
      (data.confirmPassword && !data.newPassword)
    ) {
      toast.error('Cả mật khẩu mới và xác nhận mật khẩu phải được nhập');
      return;
    }

    if (data.newPassword !== data.confirmPassword) {
      toast.error('Mật khẩu mới và xác nhận mật khẩu không khớp');
      return;
    }

    setIsSaving(true);

    try {
      const updateData: any = {
        avatar: data.avatar,
      };

      if (data.oldPassword && data.newPassword && data.confirmPassword) {
        updateData.oldPassword = data.oldPassword;
        updateData.newPassword = data.newPassword;
        updateData.confirmPassword = data.confirmPassword;
      }

      const response = await instance.put(
        `/user/update/${userId}`,
        updateData,
        {
          headers: {
            'user-id': userId, // Thêm userId vào header
          },
        }
      );

      if (response.status >= 200 && response.status < 300) {
        toast.success('Cập nhật mật khẩu thành công!');
        fetchUserInfo();
      } else {
        throw new Error('Cập nhật mật khẩu không thành công.');
      }
    } catch (err: any) {
      console.error(err);
      toast.error(
        err.response?.data?.message ||
          'Có lỗi khi cập nhật mật khẩu. Vui lòng thử lại.'
      );
    } finally {
      setIsSaving(false);
    }
  };

  // Kiểm tra mật khẩu mới có giống mật khẩu cũ không

  const oldPassword = user?.password; //

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!user) {
    return <div>Không có thông tin người dùng nào có sẵn</div>;
  }

  return (
    <div>
      <div className="flex h-48 w-full items-center justify-center">
        <div className="text-content">
          <div className="text-center text-4xl font-semibold">
            Cập nhật mật khẩu
          </div>
          <div className="mt-3 flex items-center justify-center gap-1">
            <div className="flex items-center justify-center">
              <Link to="/">Trang chủ</Link>
              <ChevronRightMini />
            </div>
            <div className="capitalize text-gray-500">
              <Link to="/change_password">Cập nhật mật khẩu</Link>
            </div>
          </div>
        </div>
      </div>
      <div className="flex h-auto w-full items-center justify-between bg-gray-50 p-5">
        <CustomUser />

        <div className="account-user w-full max-w-5xl rounded-lg bg-white p-8">
          <h2 className="mb-6 text-3xl font-semibold text-gray-800">
            Cập nhật mật khẩu
          </h2>

          <form
            className="user-info-form space-y-6"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="form-group">
              <label
                htmlFor="old-password"
                className="text-lg font-medium text-gray-700"
              >
                Mật khẩu cũ
              </label>
              <Input
                type="password"
                id="old-password"
                {...register('oldPassword', {
                  required: 'Mật khẩu cũ là bắt buộc',
                })}
                className="form-control w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.oldPassword && (
                <p className="text-sm text-red-500">
                  {errors.oldPassword.message}
                </p>
              )}
            </div>

            <div className="form-group">
              <label
                htmlFor="new-password"
                className="text-lg font-medium text-gray-700"
              >
                Mật khẩu mới
              </label>
              <Input
                type="password"
                id="new-password"
                {...register('newPassword', {
                  required: 'Mật khẩu mới là bắt buộc',

                  minLength: {
                    value: 6,
                    message: 'Mật khẩu mới phải có ít nhất 6 ký tự',
                  },
                  validate: value => {
                    // Kiểm tra nếu mật khẩu mới trùng với mật khẩu cũ
                    if (value === oldPassword) {
                      return 'Mật khẩu mới không được giống với mật khẩu cũ';
                    }
                  },
                })}
                className="form-control w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.newPassword && (
                <p className="text-sm text-red-500">
                  {errors.newPassword.message}
                </p>
              )}
            </div>

            <div className="form-group">
              <label
                htmlFor="confirm-password"
                className="text-lg font-medium text-gray-700"
              >
                Nhập lại mật khẩu mới
              </label>
              <Input
                type="password"
                id="confirm-password"
                {...register('confirmPassword', {
                  required: 'Xác nhận mật khẩu là bắt buộc',

                  validate: (value, { newPassword }) =>
                    value === newPassword || 'Mật khẩu xác nhận không khớp',
                })}
                className="form-control w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.confirmPassword && (
                <p className="text-sm text-red-500">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <div className="form-group text-center">
              <Button
                type="submit"
                className="w-full rounded-md bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isSaving || !isValid}
              >
                {isSaving ? 'Đang lưu...' : 'Lưu thay đổi'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PasswordUser;
