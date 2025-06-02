import { useFetchCategory, useFetchProductAll } from "@/data/products/useProductList";
import { toast } from "@medusajs/ui";
import { useEffect, useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import CurrencyVND from "./config/vnd";
import { Link } from "@tanstack/react-router";

const FeaturedProducts = () => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showFilter, setShowFilter] = useState<boolean>(false);
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const { listProduct, loading, error } = useFetchProductAll();
  const { data: categories } = useFetchCategory();

  useEffect(() => {
    const filterProducts = () => {
      let filtered = listProduct;

      // Lọc theo danh mục nếu có
      if (selectedCategory) {
        filtered = filtered.filter(
          (product) => product?.category?._id === selectedCategory
        );
      }

      if (searchTerm) {
        filtered = filtered.filter((product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      setFilteredProducts(filtered);
    };

    filterProducts();
  }, [selectedCategory, searchTerm, listProduct]);

  const displayedProducts =
    filteredProducts.length > 0
      ? filteredProducts.slice(0, 8)
      : listProduct.slice(0, 8);

  const handleFilterChange = (filtered: Product[]) => {
    setFilteredProducts(filtered);
    if (filtered.length > 0) {
      toast.success("Sản phẩm đã được lọc thành công!");
    } else {
      toast.error("Không tìm thấy sản phẩm phù hợp!");
    }
  };

  return (
    <div>
      <section className="products-carousel container px-[55px]">
        <h2 className="section-title text-uppercase text-center mb-4 pb-xl-2 mb-xl-4">
          Phiên bản <strong>Giới Hạn</strong>
        </h2>
        <Swiper
          modules={[Navigation, Pagination, Autoplay]} // Import đúng modules
          autoplay={{
            delay: 1000, // Thời gian giữa mỗi lần chuyển slide (1 giây)
            disableOnInteraction: false, // Tiếp tục chạy ngay cả khi người dùng tương tác
          }}
          slidesPerView={4}
          spaceBetween={30}
          breakpoints={{
            320: { slidesPerView: 2, spaceBetween: 14 },
            768: { slidesPerView: 3, spaceBetween: 24 },
            992: { slidesPerView: 4, spaceBetween: 30 },
          }}
          loop={true}
        >
          {displayedProducts.map((product) => (
            <SwiperSlide
              key={product._id}
              className="swiper-slide product-card"
            >
              <div className="pc__img-wrapper">
                <a href={`${product.slug ? product.slug : product._id}/quickviewProduct`}>
                  <img
                    loading="lazy"
                    src={product.image}
                    width={330}
                    height={400}
                    className="pc__img"
                  />
                </a>
                <Link to={`${product.slug ? product.slug : product._id}/quickviewProduct`}>
                  <button className="pc__atc btn anim_appear-bottom btn position-absolute border-0 text-uppercase fw-medium" data-aside="cartDrawer" title="Add To Cart">Chi Tiết</button>
                </Link>
              </div>
              <div className="pc__info position-relative">
                <p className="pc__category">{product.category?.name || "N/A"}</p>
                <h6 className="pc__title text-[16px] capitalize">
                  <a href="product1_simple.html" className="capitalize">
                    {product.name}
                  </a>
                </h6>

                <div className="product-card__price d-flex">
                  <span className="money price"><CurrencyVND amount={product.price} /></span>
                </div>

              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
      <div className="mb-3 mb-xl-5 pb-1 pb-xl-5" />
    </div>
  );
};

export default FeaturedProducts;
