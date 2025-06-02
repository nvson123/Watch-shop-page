import CurrencyVND from '@/components/config/vnd';
import ModalCreateCustomInfor from '@/components/custom-infor/modal-create-custom-infor';
import { useFetchAddressById } from '@/data/address/useFetchAddressByid';
import useCartMutation from '@/data/cart/useCartMutation';
import useCheckoutMutation from '@/data/oder/useOderMutation';
import { useFetchAvailableCoupons } from '@/data/coupon/useCouponList';
import instance from '@/api/axiosIntance';
import { Badge, toast } from '@medusajs/ui';
import { ListBullet, MapPin } from '@medusajs/icons';
import { createFileRoute, useLocation } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import VoucherModal from '@/components/VoucherModal';
import ModalListCustomInfor from '@/components/custom-infor/modal-address-list';

export const Route = createFileRoute('/_layout/checkoutNew/')({
  component: NewCheckout,
});

function NewCheckout() {
  const [userId, setUserId] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('online');
  const [currentAddress, setCurrentAddress] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalListOpen, setIsModalListOpen] = useState(false);

  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [calculatedShippingFee, setCalculatedShippingFee] = useState(0);
  const [shippingMessageDisplay, setShippingMessageDisplay] = useState('');
  const [isVoucherModalOpen, setVoucherModalOpen] = useState(false);
  const [isCouponFreeShipping, setIsCouponFreeShipping] = useState(false);

  const location = useLocation();
  const selectedItems = Array.isArray(location.state?.selectedItems)
    ? location.state.selectedItems
    : [];

  const totalQuantity = selectedItems.reduce(
    (acc, item) => acc + item.quantity,
    0
  );
  const totalAmount = selectedItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const openCreateModal = () => {
    setCurrentAddress(null);
    setIsModalOpen(true);
  };

  const closeCreateModal = () => {
    setIsModalOpen(false);
    refetch();
  };

  const openListModal = () => {
    setIsModalListOpen(true);
  };
  const closeListModal = () => {
    setIsModalListOpen(false);
    refetch();
  };

  const handlePaymentMethodChange = method => {
    setPaymentMethod(method);
  };

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  const { data, isLoading, error, refetch } = useFetchAddressById(userId);

  const { createOrder } = useCheckoutMutation();
  const { deleteItemFromCart } = useCartMutation();

  const { data: availableCoupons, isLoading: isCouponsLoading } =
    useFetchAvailableCoupons(totalAmount, userId, selectedCoupon?.code);

  const handleCouponChange = coupon => {
    if (!coupon || !coupon.canApply) {
      toast.error(coupon?.message || 'Mã giảm giá không hợp lệ.');
      setSelectedCoupon(null);
      setDiscountAmount(0);
      setIsCouponFreeShipping(false);
      return;
    }

    setSelectedCoupon(coupon);
    setDiscountAmount(
      coupon.isFreeShipping
        ? 0
        : Math.min(
            (coupon.discount / 100) * totalAmount,
            coupon.maxDiscountAmount || Infinity
          )
    );
    setIsCouponFreeShipping(coupon.isFreeShipping);
  };

  const calculateShipping = async () => {
    try {
      const totalWeight = selectedItems.reduce(
        (acc, item) => acc + (item.weight || 0) * item.quantity,
        0
      );

      const response = await instance.post('/calculate-shipping', {
        weight: totalWeight,
        address: {
          district: data?.data?.district,
        },
        orderValue: totalAmount,
      });

      const fee = response.data.shippingFee;
      setCalculatedShippingFee(isCouponFreeShipping ? 0 : fee);
      setShippingMessageDisplay(
        isCouponFreeShipping || fee === 0 ? (
          'Miễn phí vận chuyển'
        ) : (
          <CurrencyVND amount={fee} />
        )
      );
    } catch (error) {
      console.error('Error calculating shipping fee:', error);
      setShippingMessageDisplay('Không thể tính phí vận chuyển');
    }
  };

  useEffect(() => {
    if (data?.data?.district) {
      calculateShipping();
    }
  }, [data, totalAmount, isCouponFreeShipping]);

  const handleSubmit = async e => {
    e.preventDefault();

    const items = Array.isArray(selectedItems) ? selectedItems : [];
    const variantIds = items.map(item => item.variantId);
    const formData = {
      userId,
      items: items.map(item => ({
        productId: item.productId,
        variantId: item.variantId,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image,
        color: item.color,
        size: item.size,
      })),
      customerInfo: {
        name: data?.data.name,
        phone: data?.data.phone,
        city: data?.data.city,
        districts: data?.data.district,
        wards: data?.data.ward,
        address: data?.data.address,
      },
      paymentMethod,
      paymentStatus: 'pending',
      note: '',
      totalPrice: totalAmount - discountAmount + calculatedShippingFee,
      couponCode: selectedCoupon ? selectedCoupon.code : null,
      shippingMessageDisplay,
      discount: discountAmount,
    };

    try {
      await createOrder.mutateAsync(formData);
      await deleteItemFromCart.mutateAsync({
        userId: userId || '',
        variantIds,
      });
      toast.success('Đặt hàng thành công!');
    } catch (error) {
      toast.error('Có lỗi xảy ra trong quá trình thanh toán');
      console.error('Error during checkout process:', error);
    }
  };

  return (
    <div className="px-[35px]">
      <div className="p-4">
        <div className="flex items-center justify-between border-b pb-4">
          <div className="flex items-center gap-2">
            <span className="text-lg font-medium">| Thanh toán</span>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="col-span-2 space-y-4">
              <h1 className="text-xl font-semibold">Đơn hàng của tôi</h1>
              <div className="rounded bg-white p-4 shadow">
                <div className="flex items-center justify-between">
                  <h2 className="flex gap-2 text-lg font-medium text-orange-500">
                    <p className="mt-1 text-orange-500">
                      <MapPin />
                    </p>{' '}
                    Địa chỉ nhận hàng
                  </h2>
                  <button
                    type="button"
                    className="text-sm text-blue-500"
                    onClick={openListModal}
                  >
                    Thay đổi
                  </button>
                </div>
                <div className="mt-2 text-sm">
                  {data?.data ? (
                    <>
                      <p>
                        <strong>Họ tên:</strong> {data?.data.name}
                      </p>
                      <p>
                        <strong>Số điện thoại:</strong> {data?.data.phone}
                      </p>
                      <p>
                        <strong>Địa chỉ:</strong> {data?.data.address},
                        {data?.data.ward}, {data?.data.district},
                        {data?.data.city}
                      </p>
                      <Badge className="mt-3" color="red">
                        Mặc Định
                      </Badge>
                    </>
                  ) : (
                    <p className="cursor-pointer" onClick={openCreateModal}>
                      Thêm địa chỉ
                    </p>
                  )}
                  <ModalCreateCustomInfor
                    isOpen={isModalOpen}
                    onClose={closeCreateModal}
                  />
                  <ModalListCustomInfor
                    isOpen={isModalListOpen}
                    onClose={closeListModal}
                  />
                </div>
              </div>

              <div className="rounded bg-white p-4 shadow">
                <h2 className="mb-4 text-lg font-medium">Sản phẩm</h2>
                {selectedItems.map(product => (
                  <div
                    className="mb-4 flex items-center border-b pb-4"
                    key={product.productId}
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-16 w-16 rounded object-cover"
                    />
                    <div className="ml-4 flex-grow">
                      <p className="font-medium">{product.name}</p>
                      <p className="text-sm text-gray-500">
                        Màu: {product.color} | Size: {product.size}
                      </p>
                    </div>
                    <div className="text-right">
                      <p>x{product.quantity}</p>
                      <p className="font-medium">
                        <CurrencyVND amount={product.price} />
                      </p>
                    </div>
                  </div>
                ))}
                <div className="text-right font-medium">
                  Tổng số tiền ({totalQuantity} sản phẩm):{' '}
                  <span className="text-red-500">
                    <CurrencyVND amount={totalAmount} />
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h1 className="text-xl font-semibold">Thông tin liên quan</h1>
              <div className="rounded bg-white p-4 shadow">
                <h2 className="flex gap-2 text-lg font-medium">
                  <p className="mt-1">
                    <ListBullet />
                  </p>{' '}
                  Chi tiết thanh toán
                </h2>
                <div className="mt-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Tổng tiền hàng</span>
                    <span>
                      <CurrencyVND amount={totalAmount} />
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Phí vận chuyển</span>
                    <span>{shippingMessageDisplay}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Giảm giá</span>
                    <span>
                      <CurrencyVND amount={discountAmount} />
                    </span>
                  </div>
                  <div className="flex justify-between font-medium">
                    <span>Tổng thanh toán:</span>
                    <span className="text-red-500">
                      <CurrencyVND
                        amount={
                          totalAmount - discountAmount + calculatedShippingFee
                        }
                      />
                    </span>
                  </div>
                </div>
              </div>

              <div className="rounded bg-white p-4 shadow">
                <h2 className="text-lg font-medium">Nhập mã giảm giá</h2>
                <div className="mt-2 flex">
                  <input
                    type="text"
                    className="flex-grow rounded-l border p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Nhập mã giảm giá"
                    value={selectedCoupon?.code || null}
                  ></input>
                  <button
                    type="button"
                    className="hover:bg-gray-700-600 rounded-r bg-black px-4 text-white"
                    onClick={() => setVoucherModalOpen(true)}
                  >
                    Áp dụng
                  </button>
                  <VoucherModal
                    isOpen={isVoucherModalOpen}
                    onClose={() => setVoucherModalOpen(false)}
                    onApplyCoupon={coupon => {
                      setSelectedCoupon(coupon); // Cập nhật mã giảm giá đã chọn
                      handleCouponChange(coupon); // Xử lý logic mã giảm giá
                      setVoucherModalOpen(false); // Đóng modal
                    }}
                    totalAmount={totalAmount}
                    userId={userId}
                    code={selectedCoupon?.code || null}
                  />
                </div>
              </div>

              <div className="rounded bg-white p-4 shadow">
                <h2 className="text-lg font-medium">Ghi chú</h2>
                <textarea
                  className="mt-2 w-full rounded border p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Thêm ghi chú..."
                ></textarea>
              </div>

              <div className="rounded bg-white p-4 shadow">
                <p className="mb-3 font-medium text-gray-700">
                  Phương thức thanh toán
                </p>
                <div className="space-y-3">
                  <button
                    type="button"
                    onClick={() => handlePaymentMethodChange('cod')}
                    className={`flex w-full justify-between rounded-lg border p-3 ${paymentMethod === 'cod' ? 'border-red-500 bg-red-100' : ''} focus:outline-none`}
                  >
                    Thanh toán khi nhận hàng
                    <p>(COD)</p>
                  </button>
                  <button
                    type="button"
                    onClick={() => handlePaymentMethodChange('online')}
                    className={`flex w-full justify-between rounded-lg border p-3 ${paymentMethod === 'online' ? 'border-red-500 bg-red-100' : ''} focus:outline-none`}
                  >
                    Thanh toán qua{' '}
                    <img
                      className="ml-2 mt-1 w-14"
                      src="./zalo_pay.png"
                      alt="Zalo Pay"
                    />
                  </button>
                </div>

                <p className="mt-3 text-sm text-gray-500">
                  Nhấn "Đặt hàng" đồng nghĩa với việc bạn đồng ý tuân theo Điều
                  khoản của FASHIONZONE
                </p>
                <button
                  type="submit"
                  className="mt-5 w-full bg-black py-2 font-semibold text-white transition hover:bg-gray-800"
                >
                  Đặt hàng
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
