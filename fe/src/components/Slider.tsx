import { useEffect, useState } from 'react';
// Import các ảnh từ thư mục của bạn
import slide1 from '../assets/images/banner-01.jpg';
import slide2 from '../assets/images/banner-02.jpg';
import slide5 from '../assets/images/banner-03.jpg';

const Slider = () => {
  const slides = [
    {
      url: slide1,
      alt: 'Slide 1',
    },
    {
      url: slide2,
      alt: 'Slide 2',
    },
    {
      url: slide5,
      alt: 'Slide 3',
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex(prevIndex =>
      prevIndex === slides.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex(prevIndex =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };

  // Thiết lập tự động chạy slide
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000); // Chuyển slide mỗi 3 giây

    return () => clearInterval(interval); // Xóa interval khi component unmount hoặc khi currentIndex thay đổi
  }, [currentIndex]);

  return (
    <div className="group relative mx-auto w-full">
      <div className="overflow-hidden">
        <img
          src={slides[currentIndex].url}
          alt={slides[currentIndex].alt}
          className="h-[500px] w-full object-cover transition duration-500 ease-in-out"
        />
      </div>

      {/* Nội dung trên slide */}
      <div className="max-w-6xl">
        <div className="absolute left-1/3 top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-left text-[#333333]">
          <div className="mb-4 text-[16px] sm:text-[14px] md:text-[18px] lg:text-[28px]">
            Women Collection 2018
          </div>
          <h2 className="font-playfair mb-2 text-[18px] font-bold sm:text-[24px] md:text-[35px] lg:text-[60px]">
            Jackets & Coats
          </h2>
          <button className="rounded-3xl bg-blue-500 px-6 py-2 text-xs uppercase text-white transition hover:bg-black sm:text-sm md:text-base">
            shop now
          </button>
        </div>
      </div>

      {/* Next left */}
      <i
        onClick={prevSlide}
        className="fa-solid fa-caret-left absolute left-0 top-1/2 -translate-y-1/2 transform cursor-pointer p-5 text-[30px] text-gray-500 opacity-0 transition-opacity duration-300 ease-in-out hover:text-blue-400 group-hover:opacity-100 sm:text-[40px] md:text-[50px]"
      ></i>

      {/* Next right */}
      <i
        onClick={nextSlide}
        className="fa-solid fa-caret-right absolute right-0 top-1/2 -translate-y-1/2 transform cursor-pointer p-5 text-[30px] text-gray-500 opacity-0 transition-opacity duration-300 ease-in-out hover:text-blue-400 group-hover:opacity-100 sm:text-[40px] md:text-[50px]"
      ></i>

      <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-3 w-3 rounded-full ${currentIndex === index ? 'bg-white' : 'bg-gray-400'}`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Slider;
