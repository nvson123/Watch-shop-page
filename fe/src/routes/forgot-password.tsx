import Footer from '@/components/footer';
import Header from '@/components/header';
import { requestResetPassword } from '@/data/auth/useResetPassword';
import { Button, Input } from '@medusajs/ui';
import { createFileRoute, Link } from '@tanstack/react-router';
import { SubmitHandler, useForm } from 'react-hook-form';

export const Route = createFileRoute('/forgot-password')({
  component: ForgotPasswordPage,
});

function ForgotPasswordPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ email: string }>();

  const onSubmit: SubmitHandler<{ email: string }> = async data => {
    await requestResetPassword(data.email);
  };

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
                Quên mật khẩu
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

                      type="email"
                      className="form-control form-control_gray"
                      id="email"
                      {...register('email', {
                        required: 'Email là bắt buộc',
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message:
                            'Định dạng email không hợp lệ hoặc chứa khoảng trắng',
                        },
                      })}
                      required
                    />
                    {errors.email && (
                      <p className="text-red-500">{errors.email.message}</p>
                    )}
                    <label htmlFor="customerEmailRegisterInput">Email *</label>
                  </div>
                  <div className="pb-3" />


                  <button
                    className="btn btn-primary w-100 text-uppercase"
                    type="submit"
                  >
                    Gửi Yêu cầu
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
