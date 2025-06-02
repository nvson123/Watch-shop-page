import CurrencyVND from '@/components/config/vnd';
import ErrorCart from '@/components/errors/error-cart';
import LoginCart from '@/components/errors/error-login-cart';
import { useCart } from '@/data/cart/useCartLogic';
import { ChevronRightMini, ReceiptPercent } from '@medusajs/icons';
import { toast } from '@medusajs/ui';
import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import { useState } from 'react';

export const Route = createFileRoute('/_layout/cart/')({
  component: Cart,
});

function Cart() {
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');
  const [shippingMessageDisplay, setShippingMessageDisplay] = useState('');
  if (!userId) {
    return <LoginCart />;
  }

  const {
    cartData,
    isLoading,
    quantities,
    selectedProducts,
    selectAll,
    handleQuantityChange,
    incrementQuantity,
    decrementQuantity,
    productPrice,
    handleDeleteSelectedProducts,
    toggleSelectProduct,
    toggleSelectAll,
    totalSelectedPrice,
    getSelectedItems,
  } = useCart(userId);

  if (isLoading) {
    return <div>Đang tải...</div>;
  }

  if (!cartData || !cartData.products || cartData.products.length === 0) {
    return <ErrorCart />;
  }

  const handleCheckout = () => {
    const selectedItems = getSelectedItems() || [];
    if (selectedItems.length === 0) {
      toast.error('Vui lòng chọn ít nhất một sản phẩm để thanh toán.');
      return;
    }
    navigate({
      to: '/checkoutNew',
      state: { selectedItems },
    });
  };
  return (
    <div className='px-[40px]'>
      <main>
        <div className="mb-4 pb-4" />
        <section className="shop-checkout container">
          <h2 className="page-title">Giỏ hàng</h2>
          <hr />
          <div className="shopping-cart">
            <div className="cart-table__wrapper">
              <table className="cart-table">
                <thead>
                  <tr>
                    <th>Sản Phẩm</th>
                    <th />
                    <th>Giá</th>
                    <th>Số Lượng</th>
                    <th>Tổng</th>
                    <th className='flex items-center gap-2 justify-start w-[85px]'>
                      <div>tất cả</div>
                      <input
                        className="h-4 w-4"
                        type="checkbox"
                        checked={selectAll}
                        onChange={toggleSelectAll}
                      />
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {cartData?.products?.map((product, index) => (
                    <tr key={product.productId}>
                      <td>
                        <div className="shopping-cart__product-item">
                          <a href="product1_simple.html">
                            <img loading="lazy" src={product.image} width={120} height={120} />
                          </a>
                        </div>
                      </td>
                      <td>
                        <div className="shopping-cart__product-item__detail">
                          <h4><Link to="/" className="capitalize">{product.name}</Link></h4>
                          <ul className="shopping-cart__product-item__options">
                            <li>Color: {product.color || 'Không có'}</li>
                            <li>Size: {product.size || 'Không có'}</li>
                          </ul>
                        </div>
                      </td>
                      <td>
                        <span className="shopping-cart__product-price"><CurrencyVND amount={productPrice(index)} /></span>
                      </td>
                      <td>
                        <div className="qty-control position-relative">
                          <input type="number" name="quantity" value={quantities[index] || product.quantity}
                            onChange={e =>
                              handleQuantityChange(index, e.target.value)
                            } defaultValue={3} min={1} className="qty-control__number text-center" />
                          <div className="qty-control__reduce" onClick={() => decrementQuantity(index)}>-</div>
                          <div className="qty-control__increase" onClick={() => incrementQuantity(index)}>+</div>
                        </div>{/* .qty-control */}
                      </td>
                      <td>
                        <span className="shopping-cart__subtotal w-36"><CurrencyVND
                          amount={
                            (quantities[index] || product.quantity) *
                            productPrice(index)
                          }
                        /></span>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <input
                          className="h-4 w-4"
                          type="checkbox"
                          checked={selectedProducts[index] || false}
                          onChange={() => toggleSelectProduct(index)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="mt-2 flex justify-end">
                <button className="btn btn-light " onClick={handleDeleteSelectedProducts}>Xóa</button>
                {/* <button className="btn btn-light">Chọn tất cả({cartData?.products?.length || 0})</button> */}
              </div>
            </div>
            <div className="shopping-cart__totals-wrapper">
              <div className="sticky-content">
                <div className="shopping-cart__totals">
                  <h3>Tổng Giỏ Hàng</h3>
                  <table className="cart-totals">
                    <tbody>
                      <tr className=''>
                        <th>Tổng thanh toán (VND):{' '}</th>
                        <div className='text-2xl'><CurrencyVND amount={totalSelectedPrice || '0'} /></div>
                      </tr>

                    </tbody>
                  </table>
                  <tr>
                    <li className='mt-2'>Phí vận chuyển được tính ở trang thanh toán</li>
                  </tr>
                  <tr>
                    <li>Áp mã giảm giá ở trang thanh toán</li>
                  </tr>
                </div>
                <div className="mobile_fixed-btn_wrapper">
                  <div className="button-wrapper container">
                    <button className="btn btn-primary btn-checkout uppercase text-xl font-semibold" onClick={handleCheckout}>Thanh toán</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <div className="mb-5 pb-xl-5" />
    </div>

  );
}

export default Cart;
