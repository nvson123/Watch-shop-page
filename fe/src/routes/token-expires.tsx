import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { Button } from '@medusajs/ui';

export const Route = createFileRoute('/token-expires')({
  component: TokenExpires,
});

function TokenExpires() {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate({ to: '/login' });
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="max-w-md rounded-lg bg-white p-8 text-center shadow-lg">
        <h1 className="mb-4 text-2xl font-semibold text-red-600">
          Phiên đăng nhập hết hạn
        </h1>
        <p className="mb-6 text-gray-700">
          Phiên đăng nhập của bạn đã hết hạn. Vui lòng đăng nhập lại để tiếp tục
          sử dụng dịch vụ.
        </p>
        <Button
          onClick={handleRedirect}
          className="w-full rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          Đăng nhập lại
        </Button>
      </div>
    </div>
  );
}
