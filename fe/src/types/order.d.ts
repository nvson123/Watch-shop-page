type CustomerInfo = {
  name: string;
  phone: string;
  email: string;
  address: string;
  wards: string;
  districts: string;
  city: string;
};

type Product = {
  _id: string;
  name: string;
  quantity: number;
  price: number;
  image: string;
  description: string;
  slug: string;
  variants : [
    {
      color: string;
      size: string;
    }
  ]
};

type Order = {
  _id: string;
  orderNumber: string;
  customerInfo: CustomerInfo;
  products: Product[];
  totalPrice: number;
  status: OrderStatus;
  refundReason?: string;
  items: Item[];
};
type Item = {
  slug: any;
  productId: number;
  image: string;
  name: string;
  price: number;
  quantity: number;
  size: string;
  color: string;
};

type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'shipped'
  | 'received'
  | 'delivered'
  | 'canceled'
  | 'refund'
  | 'exchange'
  | 'returned'
  | 'refund_in_progress'
  | 'exchange_in_progress'
  | 'refund_completed'
  | 'exchange_completed'
  | 'return_completed';

type OrderMeta = {
  totalItems: number;
  totalPages: number;
  pageSize: number;
};

type OrderListResponse = {
  data: Order[];
  meta: OrderMeta;
};

type UseFetchOrdersProps = {
  limit: number;
  page: number;
};

type UseCheckoutMutation = {
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
};

type UseFetchOrders = (props: UseFetchOrdersProps) => {
  data: OrderListResponse | undefined;
  error: Error | null;
  isLoading: boolean;
};

type UpdateOrderStatus = {
  orderId: string;
  status: OrderStatus;
};
