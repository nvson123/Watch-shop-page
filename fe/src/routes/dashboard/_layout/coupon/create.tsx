import Header from '@/components/layoutAdmin/header/header';
import NewHeader from '@/components/layoutAdmin/header/new-header';
import useCouponMutation from '@/data/coupon/useCouponMutation';
import { Button, DatePicker, Input, Select } from '@medusajs/ui';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { SubmitHandler, useForm } from 'react-hook-form';

export const Route = createFileRoute('/dashboard/_layout/coupon/create')({
  component: AddCoupon,
});

interface CouponFormValues {
  code: string;
  discount: number;
  minOrder: number;
  expirationDate: string;
  startDate: string; // Thêm startDate
  maxDiscountAmount: number; // Thêm maxDiscountAmount
  isActive: boolean;
  isFreeShipping: boolean;
}

function AddCoupon() {
  const navigate = useNavigate();
  const { createCoupon } = useCouponMutation();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    setError, // Import setError để xử lý lỗi custom
  } = useForm<CouponFormValues>();

  const onCreateCoupon: SubmitHandler<CouponFormValues> = async data => {
    // Kiểm tra nếu discount lớn hơn 100%
    if (data.discount > 100) {
      setError('discount', {
        type: 'manual',
        message: 'Giảm giá không được lớn hơn 100%',
      });
      return;
    }
    try {
      // Gọi API để tạo mã giảm giá mới
      createCoupon.mutate(data);
      navigate({ to: '/dashboard/coupon' });
    } catch (error) {
      console.error('Failed to create coupon', error);
    }
  };

  return (
    <div className="h-screen overflow-y-auto">
      <div className="fixed left-0 right-0 top-16 z-10 md:relative md:left-auto md:right-auto md:top-0">
        <NewHeader
          breadcrumbs={[
            {
              title: 'Danh sách phiếu giảm giá',
              href: '/dashboard/coupon',
            },
            {
              title: 'Thêm phiếu giảm giá',
            },
          ]}
        />
      </div>
      <form onSubmit={handleSubmit(onCreateCoupon)} className="m-8">
        <div className="my-3 flex justify-between">
          <div className="w-[330px]">
            <Input
              placeholder="Search"
              id="search-input"
              size="small"
              type="search"
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant="secondary"
              type="button"
              onClick={() => navigate({ to: '/dashboard/coupon' })}
            >
              Hủy
            </Button>
            <Button variant="primary" type="submit">
              Tạo phiếu giảm giá
            </Button>
          </div>
        </div>

        <div className="rounded-lg border bg-ui-bg-base p-7">
          <h1 className="text-2xl font-medium text-ui-fg-base">
            Thông tin phiếu giảm giá
          </h1>
          <p className="mb-4 text-sm font-normal text-ui-fg-subtle">
            Nhập chi tiết phiếu giảm giá như mã, giảm giá, ngày hết hạn và trạng
            thái.
          </p>

          <div className="space-y-4">
            {/* Phiếu giảm giá */}
            <div className="flex space-x-4">
              <div className="flex-1 space-y-3">
                <label className="text-sm font-medium text-ui-fg-base">
                  <span className="text-ui-tag-red-text">*</span> Phiếu giảm giá
                </label>
                <Input
                  placeholder="e.g., FREESHIP"
                  size="base"
                  {...register('code', {
                    required: 'Phiếu giảm giá is required',
                  })}
                />
                {errors.code && (
                  <span className="text-xs text-red-500">
                    {errors.code.message}
                  </span>
                )}
              </div>
            </div>

            {/* Giảm giá */}
            <div className="flex space-x-4">
              <div className="flex-1 space-y-3">
                <label className="text-sm font-medium text-ui-fg-base">
                  <span className="text-ui-tag-red-text">*</span> Giảm giá (%)
                </label>
                <Input
                  type="number"
                  step="1"
                  placeholder="e.g., 10"
                  size="base"
                  {...register('discount', {
                    required: 'Discount is required',
                    min: { value: 0, message: 'Discount must be positive' },
                  })}
                />
                {errors.discount && (
                  <span className="text-xs text-red-500">
                    {errors.discount.message}
                  </span>
                )}
                {errors.discount?.type === 'manual' && (
                  <span className="text-xs text-red-500">
                    {errors.discount.message}
                  </span>
                )}
              </div>
            </div>

            {/* Đơn hàng tối thiểu */}
            <div className="flex space-x-4">
              <div className="flex-1 space-y-3">
                <label className="text-sm font-medium text-ui-fg-base">
                  <span className="text-ui-tag-red-text">*</span> Đơn hàng tối
                  thiểu
                </label>
                <Input
                  type="number"
                  step="1"
                  placeholder="e.g., 10"
                  size="base"
                  {...register('minOrder', {
                    required: 'MinOrder is required',
                    min: { value: 0, message: 'MinOrder must be positive' },
                  })}
                />
                {errors.minOrder && (
                  <span className="text-xs text-red-500">
                    {errors.minOrder.message}
                  </span>
                )}
              </div>
            </div>

            {/* Số tiền giảm tối đa */}
            <div className="flex space-x-4">
              <div className="flex-1 space-y-3">
                <label className="text-sm font-medium text-ui-fg-base">
                  Số tiền giảm tối đa
                </label>
                <Input
                  type="number"
                  step="1"
                  placeholder="e.g., 50"
                  size="base"
                  {...register('maxDiscountAmount')}
                />
                {errors.maxDiscountAmount && (
                  <span className="text-xs text-red-500">
                    {errors.maxDiscountAmount.message}
                  </span>
                )}
              </div>
            </div>

            {/* Miễn phí vận chuyển */}
            <div className="flex space-x-4">
              <div className="flex-1 space-y-3">
                <label className="text-sm font-medium text-ui-fg-base">
                  <span className="text-ui-tag-red-text">*</span> Miễn phí vận
                  chuyển
                </label>
                <Select
                  onValueChange={value =>
                    setValue('isFreeShipping', value === 'true')
                  }
                  defaultValue="false"
                >
                  <Select.Trigger>
                    <Select.Value placeholder="Lựa chọn" />
                  </Select.Trigger>
                  <Select.Content>
                    <Select.Item value="true">Có</Select.Item>
                    <Select.Item value="false">Không</Select.Item>
                  </Select.Content>
                </Select>
              </div>
            </div>

            {/* Ngày bắt đầu */}
            <div className="flex space-x-4">
              <div className="flex-1 space-y-3">
                <label className="text-sm font-medium text-ui-fg-base">
                  <span className="text-ui-tag-red-text">*</span> Ngày bắt đầu
                </label>
                <DatePicker
                  placeholder="Chọn ngày bắt đầu"
                  onChange={date => setValue('startDate', date)}
                />
              </div>
            </div>

            {/* Ngày hết hạn */}
            <div className="flex space-x-4">
              <div className="flex-1 space-y-3">
                <label className="text-sm font-medium text-ui-fg-base">
                  <span className="text-ui-tag-red-text">*</span> Ngày hết hạn
                </label>
                <DatePicker
                  placeholder="Chọn ngày hết hạn"
                  onChange={date => setValue('expirationDate', date)}
                />
              </div>
            </div>

            {/* Trạng thái */}
            <div className="flex space-x-4">
              <div className="flex-1 space-y-3">
                <label className="text-sm font-medium text-ui-fg-base">
                  <span className="text-ui-tag-red-text">*</span> Trạng thái
                </label>
                <Select
                  onValueChange={value =>
                    setValue('isActive', value === 'true')
                  }
                  defaultValue="true"
                >
                  <Select.Trigger>
                    <Select.Value placeholder="Select Trạng thái" />
                  </Select.Trigger>
                  <Select.Content>
                    <Select.Item value="true">Áp dụng</Select.Item>
                    <Select.Item value="false">Hủy áp dụng</Select.Item>
                  </Select.Content>
                </Select>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddCoupon;
