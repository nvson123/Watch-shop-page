import { Link } from '@tanstack/react-router';
import {
  CurrencyDollar,
  ListBullet,
  LockClosedSolid,
  MapPin,
  User,
} from '@medusajs/icons';
const CustomUser = () => {
  const storedData = JSON.parse(localStorage.getItem('user') || '{}');
  const username = storedData?.user?.username || 'Không có tên người dùng';
  return (
    <div className="h-full w-1/4">
      <div className="flex flex-col items-center">
        <div className="flex flex-col gap-4 rounded-lg">
          <div className="flex items-center gap-3">
            <img
              src="/admin.jpg"
              alt="User avatar"
              className="h-12 w-12 rounded-full"
            />
            <div>
              <h4 className="text-lg font-bold">{username}</h4>
              <Link to="/profile" className="text-sm text-blue-500">
                Sửa hồ sơ
              </Link>
            </div>
          </div>
          <div className="mt-4 flex flex-col gap-3">
            <Link
              to="/profile"
              className="flex items-center gap-2 text-gray-700 hover:text-blue-500"
            >
              <User />
              Hồ sơ
            </Link>
            <Link
              to="/change_password"
              className="flex items-center gap-2 text-gray-700 hover:text-blue-500"
            >
              <LockClosedSolid />
              Đổi mật khẩu
            </Link>
            <Link
              to="/address"
              className="flex items-center gap-2 text-gray-700 hover:text-blue-500"
            >
              <MapPin />
              Địa chỉ
            </Link>
            <Link
              to="/orderuser"
              className="flex items-center gap-2 text-gray-700 hover:text-blue-500"
            >
              <ListBullet />
              Đơn hàng
            </Link>
            <Link
              to="/payment-online"
              className="flex items-center gap-2 text-gray-700 hover:text-blue-500"
            >
              <CurrencyDollar />
              Giao dịch
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomUser;
