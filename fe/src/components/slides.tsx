import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import slide1 from '../assets/images/slider1.jpg';
import slide2 from '../assets/images/slider2.jpg';
import slide3 from '../assets/images/slider3.jpg';
import { Link } from '@tanstack/react-router';
const Slides = () => {
  return (
    <div className="px-[55px]">
      <section className="swiper-container slideshow full-width_padding">
        <Swiper
          modules={[Navigation, Pagination, Autoplay, EffectFade]}
          autoplay={{ delay: 5000 }}
          slidesPerView={1}
          effect="fade"
          loop={true}
          pagination={{ el: '.slideshow-pagination', clickable: true }}
          className="swiper-wrapper"
        >
          Slide 1
          <SwiperSlide
            className="swiper-slide full-width_border border-1"
            style={{ borderColor: '#f5e6e0' }}
          >
            <div className="position-relative h-100 overflow-hidden">
              <div
                className="slideshow-bg"
                style={{ backgroundColor: '#f5e6e0' }}
              >
                <img
                  loading="lazy"
                  src={slide1}
                  width={1761}
                  height={778}
                  alt="Pattern"
                  className="slideshow-bg__img object-fit-cover"
                />
              </div>

      
            </div>
          </SwiperSlide>

          {/* Slide 2 */}
          <SwiperSlide
            className="swiper-slide full-width_border border-1"
            style={{ borderColor: '#f5e6e0' }}
          >
            <div className="position-relative h-100 overflow-hidden">
              <div
                className="slideshow-bg"
                style={{ backgroundColor: '#f5e6e0' }}
              >
                <img
                  loading="lazy"
                  src={slide2}
                  width={1761}
                  height={778}
                  alt="Pattern"
                  className="slideshow-bg__img object-fit-cover"
                />
              </div>



            </div>
          </SwiperSlide>
          {/* Slide 3 */}
          <SwiperSlide
            className="swiper-slide full-width_border border-1"
            style={{ borderColor: '#f5e6e0' }}
          >
            <div className="position-relative h-100 overflow-hidden">
              <div
                className="slideshow-bg"
                style={{ backgroundColor: '#f5e6e0' }}
              >
                <img
                  loading="lazy"
                  src={slide3}
                  width={1761}
                  height={778}
                  alt="Pattern"
                  className="slideshow-bg__img object-fit-cover"
                />
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </section>
      <div className="mb-md-4 pb-md-4 mb-3 pb-3" />
      <div className="pb-1" />
      {/* Shop by collection */}
    </div>
  );
};

export default Slides;
