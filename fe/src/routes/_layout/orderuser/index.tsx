import instance from '@/api/axiosIntance';
import CurrencyVND, { CreateSlugByTitle } from '@/components/config/vnd';
import CustomUser from '@/components/useroder/custom-menu';
import useCommentMutation from '@/data/Comment/useCommentMutation';
import { useFetchOrdersByUserId } from '@/data/oder/useOderList';
import { retryPayment } from '@/data/oder/usePayment';
import {
  ChevronLeft,
  ChevronRight,
  ChevronRightMini,
  StarSolid,
} from '@medusajs/icons';
import { toast, usePrompt } from '@medusajs/ui';
import { createFileRoute, Link } from '@tanstack/react-router';
import { useEffect, useState } from 'react';

export const Route = createFileRoute('/_layout/orderuser/')({
  component: UserOrder,
});

type Order = {
  _id: string;
  status: string;
  slug: string;
  orderNumber: string;
  customerInfo: CustomerInfo;
  products: Product[];
  totalPrice: number;
  refundReason?: string;
  items: Item[];
};

const getStatusLabel = (status: string) => {
  switch (status) {
    case 'pendingPayment':
      return 'Chờ thanh toán';
    case 'pending':
      return 'Chờ xác nhận';
    case 'confirmed':
      return 'Chờ lấy hàng';
    case 'shipped':
      return 'Đang vận chuyển';
    case 'received':
      return 'Chờ giao hàng';
    case 'delivered':
      return 'Đã giao';
    case 'canceled':
      return 'Đã hủy';
    case 'returned':
      return 'Đã hoàn trả';
    case 'complaint':
      return 'Đang khiếu nại';
    case 'refund_in_progress':
      return 'Đang hoàn trả hàng';
    case 'refund_completed':
      return 'Hoàn trả hàng thành công';
    case 'exchange_in_progress':
      return 'Đang đổi trả hàng';
    case 'exchange_completed':
      return 'Đổi trả hàng thành công';
    case 'canceled_complaint':
      return 'Hủy khiếu nại';
    case 'refund_done':
      return 'Hoàn tiền thành công';
    case 'refund_initiated':
      return 'Chờ hoàn tiền';
    default:
      return status;
  }
};

function UserOrder() {
  const [userId, setUserId] = useState(null);
  const [selectedTab, setSelectedTab] = useState('all');
  const [orders, setOrders] = useState<Order[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  const [showComplaintModal, setShowComplaintModal] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [isReviewBoxVisible, setReviewBoxVisible] = useState(false);
  const [rating, setRating] = useState(0); // State for product rating
  const [newComment, setNewComment] = useState('');
  const { createComment } = useCommentMutation();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [reviewedProductIds, setReviewedProductIds] = useState([]);
  const [showThankYouMessage, setShowThankYouMessage] = useState(false);
  const [OrderId, setOrderId] = useState(null);
  const [ProductSlug, setProductSlug] = useState(null);
  const [ProductId, setProductId] = useState(null);
  const fetchReviewedProducts = async () => {
    try {
      if (!orders || orders.length === 0) {
        console.error('Không có đơn hàng để kiểm tra.');
        return;
      }
  
      // Tạo payload chỉ chứa các mục hợp lệ
      const dataToCheck = orders
        .map(order => ({
          orderId: order._id,
          productSlugs: order.items.map(item => item.slug).filter(Boolean), // Lọc productSlugs null hoặc undefined
        }))
        .filter(data => data.orderId && data.productSlugs.length > 0); // Lọc các mục không có orderId hoặc productSlugs hợp lệ
  
      if (dataToCheck.length === 0) {
        console.warn('Không có dữ liệu hợp lệ để gửi.');
        return;
      }
  
      console.log('Payload gửi lên:', { data: dataToCheck });
  
      // Gửi dữ liệu đến API
      const response = await instance.post('/comments/check-reviewed', { data: dataToCheck });
  
      const reviewedProducts = response.data.reviewedProducts || [];
      console.log("Danh sách sản phẩm đã đánh giá:", reviewedProducts);
  
      // Cập nhật danh sách đã đánh giá
      setReviewedProductIds(reviewedProducts.map(item => ({
        orderId: item.orderId,
        productSlug: item.productSlug,
      })));
    } catch (error) {
      console.error('Lỗi khi kiểm tra sản phẩm đã được đánh giá:', error);
    }
  };
  


  useEffect(() => {
    fetchReviewedProducts(); // Cập nhật ngay khi component render hoặc khi orders thay đổi
  }, [orders]);

  const handleOpenReviewBox = (orderId, product) => {
    document.body.style.overflow = 'hidden';
    setReviewBoxVisible(true);
    setSelectedProduct(product);
    console.log("product", product.slug);
    setOrderId(orderId)
    setProductSlug(product.slug)
    setProductId(product.productId)
  };
  console.log("id", ProductId);

  const handleCloseReviewBox = () => {
    document.body.style.overflow = 'auto';
    setReviewBoxVisible(false);
  };

  const dialog = usePrompt();

  const handleOpenComplaintModal = (orderId: string) => {
    setSelectedOrderId(orderId);
    setShowComplaintModal(true);
  };

  const handleRatingChange = (newRating: number) => {
    setRating(newRating); // Update the rating value
  };

  const deleteEntity = async (orderId: string) => {
    // Hiển thị hộp thoại xác nhận
    const userHasConfirmed = await dialog({
      title: 'Xác nhận hủy đơn hàng',
      description: 'Bạn có chắc chắn muốn hủy đơn hàng này không?',
    });

    // Nếu người dùng xác nhận, tiến hành hủy đơn hàng
    if (userHasConfirmed) {
      try {
        // Gọi API để hủy đơn hàng
        const response = await instance.put(`/orders/${orderId}/cancel`);
        console.log('Hủy đơn hàng thành công:', response.data);
        toast.success('Đơn hàng đã được hủy thành công.');

        // Cập nhật danh sách đơn hàng sau khi hủy
        const updatedOrders = orders.map((order: Order) =>
          order._id === orderId
            ? {
              ...order,
              status: 'refund_initiated',
              paymentStatus: 'pendingRefund',
            }
            : order
        );
        setOrders(updatedOrders);
      } catch (error) {
        console.error('Error cancelling order:', error);
        toast.error('Có lỗi xảy ra khi hủy đơn hàng, vui lòng thử lại.');
      }
    }
  };

  const handleConfirmReceived = (orderId: string) => {
    const order = orders.find(o => o._id === orderId);
    if (!order) {
      toast.error('Không tìm thấy đơn hàng.');
      return;
    }

    // Kiểm tra trạng thái đơn hàng
    if (order.status !== 'shipped' && order.status !== 'received') {
      toast.error(
        'Chỉ có đơn hàng đang ở trạng thái "Đang giao" hoặc "Đã nhận" mới có thể xác nhận.'
      );
      return;
    }
    // Xử lý tiếp nếu trạng thái hợp lệ
    console.log('Xác nhận đơn hàng thành công:', order);

    // Gửi yêu cầu xác nhận đơn hàng đã nhận
    instance
      .put(`/orders/${orderId}/confirm-received`)
      .then(_response => {
        toast.success('Đơn hàng đã được xác nhận.');
        // Cập nhật trạng thái đơn hàng từ 'received' sang 'delivered'
        const updatedOrders = orders.map((order: Order) =>
          order._id === orderId
            ? { ...order, status: 'delivered', paymentStatus: 'pending' }
            : order
        );
        setOrders(updatedOrders);
      })
      .catch(error => {
        toast.error('Có lỗi xảy ra, vui lòng thử lại.');
        console.error('Error confirming order:', error);
      });
  };

  const handleCommentSubmit = async () => {
    if (!newComment.trim()) {
      toast.error('Vui lòng nhập bình luận.');
      return;
    }
  
    if (rating === 0) {
      toast.error('Vui lòng chọn đánh giá sao.');
      return;
    }
  
    if (!OrderId || !ProductSlug) {
      toast.error('Không xác định được đơn hàng hoặc sản phẩm.');
      return;
    }
  
    try {
      // Gọi mutation để tạo bình luận
      const response = await createComment.mutateAsync({
        orderId: OrderId, // Truyền ID của đơn hàng
        productSlug: ProductSlug, // Truyền slug của sản phẩm
        commentText: newComment, // Nội dung bình luận
        userId: localStorage.getItem('userId') || '', // Lấy userId từ localStorage
        rating,
        ProductId: ProductId,
      });
  
      // Log phản hồi từ backend để kiểm tra (nếu cần)
      console.log('Phản hồi từ backend:', response);
  
      // Cập nhật lại danh sách các sản phẩm đã được đánh giá
      await fetchReviewedProducts(); // Đảm bảo fetch lại ngay sau khi gửi bình luận thành công
  
      // Reset input và rating sau khi gửi bình luận thành công
      setNewComment('');
      setRating(0);
  
      // Đóng box review
      handleCloseReviewBox();
  
      // Hiển thị thông báo "Cảm ơn bạn đã đánh giá"
      toast.success('Cảm ơn bạn đã đánh giá!');
      setShowThankYouMessage(true);
  
      // Đặt thời gian để ẩn thông báo sau vài giây (ví dụ 3 giây)
      setTimeout(() => {
        setShowThankYouMessage(false);
      }, 3000);
    } catch (err) {
      // Hiển thị lỗi từ backend nếu có
      console.error('Error submitting comment:', err);
      toast.error(
        err?.response?.data?.message || err.message || 'Có lỗi xảy ra khi gửi bình luận.'
      );
    }
  };
  
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
    setUserId(storedUser?.user?._id || null);
  }, []);

  const { data, isLoading, error } = useFetchOrdersByUserId(userId || '');

  useEffect(() => {
    if (data) {
      console.log('Orders data:', data); // Kiểm tra dữ liệu đơn hàng
      setOrders(data);
    }
  }, [data]);

  if (!userId) {
    return (
      <div className="mt-10 text-center text-gray-500">
        Vui lòng đăng nhập để xem đơn hàng của bạn.
      </div>
    );
  }

  if (isLoading) {
    return <div className="mt-10 text-center text-gray-500">Đang tải...</div>;
  }

  if (error) {
    return (
      <div className="mt-10 text-center text-red-500">Lỗi: {error.message}</div>
    );
  }

  const tabs = [
    { id: 'all', label: 'Tất cả' },
    { id: 'pendingPayment', label: 'Chờ thanh toán' },
    { id: 'pending', label: 'Chờ xác nhận' },
    { id: 'shipped', label: 'Đang vận chuyển' },
    { id: 'delivered', label: 'Đã giao' },
    { id: 'canceled', label: 'Đã hủy' },
    { id: 'complaint', label: 'Khiếu nại' },
    { id: 'refund', label: 'Hoàn tiền' },
  ];

  const filteredOrders = orders?.filter((order: Order) => {
    // Trạng thái "Hoàn trả hàng thành công" sẽ chuyển vào tab "Đã hủy"
    if (selectedTab === 'canceled') {
      return order.status === 'canceled' || order.status === 'refund_completed'; // refund_completed chuyển vào "Đã hủy"
    }

    // Trạng thái "Đổi trả hàng thành công" sẽ chuyển vào tab "Đã giao"
    if (selectedTab === 'delivered') {
      return (
        order.status === 'delivered' || order.status === 'exchange_completed'
      ); // exchange_completed chuyển vào "Đã giao"
    }

    if (selectedTab === 'all') {
      return true;
    }
    if (selectedTab === 'pendingPayment') {
      return order.status === 'pendingPayment';
    }
    if (selectedTab === 'pending') {
      return order.status === 'pending';
    }

    if (selectedTab === 'confirmed') {
      return order.status === 'confirmed';
    }

    if (selectedTab === 'shipped') {
      return order.status === 'shipped' || order.status === 'received';
    }

    if (selectedTab === 'delivered') {
      return order.status === 'delivered';
    }

    if (selectedTab === 'canceled') {
      return order.status === 'canceled';
    }
    if (selectedTab === 'refund') {
      return (
        order.status === 'refund_done' || order.status === 'refund_initiated'
      );
    }

    if (selectedTab === 'complaint') {
      return (
        order.status === 'complaint' ||
        order.status === 'refund_in_progress' ||
        order.status === 'refund_completed' ||
        order.status === 'exchange_in_progress' ||
        order.status === 'exchange_completed' ||
        order.status === 'canceled_complaint'
      );
    }

    return order.status === selectedTab;
  });

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const ordersToDisplay = filteredOrders.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };
  return (
    <div className="bg-gray-50">
      <div className="bg-white">
        <div className="main-content flex h-48 w-full flex-col items-center justify-center">
          <div className="text-content">
            <div className="text-center text-4xl font-semibold">
              Đơn hàng của tôi
            </div>
            <div className="link caption1 mt-3 flex items-center justify-center gap-1">
              <div className="flex items-center justify-center">
                <a href="/">Trang chủ</a>
                <ChevronRightMini />
              </div>

              <div className="capitalize text-gray-500">
                <Link to="/orderuser">Đơn mua</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto flex max-w-7xl bg-gray-50 py-10 pt-10">
        <CustomUser />

        <div className="ml-6 w-3/4">
          <div className="mb-2 flex flex-wrap justify-between rounded-sm border-[0.5px] border-b border-gray-200 bg-white shadow sm:space-x-0">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id)}
                className={`px-2 py-2 text-[15px] sm:px-4 ${selectedTab === tab.id
                  ? 'border-b-2 border-red-500 text-red-600'
                  : ''
                  }`}
              >
                {tab.label}{' '}
                <span className="count text-red-600">
                  {tab.id !== 'delivered' &&
                    orders.filter(order => {
                      if (tab.id === 'all') return true; // Tab 'Tất cả' đếm tất cả các đơn hàng
                      return order.status === tab.id; // Tab cụ thể đếm theo trạng thái
                    }).length > 0 &&
                    `(${orders.filter(order => {
                      if (tab.id === 'all') return true;
                      return order.status === tab.id;
                    }).length
                    })`}
                </span>
              </button>
            ))}
          </div>

          {ordersToDisplay.length > 0 ? (
            <div className="space-y-4">
              {ordersToDisplay.map((order: Order) => {
                // Tính tổng tiền sản phẩm
                const totalProductPrice = order.items.reduce((total, item) => {
                  return total + item.price * item.quantity;
                }, 0);

                return (
                  <div key={order._id} className="">
                    <div className="mb-0.5 flex items-center justify-between rounded-sm border-[0.5px] border-gray-200 bg-white px-6 py-3">
                      <span
                        className={`rounded-full px-4 py-1 text-sm font-medium ${order.status === 'canceled' ||
                          order.status === 'canceled_complaint'
                          ? 'bg-red-200 text-red-600'
                          : order.status === 'pending' ||
                            order.status === 'refund_initiated'
                            ? 'bg-yellow-200 text-yellow-700'
                            : order.status === 'confirmed'
                              ? 'bg-blue-200 text-blue-700'
                              : order.status === 'shipped' ||
                                order.status === 'received'
                                ? 'bg-indigo-200 text-indigo-700'
                                : order.status === 'delivered' ||
                                  order.status === 'refund_done'
                                  ? 'bg-green-200 text-green-700'
                                  : order.status === 'complaint'
                                    ? 'bg-purple-500 text-white'
                                    : order.status === 'refund_in_progress' ||
                                      order.status ===
                                      'exchange_in_progress'
                                      ? 'bg-orange-200 text-orange-700'
                                      : order.status === 'refund_completed' ||
                                        order.status ===
                                        'exchange_completed'
                                        ? 'bg-teal-200 text-teal-700'
                                        : order.status === 'pendingPayment'
                                          ? 'bg-gray-200 text-gray-700'
                                          : ''
                          }`}
                      >
                        {getStatusLabel(order.status)}
                      </span>
                      <span className="text-sm text-gray-500">
                        Mã đơn hàng: {order.orderNumber}
                      </span>
                    </div>
                    <div className="mb-0.5 rounded-sm border-[0.5px] border-gray-200 bg-white px-6 py-3">
                      {order.items.map(item => (
                        <div
                          key={item.productId}
                          className="mb-4 flex items-center space-x-4"
                        >
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-16 w-16 rounded-lg object-cover shadow-sm"
                          />
                          <div className="flex-1">
                            <p className="text-xl font-semibold text-gray-800">
                              <Link to={`/orderuser/${order._id}/user`}>
                                {item.name}
                              </Link>
                            </p>
                            <p className="text-sm text-gray-600">
                              Phân loại hàng: Màu: {item.color || ''}{' '}
                              {item.size ? `, Size: ${item.size}` : ''}
                            </p>
                            <p className="font-medium text-gray-800">
                              x{item.quantity}
                            </p>
                          </div>
                          <span className="flex flex-col text-base text-[#ee4d2d]">
                            <p className="flex justify-end">
                              {' '}
                              <CurrencyVND
                                amount={item.price * item.quantity}
                              />
                            </p>

                            {isReviewBoxVisible && selectedProduct && (
                              <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm">
                                <div className="relative z-50 mt-20 w-full max-w-3xl rounded-lg bg-white p-6 shadow-lg">
                                  <h3 className="text-lg font-semibold">Đánh giá sản phẩm</h3>
                                  <div className="mb-0.5 rounded-sm border-gray-200 bg-white px-6 py-3">
                                    <div className="flex items-center space-x-4">
                                      <img
                                        src={selectedProduct.image}
                                        alt={selectedProduct.name}
                                        className="h-16 w-16 rounded-lg object-cover shadow-sm"
                                      />
                                      <div className="flex-1">
                                        <p className="text-xl font-semibold text-gray-800">{selectedProduct.name}</p>
                                        <p className="text-sm text-gray-600">
                                          Phân loại hàng: Màu: {selectedProduct.color || ''}{' '}
                                          {selectedProduct.size ? `, Size: ${selectedProduct.size}` : ''}
                                        </p>
                                        <p className="font-medium text-gray-800">x{selectedProduct.quantity}</p>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="product-single__review-form">
                                    <form>
                                      <div className="select-star-rating">
                                        <span className="star-rating flex">
                                          Chất lượng sản phẩm:
                                          {[1, 2, 3, 4, 5].map((star) => (
                                            <StarSolid
                                              key={star}
                                              className={`cursor-pointer ${rating >= star ? 'text-orange-300' : 'text-orange-200'}`}
                                              onClick={() => setRating(star)}
                                            />
                                          ))}
                                        </span>
                                      </div>
                                      <div>
                                        <textarea
                                          id="form-input-review"
                                          className="form-control form-control_gray"
                                          placeholder="Đánh giá của bạn"
                                          cols={30}
                                          rows={8}
                                          value={newComment}
                                          onChange={(e) => setNewComment(e.target.value)}
                                        />
                                      </div>
                                    </form>
                                  </div>
                                  <div className="mt-4 flex justify-end">
                                    <button
                                      onClick={handleCloseReviewBox}
                                      className="mr-2 rounded-md border px-4 py-2 text-gray-700"
                                    >
                                      Đóng
                                    </button>
                                    <button
                                      type="submit"
                                      onClick={handleCommentSubmit}
                                      className="rounded-md bg-[#ee4d2d] px-4 py-2 text-white"
                                    >
                                      Gửi đánh giá
                                    </button>
                                  </div>
                                </div>
                              </div>
                            )}
                          </span>
                          {showThankYouMessage && (
                            <div className="fixed bottom-5 left-1/2 -translate-x-1/2 transform rounded-lg bg-green-500 p-4 text-white shadow-lg">
                              Cảm ơn bạn đã đánh giá!
                            </div>
                          )}
                          {order.status === 'delivered' &&
                            (!reviewedProductIds || reviewedProductIds.length === 0 ||
                              !reviewedProductIds.some(
                                reviewed => reviewed.orderId === order._id && reviewed.productSlug === item.slug
                              )) && (
                              <button
                                onClick={() => handleOpenReviewBox(order._id, item)}
                                className="mr-2 rounded-md border-[1px] border-[#ee4d2d] px-4 py-2 text-[#ee4d2d] hover:border-red-600"
                              >
                                Đánh giá sản phẩm
                              </button>
                            )}

                        </div>
                      ))}
                      <div className="border-t border-dotted border-gray-200">
                        <div className="flex items-center justify-end pt-3">
                          <div className="w-auto">
                            <span className="flex items-center justify-between text-lg font-semibold">
                              Tổng số tiền({order.items.length} sản phẩm) :
                              <span className="ml-2 text-[#ee4d2d]">
                                <CurrencyVND amount={totalProductPrice} />
                              </span>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mb-4 flex justify-between rounded-sm border-[0.5px] border-gray-200 bg-white px-6 py-3">
                      <div className="flex items-center justify-end">
                        {order.status === 'pendingPayment' && (
                          <button
                            onClick={() => retryPayment(order._id)}
                            className="mr-2 rounded border-[1px] border-green-500 px-4 py-2 text-green-500 hover:border-green-600"
                          >
                            Thanh Toán Lại
                          </button>
                        )}
                        {order.status === 'pending' && (
                          <button
                            onClick={() => deleteEntity(order._id)}
                            className="mr-2 rounded-md border-[1px] border-[#ee4d2d] px-4 py-2 text-[#ee4d2d] hover:border-red-600"
                          >
                            Hủy đơn hàng
                          </button>
                        )}
                        {order.status === 'received' && (
                          <>
                            <button
                              onClick={() => handleConfirmReceived(order._id)}
                              className="mr-2 rounded-md border-[1px] border-green-500 px-4 py-2 text-green-500 hover:border-green-600"
                            >
                              Đã nhận được hàng
                            </button>
                            <button
                              onClick={() =>
                                handleOpenComplaintModal(order._id)
                              }
                              className="rounded-md border-[1px] border-purple-500 px-4 py-2 text-purple-500 hover:border-purple-600"
                            >
                              Khiếu nại
                            </button>
                          </>
                        )}
                      </div>

                      <p className="flex items-center justify-between text-lg font-semibold">
                        Thành tiền:
                        <span className="ml-2 text-[#ee4d2d]">
                          <CurrencyVND amount={order.totalPrice} />
                        </span>
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="flex h-60 flex-col items-center justify-center">
              <img
                src="./no-oder.png"
                className="h-24 w-24 object-cover"
                alt="No orders"
              />
              <span className="mt-4 text-gray-500">Chưa có đơn hàng</span>
            </div>
          )}

          <div className="mt-8 flex items-center justify-center space-x-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              className="cursor-pointer rounded-md border px-2 py-1.5 text-gray-400"
              disabled={currentPage === 1}
            >
              <ChevronLeft />
            </button>

            <p className="mx-2 rounded-lg border-[1px] border-blue-400 px-3 py-1.5 text-blue-400">
              {currentPage}
            </p>

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              className="cursor-pointer rounded-md border px-2 py-1.5 text-gray-400"
              disabled={currentPage === totalPages}
            >
              <ChevronRight />
            </button>
          </div>
        </div>
      </div>

      {/* Complaint Modal */}
      {showComplaintModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50">
          <div className="rounded-lg bg-white p-6 shadow-md">
            <h2 className="mb-4 text-lg font-semibold text-gray-800">
              Tình huống bạn đang gặp?
            </h2>
            <div className="flex flex-col space-y-4">
              <button
                onClick={() => window.location.href = `/refund/${userId}/${selectedOrderId}`}
                className="flex w-full items-center rounded-lg border border-red-500 p-4 text-left hover:bg-red-50"
              >
                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-red-100 text-red-500">
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 5.636l-6.364 6.364m0 0l-6.364-6.364m6.364 6.364v6.364M21 3l-9 18-9-18" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="font-medium text-gray-800">
                    Tôi đã nhận hàng nhưng hàng có vấn đề (bể vỡ, sai mẫu, hàng lỗi, khác mô tả...) - Miễn ship hoàn về
                  </p>
                  <p className="mt-1 text-sm text-gray-600">
                    Lưu ý: Trường hợp yêu cầu Trả Hàng Hoàn tiền của bạn được chấp nhận, Voucher có thể sẽ không được hoàn lại
                  </p>
                </div>
              </button>

              <button
                onClick={() => window.location.href = `/exchange/${userId}/${selectedOrderId}`}
                className="flex w-full items-center rounded-lg border border-orange-500 p-4 text-left hover:bg-orange-50"
              >
                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-orange-100 text-orange-500">
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="font-medium text-gray-800">
                    Tôi chưa nhận hàng/nhận thiếu hàng
                  </p>
                  <p className="mt-1 text-sm text-gray-600">
                    Lưu ý: Trường hợp yêu cầu Trả Hàng Hoàn tiền của bạn được chấp nhận, Shopee Xu, Voucher, Phí vận chuyển có thể không được hoàn lại
                  </p>
                </div>
              </button>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setShowComplaintModal(false)}
                className="rounded bg-gray-500 px-4 py-2 text-white hover:bg-gray-600"
              >
                Hủy
              </button>
            </div>
          </div>
        </div>

      )}
    </div>
  );
}

export default UserOrder;
