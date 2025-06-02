import { retryPayment, updatePaymentStatus } from '@/data/oder/usePayment';
import { Button } from '@medusajs/ui';
import { createFileRoute, Link, useSearch } from '@tanstack/react-router';
import { useEffect } from 'react';
import * as z from 'zod';

// Định nghĩa route với validateSearch
export const Route = createFileRoute('/_layout/thanks/')({
  component: ReturnPage,
  validateSearch: z
    .object({
      status: z.union([z.string(), z.number()]).optional(),
      apptransid: z.union([z.string(), z.number()]).optional(), // Chấp nhận cả string và number
    })
    .transform(query => ({
      ...query,
      status: query.status?.toString(),
      apptransid: query.apptransid?.toString(),
    })).parse,
});

function ReturnPage() {
  const { status, apptransid } = useSearch({ from: '/_layout/thanks/' });

  const isCOD = !apptransid || apptransid.startsWith('cod');
  const isSuccess = status === '1';

  let orderId = '';
  if (!isCOD && apptransid?.includes('_')) {
    const appTransIdReturn = apptransid.split('_')[1]?.trim().toString();

    if (appTransIdReturn[appTransIdReturn.length - 1] === 'r') {
      orderId = appTransIdReturn.slice(0, length - 1);
    } else {
      orderId = appTransIdReturn;
      ``;
    }
  } else if (isCOD) {
    orderId = apptransid || 'cod_order';
  }

  console.log('orderId', orderId);

  const message = isSuccess
    ? 'Thanh toán thành công! Cảm ơn bạn đã đặt hàng.'
    : 'Thanh toán đã bị hủy. Vui lòng thử lại.';

  const subMessage = isCOD
    ? 'Đơn hàng của bạn đã được xác nhận. Cảm ơn bạn!'
    : isSuccess
      ? 'Bạn có thể kiểm tra thông tin đơn hàng trong "Đơn mua".'
      : 'Nếu bạn cần hỗ trợ, vui lòng liên hệ bộ phận chăm sóc khách hàng.';

  const handlePaymentUpdate = async () => {
    try {
      const paymentStatus = isSuccess ? 'pending' : 'failed';
      await updatePaymentStatus(orderId, paymentStatus);
    } catch (error) {
      console.error('Error updating payment status:', error.message);
    }
  };

  useEffect(() => {
    handlePaymentUpdate();
  }, [isSuccess]);

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="max-w-2xl rounded-lg bg-white p-8 text-center shadow-lg">
        <div className="mb-4 flex items-center justify-center">
          <div
            className={`${
              isSuccess ? 'bg-blue-500' : 'bg-red-500'
            } rounded-full p-4`}
          >
            {isSuccess ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            )}
          </div>
        </div>
        <h2 className="text-2xl font-semibold text-gray-800">{message}</h2>
        <p className="mt-2 text-gray-500">{subMessage}</p>

        <div className="mt-6 flex justify-center gap-4">
          {isSuccess ? (
            <>
              <Link
                to="/orderuser"
                className="rounded-md bg-gray-500 px-6 py-2 text-white hover:bg-black"
              >
                ĐƠN MUA
              </Link>
              <Link
                to="/"
                className="rounded-md bg-blue-500 px-6 py-2 text-white hover:bg-black"
              >
                TIẾP TỤC MUA SẮM
              </Link>
            </>
          ) : isCOD ? (
            <Link
              to="/"
              className="rounded-md bg-gray-500 px-6 py-2 text-white hover:bg-black"
            >
              VỀ TRANG CHỦ
            </Link>
          ) : (
            <>
              <Button
                className="rounded-md bg-green-500 px-6 py-2 text-white hover:bg-black"
                onClick={() => retryPayment(orderId)}
              >
                THANH TOÁN LẠI
              </Button>
              <Link
                to="/"
                className="rounded-md bg-gray-500 px-6 py-2 text-white hover:bg-black"
              >
                TRỞ LẠI CỬA HÀNG
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
