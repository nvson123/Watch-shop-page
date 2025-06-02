import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from '@tanstack/react-router';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import instance from '@/api/axiosIntance';
import { toast } from '@medusajs/ui';
import CurrencyVND from '@/components/config/vnd';

export const Route = createFileRoute('/_layout/$slug/detailproduct')({
  component: () => {
    const { slug } = useParams({ from: '/_layout/$slug/detailproduct' });
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [selectedSize, setSelectedSize] = useState('');
    const [selectedColor, setSelectedColor] = useState('');
    const [availableColors, setAvailableColors] = useState([]);
    const [quantity, setQuantity] = useState(1);

    const queryClient = useQueryClient();

    // Fetch product data from API
    useEffect(() => {
      const fetchProduct = async () => {
        setLoading(true);
        try {
          const response = await instance.get(`/products/slug/${slug}`);
          if (response.data && response.data.product) {
            setProduct(response.data.product);
          } else {
            throw new Error('Dữ liệu sản phẩm không có');
          }
        } catch (err) {
          setError('Có lỗi khi lấy sản phẩm');
        } finally {
          setLoading(false);
        }
      };

      fetchProduct();
    }, [slug]);

    // Mutation to add product to cart
    const addItemToCart = useMutation({
      mutationFn: data => instance.post('/cart/add-to-cart', data),
      onSuccess: () => {
        toast.success('Đã thêm sản phẩm vào giỏ hàng', {
          description: 'Sản phẩm của bạn đã được thêm vào giỏ hàng thành công!',
          duration: 100,
        });
        queryClient.invalidateQueries(['cart']);
      },
      onError: error => {
        if (error.response) {
          toast.error(
            `Có lỗi xảy ra: ${error.response.data.message || 'Lỗi không xác định'}`,
            {
              description:
                'Không thể thêm sản phẩm vào giỏ hàng, vui lòng thử lại.',
              duration: 1000,
            }
          );
        } else {
          toast.error('Lỗi kết nối, vui lòng thử lại sau.');
        }
      },
    });

    // Handle size change
    const handleSizeChange = e => {
      const size = e.target.value;
      setSelectedSize(size);
      setSelectedColor(''); // Reset color when size changes

      // Filter available colors based on selected size
      const colors = product.variants
        .filter(variant => variant.size === size)
        .map(variant => variant.color);

      setAvailableColors([...new Set(colors)]); // Remove duplicate colors
    };

    // Handle add to cart action
    const handleAddToCart = () => {
      if (!selectedSize || !selectedColor) {
        toast.error('Vui lòng chọn size và màu sắc!');
        return;
      }

      const variant = product.variants.find(
        v => v.size === selectedSize && v.color === selectedColor
      );

      if (!variant) {
        toast.error(
          'Không tìm thấy biến thể sản phẩm với size và màu đã chọn.'
        );
        return;
      }

      if (quantity > variant.countInStock) {
        toast.error(
          `Số lượng vượt quá tồn kho. Chỉ còn lại ${variant.countInStock} sản phẩm.`
        );
        return;
      }

      addItemToCart.mutate({
        userId: localStorage.getItem('userId'),
        products: [
          {
            productId: product._id,
            variantId: variant.sku,
            quantity,
            priceAtTime: product.price,
          },
        ],
      });
    };

    // Handle unique size generation for dropdown
    const uniqueSizes = product
      ? [...new Set(product.variants.map(variant => variant.size))]
      : [];

    // Display loading, error, or product details
    if (loading) return <div>Đang tải...</div>;
    if (error) return <div>{error}</div>;
    if (!product) return <div>Không tìm thấy sản phẩm</div>;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
        {/* Background overlay */}
        <div
          className="absolute inset-0 bg-black bg-opacity-50"
          onClick={() => navigate({ to: '/' })}
        ></div>

        {/* Product detail modal */}
        <div className="relative z-50 w-full max-w-7xl rounded-lg bg-white p-6 shadow-lg">
          {/* Close button */}
          <button
            className="absolute right-4 top-4 text-gray-500 hover:text-gray-800"
            onClick={() => navigate({ to: '/' })}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <div className="flex h-full flex-col md:flex-row">
            {/* Product images */}
            <div className="mr-4 flex flex-col items-center">
              {product.gallery &&
                product.gallery.map((img, index) => (
                  <img
                    key={index}
                    alt={`Thumbnail ${index + 1}`}
                    className="mb-2 h-20 w-20 rounded-md"
                    src={img}
                  />
                ))}
            </div>
            <div className="flex flex-col items-center">
              <img
                alt="Hình sản phẩm chính"
                className="mb-4 h-96 w-96 rounded-md"
                src={product.image}
              />
            </div>

            {/* Product details */}
            <div className="ml-10 mt-4 flex-1 md:mt-0">
              <h1 className="text-2xl font-bold">{product.name}</h1>
              <p className="mt-2 text-xl text-gray-700">
                <CurrencyVND amount={product.price} />
              </p>
              <p className="mt-4 text-gray-600">{product.description}</p>

              {/* Size dropdown with unique sizes */}
              <div className="mt-6">
                <div className="mb-4 flex items-center">
                  <label className="w-20 text-gray-700">Kích cỡ</label>
                  <select
                    className="flex-1 rounded border border-gray-300 p-2"
                    value={selectedSize}
                    onChange={handleSizeChange}
                  >
                    <option value="">Chọn size</option>
                    {uniqueSizes.map(size => (
                      <option key={size} value={size}>
                        {size}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Color dropdown */}
                <div className="mb-4 flex items-center">
                  <label className="w-20 text-gray-700">Màu</label>
                  <select
                    className="flex-1 rounded border border-gray-300 p-2"
                    value={selectedColor}
                    onChange={e => setSelectedColor(e.target.value)}
                    disabled={!selectedSize}
                  >
                    <option value="">Chọn màu</option>
                    {availableColors.map((color, index) => (
                      <option key={index} value={color}>
                        {color}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Quantity and Add to Cart */}
                <div className="mb-4 flex items-center">
                  <button
                    className="rounded border border-gray-300 p-2"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    -
                  </button>
                  <input
                    className="mx-2 w-12 rounded border border-gray-300 p-2 text-center"
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={e =>
                      setQuantity(Math.max(1, Number(e.target.value)))
                    }
                  />
                  <button
                    className="rounded border border-gray-300 p-2"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    +
                  </button>
                </div>

                {/* Add to cart button */}
                <button
                  className="w-full rounded bg-blue-500 p-3 text-white"
                  onClick={handleAddToCart}
                  disabled={addItemToCart.isLoading}
                >
                  {addItemToCart.isLoading
                    ? 'Đang thêm...'
                    : 'THÊM VÀO GIỎ HÀNG'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },
});
