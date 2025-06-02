import instance from '@/api/axiosIntance';
import VoucherModal from '@/components/VoucherModal';
import CurrencyVND from '@/components/config/vnd';
import useCartMutation from '@/data/cart/useCartMutation';
import { useFetchAvailableCoupons } from '@/data/coupon/useCouponList';
import useCheckoutMutation from '@/data/oder/useOderMutation';
import {
  ChevronRightMini,
  CurrencyDollarSolid,
  DocumentTextSolid,
  MapPin,
  ReceiptPercent,
  User,
} from '@medusajs/icons';
import { toast } from '@medusajs/ui';
import { createFileRoute, useLocation } from '@tanstack/react-router';
import axios from 'axios';
import { useEffect, useState } from 'react';

export const Route = createFileRoute('/_layout/checkout/')({
  component: () => {
    const location = useLocation();
    const selectedItems = Array.isArray(location.state?.selectedItems)
      ? location.state.selectedItems
      : [];
    const [paymentMethod, setPaymentMethod] = useState('online');
    const { deleteItemFromCart } = useCartMutation();

    const { shippingMessage, shippingFee, isFreeShipping } =
      location.state || {};
    console.log('log', selectedItems);

    // Fetch available coupons

    const [selectedCoupon, setSelectedCoupon] = useState(null);
    const [discountAmount, setDiscountAmount] = useState(0);

    const totalQuantity = selectedItems.reduce(
      (acc, item) => acc + item.quantity,
      0
    );
    const totalAmount = selectedItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );

    const handlePaymentMethodChange = method => {
      setPaymentMethod(method);
    };

    const calculateDiscountedTotal = () => {
      if (selectedCoupon) {
        const rawDiscount = (selectedCoupon.discount / 100) * totalAmount;
        return Math.min(
          rawDiscount,
          selectedCoupon.maxDiscountAmount || rawDiscount
        );
      }
      return 0;
    };
    const calculateTotalWithDiscount = () => {
      const discount = selectedCoupon?.isFreeShipping
        ? 0
        : calculateDiscountedTotal();
      const shipping = selectedCoupon?.isFreeShipping
        ? 0
        : calculatedShippingFee;
      return totalAmount - discount + shipping;
    };
    const discount = calculateDiscountedTotal();

    const [isVoucherModalOpen, setVoucherModalOpen] = useState(false);

    // Mở modal
    const userIdAddCoupon = localStorage.getItem('userId');
    const openVoucherModal = () => {
      setVoucherModalOpen(true);
    };
    const {
      data: availableCoupons,
      error: couponError,
      isLoading: isCouponsLoading,
    } = useFetchAvailableCoupons(
      totalAmount,
      userIdAddCoupon,
      selectedCoupon?.code
    );
    // Địa chỉ
    const [cities, setCities] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    const [selectedCity, setSelectedCity] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState(null);
    const [selectedWard, setSelectedWard] = useState(null);

    // Tính phí ship
    const [calculatedShippingFee, setCalculatedShippingFee] = useState(0);
    const [shippingMessageDisplay, setShippingMessageDisplay] = useState('');
    const [isCalculatedFreeShipping, setIsCalculatedFreeShipping] =
      useState(false);
    const [isCouponFreeShipping, setIsCouponFreeShipping] = useState(false);

    const { createOrder } = useCheckoutMutation();

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(
            'https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json'
          );
          setCities(response.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      fetchData();
    }, []);

    const handleCityChange = e => {
      const cityId = e.target.value;
      setSelectedCity(cityId);
      setSelectedDistrict('');
      setWards([]);
    };

    const handleDistrictChange = e => {
      const districtId = e.target.value;
      setSelectedDistrict(districtId);
      const selectedDistrict = cities
        .find(city => city.Id === selectedCity)
        ?.Districts.find(district => district.Id === districtId);
      setWards(selectedDistrict ? selectedDistrict.Wards : []);
    };

    const handleWardChange = e => {
      setSelectedWard(e.target.value);
    };

    const handleCouponChange = coupon => {
      if (!coupon) {
        setSelectedCoupon(null);
        setDiscountAmount(0);
        setIsCouponFreeShipping(false);
        return;
      }

      setSelectedCoupon(coupon);
      setDiscountAmount((coupon.discount / 100) * totalAmount);
      setIsCouponFreeShipping(coupon.isFreeShipping);
    };

    const cityName = cities.find(city => city.Id === selectedCity)?.Name || '';
    const districtName =
      cities
        .find(city => city.Id === selectedCity)
        ?.Districts.find(district => district.Id === selectedDistrict)?.Name ||
      '';
    const wardName =
      cities
        .find(city => city.Id === selectedCity)
        ?.Districts.find(district => district.Id === selectedDistrict)
        ?.Wards.find(ward => ward.Id === selectedWard)?.Name || '';

    const calculateShipping = async () => {
      try {
        // Check the contents of selectedItems to ensure all items are included

        // Calculate total weight based on selected items
        const totalWeight = selectedItems.reduce(
          (acc, item) => acc + item.weight * item.quantity,
          0
        );
        console.log(
          'Calculated total weight:',
          totalWeight,
          'for district:',
          districtName
        );

        const response = await instance.post('/calculate-shipping', {
          weight: totalWeight,
          address: {
            district: districtName,
          },
          orderValue: totalAmount,
        });

        const fee = response.data.shippingFee;
        console.log('Received shipping fee from API:', fee);

        setCalculatedShippingFee(isCouponFreeShipping ? 0 : fee);
        setIsCalculatedFreeShipping(isCouponFreeShipping || fee === 0);
        const feed = <CurrencyVND amount={fee} />;
        setShippingMessageDisplay(
          isCouponFreeShipping ? 'Miễn phí vận chuyển' : feed
        );
      } catch (error) {
        console.error('Error calculating shipping fee:', error);
        setShippingMessageDisplay('Unable to calculate shipping fee');
      }
    };

    useEffect(() => {
      if (selectedDistrict) {
        calculateShipping();
      }
    }, [selectedDistrict, totalAmount, isCouponFreeShipping]);

    const totalWithDiscount = calculateTotalWithDiscount();

    const handleSubmit = async (e: any) => {
      e.preventDefault();
      const userId = localStorage.getItem('userId');

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
          name: e.target.your_name.value,
          phone: e.target['phone-input'].value,
          email: e.target.your_email.value,
          city: cityName,
          districts: districtName,
          wards: wardName,
          address: e.target['address-input'].value,
        },
        paymentMethod, // Đảm bảo rằng `paymentMethod` có giá trị đúng
        paymentStatus: 'pending',
        note: '',
        totalPrice: totalWithDiscount,
        couponCode: selectedCoupon ? selectedCoupon.code : null,
        shippingMessageDisplay: shippingMessageDisplay,
        discount: discount,
      };

      try {
        await createOrder.mutateAsync(formData);
        await deleteItemFromCart.mutateAsync({
          userId: userId || '',
          variantIds: variantIds,
        });
        toast.success('Order placed successfully');
      } catch (error) {
        toast.error('Có lỗi xảy ra trong quá trình thanh toán');
        console.error('Error during checkout process:', error);
      }
    };

    return (
      <section className="">
        <div className="">
          <div className="main-content flex h-48 w-full flex-col items-center justify-center">
            <div className="text-content">
              <div className="text-center text-4xl font-semibold">
                Thanh toán
              </div>
              <div className="link caption1 mt-3 flex items-center justify-center gap-1">
                <div className="flex items-center justify-center">
                  <a href="/">Trang chủ</a>
                  <ChevronRightMini />
                </div>
                <div className="flex items-center justify-center">
                  <a href="#">Giỏ hàng</a>
                  <ChevronRightMini />
                </div>
                <div className="capitalize text-gray-500">Thanh toán</div>
              </div>
            </div>
          </div>
        </div>
        <form
          onSubmit={handleSubmit}
          className="w-full bg-[#F3F4F6] py-10 pt-10"
        >
          {/* thông tin */}
          <div className="m-auto max-w-7xl bg-white p-5">
            <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
              <div className="mt-6 sm:mt-8 lg:flex lg:items-start lg:gap-12 xl:gap-16">
                <div className="min-w-0 flex-1 space-y-8">
                  <div className="items-center space-y-4">
                    <div className="flex gap-2 text-red-500">
                      <User className="mt-1" />
                      <h2 className="font-semibol text-xl uppercase">
                        Địa chỉ nhận hàng
                      </h2>
                    </div>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor="your_name"
                          className="mb-2 block text-sm font-medium text-gray-900"
                        >
                          {' '}
                          Tên{' '}
                        </label>
                        <input
                          type="text"
                          id="your_name"
                          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900"
                          placeholder="what your name"
                          required
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="phone-input-3"
                          className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                        >
                          {' '}
                          Số điện thoại<span className="text-red-500"> *</span>
                        </label>
                        <div className="flex items-center">
                          <div className="relative w-full">
                            <input
                              type="text"
                              id="phone-input"
                              className="z-20 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900"
                              placeholder="123-456-7890"
                              required
                            />
                          </div>
                        </div>
                      </div>
                      <div>
                        <label
                          htmlFor="your_email"
                          className="mb-2 block text-sm font-medium text-gray-900"
                        >
                          email:
                        </label>
                        <input
                          type="text"
                          id="your_email"
                          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900"
                          placeholder="what your name"
                          required
                        />
                      </div>
                    </div>
                    <div className="flex gap-2 text-red-500">
                      <MapPin className="mt-1" />
                      <h2 className="font-semibol text-xl uppercase">
                        Địa chỉ giao hàng
                      </h2>
                    </div>
                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                      <div>
                        <div className="mb-2 flex items-center gap-2">
                          <label
                            htmlFor="select-country-input-3"
                            className="block text-sm font-medium text-gray-900 dark:text-white"
                          >
                            {' '}
                            Tỉnh thành<span className="text-red-500">
                              {' '}
                              *
                            </span>{' '}
                          </label>
                        </div>
                        <select
                          value={selectedCity || ''}
                          onChange={handleCityChange}
                          className="block w-full rounded-lg border bg-gray-50 p-2.5 text-sm dark:bg-gray-700"
                        >
                          <option value="">Chọn tỉnh thành</option>
                          {cities.map(city => (
                            <option key={city.Id} value={city.Id}>
                              {city.Name}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <div className="mb-2 flex items-center gap-2">
                          <label
                            htmlFor="select-city-input-3"
                            className="block text-sm font-medium text-gray-900 dark:text-white"
                          >
                            {' '}
                            Quận/huyện<span className="text-red-500">
                              {' '}
                              *
                            </span>{' '}
                          </label>
                        </div>
                        <select
                          value={selectedDistrict || ''}
                          onChange={handleDistrictChange}
                          className="block w-full rounded-lg border bg-gray-50 p-2.5 text-sm dark:bg-gray-700"
                        >
                          <option value="">Chọn quận/huyện</option>
                          {selectedCity &&
                            cities
                              .find(city => city.Id === selectedCity)
                              ?.Districts.map(district => (
                                <option key={district.Id} value={district.Id}>
                                  {district.Name}
                                </option>
                              ))}
                        </select>
                      </div>

                      <div>
                        <div className="mb-2 flex items-center gap-2">
                          <label
                            htmlFor="select-district-input-3"
                            className="block text-sm font-medium text-gray-900 dark:text-white"
                          >
                            {' '}
                            Xã <span className="text-red-500">*</span>
                          </label>
                        </div>
                        <select
                          onChange={handleWardChange}
                          value={selectedWard || ''}
                          className="block w-full rounded-lg border bg-gray-50 p-2.5 text-sm dark:bg-gray-700"
                        >
                          <option value="">Chọn phường/xã</option>
                          {wards.map(ward => (
                            <option key={ward.Id} value={ward.Id}>
                              {ward.Name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="address-input"
                      className="block text-sm font-medium text-gray-900"
                    >
                      Địa chỉ cụ thể
                    </label>
                    <input
                      type="text"
                      id="address-input"
                      className="block w-full rounded-lg border bg-gray-50 p-2.5 text-sm dark:bg-gray-700"
                      placeholder="Address"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* thông tin */}
          <div className="m-auto mt-5 max-w-7xl bg-white p-5 pt-10">
            <div className="overflow-x-auto bg-white p-5">
              <div className="relative w-full overflow-auto">
                <table className="w-full caption-bottom text-sm">
                  <tr className="border-b transition-colors">
                    <th className="h-12 min-w-48 px-4 pl-0 text-left align-middle text-lg font-normal text-[#222]">
                      Sản phẩm
                    </th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-[#0000008a]">
                      Giá
                    </th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-[#0000008a]">
                      Số lượng
                    </th>
                    <th className="h-12 px-4 pr-0 text-end align-middle font-medium text-[#0000008a]">
                      Tổng
                    </th>
                  </tr>
                  <tbody className="[&_tr:last-child]:border-0">
                    {selectedItems.map(product => (
                      <tr
                        className="border-b transition-colors"
                        key={product.productId}
                      >
                        <td className="flex items-center gap-3 p-4 pl-0 align-middle">
                          <div className="size-10 min-h-10 min-w-10">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div>
                            <p className="line-clamp-1 text-black">
                              {product.name}
                            </p>
                            <span className="text-[#929292]">
                              category: Color {product.color}, Size{' '}
                              {product.size}
                            </span>
                          </div>
                        </td>
                        <td className="p-4 align-middle">
                          <CurrencyVND amount={product.price} />{' '}
                        </td>
                        <td className="p-4 align-middle">{product.quantity}</td>
                        <td className="p-4 pr-0 text-end align-middle">
                          <CurrencyVND
                            amount={product.price * product.quantity}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-5 flex justify-end">
                <div className="flex items-center gap-2 text-xl font-semibold">
                  Tổng số tiền ({totalQuantity} sản phẩm):{' '}
                  <span className="text-xl text-red-500">
                    <CurrencyVND amount={totalAmount} />
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="m-auto mt-5 max-w-7xl bg-white p-9">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <ReceiptPercent className="h-6 w-6 text-red-500" />
                <span className="font-medium text-gray-800">
                Tempus Chroniker Voucher
                </span>
              </div>
              <button
                onClick={openVoucherModal}
                type="button"
                className="font-medium text-blue-500 hover:underline"
              >
                Chọn Voucher
              </button>
            </div>
            <VoucherModal
              isOpen={isVoucherModalOpen}
              onClose={() => setVoucherModalOpen(false)}
              onApplyCoupon={handleCouponChange}
              totalAmount={totalAmount}
              userId={userIdAddCoupon}
              code={selectedCoupon?.code || null}
            />
          </div>
          <div className="m-auto mt-5 max-w-7xl bg-white p-5 pt-10">
            <div className="flex flex-wrap items-center gap-2">
              <CurrencyDollarSolid className="text-red-500" />
              <div className="text-xl">Phương Thức Thanh Toán:</div>
              <div className="flex w-full gap-2 sm:w-auto">
                <button
                  type="button"
                  onClick={() => handlePaymentMethodChange('cod')}
                  className={`w-full rounded-lg border p-3 ${paymentMethod === 'cod' ? 'border-red-500 bg-red-100' : ''} focus:outline-none sm:w-auto`}
                >
                  Thanh toán khi nhận hàng (COD)
                </button>
                <button
                  type="button"
                  onClick={() => handlePaymentMethodChange('online')}
                  className={`flex w-full rounded-lg border p-3 ${paymentMethod === 'online' ? 'border-red-500 bg-red-100' : ''} focus:outline-none sm:w-auto`}
                >
                  Thanh toán qua{' '}
                  <img className="ml-2 mt-1 w-14" src="./zalo_pay.png" alt="" />
                </button>
              </div>
            </div>
            <hr className="mt-10" />
            <div className="flex flex-col items-start justify-between gap-5 border-t border-gray-200 py-5 md:flex-row">
              <h2 className="flex items-center gap-2 text-xl">
                <DocumentTextSolid className="text-red-500" />
                Chi tiết thanh toán:
              </h2>
              <div>
                <div className="flex justify-between gap-24">
                  <h5 className="text-xl text-gray-500">Tổng sản phẩm:</h5>
                  <div className="text-right">
                    <CurrencyVND amount={totalAmount} />
                  </div>
                </div>
                <div className="flex justify-between gap-24">
                  <h5 className="text-xl text-gray-500">Phí vận chuyển :</h5>
                  <div className="text-right">{shippingMessageDisplay}</div>
                </div>
                <div className="flex justify-between gap-24">
                  <h5 className="text-xl text-gray-500">Số tiền giảm:</h5>
                  <div className="text-right">
                    <CurrencyVND amount={calculateDiscountedTotal()} />
                  </div>
                </div>
                <div className="flex justify-between gap-24">
                  <h5 className="text-xl text-gray-500">Tổng:</h5>
                  <div className="text-right">
                    <CurrencyVND amount={calculateTotalWithDiscount()} />
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4 text-right">
              <button
                type="submit"
                className="w-full rounded bg-blue-500 px-4 py-1.5 text-white hover:bg-black md:w-56"
              >
                Đặt hàng
              </button>
            </div>
          </div>
        </form>
      </section>
    );
  },
});
