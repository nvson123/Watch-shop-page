import Footer from '@/components/footer';
import Header from '@/components/header';
import {
  checkValidCode,
  fetchUpdateNewPassword,
} from '@/data/auth/useResetPassword';
import { Button, Input } from '@medusajs/ui';
import { createFileRoute, Link } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

export const Route = createFileRoute('/reset-password')({
  component: UpdatePassword,
});

function UpdatePassword() {
  const navigate = Route.useNavigate();
  const [isValidCode, setIsValidCode] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<{ password: string; confirmPassword: string }>();

  const { code } = Route.useSearch<{ code: string }>();

  if (!code) return;

  const onSubmit: SubmitHandler<{
    password: string;
    confirmPassword: string;
  }> = async data => {
    try {
      await fetchUpdateNewPassword(data.password);

      console.log('Đang xóa dữ liệu đăng nhập...');

      // Xóa tất cả các key liên quan đến đăng nhập
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('user');
      sessionStorage.removeItem('userId');

      console.log(
        'Token sau khi xóa:',
        localStorage.getItem('token'),
        sessionStorage.getItem('token')
      );

      // Chuyển hướng đến trang đăng nhập sau khi xóa
      navigate({ to: '/login' });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    (async () => {
      const response = await checkValidCode(code);
      console.log(response);

      if (response === 'Token Valid') {
        setIsValidCode(true);
      } else if (response === 'Token expired') {
        navigate({ to: '/token-expires' });
      } else {
        console.log('Phản hồi không xác định:', response);
      }
    })();
  }, [code, navigate]);

  if (!isValidCode) return null;

  const password = watch('password');

  return (
    <div>
      <Header />
      <main className='py-10'>
        <div className="mb-4" />
        <section className="login-register container max-w-3xl">
          <h2 className="d-none">Đăng Nhập &amp; Đăng Ký</h2>
          <ul className="nav nav-tabs mb-5" id="login_register" role="tablist">
            <li className="nav-item" role="presentation">
              <a
                className="nav-link nav-link_underscore active"
                id="login-tab"
                data-bs-toggle="tab"
                href="#tab-item-login"
                role="tab"
                aria-controls="tab-item-login"
                aria-selected="true"
              >
                Đặt lại mật khẩu
              </a>
            </li>
          </ul>

          <div className="tab-content pt-2" id="login_register_tab_content">
            <div
              className="tab-pane fade show active"
              id="tab-item-login"
              role="tabpanel"
              aria-labelledby="login-tab"
            >
              <div className="login-form">
                <form
                  name="login-form"
                  className="needs-validation"
                  noValidate
                  onSubmit={e => void handleSubmit(onSubmit)(e)}
                >
                  <div className="form-floating mb-3">
                    <input
                      {...register('password', {
                        required: 'Mật khẩu là bắt buộc',
                        minLength: {
                          value: 6,
                          message: 'Mật khẩu phải có ít nhất 6 ký tự',
                        },
                      })}
                      placeholder="Nhập mật khẩu mới"
                      className="form-control form-control_gray"
                      id="password"

                      type='password'
                    />
                    {errors.password && (
                      <p className="text-red-500">{errors.password.message}</p>
                    )}
                    <label htmlFor="customerPasswodRegisterInput">
                      Mật khẩu mới *
                    </label>
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      {...register('confirmPassword', {
                        required: 'Vui lòng xác nhận mật khẩu',
                        validate: value =>
                          value === password || 'Mật khẩu không khớp',
                      })}
                      className="form-control form-control_gray"
                      id="confirmPassword"
                      placeholder="Nhập lại mật khẩu"

                      type='password'
                    />
                    {errors.confirmPassword && (
                      <p className="text-red-500">
                        {errors.confirmPassword.message}
                      </p>
                    )}
                    <label htmlFor="customerPasswodRegisterInput">
                      Nhập lại Mật khẩu  *
                    </label>
                  </div>
                  <div className="pb-3" />


                  <button
                    className="btn btn-primary w-100 text-uppercase"
                    type="submit"
                  >
                    Đặt lại mật khẩu
                  </button>
                  <div className="customer-option mt-4 text-center">
                    <span className="text-gray-600">
                      Bạn chưa có tài khoản?
                    </span>
                    <Link
                      to="/register"
                      className="ml-2 font-semibold text-blue-500 no-underline hover:text-blue-700"
                    >
                      Đăng ký ngay
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
