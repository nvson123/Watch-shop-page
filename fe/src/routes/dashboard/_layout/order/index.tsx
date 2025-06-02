import CurrencyVND from '@/components/config/vnd';
import Header from '@/components/layoutAdmin/header/header';
import { useFetchOrdersStatus } from '@/data/oder/useOderList';
import useCheckoutMutation from '@/data/oder/useOderMutation';
import { EllipsisVertical } from '@medusajs/icons';
import { DropdownMenu, Input, Table, toast } from '@medusajs/ui';

import {
  createFileRoute,
  useLocation,
  useNavigate,
} from '@tanstack/react-router';
import { useMemo, useState } from 'react';

const pageSize = 10;

export const Route = createFileRoute('/dashboard/_layout/order/')({
  component: OrderList,
});

function OrderList() {
  const location = useLocation();
  const status = location.state?.status || 'all-delivery';
  const select = location.state?.selectedGroup || 'delivery';
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedTab, setSelectedTab] = useState(status || 'all-delivery');
  const navigate = useNavigate();
  const { updateOrderStatus } = useCheckoutMutation();
  const [selectedGroup, setSelectedGroup] = useState(select || 'delivery');
  const [Loading, setIsLoading] = useState(false);

  const {
    data: listOrder,
    meta,
    isLoading,
    error,
  } = useFetchOrdersStatus({
    page: currentPage + 1,
    limit: 10,
    status: selectedTab === 'all-delivery' ? undefined : selectedTab,
  });

  // Tính tổng số trang
  const pageCount = useMemo(() => {
    return meta?.totalItems ? Math.ceil(meta.totalItems / meta.pageSize) : 0;
  }, [meta]);

  const canNextPage = useMemo(
    () => currentPage < pageCount - 1,
    [currentPage, pageCount]
  );
  const canPreviousPage = useMemo(() => currentPage > 0, [currentPage]);

  // Chuyển trang
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

  const deliveryTabs = [
    { id: 'all-delivery', label: 'Tất cả' },
    { id: 'pendingPayment', label: 'Chờ thanh toán' },
    { id: 'pending', label: 'Chờ xác nhận' },
    { id: 'shipped', label: 'Đang vận chuyển' },
    { id: 'received', label: 'Giao hàng thành công' },
    { id: 'delivered', label: 'Hoàn thành đơn hàng' },
    { id: 'canceled', label: 'Đã hủy' },
  ];

  const complaintTabs = [
    { id: 'all-complaint', label: 'Tất cả' },
    { id: 'complaint', label: 'Đang khiếu nại' },
    { id: 'refund_in_progress', label: 'Đang hoàn trả hàng' },
    { id: 'refund_completed', label: 'Hoàn trả thành công' },
    { id: 'exchange_in_progress', label: 'Đang đổi trả hàng' },
    { id: 'exchange_completed', label: 'Đổi trả thành công' },
  ];

  const refundTabs = [
    { id: 'all-refund', label: 'Tất cả' },
    { id: 'refund_initiated', label: 'Chờ hoàn tiền' },
    { id: 'refund_done', label: 'Đã hoàn tiền' },
  ];

  const deliveryStatuses = [
    { value: 'pendingPayment', label: 'Chờ thanh toán' },
    { value: 'pending', label: 'Chờ xác nhận' },
    { value: 'shipped', label: 'Đang vận chuyển' },
    { value: 'received', label: 'Giao hàng thành công' },
    { value: 'delivered', label: 'Hoàn thành đơn hàng' },
    { value: 'canceled', label: 'Đã hủy' },
  ];

  const complaintStatuses = [
    { value: 'complaint', label: 'Đang khiếu nại' },
    { value: 'refund_in_progress', label: 'Đang hoàn trả hàng' },
    { value: 'refund_completed', label: 'Hoàn trả thành công' },
    { value: 'exchange_in_progress', label: 'Đang đổi trả hàng' },
    { value: 'exchange_completed', label: 'Đổi trả thành công' },
    { value: 'delivered', label: 'Hủy khiếu nại' },
  ];
  const refundStatuses = [
    { value: 'refund_initiated', label: 'Chờ hoàn tiền' },
    { value: 'refund_done', label: 'Đã hoàn tiền' },
  ];

  const handleStatusChange = (orderId, newStatus, currentStatus) => {
    const validStatuses =
      selectedGroup === 'delivery'
        ? deliveryStatuses.map(status => status.value)
        : selectedGroup === 'complaint'
          ? complaintStatuses.map(status => status.value)
          : selectedGroup === 'refund'
            ? refundStatuses.map(status => status.value)
            : [];

    if (!validStatuses.includes(newStatus)) {
      toast.error('Trạng thái không hợp lệ cho nhóm hiện tại.');
      return;
    }
    if (
      currentStatus === 'complaint' &&
      !['refund_in_progress', 'exchange_in_progress', 'received'].includes(
        newStatus
      )
    )
      if (
        (currentStatus === 'refund_in_progress' &&
          newStatus !== 'refund_completed') ||
        (currentStatus === 'refund_completed' &&
          newStatus !== 'refund_in_progress') ||
        (currentStatus === 'exchange_in_progress' &&
          newStatus !== 'exchange_completed') ||
        (currentStatus === 'exchange_completed' &&
          newStatus !== 'exchange_in_progress')
      ) {
        toast.error(
          'Trạng thái không hợp lệ trong quá trình hoàn trả/đổi trả.'
        );
        return;
      }
    setIsLoading(true);

    updateOrderStatus.mutate(
      { orderId, status: newStatus },
      {
        onSuccess: () => {
          setIsLoading(false);
          toast.success('Cập nhật trạng thái thành công.');
        },
        onError: error => {
          setIsLoading(false);
          toast.error(`Cập nhật trạng thái thất bại: ${error.message}`);
        },
      }
    );
  };
  const isNextDeliveryStatusValid = (currentStatus, nextStatus) => {
    const deliveryOrder = ['pending', 'shipped', 'received', 'delivered'];
    const currentIndex = deliveryOrder.indexOf(currentStatus);
    const nextIndex = deliveryOrder.indexOf(nextStatus);

    return nextIndex === currentIndex + 1;
  };

  const filteredOrders = listOrder?.filter(order => {
    if (selectedGroup === 'refund') {
      return (
        ['refund_initiated', 'refund_done'].includes(order.status) &&
        order.paymentMethod === 'online'
      );
    }
    if (selectedTab === 'all-delivery') {
      if (selectedGroup === 'delivery') {
        return [
          'pending',
          'shipped',
          'canceled',
          'delivered',
          'pendingPayment',
          'received',
        ].includes(order.status);
      }
    } else if (selectedTab === 'all-complaint') {
      if (selectedGroup === 'complaint') {
        return [
          'complaint',
          'refund_in_progress',
          'refund_completed',
          'exchange_in_progress',
          'exchange_completed',
          'canceled_complaint',
        ].includes(order.status);
      }
    } else {
      return order.status === selectedTab;
    }
    return false;
  });

  console.log('Total Items:', meta?.totalItems);
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="h-screen overflow-y-auto">
      <Header title="Danh sách đơn hàng" pathname="/" />
      <div className="relative flex justify-between px-6 pt-4">
        <div className="relative w-80">
          <Input
            className="bg-ui-bg-base"
            placeholder="Tìm kiếm"
            id="search-input"
            size="small"
          />
        </div>
        <div className="flex items-center gap-2"></div>
      </div>
      {Loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="flex items-center justify-center space-x-2 rounded-lg bg-white p-6 py-4 shadow-lg">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-t-4 border-solid border-gray-200 border-t-indigo-600" />
            <p className="text-gray-500">Đang cập nhật...</p>
          </div>
        </div>
      )}
      <div className="m-6 flex justify-start space-x-4 rounded-lg border bg-white px-6 py-4">
        <button
          onClick={() => {
            setSelectedGroup('delivery') == setSelectedTab('all-delivery');
          }}
          className={`text-gray-700 ${
            selectedGroup === 'delivery'
              ? 'border-b-2 border-red-500 text-red-600'
              : ''
          }`}
        >
          Giao hàng
        </button>
        <button
          onClick={() => {
            setSelectedGroup('complaint') == setSelectedTab('all-complaint');
          }}
          className={`text-gray-700 ${
            selectedGroup === 'complaint'
              ? 'border-b-2 border-red-500 text-red-600'
              : ''
          }`}
        >
          Khiếu nại
        </button>
        <button
          onClick={() => {
            setSelectedGroup('refund');
            setSelectedTab('all-refund');
          }}
          className={`text-gray-700 ${selectedGroup === 'refund' ? 'border-b-2 border-red-500 text-red-600' : ''}`}
        >
          Hoàn tiền
        </button>
      </div>
      <div className="m-6 flex justify-start space-x-4 rounded-lg border bg-white px-6 py-4">
        {(selectedGroup === 'delivery'
          ? deliveryTabs
          : selectedGroup === 'complaint'
            ? complaintTabs
            : refundTabs
        ).map(tab => (
          <button
            key={tab.id}
            onClick={() => setSelectedTab(tab.id)}
            className={`text-gray-700 ${
              selectedTab === tab.id
                ? 'border-b-2 border-red-500 text-red-600'
                : ''
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="mx-6 flex flex-col gap-1 overflow-x-auto rounded-lg border border-gray-200 bg-ui-bg-base px-6 py-4">
        <Table className="min-w-full">
          <Table.Row className="bg-ui-bg-base-hover">
            <Table.HeaderCell className="font-semibold text-ui-fg-base"></Table.HeaderCell>
            <Table.HeaderCell className="font-semibold text-ui-fg-base">
              Mã đơn hàng
            </Table.HeaderCell>
            <Table.HeaderCell className="font-semibold text-ui-fg-base">
              Tên người dùng
            </Table.HeaderCell>
            <Table.HeaderCell className="font-semibold text-ui-fg-base">
              Số sản phẩm
            </Table.HeaderCell>
            <Table.HeaderCell className="font-semibold text-ui-fg-base">
              Tổng tiền (đ)
            </Table.HeaderCell>
            <Table.HeaderCell className="font-semibold text-ui-fg-base">
              Thanh toán
            </Table.HeaderCell>
            <Table.HeaderCell className="font-semibold text-ui-fg-base">
              Trạng thái thanh toán
            </Table.HeaderCell>
            <Table.HeaderCell className="font-semibold text-ui-fg-base">
              Trạng thái
            </Table.HeaderCell>
            <Table.HeaderCell className="font-semibold text-ui-fg-base">
              Lí do trả hàng
            </Table.HeaderCell>
          </Table.Row>
          <Table.Body>
            {filteredOrders?.length > 0 ? (
              filteredOrders.map(order => (
                <Table.Row
                  key={order._id}
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
                        <DropdownMenu.Item
                          className="p-2 text-ui-tag-neutral-text hover:text-ui-code-bg-base"
                          onClick={() =>
                            void navigate({
                              to: `/dashboard/detailorder/${order._id}/detailorder`,
                            })
                          }
                        >
                          View Details
                        </DropdownMenu.Item>
                      </DropdownMenu.Content>
                    </DropdownMenu>
                  </Table.Cell>
                  <Table.Cell className="font-semibold text-ui-fg-base">
                    {order.orderNumber}
                  </Table.Cell>
                  <Table.Cell className="font-semibold text-ui-fg-base">
                    {order.customerInfo.name}
                  </Table.Cell>
                  <Table.Cell className="text-center font-semibold text-ui-fg-base">
                    {order.items.length}
                  </Table.Cell>
                  <Table.Cell className="font-semibold text-ui-fg-base">
                    <CurrencyVND amount={order.totalPrice} />
                  </Table.Cell>
                  <Table.Cell className="font-semibold text-ui-fg-base">
                    {order.paymentMethod === 'online' ? (
                      <img
                        src="/zalo_pay.png"
                        alt="Zalopay"
                        className="ml-1 h-12 w-12 object-contain"
                      />
                    ) : (
                      <img
                        src="/cod-removebg-preview.png"
                        alt="Zalopay"
                        className="ml-2 h-10 w-10 object-cover"
                      />
                    )}
                  </Table.Cell>
                  <Table.Cell className="font-semibold text-ui-fg-base">
                    {order.paymentStatus === 'pending' ? (
                      <span>Đã thanh toán</span>
                    ) : order.paymentStatus === 'failed' ? (
                      <span>Chờ thanh toán</span>
                    ) : order.paymentStatus === 'cod' ? (
                      <span>Thanh toán khi nhận</span>
                    ) : order.paymentStatus === 'pendingRefund' ? (
                      <span>Chờ hoàn tiền</span>
                    ) : order.paymentStatus === 'doneRefund' ? (
                      <span>Đã hoàn tiền</span>
                    ) : (
                      order.paymentStatus
                    )}
                  </Table.Cell>
                  <Table.Cell className="font-semibold text-ui-fg-base">
                    <select
                      value={order.status}
                      onChange={e =>
                        handleStatusChange(
                          order._id,
                          e.target.value,
                          order.status
                        )
                      }
                      className="w-full min-w-[150px] cursor-pointer rounded-md border border-gray-300 bg-white px-2 py-1 text-sm text-gray-700"
                    >
                      {(selectedGroup === 'delivery'
                        ? deliveryStatuses
                        : selectedGroup === 'complaint'
                          ? complaintStatuses
                          : refundStatuses
                      ).map(status => {
                        const isDisabled =
                          order.status === 'pendingPayment' ||
                          order.status === 'canceled' ||
                          order.status === 'canceled_complaint' ||
                          order.status === 'refund_completed' ||
                          order.status === 'exchange_completed' ||
                          (selectedGroup === 'delivery' &&
                            !(
                              isNextDeliveryStatusValid(
                                order.status,
                                status.value
                              ) ||
                              (order.status === 'pending' &&
                                status.value === 'canceled')
                            )) ||
                          (order.status === 'refund_in_progress' &&
                            status.value !== 'refund_completed') ||
                          (order.status === 'exchange_in_progress' &&
                            status.value !== 'exchange_completed') ||
                          (order.status === 'complaint' &&
                            status.value !== 'refund_in_progress' &&
                            status.value !== 'exchange_in_progress' &&
                            status.value !== 'delivered') ||
                          (order.status === 'refund_done' &&
                            status.value === 'refund_initiated');
                        return (
                          <option
                            key={status.value}
                            value={status.value}
                            disabled={isDisabled}
                          >
                            {status.label}
                          </option>
                        );
                      })}
                    </select>
                  </Table.Cell>
                  <Table.Cell className="max-w-[150px] overflow-hidden text-ellipsis whitespace-nowrap font-semibold text-ui-fg-base">
                    <DropdownMenu>
                      <DropdownMenu.Trigger asChild>
                        <span className="cursor-pointer">
                          {order.returnReason || 'N/A'}
                        </span>
                      </DropdownMenu.Trigger>
                      <DropdownMenu.Content className="w-96 p-4">
                        <div>
                          <p className="font-semibold">Lý do chi tiết:</p>
                          <p>{order.returnReason || 'N/A'} </p>
                        </div>
                      </DropdownMenu.Content>
                    </DropdownMenu>
                  </Table.Cell>
                </Table.Row>
              ))
            ) : (
              <Table.Row>
                <Table.Cell className="text-center">
                  Không có đơn hàng nào
                </Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table>
        <Table.Pagination
          count={meta?.totalItems ?? 0}
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

export default OrderList;
