import CurrencyVND from '@/components/config/vnd';
import { useFetchOrdersStatus } from '@/data/oder/useOderList';
import useCheckoutMutation from '@/data/oder/useOderMutation';
import { EllipsisVertical } from '@medusajs/icons';
import { Button, DropdownMenu, Table, toast } from '@medusajs/ui';

import { Link, useLocation, useNavigate } from '@tanstack/react-router';
import { useState } from 'react';

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
    limit: 11,
    // status: selectedTab === 'all-delivery' ? undefined : selectedTab,
  });

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

  const handleStatusChange = (orderId, newStatus, currentStatus) => {
    const validStatuses =
      selectedGroup === 'delivery'
        ? deliveryStatuses.map(status => status.value)
        : complaintStatuses.map(status => status.value);

    if (!validStatuses.includes(newStatus)) {
      toast.error('Trạng thái không hợp lệ cho nhóm hiện tại.');
      return;
    }
    if (currentStatus === 'pending' && newStatus === 'canceled') {
    } else if (
      currentStatus === 'complaint' &&
      !['refund_in_progress', 'exchange_in_progress', 'received'].includes(
        newStatus
      )
    ) {
      toast.error(
        'Trạng thái chỉ có thể chuyển sang "Đang hoàn trả hàng", "Đang đổi trả hàng" hoặc "Đã nhận hàng".'
      );
      return;
    }

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
      toast.error('Trạng thái không hợp lệ trong quá trình hoàn trả/đổi trả.');
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
    <div className="h-[500px] overflow-y-auto">
      {Loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="flex items-center justify-center space-x-2 rounded-lg bg-white p-6 py-4 shadow-lg">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-t-4 border-solid border-gray-200 border-t-indigo-600" />
            <p className="text-gray-500">Đang cập nhật...</p>
          </div>
        </div>
      )}
      <div className="mx-6 flex flex-col gap-1 overflow-x-auto rounded-lg bg-ui-bg-base px-6 py-4 shadow-sm">
        <div className="flex justify-between">
          <h1 className="mb-3 text-lg font-semibold">
            Thông tin đơn hàng gần đây
          </h1>
          <div>
            <Button variant="secondary" asChild>
              <Link to="/dashboard/order">View all</Link>
            </Button>
          </div>
        </div>
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
                    {/* {order.items.map((product, index) => (
                      <span key={product._id || index}>
                        <div className="ml-5 max-w-[150px] overflow-hidden text-ellipsis whitespace-nowrap font-semibold text-ui-fg-base">
                          {product.name}
                        </div>
                      </span>
                    ))} */}
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
                      className="w-full min-w-[150px] rounded-md border border-gray-300 bg-white px-2 py-1 text-sm text-gray-700"
                    >
                      {(selectedGroup === 'delivery'
                        ? deliveryStatuses
                        : complaintStatuses
                      ).map(status => {
                        const isDisabled =
                          order.status === 'pendingPayment' ||
                          order.status === 'canceled' ||
                          order.status === 'canceled_complaint' ||
                          order.status === 'refund_completed' ||
                          order.status === 'exchange_completed' ||
                          (selectedGroup === 'delivery' &&
                            !(
                              (
                                isNextDeliveryStatusValid(
                                  order.status,
                                  status.value
                                ) ||
                                (order.status === 'pending' &&
                                  status.value === 'canceled')
                              ) // Cho phép từ pending sang canceled
                            )) ||
                          (order.status === 'refund_in_progress' &&
                            status.value !== 'refund_completed') ||
                          (order.status === 'exchange_in_progress' &&
                            status.value !== 'exchange_completed') ||
                          (order.status === 'complaint' &&
                            status.value !== 'refund_in_progress' &&
                            status.value !== 'exchange_in_progress' &&
                            status.value !== 'delivered');
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
      </div>
    </div>
  );
}

export default OrderList;
