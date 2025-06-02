import Header from '@/components/layoutAdmin/header/header';
import { useFetchCoupons } from '@/data/coupon/useCouponList';
import useCouponMutation from '@/data/coupon/useCouponMutation';
import { EllipsisVertical, Plus } from '@medusajs/icons';
import { Button, DropdownMenu, Input, Table, usePrompt } from '@medusajs/ui';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useMemo, useState } from 'react';

const pageSize = 7;

export const Route = createFileRoute('/dashboard/_layout/coupon/')({
  component: CouponList,
});

function CouponList() {
  const [currentPage, setCurrentPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const dialog = usePrompt();

  const {
    data: listCoupon,
    error,
    isLoading,
  } = useFetchCoupons({
    limit: pageSize,
    page: currentPage + 1,
  });

  const pageCount = useMemo(() => {
    return listCoupon?.meta
      ? Math.ceil(listCoupon.meta.totalItems / pageSize)
      : 0;
  }, [listCoupon]);

  const canNextPage = useMemo(
    () => currentPage < pageCount - 1,
    [currentPage, pageCount]
  );
  const canPreviousPage = useMemo(() => currentPage > 0, [currentPage]);

  const nextPage = () => {
    if (canNextPage) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const previousPage = () => {
    if (canPreviousPage) {
      setCurrentPage(prev => prev - 1);
    }
  };

  const { deleteCoupon } = useCouponMutation();
  const deleteEntity = async (_id: string) => {
    const userHasConfirmed = await dialog({
      title: 'Xóa phiếu giảm giá',
      description: 'Bạn có chắc chắn muốn xóa phiếu giảm giá này?',
    });
    if (userHasConfirmed) {
      deleteCoupon.mutate(_id);
    }
  };

  const filteredCoupons = useMemo(() => {
    return Array.isArray(listCoupon)
      ? listCoupon.filter(coupon =>
          coupon.code.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : [];
  }, [listCoupon, searchQuery]);

  if (isLoading) return <p>Đang tải phiếu giảm giá...</p>;
  if (error) return <p>Lỗi: {error.message}</p>;

  return (
    <div className="h-screen overflow-y-auto">
      <Header title="Danh sách phiếu giảm giá" pathname="/" />
      <div className="relative flex justify-between px-6 py-4">
        <div className="relative w-80">
          <Input
            className="bg-ui-bg-base"
            placeholder="Tìm kiếm"
            id="search-input"
            size="small"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="primary"
            onClick={() => navigate({ to: '/dashboard/coupon/create' })}
          >
            <Plus />
            Tạo phiếu giảm giá
          </Button>
        </div>
      </div>

      <div className="mx-6 flex flex-col gap-1 rounded-lg border border-gray-200 bg-ui-bg-base px-6 py-4">
        <Table>
          <thead>
            <Table.Row className="bg-ui-bg-base-hover">
              <Table.HeaderCell className="font-semibold text-ui-fg-base"></Table.HeaderCell>
              <Table.HeaderCell className="font-semibold text-ui-fg-base">
                Mã phiếu giảm giá
              </Table.HeaderCell>
              <Table.HeaderCell className="font-semibold text-ui-fg-base">
                Giảm giá
              </Table.HeaderCell>
              <Table.HeaderCell className="font-semibold text-ui-fg-base">
                Tổng tiền yêu cầu
              </Table.HeaderCell>
              <Table.HeaderCell className="font-semibold text-ui-fg-base">
                Số tiền giảm tối đa
              </Table.HeaderCell>
              <Table.HeaderCell className="font-semibold text-ui-fg-base">
                Miễn phí vận chuyển
              </Table.HeaderCell>
              <Table.HeaderCell className="font-semibold text-ui-fg-base">
                Ngày bắt đầu
              </Table.HeaderCell>
              <Table.HeaderCell className="font-semibold text-ui-fg-base">
                Ngày hết hạn
              </Table.HeaderCell>
              <Table.HeaderCell className="font-semibold text-ui-fg-base">
                Trạng thái
              </Table.HeaderCell>
            </Table.Row>
          </thead>
          <tbody>
            {filteredCoupons.length > 0 ? (
              filteredCoupons.map(coupon => (
                <Table.Row
                  key={coupon._id}
                  className="[&_td:last-child]:w-[10%] [&_td:last-child]:whitespace-nowrap"
                >
                  <Table.Cell>
                    <DropdownMenu>
                      <DropdownMenu.Trigger asChild>
                        <button type="button" className="outline-none">
                          <EllipsisVertical />
                        </button>
                      </DropdownMenu.Trigger>
                      <DropdownMenu.Content className="space-y-2">
                        <DropdownMenu.Item className="p-2 text-ui-tag-neutral-text hover:text-ui-code-bg-base">
                          <span
                            onClick={() =>
                              void navigate({
                                to: `/dashboard/coupon/${coupon._id}/showUser`,
                              })
                            }
                          >
                            Chi tiết sản phẩm
                          </span>
                        </DropdownMenu.Item>
                        <DropdownMenu.Item className="gap-x-2" asChild>
                          <span onClick={async () => deleteEntity(coupon._id)}>
                            Xóa
                          </span>
                        </DropdownMenu.Item>
                        <DropdownMenu.Item
                          className="gap-x-2"
                          onClick={() =>
                            void navigate({
                              to: `/dashboard/coupon/${coupon._id}/edit`,
                            })
                          }
                        >
                          Chỉnh sửa
                        </DropdownMenu.Item>
                      </DropdownMenu.Content>
                    </DropdownMenu>
                  </Table.Cell>
                  <Table.Cell className="font-semibold text-ui-fg-base">
                    {coupon.code}
                  </Table.Cell>
                  <Table.Cell className="font-semibold text-ui-fg-base">
                    {coupon.isFreeShipping
                      ? 'Không áp dụng'
                      : `${coupon.discount} %`}
                  </Table.Cell>
                  <Table.Cell className="font-semibold text-ui-fg-base">
                    {coupon.minOrder == 0
                      ? 'Không áp dụng'
                      : `${coupon.minOrder} đ`}
                  </Table.Cell>
                  <Table.Cell className="font-semibold text-ui-fg-base">
                    {coupon.maxDiscountAmount == 0
                      ? 'Không áp dụng'
                      : `${coupon.maxDiscountAmount} đ`}
                  </Table.Cell>
                  <Table.Cell className="font-semibold text-ui-fg-base">
                    {coupon.isFreeShipping ? 'Có' : 'Không'}
                  </Table.Cell>
                  <Table.Cell className="font-semibold text-ui-fg-base">
                    {new Date(coupon.startDate).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell className="font-semibold text-ui-fg-base">
                    {new Date(coupon.expirationDate).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell className="font-semibold text-ui-fg-base">
                    {coupon.isActive ? 'Hoạt động' : 'Không hoạt động'}
                  </Table.Cell>
                </Table.Row>
              ))
            ) : (
              <Table.Row>
                <Table.Cell className="text-center" colSpan={6}>
                  Không có phiếu giảm giá nào
                </Table.Cell>
              </Table.Row>
            )}
          </tbody>
        </Table>
        <Table.Pagination
          count={listCoupon?.meta?.totalItems ?? 0}
          pageSize={pageSize}
          pageIndex={currentPage}
          pageCount={pageCount}
          canPreviousPage={canPreviousPage}
          canNextPage={canNextPage}
          previousPage={previousPage}
          nextPage={nextPage}
        />
      </div>
    </div>
  );
}

export default CouponList;
