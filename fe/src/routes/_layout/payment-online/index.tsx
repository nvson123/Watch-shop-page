import CurrencyVND from '@/components/config/vnd';
import CustomUser from '@/components/useroder/custom-menu';
import { useFetchAddressByUserId } from '@/data/payment-online/useFetchPaymentOnline';
import { ChevronRightMini, ChevronLeft, ChevronRight } from '@medusajs/icons';
import { Button } from '@medusajs/ui';
import { createFileRoute, Link } from '@tanstack/react-router';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';

export const Route = createFileRoute('/_layout/payment-online/')({
  component: PaymentOnline,
});

function PaymentOnline() {
  const [userId, setUserId] = useState(null);
  const [currentAddress, setCurrentAddress] = useState(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(4);

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  const { data, isLoading, error, refetch } = useFetchAddressByUserId(
    userId,
    page,
    limit
  ); // Gọi API với tham số phân trang

  // Xử lý các sự kiện chuyển trang
  const goToPage = pageNumber => {
    setPage(pageNumber);
  };

  return (
    <div className="bg-gray-50">
      <div className="bg-white">
        <div className="main-content flex h-48 w-full flex-col items-center justify-center">
          <div className="text-content">
            <div className="text-center text-4xl font-semibold">Địa Chỉ</div>
            <div className="link caption1 mt-3 flex items-center justify-center gap-1">
              <div className="flex items-center justify-center">
                <Link to="/">Trang chủ</Link>
                <ChevronRightMini />
              </div>
              <div className="capitalize text-gray-500">
                <Link to="/address">Địa Chỉ</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto flex max-w-7xl bg-gray-50 py-10 pt-10">
        <CustomUser />
        <div className="ml-6 w-3/4">
          <div className="mb-2 flex justify-between">
            <h1 className="text-xl">Các giao dịch online của bạn</h1>
          </div>
          {isLoading ? (
            <div>Bạn chưa có giao dịch nào !</div>
          ) : (
            <div className="grid grid-cols-2 gap-x-4 gap-y-2">
              {data?.data.map(online => (
                <div
                  key={online._id}
                  className="mb-2 grid-cols-1 rounded-md border-[1px] border-b border-blue-300 bg-white shadow sm:space-x-0"
                >
                  <div className="p-3 font-semibold">
                    <div className="flex gap-2">
                      <p>Mã đơn hàng:</p>
                      <p>{online.orderNumber}</p>
                    </div>
                    <p className="font-medium">
                      Có giao dịch thanh toán với số tiền
                      <span className="ml-0.5 font-semibold text-red-500">
                        <CurrencyVND amount={online.totalPrice} />
                      </span>
                      , vui lòng kiểm tra thông tin
                    </p>
                    <p className="flex justify-end font-medium text-gray-400">
                      {online.createdAt
                        ? format(new Date(online.createdAt), 'HH:mm dd/MM/yyyy')
                        : ''}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Phần phân trang */}
          <div className="mt-6 flex justify-center">
            <button
              onClick={() => goToPage(page - 1)}
              disabled={page === 1}
              className="cursor-pointer rounded-md border px-2 py-1.5 text-gray-400"
            >
              <ChevronLeft />
            </button>
            <p className="mx-2 rounded-lg border-[1px] border-blue-400 px-3 py-1.5 text-blue-400">
              {page}
            </p>
            <button
              className="cursor-pointer rounded-md border px-2 py-1.5 text-gray-400"
              onClick={() => goToPage(page + 1)}
              disabled={!data || data.data.length < limit}
            >
              <ChevronRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
