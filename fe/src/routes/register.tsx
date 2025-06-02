import Footer from '../components/footer';
import Header from '..//components/header';
import useRegisterMutation from '../data/auth/useRegisterMutation';
import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Eye, EyeSlash } from '@medusajs/icons';

export const Route = createFileRoute('/register')({
  component: Register,
});

function Register() {
  const [registerError, setRegisterError] = useState<string | null>(null);
  const [registerSuccess, setRegisterSuccess] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false); // State cho mật khẩu
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // State cho xác nhận mật khẩu

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
    watch,
  } = useForm<Iuser>();

  const { registerMutation } = useRegisterMutation();

  const onSubmit = (data: Iuser) => {
    const userData = { ...data };
    console.log(data); // Log dữ liệu gửi đi để kiểm tra
    setRegisterError(null);
    setRegisterSuccess(null);

    registerMutation.mutate(userData, {
      onSuccess: () => {
        setRegisterSuccess(
          'Đăng ký thành công! Chào mừng bạn đến với Tempus Chroniker'
        );
      },
      onError: (error: any) => {
        if (error?.response?.data?.field && error?.response?.data?.message) {
          const { field, message } = error.response.data;
          setError(field as keyof Iuser, {
            type: 'manual',
            message,
          });
        } else {
          setRegisterError('Đăng ký thất bại. Vui lòng thử lại!');
        }
      },
    });
  };

  const password = watch('password');
  const usernameNoAccentRegex = /^[a-zA-Z0-9_]+$/;

  return (
    <div>
      <Header />
      <main>
        <div className="mb-4" />
        <section className="login-register container max-w-3xl">
          <ul className="nav nav-tabs mb-5" id="login_register" role="tablist">
            <li className="nav-item" role="presentation">
              <a
                className="nav-link nav-link_underscore active"
                id="register-tab"
                data-bs-toggle="tab"
                href="#tab-item-register"
                role="tab"
                aria-controls="tab-item-register"
                aria-selected="false"
              >
                Đăng Ký
              </a>
            </li>
          </ul>
          <div className="tab-content pt-2" id="login_register_tab_content">
            {/* end_login */}
            <div
              className=""
              id=""
              role="tabpanel"
              aria-labelledby="register-tab"
            >
              <div className="">
                <form
                  name="register-form"
                  className="needs-validation"
                  onSubmit={e => void handleSubmit(onSubmit)(e)}
                  noValidate
                >
                  <div className="form-floating mb-3">
                    <input
                      {...register('username', {
                        required: 'Tên người dùng là bắt buộc',
                        validate: {
                          noWhitespace: value =>
                            !/\s/.test(value) ||
                            'Tên người dùng không được chứa khoảng trắng',
                          noAccent: value =>
                            usernameNoAccentRegex.test(value) ||
                            'Tên người dùng không được chứa dấu',
                        },
                      })}
                      type="text"
                      className="form-control form-control_gray"
                      id="user"
                      required
                    />
                    {errors.username && (
                      <p className="text-red-500">{errors.username.message}</p>
                    )}
                    <label htmlFor="customerNameRegisterInput">
                      Tên người dùng *
                    </label>
                  </div>
                  <div className="pb-3" />
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
                  <div className="form-floating mb-3">
                    <input
                      {...register('phone', {
                        required: 'Số điện thoại là bắt buộc',
                        pattern: {
                          value: /^[0-9]{10,11}$/,
                          message: 'Số điện thoại không hợp lệ!',
                        },
                      })}
                      type="email"
                      className="form-control form-control_gray"
                      id="phone"
                      required
                    />
                    {errors.phone && (
                      <p className="text-red-500">{errors.phone.message}</p>
                    )}
                    <label htmlFor="customerEmailRegisterInput">
                      Số điện thoại *
                    </label>
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
                      type={showPassword ? 'text' : 'password'} // Nếu showPassword là true, type sẽ là text
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
                      onClick={() => setShowPassword(!showPassword)} // Thay đổi trạng thái showPassword
                      className="absolute right-3 top-2 text-gray-500 hover:text-gray-800"
                    >
                      {showPassword ? (
                        <EyeSlash className="h-5 w-5" /> // Hiển thị EyeSlash khi mật khẩu hiển thị
                      ) : (
                        <Eye className="h-5 w-5" /> // Hiển thị Eye khi mật khẩu bị ẩn
                      )}
                    </button>
                  </div>

                  <div className="form-floating mb-3">
                    <input
                      {...register('confirmPassword', {
                        required: 'Xác nhận mật khẩu là bắt buộc',
                        validate: value =>
                          value === password || 'Mật khẩu xác nhận không khớp',
                      })}
                      type={showConfirmPassword ? 'text' : 'password'} // Nếu showConfirmPassword là true, type sẽ là text
                      className="form-control form-control_gray"
                      id="confirmPassword"
                      required
                    />
                    {errors.confirmPassword && (
                      <p className="text-red-500">
                        {errors.confirmPassword.message}
                      </p>
                    )}
                    <label htmlFor="customerPasswodRegisterInput">
                      Xác nhận mật khẩu *
                    </label>

                    {/* Nút ẩn/hiện mật khẩu xác nhận */}
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      } // Thay đổi trạng thái showConfirmPassword
                      className="absolute right-3 top-2 text-gray-500 hover:text-gray-800"
                    >
                      {showConfirmPassword ? (
                        <EyeSlash className="h-5 w-5" /> // Hiển thị EyeSlash khi xác nhận mật khẩu hiển thị
                      ) : (
                        <Eye className="h-5 w-5" /> // Hiển thị Eye khi xác nhận mật khẩu bị ẩn
                      )}
                    </button>
                  </div>
                  <div className="d-flex align-items-center mb-3 pb-2">
                    <p className="m-0">
                      Dữ liệu cá nhân của bạn sẽ được sử dụng để hỗ trợ trải
                      nghiệm của bạn trên toàn bộ trang web này, để quản lý
                      quyền truy cập vào tài khoản của bạn và cho các mục đích
                      khác được mô tả trong chính sách bảo mật của chúng tôi.
                    </p>
                  </div>
                  <button
                    className="btn btn-primary w-100 text-uppercase mb-5"
                    type="submit"
                  >
                    Đăng Ký
                  </button>
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

export default Register;
