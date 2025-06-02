import { useFetchAvailableCoupons } from '@/data/coupon/useCouponList';
import { useState, useEffect } from 'react';
import CurrencyVND from './config/vnd';
import { FocusModal } from '@/components/ui/custom-focus-modal';

const VoucherModal = ({ isOpen, onClose, onApplyCoupon, totalAmount, userId, code }) => {
  const { data: availableCoupons, error, isLoading } = useFetchAvailableCoupons(totalAmount, userId, code);
  const [selectedCoupon, setSelectedCoupon] = useState(null);

  // Xử lý chọn/bỏ chọn mã giảm giá
  const handleCouponSelect = (coupon) => {
    if (selectedCoupon?.code === coupon.code) {
      setSelectedCoupon(null); // Bỏ chọn nếu mã đã được chọn
    } else if (coupon.canApply) {
      setSelectedCoupon(coupon); // Chọn mã mới
    }
  };

  return (
    <FocusModal open={isOpen} onOpenChange={onClose}>
      <FocusModal.Content className="m-auto h-fit max-h-[80%] w-[calc(100%-24px)] max-w-[650px] overflow-visible">
        <FocusModal.Header className="flex flex-row-reverse px-8 py-6">
          <p className="font-semibold">Chọn Voucher</p>
        </FocusModal.Header>

        <div className="flex h-full flex-col justify-between overflow-y-auto p-8">
          <div className="overflow-y-auto max-h-64">
            {isLoading ? (
              <p className="text-center text-gray-600">Đang tải mã giảm giá...</p>
            ) : error ? (
              <p className="text-center text-red-500">Lỗi tải dữ liệu mã giảm giá</p>
            ) : Array.isArray(availableCoupons) && availableCoupons.length > 0 ? (
              availableCoupons.map((coupon) => (
                <div
                  key={coupon.code}
                  className={`flex items-center space-x-3 p-3 border rounded-lg mb-2 ${
                    coupon.canApply ? 'hover:bg-gray-100' : 'bg-gray-200 cursor-not-allowed'
                  }`}
                >
                  <input
                    type="checkbox"
                    id={coupon.code}
                    name="voucher"
                    value={coupon.code}
                    checked={selectedCoupon?.code === coupon.code}
                    onChange={() => handleCouponSelect(coupon)}
                    className="form-checkbox text-red-500"
                    disabled={!coupon.canApply}
                  />
                  <label htmlFor={coupon.code} className="flex-1">
                    <p className="font-medium text-gray-700">
                      {coupon.isFreeShipping
                        ? 'Miễn phí vận chuyển'
                        : `Giảm ${coupon.discount || 0}% (Tối đa ${coupon.maxDiscountAmount || 0} đ)`}
                    </p>
                    <p className="text-sm text-gray-500">
                      Điều kiện: Đơn tối thiểu <CurrencyVND amount={coupon.minOrder || 0} />
                    </p>
                    {coupon.applicableDiscount > 0 && coupon.canApply && (
                      <p className="text-sm text-green-500">
                        Áp dụng giảm: <CurrencyVND amount={coupon.applicableDiscount} />
                      </p>
                    )}
                    {!coupon.canApply && (
                      <p className="text-xs text-red-500">{coupon.message}</p>
                    )}
                  </label>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-600">Không có mã giảm giá nào</p>
            )}
          </div>
        </div>

        <div className="flex justify-end gap-x-2 border-t border-ui-border-base pb-6 pr-8 pt-4">
          <button
            onClick={onClose}
            className="flex-1 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300"
          >
            Trở lại
          </button>
          <button
            onClick={() => {
              if (selectedCoupon) {
                onApplyCoupon(selectedCoupon); // Truyền mã giảm giá đã chọn ra ngoài
                onClose(); // Đóng modal
              }
            }}
            disabled={!selectedCoupon}
            className={`flex-1 py-2 rounded-lg ${
              selectedCoupon
                ? 'bg-red-500 text-white hover:bg-red-600'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Áp dụng
          </button>
        </div>
      </FocusModal.Content>
    </FocusModal>
  );
};

export default VoucherModal;
