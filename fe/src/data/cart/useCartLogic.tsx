import { useState } from 'react';
import useCartMutation from '@/data/cart/useCartMutation';
import { useFetchCart } from '@/data/cart/useFetchCart';
import { toast, usePrompt } from '@medusajs/ui';

export function useCart(userId: string | null) {
  const { data: cartData, isLoading } = useFetchCart(userId || '');
  const {
    deleteItemFromCart,
    increaseQuantity,
    decreaseQuantity,
    updateQuantity,
  } = useCartMutation();

  const [quantities, setQuantities] = useState<Record<number, number>>({});
  const [selectedProducts, setSelectedProducts] = useState<
    Record<number, boolean>
  >({});
  const [selectAll, setSelectAll] = useState(false);

  const handleQuantityChange = (index: number, value: string) => {
    const quantity = Math.max(parseInt(value) || 0, 0);
    setQuantities(prev => ({
      ...prev,
      [index]: quantity,
    }));
    const product = cartData?.products[index];
    if (product) {
      updateQuantity.mutate(
        {
          userId: userId || '',
          productId: product.productId,
          variantId: product.variantId,
          quantity,
        },
        {
          onError: error => {
            // Kiểm tra nếu lỗi liên quan đến số lượng vượt quá tồn kho
            if (error?.response?.data?.error === 'OUT_OF_STOCK') {
              // Reload trang khi số lượng vượt quá tồn kho
              window.location.reload();
            }
          },
        }
      );
    }
  };

  const incrementQuantity = (index: number) => {
    const product = cartData?.products[index];

    if (!product) {
      console.warn(`Product at index ${index} is undefined.`);
      return;
    }

    const currentQuantity = quantities[index] || product.quantity || 0;
    const newQuantity = currentQuantity + 1;

    setQuantities(prev => ({
      ...prev,
      [index]: newQuantity,
    }));

    if (!userId) {
      console.warn('User ID is missing.');
      return;
    }

    increaseQuantity.mutate(
      {
        userId,
        productId: product.productId,
        variantId: product.variantId,
      },
      {
        onError: error => {
          // Kiểm tra nếu lỗi liên quan đến số lượng vượt quá tồn kho
          if (error?.response?.data?.error === 'OUT_OF_STOCK') {
            // Reload trang khi số lượng vượt quá tồn kho
            window.location.reload();
          }
        },
      }
    );
  };

  const dialog = usePrompt();

  const decrementQuantity = async (index: number) => {
    const product = cartData?.products[index];
    const productQuantity = product?.quantity || 0;
    const newQuantity = Math.max((quantities[index] || productQuantity) - 1, 0);

    if (newQuantity === 0) {
      const userHasConfirmed = await dialog({
        title: 'Xác nhận xóa sản phẩm',
        description:
          'Bạn có chắc chắn muốn xóa sản phẩm này khỏi giỏ hàng không?',
      });

      if (!userHasConfirmed) {
        return;
      }
    }

    setQuantities(prev => ({
      ...prev,
      [index]: newQuantity,
    }));

    if (product && newQuantity >= 0) {
      try {
        await decreaseQuantity.mutateAsync({
          userId: userId || '',
          productId: product.productId,
          variantId: product.variantId,
          confirm: true,
        });
      } catch (error) {
        toast.error('Có lỗi xảy ra khi giảm số lượng sản phẩm.');
      }
    }
  };

  const productPrice = (index: number): number => {
    const product = cartData?.products[index];
    const variantPrice = product?.priceAtTime ?? 0;
    return variantPrice > 0 ? variantPrice : product?.price || 0;
  };

  const handleDeleteSelectedProducts = () => {
    const selectedVariantIds = Object.keys(selectedProducts)
      .filter(index => selectedProducts[parseInt(index)])
      .map(index => cartData?.products[parseInt(index)]?.variantId)
      .filter((variantId): variantId is string => variantId !== undefined);

    if (selectedVariantIds.length === 0) {
      toast.error('Vui lòng chọn ít nhất một sản phẩm để xóa.');
      return;
    }
    deleteItemFromCart.mutate(
      {
        userId: userId || '',
        variantIds: selectedVariantIds,
      },
      {
        onSuccess: () => {
          setSelectedProducts({});
          setSelectAll(false);
          toast.success('Đã xóa các sản phẩm đã chọn khỏi giỏ hàng.');
        },
        onError: () => {
          toast.error('Có lỗi xảy ra khi xóa sản phẩm. Vui lòng thử lại.');
        },
      }
    );
  };
  const handleDeleteByIdProduct = (variantId) => {
    // Kiểm tra nếu không có variantId được truyền vào
    if (!variantId) {
      toast.error('Không tìm thấy sản phẩm để xóa. Vui lòng thử lại.');
      return;
    }

    // Kiểm tra nếu sản phẩm tồn tại trong giỏ hàng
    const isProductInCart = cartData?.products?.some(
      (product) => product.variantId === variantId
    );

    if (!isProductInCart) {
      toast.error('Sản phẩm không tồn tại trong giỏ hàng.');
      return;
    }

    // Gửi yêu cầu xóa sản phẩm theo variantId
    deleteItemFromCart.mutate(
      {
        userId: userId || '',
        variantIds: [variantId], // Chỉ xóa sản phẩm có variantId
      },
      {
        onSuccess: () => {
          setSelectedProducts((prev) => {
            const updatedProducts = { ...prev };
            delete updatedProducts[variantId];
            return updatedProducts;
          });
          toast.success('Đã xóa sản phẩm khỏi giỏ hàng.');
        },
        onError: () => {
          toast.error('Có lỗi xảy ra khi xóa sản phẩm. Vui lòng thử lại.');
        },
      }
    );
  };


  const toggleSelectProduct = (index: number) => {
    setSelectedProducts(prev => {
      const newSelectedProducts = { ...prev, [index]: !prev[index] };

      if (newSelectedProducts[index]) {
        const product = cartData?.products[index];
        if (product) {
          setQuantities(prevQuantities => ({
            ...prevQuantities,
            [index]: product.quantity,
          }));
        }
      } else {
        setQuantities(prevQuantities => {
          const updatedQuantities = { ...prevQuantities };
          delete updatedQuantities[index];
          return updatedQuantities;
        });
      }

      return newSelectedProducts;
    });
  };

  const toggleSelectAll = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);

    if (newSelectAll) {
      const allSelected = Object.fromEntries(
        cartData?.products.map((_, index) => [index, true]) || []
      );
      setSelectedProducts(allSelected);

      const updatedQuantities = cartData?.products.reduce(
        (acc, product, index) => {
          acc[index] = product.quantity;
          return acc;
        },
        {} as Record<number, number>
      );

      setQuantities(updatedQuantities || {});
    } else {
      setSelectedProducts({});
      setQuantities({});
    }
  };

  const totalSelectedPrice = cartData?.products.reduce(
    (sum, product, index) => {
      if (selectedProducts[index]) {
        return (
          sum + (quantities[index] || product.quantity) * productPrice(index)
        );
      }
      return sum;
    },
    0
  );

  const getSelectedItems = () => {
    return cartData?.products.filter((_, index) => selectedProducts[index]);
  };

  const getAllItems = () => {
    return cartData?.products || []; // Trả về tất cả các sản phẩm trong giỏ hàng hoặc một mảng rỗng nếu không có dữ liệu
  };

  return {
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
    handleDeleteByIdProduct,
    toggleSelectProduct,
    toggleSelectAll,
    totalSelectedPrice,
    getSelectedItems,
    getAllItems,
  };
}
