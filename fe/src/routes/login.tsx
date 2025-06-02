import Header from '../components/header';
import useLoginMutation from '../data/auth/useLoginMutation';
import { Eye, EyeSlash } from '@medusajs/icons';
import { createFileRoute, Link, redirect } from '@tanstack/react-router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

export const Route = createFileRoute('/login')({
  beforeLoad: () => {
    if (localStorage.getItem('user')) {
      throw redirect({ to: '/' });
    }
  },
  component: Login,
});

function Login() {
  const [ , setLoginError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    setError, // Hàm gán lỗi vào trường cụ thể
    formState: { errors },
  } = useForm<Ilogin>();

  const { loginMutation } = useLoginMutation();

  const onSubmit = (data: Ilogin) => {
    const userData = { ...data };
    setLoginError(null); // Reset lỗi chung

    loginMutation.mutate(userData, {
      onSuccess: () => {
        console.log('Đăng nhập thành công');
      },
      onError: (error: any) => {
        if (error?.response?.data?.field && error?.response?.data?.message) {
          const { field, message } = error.response.data;

          // Gán lỗi vào trường tương ứng
          setError(field as keyof Ilogin, {
            type: 'manual',
            message,
          });
        } else {
          // Lỗi chung
          setLoginError('Đăng nhập thất bại. Vui lòng thử lại!');
        }
      },
    });
  };

  return (
    <div>
      <Header />
      <main>
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
                Đăng Nhập
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
                      {...register('email', {
                        required: 'Email là bắt buộc',
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message:
                            'Định dạng email không hợp lệ hoặc chứa khoảng trắng',
                        },
                      })}
                      type="email"
                      className="form-control form-control_gray"
                      id="email"
                      required
                    />
                    {errors.email && (
                      <p className="text-red-500">{errors.email.message}</p>
                    )}
                    <label htmlFor="customerEmailRegisterInput">Email *</label>
                  </div>
                  <div className="pb-3" />
                  <div className="form-floating mb-3">
                    <input
                      {...register('password', {
                        required: 'Mật khẩu là bắt buộc',
                        minLength: {
                          value: 6,
                          message: 'Mật khẩu phải có ít nhất 6 ký tự',
                        },
                      })}
                      type={showPassword ? 'text' : 'password'} // Nếu showPassword là true, thì type là text, ngược lại là password
                      className="form-control form-control_gray"
                      id="password"
                      required
                    />
                    {errors.password && (
                      <p className="text-red-500">{errors.password.message}</p>
                    )}
                    <label htmlFor="customerPasswodRegisterInput">
                      Mật khẩu *
                    </label>

                    {/* Nút ẩn/hiện mật khẩu */}
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)} // Thay đổi trạng thái showPassword khi nhấn nút
                      className="absolute right-3 top-2 text-gray-500 hover:text-gray-800"
                    >
                      {showPassword ? (
                        <EyeSlash className="h-5 w-5" /> // Nếu showPassword là true, hiển thị EyeSlash
                      ) : (
                        <Eye className="h-5 w-5" /> // Nếu showPassword là false, hiển thị Eye
                      )}
                    </button>
                  </div>
                  <div className="d-flex align-items-center mb-3 pb-2">
                    <Link
                      to="/forgot-password"
                      className="btn-text ms-auto no-underline"
                    >
                      Quên mật khẩu?
                    </Link>
                  </div>

                  <button
                    className="btn btn-primary w-100 text-uppercase"
                    type="submit"
                  >
                    Đăng Nhập
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
    </div>
  );
}

export default Login;
