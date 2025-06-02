import { useEffect, useState } from 'react';
import banner1 from '../assets/images/hhh.jpg';
import banner2 from '../assets/images/fh.jpg';
import banner3 from '../assets/images/f.jpg';
import instance from '../api/axiosIntance';
import { Link } from '@tanstack/react-router';
import Slider from 'react-slick';

const Category = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await instance.get(`/categories`);
        if (response.status !== 200) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const NextArrow = ({ onClick }: any) => (
    <div
      className="custom-arrow custom-next rounded-full p-2 transition-all hover:bg-gray-300"
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
      className="custom-arrow custom-prev rounded-full p-2 transition-all hover:bg-gray-300"
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

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3, // Hiển thị 3 ảnh trong mỗi slide
    slidesToScroll: 3,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    cssEase: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2, // Điều chỉnh cho màn hình nhỏ hơn
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1, // Điều chỉnh cho màn hình di động
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="mt-16">
      <div className="m-auto max-w-7xl p-5 sm:p-5 md:p-5 lg:p-5 xl:p-0">
        <Slider {...settings}>
          {categories.map((category, index) => (
            <div
              key={category.slug}
              className="group relative overflow-hidden border border-gray-200"
              style={{
                width: '100%', // Điều chỉnh chiều rộng của slide
                maxWidth: '350px', // Điều chỉnh chiều rộng tối đa cho mỗi slide
                height: '400px', // Chiều cao cố định của mỗi slide
              }}
            >
              <img
                src={
                  index % 3 === 0
                    ? banner1
                    : index % 3 === 1
                      ? banner2
                      : banner3
                }
                alt={category.name}
                className="h-60 w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />

              <div className="absolute left-4 top-4">
                <span className="pb-2 text-3xl font-bold transition duration-500">
                  {category.name}
                </span>
                <p className="text-base text-gray-500 transition duration-500">
                  Winter 2025
                </p>
              </div>
              <div className="absolute inset-0 bg-blue-500 bg-opacity-60 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <Link
                  to={`/categories/${category.slug}`}
                  className="absolute bottom-4 left-4"
                >
                  <span className="text-base font-bold text-white">
                    Mua sắm ngay
                  </span>
                  <div className="mt-1 h-[2px] w-16 bg-white"></div>
                </Link>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Category;
