import useCartMutation from '@/data/cart/useCartMutation';
import { useFetchProductAll } from '@/data/products/useProductList';
import { Heart, ShoppingCartSolid } from '@medusajs/icons';
import { Link } from '@tanstack/react-router';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

const NextArrow = ({ onClick }: any) => (
  <div
    className="custom-arrow custom-next hover:bg-gray-300 transition-all  p-2 rounded-full"
    onClick={onClick}
    style={{
      display: 'block',
      right: '-26px',
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      zIndex: 1,
      fontSize: '24px',
    }}
  >
    <i className="fa-solid fa-chevron-right"></i>
  </div>
);

const PrevArrow = ({ onClick }: any) => (
  <div
    className="custom-arrow custom-prev hover:bg-gray-300  transition-all p-2 rounded-full"
    onClick={onClick}
    style={{
      display: 'block',
      left: '-26px',
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      zIndex: 1,
      fontSize: '24px',
    }}
  >
    <i className="fa-solid fa-chevron-left"></i>
  </div>
);

const ProductRecommendations = ({ categoryId }: { categoryId?: string }) => {
  const { addItemToCart } = useCartMutation();
  const { listProduct, loading, error } = useFetchProductAll();

  const handleAddToCart = (product: any) => {
    const userId = localStorage.getItem('userId') ?? '';
    if (!userId) {
      console.error('User ID is missing');
      return;
    }
    addItemToCart.mutate({
      userId: userId,
      products: [
        {
          productId: product._id,
          variantId: product.variantId ?? '',
          quantity: 1,
        },
      ],
    });
  };

  // Filter products by category
  const displayedProducts = categoryId
    ? listProduct?.filter((product: any) => product?.category?._id === categoryId)
    : listProduct;

  // Slider settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className='bg-gray-50 p-4'>
      <div className="max-w-7xl m-auto mt-5  xl:p-0 lg:p-5 md:p-5 sm:p-5 relative bg-white">
        {/* Loading or Error State */}
        {loading && <p>Loading products...</p>}
        {error && <p className="text-red-500">{error}</p>}

        <div className='p-4 shadow'>
          <h2 className="uppercase text-2xl font-bold mb-5 relative">
            {categoryId ? 'Products in Selected Category' : 'Sản phẩm nổi bật'}
          </h2>

          {/* Slider to display products */}
          {displayedProducts?.length > 0 ? (
            <Slider {...settings}>
              {displayedProducts.map((product: any) => (
                <div
                  key={product._id}
                  className="product-card group relative overflow-hidden text-center p-2"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-80 w-full transform transition-transform duration-500"
                  />
                  <Link
                    to={`/${product.slug ? product.slug : product._id}/quickviewProduct`}
                    className="quick-view duration-900 absolute bottom-4 left-1/2 -translate-x-1/2 transform rounded-full bg-white px-4 py-2 opacity-0 shadow transition-all hover:bg-black hover:text-white group-hover:translate-y-[-100px] group-hover:opacity-100"
                  >
                    Xem nhanh
                  </Link>
                  <h2 className="mt-2 flex items-center justify-between text-gray-500">
                    {product.name}
                    <div className="flex space-x-2">
                      <Link to={`/${product.slug ? product.slug : product._id}/detailproduct`}>
                        <ShoppingCartSolid />
                      </Link>
                      <Heart />
                    </div>
                  </h2>
                  <p className="mt-2 flex justify-start text-gray-600">
                    ${product.price}
                  </p>
                </div>
              ))}
            </Slider>
          ) : (
            !loading && <p>No products found for this category.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductRecommendations;
