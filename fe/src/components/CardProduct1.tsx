import logo from '../assets/images/cart_trong.jpg';
import hot_list from '../assets/images/collection_grid_1.jpg';
import hot_list1 from '../assets/images/collection_grid_2.jpg';
import hot_list2 from '../assets/images/collection_grid_3.jpg';
import inta from '../assets/images/insta3.jpg';
import slide1 from '../assets/images/slider1.jpg';
import slide2 from '../assets/images/slider2.jpg';

import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import '../../css/plugins/swiper.min.css';
const CardProduct1 = () => {
  return (
    <div>
      {/* Header Type 1 */}
      <header id="header" className="header header_sticky">
        <div className="container">
          <div className="header-desk header-desk_type_1">
            <div className="logo">
              <a href="index.html">
                <img src={logo} alt="Uomo" className="logo__image d-block" />
              </a>
            </div>
            {/* /.logo */}
            <nav className="navigation">
              <ul className="navigation__list list-unstyled d-flex">
                <li className="navigation__item">
                  <a href="#" className="navigation__link">
                    Home
                  </a>
                  <div className="box-menu" style={{ width: 800 }}>
                    <div className="col pe-4">
                      <ul className="sub-menu__list list-unstyled">
                        <li className="sub-menu__item">
                          <a
                            href="index.html"
                            className="menu-link menu-link_us-s"
                          >
                            Home 1
                          </a>
                        </li>
                        <li className="sub-menu__item">
                          <a
                            href="https://uomo-html.flexkitux.com/Demo2/index.html"
                            className="menu-link menu-link_us-s"
                          >
                            Home 2
                          </a>
                        </li>
                        <li className="sub-menu__item">
                          <a
                            href="https://uomo-html.flexkitux.com/Demo3/index.html"
                            className="menu-link menu-link_us-s"
                          >
                            Home 3
                          </a>
                        </li>
                        <li className="sub-menu__item">
                          <a
                            href="https://uomo-html.flexkitux.com/Demo4/index.html"
                            className="menu-link menu-link_us-s"
                          >
                            Home 4
                          </a>
                        </li>
                        <li className="sub-menu__item">
                          <a
                            href="https://uomo-html.flexkitux.com/Demo5/index.html"
                            className="menu-link menu-link_us-s"
                          >
                            Home 5
                          </a>
                        </li>
                        <li className="sub-menu__item">
                          <a
                            href="https://uomo-html.flexkitux.com/Demo6/index.html"
                            className="menu-link menu-link_us-s"
                          >
                            Home 6
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div className="col pe-4">
                      <ul className="sub-menu__list list-unstyled">
                        <li className="sub-menu__item">
                          <a
                            href="https://uomo-html.flexkitux.com/Demo7/index.html"
                            className="menu-link menu-link_us-s"
                          >
                            Home 7
                          </a>
                        </li>
                        <li className="sub-menu__item">
                          <a
                            href="https://uomo-html.flexkitux.com/Demo8/index.html"
                            className="menu-link menu-link_us-s"
                          >
                            Home 8
                          </a>
                        </li>
                        <li className="sub-menu__item">
                          <a
                            href="https://uomo-html.flexkitux.com/Demo9/index.html"
                            className="menu-link menu-link_us-s"
                          >
                            Home 9
                          </a>
                        </li>
                        <li className="sub-menu__item">
                          <a
                            href="https://uomo-html.flexkitux.com/Demo10/index.html"
                            className="menu-link menu-link_us-s"
                          >
                            Home 10
                          </a>
                        </li>
                        <li className="sub-menu__item">
                          <a
                            href="https://uomo-html.flexkitux.com/Demo11/index.html"
                            className="menu-link menu-link_us-s"
                          >
                            Home 11
                          </a>
                        </li>
                        <li className="sub-menu__item">
                          <a
                            href="https://uomo-html.flexkitux.com/Demo12/index.html"
                            className="menu-link menu-link_us-s"
                          >
                            Home 12
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div className="col pe-4">
                      <ul className="sub-menu__list list-unstyled">
                        <li className="sub-menu__item">
                          <a
                            href="https://uomo-html.flexkitux.com/Demo13/index.html"
                            className="menu-link menu-link_us-s"
                          >
                            Home 13
                          </a>
                        </li>
                        <li className="sub-menu__item">
                          <a
                            href="https://uomo-html.flexkitux.com/Demo14/index.html"
                            className="menu-link menu-link_us-s"
                          >
                            Home 14
                          </a>
                        </li>
                        <li className="sub-menu__item">
                          <a
                            href="https://uomo-html.flexkitux.com/Demo15/index.html"
                            className="menu-link menu-link_us-s"
                          >
                            Home 15
                          </a>
                        </li>
                        <li className="sub-menu__item">
                          <a
                            href="https://uomo-html.flexkitux.com/Demo16/index.html"
                            className="menu-link menu-link_us-s"
                          >
                            Home 16
                          </a>
                        </li>
                        <li className="sub-menu__item">
                          <a
                            href="https://uomo-html.flexkitux.com/Demo17/index.html"
                            className="menu-link menu-link_us-s"
                          >
                            Home 17
                          </a>
                        </li>
                        <li className="sub-menu__item">
                          <a
                            href="https://uomo-html.flexkitux.com/Demo18/index.html"
                            className="menu-link menu-link_us-s"
                          >
                            Home 18
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div className="col">
                      <ul className="sub-menu__list list-unstyled">
                        <li className="sub-menu__item">
                          <a
                            href="https://uomo-html.flexkitux.com/Demo19/index.html"
                            className="menu-link menu-link_us-s"
                          >
                            Home 19
                          </a>
                        </li>
                        <li className="sub-menu__item">
                          <a
                            href="https://uomo-html.flexkitux.com/Demo20/index.html"
                            className="menu-link menu-link_us-s"
                          >
                            Home 20
                          </a>
                        </li>
                        <li className="sub-menu__item">
                          <a
                            href="https://uomo-html.flexkitux.com/Demo21/index.html"
                            className="menu-link menu-link_us-s"
                          >
                            Home 21
                          </a>
                        </li>
                        <li className="sub-menu__item">
                          <a
                            href="https://uomo-html.flexkitux.com/Demo22/index.html"
                            className="menu-link menu-link_us-s"
                          >
                            Home 22
                          </a>
                        </li>
                        <li className="sub-menu__item">
                          <a
                            href="https://uomo-html.flexkitux.com/Demo23/index.html"
                            className="menu-link menu-link_us-s"
                          >
                            Home 23
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  {/* /.box-menu */}
                </li>
                <li className="navigation__item">
                  <a href="#" className="navigation__link">
                    Shop
                  </a>
                  <div className="mega-menu">
                    <div className="d-flex container">
                      <div className="col pe-4">
                        <a href="#" className="sub-menu__title">
                          Shop List
                        </a>
                        <ul className="sub-menu__list list-unstyled">
                          <li className="sub-menu__item">
                            <a
                              href="shop1.html"
                              className="menu-link menu-link_us-s"
                            >
                              Shop List V1
                            </a>
                          </li>
                          <li className="sub-menu__item">
                            <a
                              href="shop2.html"
                              className="menu-link menu-link_us-s"
                            >
                              Shop List V2
                            </a>
                          </li>
                          <li className="sub-menu__item">
                            <a
                              href="shop3.html"
                              className="menu-link menu-link_us-s"
                            >
                              Shop List V3
                            </a>
                          </li>
                          <li className="sub-menu__item">
                            <a
                              href="shop4.html"
                              className="menu-link menu-link_us-s"
                            >
                              Shop List V4
                            </a>
                          </li>
                          <li className="sub-menu__item">
                            <a
                              href="shop5.html"
                              className="menu-link menu-link_us-s"
                            >
                              Shop List V5
                            </a>
                          </li>
                          <li className="sub-menu__item">
                            <a
                              href="shop6.html"
                              className="menu-link menu-link_us-s"
                            >
                              Shop List V6
                            </a>
                          </li>
                          <li className="sub-menu__item">
                            <a
                              href="shop7.html"
                              className="menu-link menu-link_us-s"
                            >
                              Shop List V7
                            </a>
                          </li>
                          <li className="sub-menu__item">
                            <a
                              href="shop8.html"
                              className="menu-link menu-link_us-s"
                            >
                              Shop List V8
                            </a>
                          </li>
                          <li className="sub-menu__item">
                            <a
                              href="shop9.html"
                              className="menu-link menu-link_us-s"
                            >
                              Shop List V9
                            </a>
                          </li>
                          <li className="sub-menu__item">
                            <a
                              href="shop10.html"
                              className="menu-link menu-link_us-s"
                            >
                              Shop Item Style
                            </a>
                          </li>
                          <li className="sub-menu__item">
                            <a
                              href="shop11.html"
                              className="menu-link menu-link_us-s"
                            >
                              Horizontal Scroll
                            </a>
                          </li>
                        </ul>
                      </div>
                      <div className="col pe-4">
                        <a href="#" className="sub-menu__title">
                          Shop Detail
                        </a>
                        <ul className="sub-menu__list list-unstyled">
                          <li className="sub-menu__item">
                            <a
                              href="product2_variable.html"
                              className="menu-link menu-link_us-s"
                            >
                              Shop Detail V1
                            </a>
                          </li>
                          <li className="sub-menu__item">
                            <a
                              href="product7_v2.html"
                              className="menu-link menu-link_us-s"
                            >
                              Shop Detail V2
                            </a>
                          </li>
                          <li className="sub-menu__item">
                            <a
                              href="product8_v3.html"
                              className="menu-link menu-link_us-s"
                            >
                              Shop Detail V3
                            </a>
                          </li>
                          <li className="sub-menu__item">
                            <a
                              href="product9_v4.html"
                              className="menu-link menu-link_us-s"
                            >
                              Shop Detail V4
                            </a>
                          </li>
                          <li className="sub-menu__item">
                            <a
                              href="product10_v5.html"
                              className="menu-link menu-link_us-s"
                            >
                              Shop Detail V5
                            </a>
                          </li>
                          <li className="sub-menu__item">
                            <a
                              href="product11_v6.html"
                              className="menu-link menu-link_us-s"
                            >
                              Shop Detail V6
                            </a>
                          </li>
                          <li className="sub-menu__item">
                            <a
                              href="product12_v7.html"
                              className="menu-link menu-link_us-s"
                            >
                              Shop Detail V7
                            </a>
                          </li>
                          <li className="sub-menu__item">
                            <a
                              href="product13_v8.html"
                              className="menu-link menu-link_us-s"
                            >
                              Shop Detail V8
                            </a>
                          </li>
                          <li className="sub-menu__item">
                            <a
                              href="product14_v9.html"
                              className="menu-link menu-link_us-s"
                            >
                              Shop Detail V9
                            </a>
                          </li>
                          <li className="sub-menu__item">
                            <a
                              href="product15_v10.html"
                              className="menu-link menu-link_us-s"
                            >
                              Shop Detail V10
                            </a>
                          </li>
                          <li className="sub-menu__item">
                            <a
                              href="product16_v11.html"
                              className="menu-link menu-link_us-s"
                            >
                              Shop Detail V11
                            </a>
                          </li>
                        </ul>
                      </div>
                      <div className="col pe-4">
                        <a href="#" className="sub-menu__title">
                          Other Pages
                        </a>
                        <ul className="sub-menu__list list-unstyled">
                          <li className="sub-menu__item">
                            <a
                              href="shop12.html"
                              className="menu-link menu-link_us-s"
                            >
                              Collection Grid
                            </a>
                          </li>
                          <li className="sub-menu__item">
                            <a
                              href="product1_simple.html"
                              className="menu-link menu-link_us-s"
                            >
                              Simple Product
                            </a>
                          </li>
                          <li className="sub-menu__item">
                            <a
                              href="product2_variable.html"
                              className="menu-link menu-link_us-s"
                            >
                              Variable Product
                            </a>
                          </li>
                          <li className="sub-menu__item">
                            <a
                              href="product3_external.html"
                              className="menu-link menu-link_us-s"
                            >
                              External Product
                            </a>
                          </li>
                          <li className="sub-menu__item">
                            <a
                              href="product4_grouped.html"
                              className="menu-link menu-link_us-s"
                            >
                              Grouped Product
                            </a>
                          </li>
                          <li className="sub-menu__item">
                            <a
                              href="product5_onsale.html"
                              className="menu-link menu-link_us-s"
                            >
                              On Sale
                            </a>
                          </li>
                          <li className="sub-menu__item">
                            <a
                              href="product6_outofstock.html"
                              className="menu-link menu-link_us-s"
                            >
                              Out of Stock
                            </a>
                          </li>
                          <li className="sub-menu__item">
                            <a
                              href="shop_cart.html"
                              className="menu-link menu-link_us-s"
                            >
                              Shopping Cart
                            </a>
                          </li>
                          <li className="sub-menu__item">
                            <a
                              href="shop_checkout.html"
                              className="menu-link menu-link_us-s"
                            >
                              Checkout
                            </a>
                          </li>
                          <li className="sub-menu__item">
                            <a
                              href="shop_order_complete.html"
                              className="menu-link menu-link_us-s"
                            >
                              Order Complete
                            </a>
                          </li>
                          <li className="sub-menu__item">
                            <a
                              href="shop_order_tracking.html"
                              className="menu-link menu-link_us-s"
                            >
                              Order Tracking
                            </a>
                          </li>
                        </ul>
                      </div>
                      <div className="mega-menu__media col">
                        <div className="position-relative">
                          <img
                            loading="lazy"
                            className="mega-menu__img"
                            src="../images/mega-menu-item.jpg"
                            alt="New Horizons"
                          />
                          <div className="mega-menu__media-content content_abs content_left content_bottom">
                            <h3>NEW</h3>
                            <h3 className="mb-0">HORIZONS</h3>
                            <a
                              href="shop1.html"
                              className="btn-link default-underline fw-medium"
                            >
                              SHOP NOW
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* /.container d-flex */}
                  </div>
                </li>
                <li className="navigation__item">
                  <a href="#" className="navigation__link">
                    Blog
                  </a>
                  <ul className="default-menu list-unstyled">
                    <li className="sub-menu__item">
                      <a
                        href="blog_list1.html"
                        className="menu-link menu-link_us-s"
                      >
                        Blog V1
                      </a>
                    </li>
                    <li className="sub-menu__item">
                      <a
                        href="blog_list2.html"
                        className="menu-link menu-link_us-s"
                      >
                        Blog V2
                      </a>
                    </li>
                    <li className="sub-menu__item">
                      <a
                        href="blog_list3.html"
                        className="menu-link menu-link_us-s"
                      >
                        Blog V3
                      </a>
                    </li>
                    <li className="sub-menu__item">
                      <a
                        href="blog_single.html"
                        className="menu-link menu-link_us-s"
                      >
                        Blog Detail
                      </a>
                    </li>
                  </ul>
                  {/* /.box-menu */}
                </li>
                <li className="navigation__item">
                  <a href="#" className="navigation__link">
                    Pages
                  </a>
                  <ul className="default-menu list-unstyled">
                    <li className="sub-menu__item">
                      <a
                        href="account_dashboard.html"
                        className="menu-link menu-link_us-s"
                      >
                        My Account
                      </a>
                    </li>
                    <li className="sub-menu__item">
                      <a
                        href="login_register.html"
                        className="menu-link menu-link_us-s"
                      >
                        Login / Register
                      </a>
                    </li>
                    <li className="sub-menu__item">
                      <a
                        href="store_location.html"
                        className="menu-link menu-link_us-s"
                      >
                        Store Locator
                      </a>
                    </li>
                    <li className="sub-menu__item">
                      <a
                        href="lookbook.html"
                        className="menu-link menu-link_us-s"
                      >
                        Lookbook
                      </a>
                    </li>
                    <li className="sub-menu__item">
                      <a href="faq.html" className="menu-link menu-link_us-s">
                        Faq
                      </a>
                    </li>
                    <li className="sub-menu__item">
                      <a href="terms.html" className="menu-link menu-link_us-s">
                        Terms
                      </a>
                    </li>
                    <li className="sub-menu__item">
                      <a href="404.html" className="menu-link menu-link_us-s">
                        404 Error
                      </a>
                    </li>
                    <li className="sub-menu__item">
                      <a
                        href="coming_soon.html"
                        className="menu-link menu-link_us-s"
                      >
                        Coming Soon
                      </a>
                    </li>
                  </ul>
                  {/* /.box-menu */}
                </li>
                <li className="navigation__item">
                  <a href="about.html" className="navigation__link">
                    About
                  </a>
                </li>
                <li className="navigation__item">
                  <a href="contact.html" className="navigation__link">
                    Contact
                  </a>
                </li>
              </ul>
              {/* /.navigation__list */}
            </nav>
            {/* /.navigation */}
            <div className="header-tools d-flex align-items-center">
              <div className="header-tools__item hover-container">
                <div className="js-hover__open position-relative">
                  <a className="js-search-popup search-field__actor" href="#">
                    <svg
                      className="d-block"
                      width={20}
                      height={20}
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <use href="#icon_search" />
                    </svg>
                    <i className="fa-solid fa-magnifying-glass"></i>
                  </a>
                </div>
                <div className="search-popup js-hidden-content">
                  <form
                    action="https://uomo-html.flexkitux.com/Demo1/search_result.html"
                    method="GET"
                    className="search-field container"
                  >
                    <p className="text-uppercase text-secondary fw-medium mb-4">
                      What are you looking for?
                    </p>
                    <div className="position-relative">
                      <input
                        className="search-field__input search-popup__input w-100 fw-medium"
                        type="text"
                        name="search-keyword"
                        placeholder="Search products"
                      />
                      <button
                        className="btn-icon search-popup__submit"
                        type="submit"
                      >
                        <svg
                          className="d-block"
                          width={20}
                          height={20}
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <use href="#icon_search" />
                        </svg>
                      </button>
                      <button
                        className="btn-icon btn-close-lg search-popup__reset"
                        type="reset"
                      />
                    </div>
                    <div className="search-popup__results">
                      <div className="sub-menu search-suggestion">
                        <h6 className="sub-menu__title fs-base">Quicklinks</h6>
                        <ul className="sub-menu__list list-unstyled">
                          <li className="sub-menu__item">
                            <a
                              href="shop2.html"
                              className="menu-link menu-link_us-s"
                            >
                              New Arrivals
                            </a>
                          </li>
                          <li className="sub-menu__item">
                            <a href="#" className="menu-link menu-link_us-s">
                              Dresses
                            </a>
                          </li>
                          <li className="sub-menu__item">
                            <a
                              href="shop3.html"
                              className="menu-link menu-link_us-s"
                            >
                              Accessories
                            </a>
                          </li>
                          <li className="sub-menu__item">
                            <a href="#" className="menu-link menu-link_us-s">
                              Footwear
                            </a>
                          </li>
                          <li className="sub-menu__item">
                            <a href="#" className="menu-link menu-link_us-s">
                              Sweatshirt
                            </a>
                          </li>
                        </ul>
                      </div>
                      <div className="search-result row row-cols-5" />
                    </div>
                  </form>
                  {/* /.header-search */}
                </div>
                {/* /.search-popup */}
              </div>
              {/* /.header-tools__item hover-container */}
              <div className="header-tools__item hover-container">
                <a
                  className="header-tools__item js-open-aside"
                  href="#"
                  data-aside="customerForms"
                >
                  <svg
                    width={20}
                    height={20}
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <use href="#icon_user" />
                  </svg>
                </a>
              </div>
              <a className="header-tools__item" href="account_wishlist.html">
                <svg
                  width={20}
                  height={20}
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <use href="#icon_heart" />
                </svg>
              </a>
              <a
                href="#"
                className="header-tools__item header-tools__cart js-open-aside"
                data-aside="cartDrawer"
              >
                <svg
                  className="d-block"
                  width={20}
                  height={20}
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <use href="#icon_cart" />
                </svg>
                <span className="cart-amount d-block position-absolute js-cart-items-count">
                  3
                </span>
              </a>
              <a
                className="header-tools__item"
                href="#"
                data-bs-toggle="modal"
                data-bs-target="#siteMap"
              >
                <svg
                  className="nav-icon"
                  width={25}
                  height={18}
                  viewBox="0 0 25 18"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <use href="#icon_nav" />
                </svg>
              </a>
            </div>
            {/* /.header__tools */}
          </div>
          {/* /.header-desk header-desk_type_1 */}
        </div>
        {/* /.container */}
      </header>
      <div>
        <main>
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
              {/* Slide 1 */}
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

                  <div className="slideshow-text position-absolute start-50 top-50 translate-middle container">
                    <h6 className="text_dash text-uppercase text-red fs-base fw-medium animate animate_fade animate_btt animate_delay-3">
                      New Trend
                    </h6>
                    <h2 className="text-uppercase h1 fw-normal animate animate_fade animate_btt animate_delay-5 mb-0">
                      Summer Sale Stylish
                    </h2>
                    <h2 className="text-uppercase h1 fw-bold animate animate_fade animate_btt animate_delay-5">
                      Womens
                    </h2>
                    <a
                      href="shop1.html"
                      className="btn-link btn-link_lg default-underline text-uppercase fw-medium animate animate_fade animate_btt animate_delay-7"
                    >
                      Discover More
                    </a>
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

                  <div className="slideshow-text position-absolute start-50 top-50 translate-middle container">
                    <h6 className="text_dash text-uppercase text-red fs-base fw-medium animate animate_fade animate_btt animate_delay-3">
                      Summer 2024
                    </h6>
                    <h2 className="text-uppercase h1 fw-bold animate animate_fade animate_btt animate_delay-3">
                      Hello New Season
                    </h2>
                    <h6 className="text-uppercase animate animate_fade animate_btt animate_delay-3 mb-5">
                      Limited Time Offer - Up to 60% off & Free Shipping
                    </h6>
                    <a
                      href="shop1.html"
                      className="btn-link btn-link_lg default-underline text-uppercase fw-medium animate animate_fade animate_btt animate_delay-3"
                    >
                      Discover More
                    </a>
                  </div>
                </div>
              </SwiperSlide>
            </Swiper>

            <div className="container">
              <div className="slideshow-pagination d-flex align-items-center position-absolute bottom-0 mb-5"></div>
            </div>
            <div>
              <div className="slideshow-social-follow d-none d-xxl-block position-absolute top-50 translate-middle-y start-0 text-center">
                <ul className="social-links list-unstyled text-secondary mb-0">
                  <li>
                    <a href="#" className="footer__social-link d-block">
                      <svg
                        className="svg-icon svg-icon_facebook"
                        width={9}
                        height={15}
                        viewBox="0 0 9 15"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <use href="#icon_facebook" />
                      </svg>
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://twitter.com/"
                      className="footer__social-link d-block"
                    >
                      <svg
                        className="svg-icon svg-icon_twitter"
                        width={14}
                        height={13}
                        viewBox="0 0 14 13"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <use href="#icon_twitter" />
                      </svg>
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.instagram.com/"
                      className="footer__social-link d-block"
                    >
                      <svg
                        className="svg-icon svg-icon_instagram"
                        width={14}
                        height={13}
                        viewBox="0 0 14 13"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <use href="#icon_instagram" />
                      </svg>
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.pinterest.com/"
                      className="footer__social-link d-block"
                    >
                      <svg
                        className="svg-icon svg-icon_pinterest"
                        width={14}
                        height={15}
                        viewBox="0 0 14 15"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <use href="#icon_pinterest" />
                      </svg>
                    </a>
                  </li>
                </ul>
                {/* /.social-links list-unstyled mb-0 text-secondary */}
                <span className="slideshow-social-follow__title d-block text-uppercase fw-medium text-secondary mt-5">
                  Follow Us
                </span>
              </div>
              {/* /.slideshow-social-follow */}
              <a
                href="#section-collections-grid_masonry"
                className="slideshow-scroll d-none d-xxl-block position-absolute text_dash text-uppercase fw-medium bottom-0 end-0"
              >
                Scroll
              </a>
            </div>
          </section>
          <div className="mb-md-4 pb-md-4 mb-xl-5 pb-xl-5 mb-3 pb-3" />
          <div className="pb-1" />
          {/* Shop by collection */}
          <section
            className="collections-grid collections-grid_masonry"
            id="section-collections-grid_masonry"
          >
            <div className="h-md-100 container">
              <div className="row h-md-100">
                <div className="col-lg-6 h-md-100">
                  <div className="collection-grid__item position-relative h-md-100">
                    <div
                      className="background-img"
                      style={{ backgroundImage: `url(${hot_list})` }}
                    />
                    <div className="content_abs content_bottom content_left content_bottom-md content_left-md">
                      <p className="text-uppercase mb-1">Hot List</p>
                      <h3 className="text-uppercase">
                        <strong>Women</strong> Collection
                      </h3>
                      <a
                        href="shop1.html"
                        className="btn-link default-underline text-uppercase fw-medium"
                      >
                        Shop Now
                      </a>
                    </div>
                    {/* /.content_abs content_bottom content_left content_bottom-md content_left-md */}
                  </div>
                </div>
                {/* /.col-md-6 */}
                <div className="col-lg-6 d-flex flex-column">
                  <div className="collection-grid__item position-relative flex-grow-1 mb-lg-4">
                    <div
                      className="background-img"
                      style={{ backgroundImage: `url(${hot_list1})` }}
                    />
                    <div className="content_abs content_bottom content_left content_bottom-md content_left-md">
                      <p className="text-uppercase mb-1">Hot List</p>
                      <h3 className="text-uppercase">
                        <strong>Men</strong> Collection
                      </h3>
                      <a
                        href="shop1.html"
                        className="btn-link default-underline text-uppercase fw-medium"
                      >
                        Shop Now
                      </a>
                    </div>
                    {/* /.content_abs content_bottom content_left content_bottom-md content_left-md */}
                  </div>
                  <div className="position-relative flex-grow-1 mt-lg-1">
                    <div className="row h-md-100">
                      <div className="col-md-6 h-md-100">
                        <div className="collection-grid__item h-md-100 position-relative">
                          <div
                            className="background-img"
                            style={{ backgroundImage: `url(${hot_list2})` }}
                          />
                          <div className="content_abs content_bottom content_left content_bottom-md content_left-md">
                            <p className="text-uppercase mb-1">Hot List</p>
                            <h3 className="text-uppercase">
                              <strong>Kids</strong> Collection
                            </h3>
                            <a
                              href="shop1.html"
                              className="btn-link default-underline text-uppercase fw-medium"
                            >
                              Shop Now
                            </a>
                          </div>
                          {/* /.content_abs content_bottom content_left content_bottom-md content_left-md */}
                        </div>
                        {/* /.collection-grid__item */}
                      </div>
                      <div className="col-md-6 h-md-100">
                        <div className="collection-grid__item h-md-100 position-relative">
                          <div
                            className="background-img"
                            style={{ backgroundColor: '#f5e6e0' }}
                          />
                          <div className="content_abs content_bottom content_left content_bottom-md content_left-md">
                            <h3 className="text-uppercase">
                              <strong>E-Gift</strong> Cards
                            </h3>
                            <p className="mb-1">
                              Surprise someone with the gift they
                              <br />
                              really want.
                            </p>
                            <a
                              href="shop1.html"
                              className="btn-link default-underline text-uppercase fw-medium"
                            >
                              Shop Now
                            </a>
                          </div>
                          {/* /.content_abs content_bottom content_left content_bottom-md content_left-md */}
                        </div>
                        {/* /.collection-grid__item */}
                      </div>
                    </div>
                  </div>
                </div>
                {/* /.col-md-6 */}
              </div>
              {/* /.row */}
            </div>
            {/* /.container */}
          </section>
          {/* /.collections-grid collections-grid_masonry */}
          <div className="mb-xl-5 pb-xl-5 mb-4 pb-4" />
          <section className="products-grid container">
            <h2 className="section-title text-uppercase mb-md-3 pb-xl-2 mb-xl-4 mb-1 text-center">
              Our Trendy
              <strong>Products</strong>
            </h2>
            <ul
              className="nav nav-tabs text-uppercase justify-content-center mb-3"
              id="collections-tab"
              role="tablist"
            >
              <li className="nav-item" role="presentation">
                <a
                  className="nav-link nav-link_underscore active"
                  id="collections-tab-1-trigger"
                  data-bs-toggle="tab"
                  href="#collections-tab-1"
                  role="tab"
                  aria-controls="collections-tab-1"
                  aria-selected="true"
                >
                  All
                </a>
              </li>
              <li className="nav-item" role="presentation">
                <a
                  className="nav-link nav-link_underscore"
                  id="collections-tab-2-trigger"
                  data-bs-toggle="tab"
                  href="#collections-tab-2"
                  role="tab"
                  aria-controls="collections-tab-2"
                  aria-selected="true"
                >
                  New Arrivals
                </a>
              </li>
              <li className="nav-item" role="presentation">
                <a
                  className="nav-link nav-link_underscore"
                  id="collections-tab-3-trigger"
                  data-bs-toggle="tab"
                  href="#collections-tab-3"
                  role="tab"
                  aria-controls="collections-tab-3"
                  aria-selected="true"
                >
                  Best Seller
                </a>
              </li>
              <li className="nav-item" role="presentation">
                <a
                  className="nav-link nav-link_underscore"
                  id="collections-tab-4-trigger"
                  data-bs-toggle="tab"
                  href="#collections-tab-4"
                  role="tab"
                  aria-controls="collections-tab-4"
                  aria-selected="true"
                >
                  Top Rated
                </a>
              </li>
            </ul>
            <div className="tab-content pt-2" id="collections-tab-content">
              <div
                className="tab-pane fade show active"
                id="collections-tab-1"
                role="tabpanel"
                aria-labelledby="collections-tab-1-trigger"
              >
                <div className="row">
                  <div className="col-6 col-md-4 col-lg-3">
                    <div className="product-card mb-md-4 mb-xxl-5 mb-3">
                      <div className="pc__img-wrapper">
                        <a href="product1_simple.html">
                          <img
                            loading="lazy"
                            src="https://picsum.photos/200/300"
                            width={330}
                            height={400}
                            alt="Cropped Faux leather Jacket"
                            className="pc__img"
                          />
                          <img
                            loading="lazy"
                            src="https://picsum.photos/id/237/200/300"
                            width={330}
                            height={400}
                            alt="Cropped Faux leather Jacket"
                            className="pc__img pc__img-second"
                          />
                        </a>
                        <button
                          className="pc__atc btn anim_appear-bottom btn position-absolute text-uppercase fw-medium js-add-cart js-open-aside border-0"
                          data-aside="cartDrawer"
                          title="Add To Cart"
                        >
                          Add To Cart
                        </button>
                      </div>
                      <div className="pc__info position-relative">
                        <p className="pc__category">Dresses</p>
                        <h6 className="pc__title">
                          <a href="product1_simple.html">
                            Cropped Faux Leather Jacket
                          </a>
                        </h6>
                        <div className="product-card__price d-flex">
                          <span className="money price">$29</span>
                        </div>
                        <div className="product-card__review d-flex align-items-center">
                          <div className="reviews-group d-flex">
                            <svg
                              className="review-star"
                              viewBox="0 0 9 9"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <use href="#icon_star" />
                            </svg>
                            <svg
                              className="review-star"
                              viewBox="0 0 9 9"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <use href="#icon_star" />
                            </svg>
                            <svg
                              className="review-star"
                              viewBox="0 0 9 9"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <use href="#icon_star" />
                            </svg>
                            <svg
                              className="review-star"
                              viewBox="0 0 9 9"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <use href="#icon_star" />
                            </svg>
                            <svg
                              className="review-star"
                              viewBox="0 0 9 9"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <use href="#icon_star" />
                            </svg>
                          </div>
                          <span className="reviews-note text-lowercase text-secondary ms-1">
                            8k+ reviews
                          </span>
                        </div>
                        <button
                          className="pc__btn-wl position-absolute js-add-wishlist end-0 top-0 border-0 bg-transparent"
                          title="Add To Wishlist"
                        >
                          <svg
                            width={16}
                            height={16}
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <use href="#icon_heart" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="col-6 col-md-4 col-lg-3">
                    <div className="product-card mb-md-4 mb-xxl-5 mb-3">
                      <div className="pc__img-wrapper">
                        <a href="product1_simple.html">
                          <img
                            loading="lazy"
                            src="https://picsum.photos/id/237/200/300"
                            width={330}
                            height={400}
                            alt="Cropped Faux leather Jacket"
                            className="pc__img"
                          />
                          <img
                            loading="lazy"
                            src="https://picsum.photos/200/300"
                            width={330}
                            height={400}
                            alt="Cropped Faux leather Jacket"
                            className="pc__img pc__img-second"
                          />
                        </a>
                        <button
                          className="pc__atc btn anim_appear-bottom btn position-absolute text-uppercase fw-medium js-add-cart js-open-aside border-0"
                          data-aside="cartDrawer"
                          title="Add To Cart"
                        >
                          Add To Cart
                        </button>
                      </div>
                      <div className="pc__info position-relative">
                        <p className="pc__category">Dresses</p>
                        <h6 className="pc__title">
                          <a href="product1_simple.html">Calvin Shorts</a>
                        </h6>
                        <div className="product-card__price d-flex">
                          <span className="money price">$62</span>
                        </div>
                        <button
                          className="pc__btn-wl position-absolute js-add-wishlist end-0 top-0 border-0 bg-transparent"
                          title="Add To Wishlist"
                        >
                          <svg
                            width={16}
                            height={16}
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <use href="#icon_heart" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="col-6 col-md-4 col-lg-3">
                    <div className="product-card mb-md-4 mb-xxl-5 mb-3">
                      <div className="pc__img-wrapper">
                        <a href="product1_simple.html">
                          <img
                            loading="lazy"
                            src="https://picsum.photos/200/300"
                            width={330}
                            height={400}
                            alt="Cropped Faux leather Jacket"
                            className="pc__img"
                          />
                          <img
                            loading="lazy"
                            src="https://picsum.photos/id/237/200/300"
                            width={330}
                            height={400}
                            alt="Cropped Faux leather Jacket"
                            className="pc__img pc__img-second"
                          />
                        </a>
                        <button
                          className="pc__atc btn anim_appear-bottom btn position-absolute text-uppercase fw-medium js-add-cart js-open-aside border-0"
                          data-aside="cartDrawer"
                          title="Add To Cart"
                        >
                          Add To Cart
                        </button>
                      </div>
                      <div className="pc__info position-relative">
                        <p className="pc__category">Dresses</p>
                        <h6 className="pc__title">
                          <a href="product1_simple.html">Kirby T-Shirt</a>
                        </h6>
                        <div className="product-card__price d-flex">
                          <span className="money price">$17</span>
                        </div>
                        <button
                          className="pc__btn-wl position-absolute js-add-wishlist end-0 top-0 border-0 bg-transparent"
                          title="Add To Wishlist"
                        >
                          <svg
                            width={16}
                            height={16}
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <use href="#icon_heart" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="col-6 col-md-4 col-lg-3">
                    <div className="product-card mb-md-4 mb-xxl-5 mb-3">
                      <div className="pc__img-wrapper">
                        <a href="product1_simple.html">
                          <img
                            loading="lazy"
                            src="https://picsum.photos/id/237/200/300"
                            width={330}
                            height={400}
                            alt="Cropped Faux leather Jacket"
                            className="pc__img"
                          />
                          <img
                            loading="lazy"
                            src="https://picsum.photos/200/300"
                            width={330}
                            height={400}
                            alt="Cropped Faux leather Jacket"
                            className="pc__img pc__img-second"
                          />
                        </a>
                        <button
                          className="pc__atc btn anim_appear-bottom btn position-absolute text-uppercase fw-medium js-add-cart js-open-aside border-0"
                          data-aside="cartDrawer"
                          title="Add To Cart"
                        >
                          Add To Cart
                        </button>
                      </div>
                      <div className="pc__info position-relative">
                        <p className="pc__category">Dresses</p>
                        <h6 className="pc__title">
                          <a href="product1_simple.html">Cableknit Shawl</a>
                        </h6>
                        <div className="product-card__price d-flex">
                          <span className="money price price-old">$129</span>
                          <span className="money price price-sale">$99</span>
                        </div>
                        <button
                          className="pc__btn-wl position-absolute js-add-wishlist end-0 top-0 border-0 bg-transparent"
                          title="Add To Wishlist"
                        >
                          <svg
                            width={16}
                            height={16}
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <use href="#icon_heart" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="col-6 col-md-4 col-lg-3">
                    <div className="product-card mb-md-4 mb-xxl-5 mb-3">
                      <div className="pc__img-wrapper">
                        <a href="product1_simple.html">
                          <img
                            loading="lazy"
                            src="https://picsum.photos/200/300"
                            width={330}
                            height={400}
                            alt="Cropped Faux leather Jacket"
                            className="pc__img"
                          />
                          <img
                            loading="lazy"
                            src="https://picsum.photos/id/237/200/300"
                            width={330}
                            height={400}
                            alt="Cropped Faux leather Jacket"
                            className="pc__img pc__img-second"
                          />
                        </a>
                        <button
                          className="pc__atc btn anim_appear-bottom btn position-absolute text-uppercase fw-medium js-add-cart js-open-aside border-0"
                          data-aside="cartDrawer"
                          title="Add To Cart"
                        >
                          Add To Cart
                        </button>
                      </div>
                      <div className="pc__info position-relative">
                        <p className="pc__category">Dresses</p>
                        <h6 className="pc__title">
                          <a href="product1_simple.html">Colorful Jacket</a>
                        </h6>
                        <div className="product-card__price d-flex">
                          <span className="money price">$29</span>
                        </div>
                        <button
                          className="pc__btn-wl position-absolute js-add-wishlist end-0 top-0 border-0 bg-transparent"
                          title="Add To Wishlist"
                        >
                          <svg
                            width={16}
                            height={16}
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <use href="#icon_heart" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="col-6 col-md-4 col-lg-3">
                    <div className="product-card mb-md-4 mb-xxl-5 mb-3">
                      <div className="pc__img-wrapper">
                        <a href="product1_simple.html">
                          <img
                            loading="lazy"
                            src="https://picsum.photos/id/237/200/300"
                            width={330}
                            height={400}
                            alt="Cropped Faux leather Jacket"
                            className="pc__img"
                          />
                          <img
                            loading="lazy"
                            src="https://picsum.photos/200/300"
                            width={330}
                            height={400}
                            alt="Cropped Faux leather Jacket"
                            className="pc__img pc__img-second"
                          />
                        </a>
                        <button
                          className="pc__atc btn anim_appear-bottom btn position-absolute text-uppercase fw-medium js-add-cart js-open-aside border-0"
                          data-aside="cartDrawer"
                          title="Add To Cart"
                        >
                          Add To Cart
                        </button>
                      </div>
                      <div className="pc__info position-relative">
                        <p className="pc__category">Dresses</p>
                        <h6 className="pc__title">
                          <a href="product1_simple.html">
                            Shirt In Botanical Cheetah Print
                          </a>
                        </h6>
                        <div className="product-card__price d-flex">
                          <span className="money price">$62</span>
                        </div>
                        <button
                          className="pc__btn-wl position-absolute js-add-wishlist end-0 top-0 border-0 bg-transparent"
                          title="Add To Wishlist"
                        >
                          <svg
                            width={16}
                            height={16}
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <use href="#icon_heart" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="col-6 col-md-4 col-lg-3">
                    <div className="product-card mb-md-4 mb-xxl-5 mb-3">
                      <div className="pc__img-wrapper">
                        <a href="product1_simple.html">
                          <img
                            loading="lazy"
                            src="https://picsum.photos/200/300"
                            width={330}
                            height={400}
                            alt="Cropped Faux leather Jacket"
                            className="pc__img"
                          />
                          <img
                            loading="lazy"
                            src="https://picsum.photos/id/237/200/300"
                            width={330}
                            height={400}
                            alt="Cropped Faux leather Jacket"
                            className="pc__img pc__img-second"
                          />
                        </a>
                        <button
                          className="pc__atc btn anim_appear-bottom btn position-absolute text-uppercase fw-medium js-add-cart js-open-aside border-0"
                          data-aside="cartDrawer"
                          title="Add To Cart"
                        >
                          Add To Cart
                        </button>
                      </div>
                      <div className="pc__info position-relative">
                        <p className="pc__category">Dresses</p>
                        <h6 className="pc__title">
                          <a href="product1_simple.html">
                            Cotton Jersey T-Shirt
                          </a>
                        </h6>
                        <div className="product-card__price d-flex">
                          <span className="money price">$17</span>
                        </div>
                        <button
                          className="pc__btn-wl position-absolute js-add-wishlist end-0 top-0 border-0 bg-transparent"
                          title="Add To Wishlist"
                        >
                          <svg
                            width={16}
                            height={16}
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <use href="#icon_heart" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="col-6 col-md-4 col-lg-3">
                    <div className="product-card mb-md-4 mb-xxl-5 mb-3">
                      <div className="pc__img-wrapper">
                        <a href="product1_simple.html">
                          <img
                            loading="lazy"
                            src="https://picsum.photos/id/237/200/300"
                            width={330}
                            height={400}
                            alt="Cropped Faux leather Jacket"
                            className="pc__img"
                          />
                          <img
                            loading="lazy"
                            src="https://picsum.photos/200/300"
                            width={330}
                            height={400}
                            alt="Cropped Faux leather Jacket"
                            className="pc__img pc__img-second"
                          />
                        </a>
                        <button
                          className="pc__atc btn anim_appear-bottom btn position-absolute text-uppercase fw-medium js-add-cart js-open-aside border-0"
                          data-aside="cartDrawer"
                          title="Add To Cart"
                        >
                          Add To Cart
                        </button>
                      </div>
                      <div className="pc__info position-relative">
                        <p className="pc__category">Dresses</p>
                        <h6 className="pc__title">
                          <a href="product1_simple.html">Zessi Dresses</a>
                        </h6>
                        <div className="product-card__price d-flex">
                          <span className="money price price-old">$129</span>
                          <span className="money price price-sale">$99</span>
                        </div>
                        <button
                          className="pc__btn-wl position-absolute js-add-wishlist end-0 top-0 border-0 bg-transparent"
                          title="Add To Wishlist"
                        >
                          <svg
                            width={16}
                            height={16}
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <use href="#icon_heart" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                {/* /.row */}
                <div className="mt-2 text-center">
                  <a
                    className="btn-link btn-link_lg default-underline text-uppercase fw-medium"
                    href="shop1.html"
                  >
                    Discover More
                  </a>
                </div>
              </div>
              {/* /.tab-pane fade show*/}
              <div
                className="tab-pane fade show"
                id="collections-tab-2"
                role="tabpanel"
                aria-labelledby="collections-tab-2-trigger"
              >
                <div className="row">
                  <div className="col-6 col-md-4 col-lg-3">
                    <div className="product-card mb-md-4 mb-xxl-5 mb-3">
                      <div className="pc__img-wrapper">
                        <a href="product1_simple.html">
                          <img
                            loading="lazy"
                            src="https://picsum.photos/200/300"
                            width={330}
                            height={400}
                            alt="Cropped Faux leather Jacket"
                            className="pc__img"
                          />
                          <img
                            loading="lazy"
                            src="https://picsum.photos/id/237/200/300"
                            width={330}
                            height={400}
                            alt="Cropped Faux leather Jacket"
                            className="pc__img pc__img-second"
                          />
                        </a>
                        <button
                          className="pc__atc btn anim_appear-bottom btn position-absolute text-uppercase fw-medium js-add-cart js-open-aside border-0"
                          data-aside="cartDrawer"
                          title="Add To Cart"
                        >
                          Add To Cart
                        </button>
                      </div>
                      <div className="pc__info position-relative">
                        <p className="pc__category">Dresses</p>
                        <h6 className="pc__title">
                          <a href="product1_simple.html">Kirby T-Shirt</a>
                        </h6>
                        <div className="product-card__price d-flex">
                          <span className="money price">$17</span>
                        </div>
                        <button
                          className="pc__btn-wl position-absolute js-add-wishlist end-0 top-0 border-0 bg-transparent"
                          title="Add To Wishlist"
                        >
                          <svg
                            width={16}
                            height={16}
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <use href="#icon_heart" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="col-6 col-md-4 col-lg-3">
                    <div className="product-card mb-md-4 mb-xxl-5 mb-3">
                      <div className="pc__img-wrapper">
                        <a href="product1_simple.html">
                          <img
                            loading="lazy"
                            src="https://picsum.photos/id/237/200/300"
                            width={330}
                            height={400}
                            alt="Cropped Faux leather Jacket"
                            className="pc__img"
                          />
                          <img
                            loading="lazy"
                            src="https://picsum.photos/200/300"
                            width={330}
                            height={400}
                            alt="Cropped Faux leather Jacket"
                            className="pc__img pc__img-second"
                          />
                        </a>
                        <button
                          className="pc__atc btn anim_appear-bottom btn position-absolute text-uppercase fw-medium js-add-cart js-open-aside border-0"
                          data-aside="cartDrawer"
                          title="Add To Cart"
                        >
                          Add To Cart
                        </button>
                      </div>
                      <div className="pc__info position-relative">
                        <p className="pc__category">Dresses</p>
                        <h6 className="pc__title">
                          <a href="product1_simple.html">Cableknit Shawl</a>
                        </h6>
                        <div className="product-card__price d-flex">
                          <span className="money price price-old">$129</span>
                          <span className="money price price-sale">$99</span>
                        </div>
                        <button
                          className="pc__btn-wl position-absolute js-add-wishlist end-0 top-0 border-0 bg-transparent"
                          title="Add To Wishlist"
                        >
                          <svg
                            width={16}
                            height={16}
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <use href="#icon_heart" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="col-6 col-md-4 col-lg-3">
                    <div className="product-card mb-md-4 mb-xxl-5 mb-3">
                      <div className="pc__img-wrapper">
                        <a href="product1_simple.html">
                          <img
                            loading="lazy"
                            src="https://picsum.photos/200/300"
                            width={330}
                            height={400}
                            alt="Cropped Faux leather Jacket"
                            className="pc__img"
                          />
                          <img
                            loading="lazy"
                            src="https://picsum.photos/id/237/200/300"
                            width={330}
                            height={400}
                            alt="Cropped Faux leather Jacket"
                            className="pc__img pc__img-second"
                          />
                        </a>
                        <button
                          className="pc__atc btn anim_appear-bottom btn position-absolute text-uppercase fw-medium js-add-cart js-open-aside border-0"
                          data-aside="cartDrawer"
                          title="Add To Cart"
                        >
                          Add To Cart
                        </button>
                      </div>
                      <div className="pc__info position-relative">
                        <p className="pc__category">Dresses</p>
                        <h6 className="pc__title">
                          <a href="product1_simple.html">Colorful Jacket</a>
                        </h6>
                        <div className="product-card__price d-flex">
                          <span className="money price">$29</span>
                        </div>
                        <button
                          className="pc__btn-wl position-absolute js-add-wishlist end-0 top-0 border-0 bg-transparent"
                          title="Add To Wishlist"
                        >
                          <svg
                            width={16}
                            height={16}
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <use href="#icon_heart" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="col-6 col-md-4 col-lg-3">
                    <div className="product-card mb-md-4 mb-xxl-5 mb-3">
                      <div className="pc__img-wrapper">
                        <a href="product1_simple.html">
                          <img
                            loading="lazy"
                            src="https://picsum.photos/id/237/200/300"
                            width={330}
                            height={400}
                            alt="Cropped Faux leather Jacket"
                            className="pc__img"
                          />
                          <img
                            loading="lazy"
                            src="https://picsum.photos/200/300"
                            width={330}
                            height={400}
                            alt="Cropped Faux leather Jacket"
                            className="pc__img pc__img-second"
                          />
                        </a>
                        <button
                          className="pc__atc btn anim_appear-bottom btn position-absolute text-uppercase fw-medium js-add-cart js-open-aside border-0"
                          data-aside="cartDrawer"
                          title="Add To Cart"
                        >
                          Add To Cart
                        </button>
                      </div>
                      <div className="pc__info position-relative">
                        <p className="pc__category">Dresses</p>
                        <h6 className="pc__title">
                          <a href="product1_simple.html">
                            Shirt In Botanical Cheetah Print
                          </a>
                        </h6>
                        <div className="product-card__price d-flex">
                          <span className="money price">$62</span>
                        </div>
                        <button
                          className="pc__btn-wl position-absolute js-add-wishlist end-0 top-0 border-0 bg-transparent"
                          title="Add To Wishlist"
                        >
                          <svg
                            width={16}
                            height={16}
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <use href="#icon_heart" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="col-6 col-md-4 col-lg-3">
                    <div className="product-card mb-md-4 mb-xxl-5 mb-3">
                      <div className="pc__img-wrapper">
                        <a href="product1_simple.html">
                          <img
                            loading="lazy"
                            src="https://picsum.photos/200/300"
                            width={330}
                            height={400}
                            alt="Cropped Faux leather Jacket"
                            className="pc__img"
                          />
                          <img
                            loading="lazy"
                            src="https://picsum.photos/id/237/200/300"
                            width={330}
                            height={400}
                            alt="Cropped Faux leather Jacket"
                            className="pc__img pc__img-second"
                          />
                        </a>
                        <button
                          className="pc__atc btn anim_appear-bottom btn position-absolute text-uppercase fw-medium js-add-cart js-open-aside border-0"
                          data-aside="cartDrawer"
                          title="Add To Cart"
                        >
                          Add To Cart
                        </button>
                      </div>
                      <div className="pc__info position-relative">
                        <p className="pc__category">Dresses</p>
                        <h6 className="pc__title">
                          <a href="product1_simple.html">
                            Cotton Jersey T-Shirt
                          </a>
                        </h6>
                        <div className="product-card__price d-flex">
                          <span className="money price">$17</span>
                        </div>
                        <button
                          className="pc__btn-wl position-absolute js-add-wishlist end-0 top-0 border-0 bg-transparent"
                          title="Add To Wishlist"
                        >
                          <svg
                            width={16}
                            height={16}
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <use href="#icon_heart" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="col-6 col-md-4 col-lg-3">
                    <div className="product-card mb-md-4 mb-xxl-5 mb-3">
                      <div className="pc__img-wrapper">
                        <a href="product1_simple.html">
                          <img
                            loading="lazy"
                            src="https://picsum.photos/id/237/200/300"
                            width={330}
                            height={400}
                            alt="Cropped Faux leather Jacket"
                            className="pc__img"
                          />
                          <img
                            loading="lazy"
                            src="https://picsum.photos/200/300"
                            width={330}
                            height={400}
                            alt="Cropped Faux leather Jacket"
                            className="pc__img pc__img-second"
                          />
                        </a>
                        <button
                          className="pc__atc btn anim_appear-bottom btn position-absolute text-uppercase fw-medium js-add-cart js-open-aside border-0"
                          data-aside="cartDrawer"
                          title="Add To Cart"
                        >
                          Add To Cart
                        </button>
                      </div>
                      <div className="pc__info position-relative">
                        <p className="pc__category">Dresses</p>
                        <h6 className="pc__title">
                          <a href="product1_simple.html">Zessi Dresses</a>
                        </h6>
                        <div className="product-card__price d-flex">
                          <span className="money price price-old">$129</span>
                          <span className="money price price-sale">$99</span>
                        </div>
                        <button
                          className="pc__btn-wl position-absolute js-add-wishlist end-0 top-0 border-0 bg-transparent"
                          title="Add To Wishlist"
                        >
                          <svg
                            width={16}
                            height={16}
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <use href="#icon_heart" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="col-6 col-md-4 col-lg-3">
                    <div className="product-card mb-md-4 mb-xxl-5 mb-3">
                      <div className="pc__img-wrapper">
                        <a href="product1_simple.html">
                          <img
                            loading="lazy"
                            src="https://picsum.photos/200/300"
                            width={330}
                            height={400}
                            alt="Cropped Faux leather Jacket"
                            className="pc__img"
                          />
                          <img
                            loading="lazy"
                            src="https://picsum.photos/id/237/200/300"
                            width={330}
                            height={400}
                            alt="Cropped Faux leather Jacket"
                            className="pc__img pc__img-second"
                          />
                        </a>
                        <button
                          className="pc__atc btn anim_appear-bottom btn position-absolute text-uppercase fw-medium js-add-cart js-open-aside border-0"
                          data-aside="cartDrawer"
                          title="Add To Cart"
                        >
                          Add To Cart
                        </button>
                      </div>
                      <div className="pc__info position-relative">
                        <p className="pc__category">Dresses</p>
                        <h6 className="pc__title">
                          <a href="product1_simple.html">
                            Cropped Faux Leather Jacket
                          </a>
                        </h6>
                        <div className="product-card__price d-flex">
                          <span className="money price">$29</span>
                        </div>
                        <div className="product-card__review d-flex align-items-center">
                          <div className="reviews-group d-flex">
                            <svg
                              className="review-star"
                              viewBox="0 0 9 9"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <use href="#icon_star" />
                            </svg>
                            <svg
                              className="review-star"
                              viewBox="0 0 9 9"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <use href="#icon_star" />
                            </svg>
                            <svg
                              className="review-star"
                              viewBox="0 0 9 9"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <use href="#icon_star" />
                            </svg>
                            <svg
                              className="review-star"
                              viewBox="0 0 9 9"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <use href="#icon_star" />
                            </svg>
                            <svg
                              className="review-star"
                              viewBox="0 0 9 9"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <use href="#icon_star" />
                            </svg>
                          </div>
                          <span className="reviews-note text-lowercase text-secondary ms-1">
                            8k+ reviews
                          </span>
                        </div>
                        <button
                          className="pc__btn-wl position-absolute js-add-wishlist end-0 top-0 border-0 bg-transparent"
                          title="Add To Wishlist"
                        >
                          <svg
                            width={16}
                            height={16}
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <use href="#icon_heart" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="col-6 col-md-4 col-lg-3">
                    <div className="product-card mb-md-4 mb-xxl-5 mb-3">
                      <div className="pc__img-wrapper">
                        <a href="product1_simple.html">
                          <img
                            loading="lazy"
                            src="https://picsum.photos/id/237/200/300"
                            width={330}
                            height={400}
                            alt="Cropped Faux leather Jacket"
                            className="pc__img"
                          />
                          <img
                            loading="lazy"
                            src="https://picsum.photos/200/300"
                            width={330}
                            height={400}
                            alt="Cropped Faux leather Jacket"
                            className="pc__img pc__img-second"
                          />
                        </a>
                        <button
                          className="pc__atc btn anim_appear-bottom btn position-absolute text-uppercase fw-medium js-add-cart js-open-aside border-0"
                          data-aside="cartDrawer"
                          title="Add To Cart"
                        >
                          Add To Cart
                        </button>
                      </div>
                      <div className="pc__info position-relative">
                        <p className="pc__category">Dresses</p>
                        <h6 className="pc__title">
                          <a href="product1_simple.html">Calvin Shorts</a>
                        </h6>
                        <div className="product-card__price d-flex">
                          <span className="money price">$62</span>
                        </div>
                        <button
                          className="pc__btn-wl position-absolute js-add-wishlist end-0 top-0 border-0 bg-transparent"
                          title="Add To Wishlist"
                        >
                          <svg
                            width={16}
                            height={16}
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <use href="#icon_heart" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                {/* /.row */}
                <div className="mt-2 text-center">
                  <a
                    className="btn-link btn-link_lg default-underline default-underline text-uppercase fw-medium"
                    href="#"
                  >
                    See All Products
                  </a>
                </div>
              </div>
              {/* /.tab-pane fade show*/}
              <div
                className="tab-pane fade show"
                id="collections-tab-3"
                role="tabpanel"
                aria-labelledby="collections-tab-3-trigger"
              >
                <div className="row">
                  <div className="col-6 col-md-4 col-lg-3">
                    <div className="product-card mb-md-4 mb-xxl-5 mb-3">
                      <div className="pc__img-wrapper">
                        <a href="product1_simple.html">
                          <img
                            loading="lazy"
                            src="https://picsum.photos/200/300"
                            width={330}
                            height={400}
                            alt="Cropped Faux leather Jacket"
                            className="pc__img"
                          />
                          <img
                            loading="lazy"
                            src="https://picsum.photos/id/237/200/300"
                            width={330}
                            height={400}
                            alt="Cropped Faux leather Jacket"
                            className="pc__img pc__img-second"
                          />
                        </a>
                        <button
                          className="pc__atc btn anim_appear-bottom btn position-absolute text-uppercase fw-medium js-add-cart js-open-aside border-0"
                          data-aside="cartDrawer"
                          title="Add To Cart"
                        >
                          Add To Cart
                        </button>
                      </div>
                      <div className="pc__info position-relative">
                        <p className="pc__category">Dresses</p>
                        <h6 className="pc__title">
                          <a href="product1_simple.html">Colorful Jacket</a>
                        </h6>
                        <div className="product-card__price d-flex">
                          <span className="money price">$29</span>
                        </div>
                        <button
                          className="pc__btn-wl position-absolute js-add-wishlist end-0 top-0 border-0 bg-transparent"
                          title="Add To Wishlist"
                        >
                          <svg
                            width={16}
                            height={16}
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <use href="#icon_heart" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="col-6 col-md-4 col-lg-3">
                    <div className="product-card mb-md-4 mb-xxl-5 mb-3">
                      <div className="pc__img-wrapper">
                        <a href="product1_simple.html">
                          <img
                            loading="lazy"
                            src="https://picsum.photos/id/237/200/300"
                            width={330}
                            height={400}
                            alt="Cropped Faux leather Jacket"
                            className="pc__img"
                          />
                          <img
                            loading="lazy"
                            src="https://picsum.photos/200/300"
                            width={330}
                            height={400}
                            alt="Cropped Faux leather Jacket"
                            className="pc__img pc__img-second"
                          />
                        </a>
                        <button
                          className="pc__atc btn anim_appear-bottom btn position-absolute text-uppercase fw-medium js-add-cart js-open-aside border-0"
                          data-aside="cartDrawer"
                          title="Add To Cart"
                        >
                          Add To Cart
                        </button>
                      </div>
                      <div className="pc__info position-relative">
                        <p className="pc__category">Dresses</p>
                        <h6 className="pc__title">
                          <a href="product1_simple.html">
                            Shirt In Botanical Cheetah Print
                          </a>
                        </h6>
                        <div className="product-card__price d-flex">
                          <span className="money price">$62</span>
                        </div>
                        <button
                          className="pc__btn-wl position-absolute js-add-wishlist end-0 top-0 border-0 bg-transparent"
                          title="Add To Wishlist"
                        >
                          <svg
                            width={16}
                            height={16}
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <use href="#icon_heart" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="col-6 col-md-4 col-lg-3">
                    <div className="product-card mb-md-4 mb-xxl-5 mb-3">
                      <div className="pc__img-wrapper">
                        <a href="product1_simple.html">
                          <img
                            loading="lazy"
                            src="https://picsum.photos/200/300"
                            width={330}
                            height={400}
                            alt="Cropped Faux leather Jacket"
                            className="pc__img"
                          />
                          <img
                            loading="lazy"
                            src="https://picsum.photos/id/237/200/300"
                            width={330}
                            height={400}
                            alt="Cropped Faux leather Jacket"
                            className="pc__img pc__img-second"
                          />
                        </a>
                        <button
                          className="pc__atc btn anim_appear-bottom btn position-absolute text-uppercase fw-medium js-add-cart js-open-aside border-0"
                          data-aside="cartDrawer"
                          title="Add To Cart"
                        >
                          Add To Cart
                        </button>
                      </div>
                      <div className="pc__info position-relative">
                        <p className="pc__category">Dresses</p>
                        <h6 className="pc__title">
                          <a href="product1_simple.html">
                            Cotton Jersey T-Shirt
                          </a>
                        </h6>
                        <div className="product-card__price d-flex">
                          <span className="money price">$17</span>
                        </div>
                        <button
                          className="pc__btn-wl position-absolute js-add-wishlist end-0 top-0 border-0 bg-transparent"
                          title="Add To Wishlist"
                        >
                          <svg
                            width={16}
                            height={16}
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <use href="#icon_heart" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="col-6 col-md-4 col-lg-3">
                    <div className="product-card mb-md-4 mb-xxl-5 mb-3">
                      <div className="pc__img-wrapper">
                        <a href="product1_simple.html">
                          <img
                            loading="lazy"
                            src="https://picsum.photos/id/237/200/300"
                            width={330}
                            height={400}
                            alt="Cropped Faux leather Jacket"
                            className="pc__img"
                          />
                          <img
                            loading="lazy"
                            src="https://picsum.photos/200/300"
                            width={330}
                            height={400}
                            alt="Cropped Faux leather Jacket"
                            className="pc__img pc__img-second"
                          />
                        </a>
                        <button
                          className="pc__atc btn anim_appear-bottom btn position-absolute text-uppercase fw-medium js-add-cart js-open-aside border-0"
                          data-aside="cartDrawer"
                          title="Add To Cart"
                        >
                          Add To Cart
                        </button>
                      </div>
                      <div className="pc__info position-relative">
                        <p className="pc__category">Dresses</p>
                        <h6 className="pc__title">
                          <a href="product1_simple.html">Zessi Dresses</a>
                        </h6>
                        <div className="product-card__price d-flex">
                          <span className="money price price-old">$129</span>
                          <span className="money price price-sale">$99</span>
                        </div>
                        <button
                          className="pc__btn-wl position-absolute js-add-wishlist end-0 top-0 border-0 bg-transparent"
                          title="Add To Wishlist"
                        >
                          <svg
                            width={16}
                            height={16}
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <use href="#icon_heart" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="col-6 col-md-4 col-lg-3">
                    <div className="product-card mb-md-4 mb-xxl-5 mb-3">
                      <div className="pc__img-wrapper">
                        <a href="product1_simple.html">
                          <img
                            loading="lazy"
                            src="https://picsum.photos/200/300"
                            width={330}
                            height={400}
                            alt="Cropped Faux leather Jacket"
                            className="pc__img"
                          />
                          <img
                            loading="lazy"
                            src="https://picsum.photos/id/237/200/300"
                            width={330}
                            height={400}
                            alt="Cropped Faux leather Jacket"
                            className="pc__img pc__img-second"
                          />
                        </a>
                        <button
                          className="pc__atc btn anim_appear-bottom btn position-absolute text-uppercase fw-medium js-add-cart js-open-aside border-0"
                          data-aside="cartDrawer"
                          title="Add To Cart"
                        >
                          Add To Cart
                        </button>
                      </div>
                      <div className="pc__info position-relative">
                        <p className="pc__category">Dresses</p>
                        <h6 className="pc__title">
                          <a href="product1_simple.html">
                            Cropped Faux Leather Jacket
                          </a>
                        </h6>
                        <div className="product-card__price d-flex">
                          <span className="money price">$29</span>
                        </div>
                        <div className="product-card__review d-flex align-items-center">
                          <div className="reviews-group d-flex">
                            <svg
                              className="review-star"
                              viewBox="0 0 9 9"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <use href="#icon_star" />
                            </svg>
                            <svg
                              className="review-star"
                              viewBox="0 0 9 9"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <use href="#icon_star" />
                            </svg>
                            <svg
                              className="review-star"
                              viewBox="0 0 9 9"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <use href="#icon_star" />
                            </svg>
                            <svg
                              className="review-star"
                              viewBox="0 0 9 9"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <use href="#icon_star" />
                            </svg>
                            <svg
                              className="review-star"
                              viewBox="0 0 9 9"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <use href="#icon_star" />
                            </svg>
                          </div>
                          <span className="reviews-note text-lowercase text-secondary ms-1">
                            8k+ reviews
                          </span>
                        </div>
                        <button
                          className="pc__btn-wl position-absolute js-add-wishlist end-0 top-0 border-0 bg-transparent"
                          title="Add To Wishlist"
                        >
                          <svg
                            width={16}
                            height={16}
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <use href="#icon_heart" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="col-6 col-md-4 col-lg-3">
                    <div className="product-card mb-md-4 mb-xxl-5 mb-3">
                      <div className="pc__img-wrapper">
                        <a href="product1_simple.html">
                          <img
                            loading="lazy"
                            src="https://picsum.photos/id/237/200/300"
                            width={330}
                            height={400}
                            alt="Cropped Faux leather Jacket"
                            className="pc__img"
                          />
                          <img
                            loading="lazy"
                            src="https://picsum.photos/200/300"
                            width={330}
                            height={400}
                            alt="Cropped Faux leather Jacket"
                            className="pc__img pc__img-second"
                          />
                        </a>
                        <button
                          className="pc__atc btn anim_appear-bottom btn position-absolute text-uppercase fw-medium js-add-cart js-open-aside border-0"
                          data-aside="cartDrawer"
                          title="Add To Cart"
                        >
                          Add To Cart
                        </button>
                      </div>
                      <div className="pc__info position-relative">
                        <p className="pc__category">Dresses</p>
                        <h6 className="pc__title">
                          <a href="product1_simple.html">Calvin Shorts</a>
                        </h6>
                        <div className="product-card__price d-flex">
                          <span className="money price">$62</span>
                        </div>
                        <button
                          className="pc__btn-wl position-absolute js-add-wishlist end-0 top-0 border-0 bg-transparent"
                          title="Add To Wishlist"
                        >
                          <svg
                            width={16}
                            height={16}
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <use href="#icon_heart" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="col-6 col-md-4 col-lg-3">
                    <div className="product-card mb-md-4 mb-xxl-5 mb-3">
                      <div className="pc__img-wrapper">
                        <a href="product1_simple.html">
                          <img
                            loading="lazy"
                            src="https://picsum.photos/200/300"
                            width={330}
                            height={400}
                            alt="Cropped Faux leather Jacket"
                            className="pc__img"
                          />
                          <img
                            loading="lazy"
                            src="https://picsum.photos/id/237/200/300"
                            width={330}
                            height={400}
                            alt="Cropped Faux leather Jacket"
                            className="pc__img pc__img-second"
                          />
                        </a>
                        <button
                          className="pc__atc btn anim_appear-bottom btn position-absolute text-uppercase fw-medium js-add-cart js-open-aside border-0"
                          data-aside="cartDrawer"
                          title="Add To Cart"
                        >
                          Add To Cart
                        </button>
                      </div>
                      <div className="pc__info position-relative">
                        <p className="pc__category">Dresses</p>
                        <h6 className="pc__title">
                          <a href="product1_simple.html">Kirby T-Shirt</a>
                        </h6>
                        <div className="product-card__price d-flex">
                          <span className="money price">$17</span>
                        </div>
                        <button
                          className="pc__btn-wl position-absolute js-add-wishlist end-0 top-0 border-0 bg-transparent"
                          title="Add To Wishlist"
                        >
                          <svg
                            width={16}
                            height={16}
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <use href="#icon_heart" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="col-6 col-md-4 col-lg-3">
                    <div className="product-card mb-md-4 mb-xxl-5 mb-3">
                      <div className="pc__img-wrapper">
                        <a href="product1_simple.html">
                          <img
                            loading="lazy"
                            src="https://picsum.photos/id/237/200/300"
                            width={330}
                            height={400}
                            alt="Cropped Faux leather Jacket"
                            className="pc__img"
                          />
                          <img
                            loading="lazy"
                            src="https://picsum.photos/200/300"
                            width={330}
                            height={400}
                            alt="Cropped Faux leather Jacket"
                            className="pc__img pc__img-second"
                          />
                        </a>
                        <button
                          className="pc__atc btn anim_appear-bottom btn position-absolute text-uppercase fw-medium js-add-cart js-open-aside border-0"
                          data-aside="cartDrawer"
                          title="Add To Cart"
                        >
                          Add To Cart
                        </button>
                      </div>
                      <div className="pc__info position-relative">
                        <p className="pc__category">Dresses</p>
                        <h6 className="pc__title">
                          <a href="product1_simple.html">Cableknit Shawl</a>
                        </h6>
                        <div className="product-card__price d-flex">
                          <span className="money price price-old">$129</span>
                          <span className="money price price-sale">$99</span>
                        </div>
                        <button
                          className="pc__btn-wl position-absolute js-add-wishlist end-0 top-0 border-0 bg-transparent"
                          title="Add To Wishlist"
                        >
                          <svg
                            width={16}
                            height={16}
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <use href="#icon_heart" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                {/* /.row */}
                <div className="mt-2 text-center">
                  <a
                    className="btn-link btn-link_lg default-underline text-uppercase fw-medium"
                    href="shop1.html"
                  >
                    Discover More
                  </a>
                </div>
              </div>
              {/* /.tab-pane fade show*/}
              <div
                className="tab-pane fade show"
                id="collections-tab-4"
                role="tabpanel"
                aria-labelledby="collections-tab-4-trigger"
              >
                <div className="row">
                  <div className="col-6 col-md-4 col-lg-3">
                    <div className="product-card mb-md-4 mb-xxl-5 mb-3">
                      <div className="pc__img-wrapper">
                        <a href="product1_simple.html">
                          <img
                            loading="lazy"
                            src="https://picsum.photos/200/300"
                            width={330}
                            height={400}
                            alt="Cropped Faux leather Jacket"
                            className="pc__img"
                          />
                          <img
                            loading="lazy"
                            src="https://picsum.photos/id/237/200/300"
                            width={330}
                            height={400}
                            alt="Cropped Faux leather Jacket"
                            className="pc__img pc__img-second"
                          />
                        </a>
                        <button
                          className="pc__atc btn anim_appear-bottom btn position-absolute text-uppercase fw-medium js-add-cart js-open-aside border-0"
                          data-aside="cartDrawer"
                          title="Add To Cart"
                        >
                          Add To Cart
                        </button>
                      </div>
                      <div className="pc__info position-relative">
                        <p className="pc__category">Dresses</p>
                        <h6 className="pc__title">
                          <a href="product1_simple.html">
                            Cotton Jersey T-Shirt
                          </a>
                        </h6>
                        <div className="product-card__price d-flex">
                          <span className="money price">$17</span>
                        </div>
                        <button
                          className="pc__btn-wl position-absolute js-add-wishlist end-0 top-0 border-0 bg-transparent"
                          title="Add To Wishlist"
                        >
                          <svg
                            width={16}
                            height={16}
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <use href="#icon_heart" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="col-6 col-md-4 col-lg-3">
                    <div className="product-card mb-md-4 mb-xxl-5 mb-3">
                      <div className="pc__img-wrapper">
                        <a href="product1_simple.html">
                          <img
                            loading="lazy"
                            src="https://picsum.photos/id/237/200/300"
                            width={330}
                            height={400}
                            alt="Cropped Faux leather Jacket"
                            className="pc__img"
                          />
                          <img
                            loading="lazy"
                            src="https://picsum.photos/200/300"
                            width={330}
                            height={400}
                            alt="Cropped Faux leather Jacket"
                            className="pc__img pc__img-second"
                          />
                        </a>
                        <button
                          className="pc__atc btn anim_appear-bottom btn position-absolute text-uppercase fw-medium js-add-cart js-open-aside border-0"
                          data-aside="cartDrawer"
                          title="Add To Cart"
                        >
                          Add To Cart
                        </button>
                      </div>
                      <div className="pc__info position-relative">
                        <p className="pc__category">Dresses</p>
                        <h6 className="pc__title">
                          <a href="product1_simple.html">Zessi Dresses</a>
                        </h6>
                        <div className="product-card__price d-flex">
                          <span className="money price price-old">$129</span>
                          <span className="money price price-sale">$99</span>
                        </div>
                        <button
                          className="pc__btn-wl position-absolute js-add-wishlist end-0 top-0 border-0 bg-transparent"
                          title="Add To Wishlist"
                        >
                          <svg
                            width={16}
                            height={16}
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <use href="#icon_heart" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="col-6 col-md-4 col-lg-3">
                    <div className="product-card mb-md-4 mb-xxl-5 mb-3">
                      <div className="pc__img-wrapper">
                        <a href="product1_simple.html">
                          <img
                            loading="lazy"
                            src="https://picsum.photos/200/300"
                            width={330}
                            height={400}
                            alt="Cropped Faux leather Jacket"
                            className="pc__img"
                          />
                          <img
                            loading="lazy"
                            src="https://picsum.photos/id/237/200/300"
                            width={330}
                            height={400}
                            alt="Cropped Faux leather Jacket"
                            className="pc__img pc__img-second"
                          />
                        </a>
                        <button
                          className="pc__atc btn anim_appear-bottom btn position-absolute text-uppercase fw-medium js-add-cart js-open-aside border-0"
                          data-aside="cartDrawer"
                          title="Add To Cart"
                        >
                          Add To Cart
                        </button>
                      </div>
                      <div className="pc__info position-relative">
                        <p className="pc__category">Dresses</p>
                        <h6 className="pc__title">
                          <a href="product1_simple.html">
                            Cropped Faux Leather Jacket
                          </a>
                        </h6>
                        <div className="product-card__price d-flex">
                          <span className="money price">$29</span>
                        </div>
                        <div className="product-card__review d-flex align-items-center">
                          <div className="reviews-group d-flex">
                            <svg
                              className="review-star"
                              viewBox="0 0 9 9"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <use href="#icon_star" />
                            </svg>
                            <svg
                              className="review-star"
                              viewBox="0 0 9 9"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <use href="#icon_star" />
                            </svg>
                            <svg
                              className="review-star"
                              viewBox="0 0 9 9"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <use href="#icon_star" />
                            </svg>
                            <svg
                              className="review-star"
                              viewBox="0 0 9 9"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <use href="#icon_star" />
                            </svg>
                            <svg
                              className="review-star"
                              viewBox="0 0 9 9"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <use href="#icon_star" />
                            </svg>
                          </div>
                          <span className="reviews-note text-lowercase text-secondary ms-1">
                            8k+ reviews
                          </span>
                        </div>
                        <button
                          className="pc__btn-wl position-absolute js-add-wishlist end-0 top-0 border-0 bg-transparent"
                          title="Add To Wishlist"
                        >
                          <svg
                            width={16}
                            height={16}
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <use href="#icon_heart" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="col-6 col-md-4 col-lg-3">
                    <div className="product-card mb-md-4 mb-xxl-5 mb-3">
                      <div className="pc__img-wrapper">
                        <a href="product1_simple.html">
                          <img
                            loading="lazy"
                            src="https://picsum.photos/id/237/200/300"
                            width={330}
                            height={400}
                            alt="Cropped Faux leather Jacket"
                            className="pc__img"
                          />
                          <img
                            loading="lazy"
                            src="https://picsum.photos/200/300"
                            width={330}
                            height={400}
                            alt="Cropped Faux leather Jacket"
                            className="pc__img pc__img-second"
                          />
                        </a>
                        <button
                          className="pc__atc btn anim_appear-bottom btn position-absolute text-uppercase fw-medium js-add-cart js-open-aside border-0"
                          data-aside="cartDrawer"
                          title="Add To Cart"
                        >
                          Add To Cart
                        </button>
                      </div>
                      <div className="pc__info position-relative">
                        <p className="pc__category">Dresses</p>
                        <h6 className="pc__title">
                          <a href="product1_simple.html">Calvin Shorts</a>
                        </h6>
                        <div className="product-card__price d-flex">
                          <span className="money price">$62</span>
                        </div>
                        <button
                          className="pc__btn-wl position-absolute js-add-wishlist end-0 top-0 border-0 bg-transparent"
                          title="Add To Wishlist"
                        >
                          <svg
                            width={16}
                            height={16}
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <use href="#icon_heart" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="col-6 col-md-4 col-lg-3">
                    <div className="product-card mb-md-4 mb-xxl-5 mb-3">
                      <div className="pc__img-wrapper">
                        <a href="product1_simple.html">
                          <img
                            loading="lazy"
                            src="https://picsum.photos/200/300"
                            width={330}
                            height={400}
                            alt="Cropped Faux leather Jacket"
                            className="pc__img"
                          />
                          <img
                            loading="lazy"
                            src="https://picsum.photos/id/237/200/300"
                            width={330}
                            height={400}
                            alt="Cropped Faux leather Jacket"
                            className="pc__img pc__img-second"
                          />
                        </a>
                        <button
                          className="pc__atc btn anim_appear-bottom btn position-absolute text-uppercase fw-medium js-add-cart js-open-aside border-0"
                          data-aside="cartDrawer"
                          title="Add To Cart"
                        >
                          Add To Cart
                        </button>
                      </div>
                      <div className="pc__info position-relative">
                        <p className="pc__category">Dresses</p>
                        <h6 className="pc__title">
                          <a href="product1_simple.html">Kirby T-Shirt</a>
                        </h6>
                        <div className="product-card__price d-flex">
                          <span className="money price">$17</span>
                        </div>
                        <button
                          className="pc__btn-wl position-absolute js-add-wishlist end-0 top-0 border-0 bg-transparent"
                          title="Add To Wishlist"
                        >
                          <svg
                            width={16}
                            height={16}
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <use href="#icon_heart" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="col-6 col-md-4 col-lg-3">
                    <div className="product-card mb-md-4 mb-xxl-5 mb-3">
                      <div className="pc__img-wrapper">
                        <a href="product1_simple.html">
                          <img
                            loading="lazy"
                            src="https://picsum.photos/id/237/200/300"
                            width={330}
                            height={400}
                            alt="Cropped Faux leather Jacket"
                            className="pc__img"
                          />
                          <img
                            loading="lazy"
                            src="https://picsum.photos/200/300"
                            width={330}
                            height={400}
                            alt="Cropped Faux leather Jacket"
                            className="pc__img pc__img-second"
                          />
                        </a>
                        <button
                          className="pc__atc btn anim_appear-bottom btn position-absolute text-uppercase fw-medium js-add-cart js-open-aside border-0"
                          data-aside="cartDrawer"
                          title="Add To Cart"
                        >
                          Add To Cart
                        </button>
                      </div>
                      <div className="pc__info position-relative">
                        <p className="pc__category">Dresses</p>
                        <h6 className="pc__title">
                          <a href="product1_simple.html">Cableknit Shawl</a>
                        </h6>
                        <div className="product-card__price d-flex">
                          <span className="money price price-old">$129</span>
                          <span className="money price price-sale">$99</span>
                        </div>
                        <button
                          className="pc__btn-wl position-absolute js-add-wishlist end-0 top-0 border-0 bg-transparent"
                          title="Add To Wishlist"
                        >
                          <svg
                            width={16}
                            height={16}
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <use href="#icon_heart" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="col-6 col-md-4 col-lg-3">
                    <div className="product-card mb-md-4 mb-xxl-5 mb-3">
                      <div className="pc__img-wrapper">
                        <a href="product1_simple.html">
                          <img
                            loading="lazy"
                            src="https://picsum.photos/200/300"
                            width={330}
                            height={400}
                            alt="Cropped Faux leather Jacket"
                            className="pc__img"
                          />
                          <img
                            loading="lazy"
                            src="https://picsum.photos/id/237/200/300"
                            width={330}
                            height={400}
                            alt="Cropped Faux leather Jacket"
                            className="pc__img pc__img-second"
                          />
                        </a>
                        <button
                          className="pc__atc btn anim_appear-bottom btn position-absolute text-uppercase fw-medium js-add-cart js-open-aside border-0"
                          data-aside="cartDrawer"
                          title="Add To Cart"
                        >
                          Add To Cart
                        </button>
                      </div>
                      <div className="pc__info position-relative">
                        <p className="pc__category">Dresses</p>
                        <h6 className="pc__title">
                          <a href="product1_simple.html">Colorful Jacket</a>
                        </h6>
                        <div className="product-card__price d-flex">
                          <span className="money price">$29</span>
                        </div>
                        <button
                          className="pc__btn-wl position-absolute js-add-wishlist end-0 top-0 border-0 bg-transparent"
                          title="Add To Wishlist"
                        >
                          <svg
                            width={16}
                            height={16}
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <use href="#icon_heart" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="col-6 col-md-4 col-lg-3">
                    <div className="product-card mb-md-4 mb-xxl-5 mb-3">
                      <div className="pc__img-wrapper">
                        <a href="product1_simple.html">
                          <img
                            loading="lazy"
                            src="https://picsum.photos/id/237/200/300"
                            width={330}
                            height={400}
                            alt="Cropped Faux leather Jacket"
                            className="pc__img"
                          />
                          <img
                            loading="lazy"
                            src="https://picsum.photos/200/300"
                            width={330}
                            height={400}
                            alt="Cropped Faux leather Jacket"
                            className="pc__img pc__img-second"
                          />
                        </a>
                        <button
                          className="pc__atc btn anim_appear-bottom btn position-absolute text-uppercase fw-medium js-add-cart js-open-aside border-0"
                          data-aside="cartDrawer"
                          title="Add To Cart"
                        >
                          Add To Cart
                        </button>
                      </div>
                      <div className="pc__info position-relative">
                        <p className="pc__category">Dresses</p>
                        <h6 className="pc__title">
                          <a href="product1_simple.html">
                            Shirt In Botanical Cheetah Print
                          </a>
                        </h6>
                        <div className="product-card__price d-flex">
                          <span className="money price">$62</span>
                        </div>
                        <button
                          className="pc__btn-wl position-absolute js-add-wishlist end-0 top-0 border-0 bg-transparent"
                          title="Add To Wishlist"
                        >
                          <svg
                            width={16}
                            height={16}
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <use href="#icon_heart" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                {/* /.row */}
                <div className="mt-2 text-center">
                  <a
                    className="btn-link btn-link_lg default-underline text-uppercase fw-medium"
                    href="shop1.html"
                  >
                    See All Products
                  </a>
                </div>
              </div>
              {/* /.tab-pane fade show*/}
            </div>
            {/* /.tab-content pt-2 */}
          </section>
          {/* /.products-grid */}
          <div className="mb-xl-5 pb-xl-5 mb-3 pb-1" />
          <section
            className="deal-timer position-relative d-flex align-items-end overflow-hidden"
            style={{ backgroundColor: '#ebebeb' }}
          >
            <div
              className="background-img"
              style={{ backgroundImage: `url(${slide1})` }}
            />
            <div className="deal-timer-wrapper position-relative container">
              <div className="deal-timer__content pb-xl-5 mb-xl-3 mb-xxl-5 mb-3 pb-2">
                <p className="text_dash text-uppercase text-red fw-medium">
                  Deal of the week
                </p>
                <h3 className="h1 text-uppercase">
                  <strong>Spring</strong> Collection
                </h3>
                <a
                  href="shop1.html"
                  className="btn-link default-underline text-uppercase fw-medium mt-3"
                >
                  Shop Now
                </a>
              </div>
              <div
                className="position-relative d-flex align-items-center pt-xxl-4 js-countdown text-center"
                data-date="18-5-2024"
                data-time="06:50"
              >
                <div className="day countdown-unit">
                  <span className="countdown-num d-block" />
                  <span className="countdown-word fw-bold text-uppercase text-secondary">
                    Days
                  </span>
                </div>
                <div className="hour countdown-unit">
                  <span className="countdown-num d-block" />
                  <span className="countdown-word fw-bold text-uppercase text-secondary">
                    Hours
                  </span>
                </div>
                <div className="min countdown-unit">
                  <span className="countdown-num d-block" />
                  <span className="countdown-word fw-bold text-uppercase text-secondary">
                    Mins
                  </span>
                </div>
                <div className="sec countdown-unit">
                  <span className="countdown-num d-block" />
                  <span className="countdown-word fw-bold text-uppercase text-secondary">
                    Sec
                  </span>
                </div>
              </div>
            </div>
            {/* /.deal-timer-wrapper */}
          </section>
          {/* /.deal-timer */}
          <div className="mb-xl-5 pb-xl-5 mb-3 pb-1" />
          <section className="grid-banner container mb-3">
            <div className="row">
              <div className="col-md-6">
                <div className="grid-banner__item grid-banner__item_rect position-relative mb-3">
                  <div
                    className="background-img"
                    style={{ backgroundImage: `url(${hot_list1})` }}
                  />
                  <div className="content_abs content_bottom content_left content_bottom-lg content_left-lg">
                    <h6 className="text-uppercase fw-medium mb-3 text-white">
                      Starting At $19
                    </h6>
                    <h3 className="mb-3 text-white">Women's T-Shirts</h3>
                    <a
                      href="shop1.html"
                      className="btn-link default-underline text-uppercase fw-medium text-white"
                    >
                      Shop Now
                    </a>
                  </div>
                  {/* /.content_abs content_bottom content_left content_bottom-md content_left-md */}
                </div>
              </div>
              {/* /.col-md-6 */}
              <div className="col-md-6">
                <div className="grid-banner__item grid-banner__item_rect position-relative mb-3">
                  <div
                    className="background-img"
                    style={{ backgroundImage: `url(${hot_list2})` }}
                  />
                  <div className="content_abs content_bottom content_left content_bottom-lg content_left-lg">
                    <h6 className="text-uppercase fw-medium mb-3">
                      Starting At $39
                    </h6>
                    <h3 className="mb-3">Men's Sportswear</h3>
                    <a
                      href="shop1.html"
                      className="btn-link default-underline text-uppercase fw-medium"
                    >
                      Shop Now
                    </a>
                  </div>
                  {/* /.content_abs content_bottom content_left content_bottom-md content_left-md */}
                </div>
              </div>
              {/* /.col-md-6 */}
            </div>
            {/* /.row */}
          </section>
          {/* /.grid-banner container */}
          <div className="pb-xl-4 mb-5 pb-1" />
          <section className="products-carousel container">
            <h2 className="section-title text-uppercase pb-xl-2 mb-xl-4 mb-4 text-center">
              Limited <strong>Edition</strong>
            </h2>
            <div id="product_carousel" className="position-relative">
              <div
                className="swiper-container js-swiper-slider"
                data-settings='{
      "autoplay": {
        "delay": 5000
      },
      "slidesPerView": 4,
      "slidesPerGroup": 4,
      "effect": "none",
      "loop": true,
      "pagination": {
        "el": "#product_carousel .products-pagination",
        "type": "bullets",
        "clickable": true
      },
      "navigation": {
        "nextEl": "#product_carousel .products-carousel__next",
        "prevEl": "#product_carousel .products-carousel__prev"
      },
      "breakpoints": {
        "320": {
          "slidesPerView": 2,
          "slidesPerGroup": 2,
          "spaceBetween": 14
        },
        "768": {
          "slidesPerView": 3,
          "slidesPerGroup": 3,
          "spaceBetween": 24
        },
        "992": {
          "slidesPerView": 4,
          "slidesPerGroup": 1,
          "spaceBetween": 30
        }
      }
    }'
              >
                <div className="swiper-wrapper">
                  <div className="swiper-slide product-card">
                    <div className="pc__img-wrapper">
                      <a href="product1_simple.html">
                        <img
                          loading="lazy"
                          src="https://picsum.photos/200/300"
                          width={330}
                          height={400}
                          alt="Cropped Faux leather Jacket"
                          className="pc__img"
                        />
                      </a>
                      <button
                        className="pc__atc btn anim_appear-bottom btn position-absolute text-uppercase fw-medium js-add-cart js-open-aside border-0"
                        data-aside="cartDrawer"
                        title="Add To Cart"
                      >
                        Add To Cart
                      </button>
                    </div>
                    <div className="pc__info position-relative">
                      <p className="pc__category">Dresses</p>
                      <h6 className="pc__title">
                        <a href="product1_simple.html">Hub Accent Mirror</a>
                      </h6>
                      <div className="product-card__price d-flex">
                        <span className="money price">$17</span>
                      </div>
                      <button
                        className="pc__btn-wl position-absolute js-add-wishlist end-0 top-0 border-0 bg-transparent"
                        title="Add To Wishlist"
                      >
                        <svg
                          width={16}
                          height={16}
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <use href="#icon_heart" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className="swiper-slide product-card">
                    <div className="pc__img-wrapper">
                      <a href="product1_simple.html">
                        <img
                          loading="lazy"
                          src="https://picsum.photos/200/300"
                          width={330}
                          height={400}
                          alt="Cropped Faux leather Jacket"
                          className="pc__img"
                        />
                      </a>
                      <button
                        className="pc__atc btn anim_appear-bottom btn position-absolute text-uppercase fw-medium js-add-cart js-open-aside border-0"
                        data-aside="cartDrawer"
                        title="Add To Cart"
                      >
                        Add To Cart
                      </button>
                    </div>
                    <div className="pc__info position-relative">
                      <p className="pc__category">Dresses</p>
                      <h6 className="pc__title">
                        <a href="product1_simple.html">Hosking Blue Area Rug</a>
                      </h6>
                      <div className="product-card__price d-flex">
                        <span className="money price">$29</span>
                      </div>
                      <div className="product-card__review d-flex align-items-center">
                        <div className="reviews-group d-flex">
                          <svg
                            className="review-star"
                            viewBox="0 0 9 9"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <use href="#icon_star" />
                          </svg>
                          <svg
                            className="review-star"
                            viewBox="0 0 9 9"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <use href="#icon_star" />
                          </svg>
                          <svg
                            className="review-star"
                            viewBox="0 0 9 9"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <use href="#icon_star" />
                          </svg>
                          <svg
                            className="review-star"
                            viewBox="0 0 9 9"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <use href="#icon_star" />
                          </svg>
                          <svg
                            className="review-star"
                            viewBox="0 0 9 9"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <use href="#icon_star" />
                          </svg>
                        </div>
                        <span className="reviews-note text-lowercase text-secondary ms-1">
                          8k+ reviews
                        </span>
                      </div>
                      <button
                        className="pc__btn-wl position-absolute js-add-wishlist end-0 top-0 border-0 bg-transparent"
                        title="Add To Wishlist"
                      >
                        <svg
                          width={16}
                          height={16}
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <use href="#icon_heart" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className="swiper-slide product-card">
                    <div className="pc__img-wrapper">
                      <a href="product1_simple.html">
                        <img
                          loading="lazy"
                          src="https://picsum.photos/200/300"
                          width={330}
                          height={400}
                          alt="Cropped Faux leather Jacket"
                          className="pc__img"
                        />
                      </a>
                      <button
                        className="pc__atc btn anim_appear-bottom btn position-absolute text-uppercase fw-medium js-add-cart js-open-aside border-0"
                        data-aside="cartDrawer"
                        title="Add To Cart"
                      >
                        Add To Cart
                      </button>
                    </div>
                    <div className="pc__info position-relative">
                      <p className="pc__category">Dresses</p>
                      <h6 className="pc__title">
                        <a href="product1_simple.html">Hanneman Pouf</a>
                      </h6>
                      <div className="product-card__price d-flex">
                        <span className="money price">$62</span>
                      </div>
                      <button
                        className="pc__btn-wl position-absolute js-add-wishlist end-0 top-0 border-0 bg-transparent"
                        title="Add To Wishlist"
                      >
                        <svg
                          width={16}
                          height={16}
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <use href="#icon_heart" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className="swiper-slide product-card">
                    <div className="pc__img-wrapper">
                      <a href="product1_simple.html">
                        <img
                          loading="lazy"
                          src="https://picsum.photos/200/300"
                          width={330}
                          height={400}
                          alt="Cropped Faux leather Jacket"
                          className="pc__img"
                        />
                      </a>
                      <button
                        className="pc__atc btn anim_appear-bottom btn position-absolute text-uppercase fw-medium js-add-cart js-open-aside border-0"
                        data-aside="cartDrawer"
                        title="Add To Cart"
                      >
                        Add To Cart
                      </button>
                    </div>
                    <div className="pc__info position-relative">
                      <p className="pc__category">Dresses</p>
                      <h6 className="pc__title">
                        <a href="product1_simple.html">
                          Cushion Futon Slipcover
                        </a>
                      </h6>
                      <div className="product-card__price d-flex">
                        <span className="money price">$62</span>
                      </div>
                      <button
                        className="pc__btn-wl position-absolute js-add-wishlist end-0 top-0 border-0 bg-transparent"
                        title="Add To Wishlist"
                      >
                        <svg
                          width={16}
                          height={16}
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <use href="#icon_heart" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
                {/* /.swiper-wrapper */}
              </div>
              {/* /.swiper-container js-swiper-slider */}
              <div className="products-carousel__prev position-absolute top-50 d-flex align-items-center justify-content-center">
                <svg
                  width={25}
                  height={25}
                  viewBox="0 0 25 25"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <use href="#icon_prev_md" />
                </svg>
              </div>
              {/* /.products-carousel__prev */}
              <div className="products-carousel__next position-absolute top-50 d-flex align-items-center justify-content-center">
                <svg
                  width={25}
                  height={25}
                  viewBox="0 0 25 25"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <use href="#icon_next_md" />
                </svg>
              </div>
              {/* /.products-carousel__next */}
              <div className="products-pagination d-flex align-items-center justify-content-center mb-5 mt-4" />
              {/* /.products-pagination */}
            </div>
            {/* /.position-relative */}
          </section>
          {/* /.products-carousel container */}
          <section className="instagram container">
            <h2 className="section-title text-uppercase pb-xl-2 mb-xl-4 mb-4 text-center">
              @UOMO
            </h2>
            <div className="row row-cols-3 row-cols-md-4 row-cols-xl-6">
              <div className="instagram__tile">
                <a
                  href="https://instagram.com/"
                  target="_blank"
                  className="position-relative d-block effect overlay-plus overflow-hidden"
                >
                  <img
                    loading="lazy"
                    className="instagram__img"
                    src={inta}
                    width={230}
                    height={230}
                    alt="Insta image 1"
                  />
                </a>
              </div>
              <div className="instagram__tile">
                <a
                  href="https://instagram.com/"
                  target="_blank"
                  className="position-relative d-block effect overlay-plus overflow-hidden"
                >
                  <img
                    loading="lazy"
                    className="instagram__img"
                    src={inta}
                    width={230}
                    height={230}
                    alt="Insta image 2"
                  />
                </a>
              </div>
              <div className="instagram__tile">
                <a
                  href="https://instagram.com/"
                  target="_blank"
                  className="position-relative d-block effect overlay-plus overflow-hidden"
                >
                  <img
                    loading="lazy"
                    className="instagram__img"
                    src={inta}
                    width={230}
                    height={230}
                    alt="Insta image 3"
                  />
                </a>
              </div>
              <div className="instagram__tile">
                <a
                  href="https://instagram.com/"
                  target="_blank"
                  className="position-relative d-block effect overlay-plus overflow-hidden"
                >
                  <img
                    loading="lazy"
                    className="instagram__img"
                    src={inta}
                    width={230}
                    height={230}
                    alt="Insta image 4"
                  />
                </a>
              </div>
              <div className="instagram__tile">
                <a
                  href="https://instagram.com/"
                  target="_blank"
                  className="position-relative d-block effect overlay-plus overflow-hidden"
                >
                  <img
                    loading="lazy"
                    className="instagram__img"
                    src={inta}
                    width={230}
                    height={230}
                    alt="Insta image 5"
                  />
                </a>
              </div>
              <div className="instagram__tile">
                <a
                  href="https://instagram.com/"
                  target="_blank"
                  className="position-relative d-block effect overlay-plus overflow-hidden"
                >
                  <img
                    loading="lazy"
                    className="instagram__img"
                    src={inta}
                    width={230}
                    height={230}
                    alt="Insta image 6"
                  />
                </a>
              </div>
              <div className="instagram__tile">
                <a
                  href="https://instagram.com/"
                  target="_blank"
                  className="position-relative d-block effect overlay-plus overflow-hidden"
                >
                  <img
                    loading="lazy"
                    className="instagram__img"
                    src={inta}
                    width={230}
                    height={230}
                    alt="Insta image 7"
                  />
                </a>
              </div>
              <div className="instagram__tile">
                <a
                  href="https://instagram.com/"
                  target="_blank"
                  className="position-relative d-block effect overlay-plus overflow-hidden"
                >
                  <img
                    loading="lazy"
                    className="instagram__img"
                    src={inta}
                    width={230}
                    height={230}
                    alt="Insta image 8"
                  />
                </a>
              </div>
              <div className="instagram__tile">
                <a
                  href="https://instagram.com/"
                  target="_blank"
                  className="position-relative d-block effect overlay-plus overflow-hidden"
                >
                  <img
                    loading="lazy"
                    className="instagram__img"
                    src={inta}
                    width={230}
                    height={230}
                    alt="Insta image 9"
                  />
                </a>
              </div>
              <div className="instagram__tile">
                <a
                  href="https://instagram.com/"
                  target="_blank"
                  className="position-relative d-block effect overlay-plus overflow-hidden"
                >
                  <img
                    loading="lazy"
                    className="instagram__img"
                    src={inta}
                    width={230}
                    height={230}
                    alt="Insta image 10"
                  />
                </a>
              </div>
              <div className="instagram__tile">
                <a
                  href="https://instagram.com/"
                  target="_blank"
                  className="position-relative d-block effect overlay-plus overflow-hidden"
                >
                  <img
                    loading="lazy"
                    className="instagram__img"
                    src={inta}
                    width={230}
                    height={230}
                    alt="Insta image 11"
                  />
                </a>
              </div>
              <div className="instagram__tile">
                <a
                  href="https://instagram.com/"
                  target="_blank"
                  className="position-relative d-block effect overlay-plus overflow-hidden"
                >
                  <img
                    loading="lazy"
                    className="instagram__img"
                    src={inta}
                    width={230}
                    height={230}
                    alt="Insta image 12"
                  />
                </a>
              </div>
            </div>
          </section>
          {/* /.instagram container */}
          <div className="pb-xl-5 mb-xl-5 mb-4 pb-4" />
          <section className="service-promotion mb-md-4 pb-md-4 mb-xl-5 container">
            <div className="row">
              <div className="col-md-4 mb-md-0 mb-5 text-center">
                <div className="service-promotion__icon mb-4">
                  <svg
                    width={52}
                    height={52}
                    viewBox="0 0 52 52"
                    fill="none"
                    xmlns="https://picsum.photos/200/300"
                  >
                    <use href="#icon_shipping" />
                  </svg>
                </div>
                <h3 className="service-promotion__title h5 text-uppercase">
                  Fast And Free Delivery
                </h3>
                <p className="service-promotion__content text-secondary">
                  Free delivery for all orders over $140
                </p>
              </div>
              {/* /.col-md-4 text-center*/}
              <div className="col-md-4 mb-md-0 mb-5 text-center">
                <div className="service-promotion__icon mb-4">
                  <svg
                    width={53}
                    height={52}
                    viewBox="0 0 53 52"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <use href="#icon_headphone" />
                  </svg>
                </div>
                <h3 className="service-promotion__title h5 text-uppercase">
                  24/7 Customer Support
                </h3>
                <p className="service-promotion__content text-secondary">
                  Friendly 24/7 customer support
                </p>
              </div>
              {/* /.col-md-4 text-center*/}
              <div className="col-md-4 mb-md-0 mb-4 pb-1 text-center">
                <div className="service-promotion__icon mb-4">
                  <svg
                    width={52}
                    height={52}
                    viewBox="0 0 52 52"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <use href="#icon_shield" />
                  </svg>
                </div>
                <h3 className="service-promotion__title h5 text-uppercase">
                  Money Back Guarantee
                </h3>
                <p className="service-promotion__content text-secondary">
                  We return money within 30 days
                </p>
              </div>
              {/* /.col-md-4 text-center*/}
            </div>
            {/* /.row */}
          </section>
          {/* /.service-promotion container */}
        </main>
        {/* Footer Type 1 */}
        <footer className="footer footer_type_1">
          <div className="footer-middle container">
            <div className="row row-cols-lg-5 row-cols-2">
              <div className="footer-column footer-store-info col-12 mb-lg-0 mb-4">
                <div className="logo">
                  <a href="index.html">
                    <img
                      src="../images/logo.png"
                      alt="Uomo"
                      className="logo__image d-block"
                    />
                  </a>
                </div>
                {/* /.logo */}
                <p className="footer-address">
                  1418 River Drive, Suite 35 Cottonhall, CA 9622 United States
                </p>
                <p className="m-0">
                  <strong className="fw-medium">sale@uomo.com</strong>
                </p>
                <p>
                  <strong className="fw-medium">+1 246-345-0695</strong>
                </p>
                <ul className="social-links list-unstyled d-flex mb-0 flex-wrap">
                  <li>
                    <a
                      href="https://facebook.com/"
                      className="footer__social-link d-block"
                    >
                      <svg
                        className="svg-icon svg-icon_facebook"
                        width={9}
                        height={15}
                        viewBox="0 0 9 15"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <use href="#icon_facebook" />
                      </svg>
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://twitter.com/"
                      className="footer__social-link d-block"
                    >
                      <svg
                        className="svg-icon svg-icon_twitter"
                        width={14}
                        height={13}
                        viewBox="0 0 14 13"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <use href="#icon_twitter" />
                      </svg>
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://instagram.com/"
                      className="footer__social-link d-block"
                    >
                      <svg
                        className="svg-icon svg-icon_instagram"
                        width={14}
                        height={13}
                        viewBox="0 0 14 13"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <use href="#icon_instagram" />
                      </svg>
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://youtube.com/"
                      className="footer__social-link d-block"
                    >
                      <svg
                        className="svg-icon svg-icon_youtube"
                        width={16}
                        height={11}
                        viewBox="0 0 16 11"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M15.0117 1.8584C14.8477 1.20215 14.3281 0.682617 13.6992 0.518555C12.5234 0.19043 7.875 0.19043 7.875 0.19043C7.875 0.19043 3.19922 0.19043 2.02344 0.518555C1.39453 0.682617 0.875 1.20215 0.710938 1.8584C0.382812 3.00684 0.382812 5.46777 0.382812 5.46777C0.382812 5.46777 0.382812 7.90137 0.710938 9.07715C0.875 9.7334 1.39453 10.2256 2.02344 10.3896C3.19922 10.6904 7.875 10.6904 7.875 10.6904C7.875 10.6904 12.5234 10.6904 13.6992 10.3896C14.3281 10.2256 14.8477 9.7334 15.0117 9.07715C15.3398 7.90137 15.3398 5.46777 15.3398 5.46777C15.3398 5.46777 15.3398 3.00684 15.0117 1.8584ZM6.34375 7.68262V3.25293L10.2266 5.46777L6.34375 7.68262Z" />
                      </svg>
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://pinterest.com/"
                      className="footer__social-link d-block"
                    >
                      <svg
                        className="svg-icon svg-icon_pinterest"
                        width={14}
                        height={15}
                        viewBox="0 0 14 15"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <use href="#icon_pinterest" />
                      </svg>
                    </a>
                  </li>
                </ul>
              </div>
              {/* /.footer-column */}
              <div className="footer-column footer-menu mb-lg-0 mb-4">
                <h5 className="sub-menu__title text-uppercase">Company</h5>
                <ul className="sub-menu__list list-unstyled">
                  <li className="sub-menu__item">
                    <a href="about.html" className="menu-link menu-link_us-s">
                      About Us
                    </a>
                  </li>
                  <li className="sub-menu__item">
                    <a href="about.html" className="menu-link menu-link_us-s">
                      Careers
                    </a>
                  </li>
                  <li className="sub-menu__item">
                    <a href="about.html" className="menu-link menu-link_us-s">
                      Affiliates
                    </a>
                  </li>
                  <li className="sub-menu__item">
                    <a
                      href="blog_list1.html"
                      className="menu-link menu-link_us-s"
                    >
                      Blog
                    </a>
                  </li>
                  <li className="sub-menu__item">
                    <a href="contact.html" className="menu-link menu-link_us-s">
                      Contact Us
                    </a>
                  </li>
                </ul>
              </div>
              {/* /.footer-column */}
              <div className="footer-column footer-menu mb-lg-0 mb-4">
                <h5 className="sub-menu__title text-uppercase">Shop</h5>
                <ul className="sub-menu__list list-unstyled">
                  <li className="sub-menu__item">
                    <a href="shop2.html" className="menu-link menu-link_us-s">
                      New Arrivals
                    </a>
                  </li>
                  <li className="sub-menu__item">
                    <a href="shop3.html" className="menu-link menu-link_us-s">
                      Accessories
                    </a>
                  </li>
                  <li className="sub-menu__item">
                    <a href="shop4.html" className="menu-link menu-link_us-s">
                      Men
                    </a>
                  </li>
                  <li className="sub-menu__item">
                    <a href="shop5.html" className="menu-link menu-link_us-s">
                      Women
                    </a>
                  </li>
                  <li className="sub-menu__item">
                    <a href="shop1.html" className="menu-link menu-link_us-s">
                      Shop All
                    </a>
                  </li>
                </ul>
              </div>
              {/* /.footer-column */}
              <div className="footer-column footer-menu mb-lg-0 mb-4">
                <h5 className="sub-menu__title text-uppercase">Help</h5>
                <ul className="sub-menu__list list-unstyled">
                  <li className="sub-menu__item">
                    <a href="about.html" className="menu-link menu-link_us-s">
                      Customer Service
                    </a>
                  </li>
                  <li className="sub-menu__item">
                    <a
                      href="account_dashboard.html"
                      className="menu-link menu-link_us-s"
                    >
                      My Account
                    </a>
                  </li>
                  <li className="sub-menu__item">
                    <a
                      href="store_location.html"
                      className="menu-link menu-link_us-s"
                    >
                      Find a Store
                    </a>
                  </li>
                  <li className="sub-menu__item">
                    <a href="terms.html" className="menu-link menu-link_us-s">
                      Legal &amp; Privacy
                    </a>
                  </li>
                  <li className="sub-menu__item">
                    <a href="contact.html" className="menu-link menu-link_us-s">
                      Contact
                    </a>
                  </li>
                  <li className="sub-menu__item">
                    <a href="about.html" className="menu-link menu-link_us-s">
                      Gift Card
                    </a>
                  </li>
                </ul>
              </div>
              {/* /.footer-column */}
              <div className="footer-column footer-newsletter col-12 mb-lg-0 mb-4">
                <h5 className="sub-menu__title text-uppercase">Subscribe</h5>
                <p>
                  Be the first to get the latest news about trends, promotions,
                  and much more!
                </p>
                <form
                  action="https://uomo-html.flexkitux.com/Demo1/index.html"
                  className="footer-newsletter__form position-relative bg-body"
                >
                  <input
                    className="form-control border-white"
                    type="email"
                    name="email"
                    placeholder="Your email address"
                  />
                  <input
                    className="btn-link fw-medium position-absolute h-100 end-0 top-0 bg-white"
                    type="submit"
                    defaultValue="JOIN"
                  />
                </form>
                <div className="mt-4 pt-3">
                  <strong className="fw-medium">Secure payments</strong>
                  <p className="mt-2">
                    <img
                      loading="lazy"
                      src="../images/payment-options.png"
                      alt="Acceptable payment gateways"
                      className="mw-100"
                    />
                  </p>
                </div>
              </div>
              {/* /.footer-column */}
            </div>
            {/* /.row-cols-5 */}
          </div>
          {/* /.footer-middle container */}
          <div className="footer-bottom container">
            <div className="d-block d-md-flex align-items-center">
              <span className="footer-copyright me-auto">©2023 Uomo</span>
              <div className="footer-settings d-block d-md-flex align-items-center">
                <div className="d-flex align-items-center">
                  <label
                    htmlFor="footerSettingsLanguage"
                    className="text-secondary me-2"
                  >
                    Language
                  </label>
                  <select
                    id="footerSettingsLanguage"
                    className="form-select form-select-sm bg-transparent"
                    aria-label="Default select example"
                    name="store-language"
                  >
                    <option className="footer-select__option" selected>
                      United Kingdom | English
                    </option>
                    <option className="footer-select__option" value={1}>
                      United States | English
                    </option>
                    <option className="footer-select__option" value={2}>
                      German
                    </option>
                    <option className="footer-select__option" value={3}>
                      French
                    </option>
                    <option className="footer-select__option" value={4}>
                      Swedish
                    </option>
                  </select>
                </div>
                <div className="d-flex align-items-center">
                  <label
                    htmlFor="footerSettingsCurrency"
                    className="ms-md-3 text-secondary me-2"
                  >
                    Currency
                  </label>
                  <select
                    id="footerSettingsCurrency"
                    className="form-select form-select-sm bg-transparent"
                    aria-label="Default select example"
                    name="store-language"
                  >
                    <option selected>$ USD</option>
                    <option value={1}>£ GBP</option>
                    <option value={2}>€ EURO</option>
                  </select>
                </div>
              </div>
              {/* /.footer-settings */}
            </div>
            {/* /.d-flex */}
          </div>
          {/* /.footer-bottom container */}
        </footer>
        {/* /.footer footer_type_1 */}
        {/* End Footer Type 1 */}
      </div>
      <div>
        {/* Customer Login Form */}
        <div
          className="aside aside_right customer-forms overflow-hidden"
          id="customerForms"
        >
          <div className="customer-forms__wrapper d-flex position-relative">
            <div className="customer__login">
              <div className="aside-header d-flex align-items-center">
                <h3 className="text-uppercase fs-6 mb-0">Login</h3>
                <button className="btn-close-lg js-close-aside ms-auto" />
              </div>
              {/* /.aside-header */}
              <form
                action="https://uomo-html.flexkitux.com/Demo1/login_register.html"
                method="POST"
                className="aside-content"
              >
                <div className="form-floating mb-3">
                  <input
                    name="email"
                    type="email"
                    className="form-control form-control_gray"
                    id="customerNameEmailInput"
                    placeholder="name@example.com"
                  />
                  <label htmlFor="customerNameEmailInput">
                    Username or email address *
                  </label>
                </div>
                <div className="pb-3" />
                <div className="form-label-fixed mb-3">
                  <label htmlFor="customerPasswordInput" className="form-label">
                    Password *
                  </label>
                  <input
                    name="password"
                    id="customerPasswordInput"
                    className="form-control form-control_gray"
                    type="password"
                    placeholder="********"
                  />
                </div>
                <div className="d-flex align-items-center mb-3 pb-2">
                  <div className="form-check mb-0">
                    <input
                      name="remember"
                      className="form-check-input form-check-input_fill"
                      type="checkbox"
                      defaultValue
                      id="flexCheckDefault"
                    />
                    <label
                      className="form-check-label text-secondary"
                      htmlFor="flexCheckDefault"
                    >
                      Remember me
                    </label>
                  </div>
                  <a href="reset_password.html" className="btn-text ms-auto">
                    Lost password?
                  </a>
                </div>
                <button
                  className="btn btn-primary w-100 text-uppercase"
                  type="submit"
                >
                  Log In
                </button>
                <div className="customer-option mt-4 text-center">
                  <span className="text-secondary">No account yet?</span>
                  <a
                    href="login_register.html#register-tab"
                    className="btn-text js-show-register"
                  >
                    Create Account
                  </a>
                </div>
              </form>
            </div>
            {/* /.customer__login */}
            <div className="customer__register">
              <div className="aside-header d-flex align-items-center">
                <h3 className="text-uppercase fs-6 mb-0">Create an account</h3>
                <button className="btn-close-lg js-close-aside btn-close-aside ms-auto" />
              </div>
              {/* /.aside-header */}
              <form
                action="https://uomo-html.flexkitux.com/Demo1/login_register.html"
                method="POST"
                className="aside-content"
              >
                <div className="form-floating mb-4">
                  <input
                    name="username"
                    type="text"
                    className="form-control form-control_gray"
                    id="registerUserNameInput"
                    placeholder="Username"
                  />
                  <label htmlFor="registerUserNameInput">Username</label>
                </div>
                <div className="pb-1" />
                <div className="form-floating mb-4">
                  <input
                    name="email"
                    type="email"
                    className="form-control form-control_gray"
                    id="registerUserEmailInput"
                    placeholder="user@company.com"
                  />
                  <label htmlFor="registerUserEmailInput">
                    Email address *
                  </label>
                </div>
                <div className="pb-1" />
                <div className="form-label-fixed mb-4">
                  <label htmlFor="registerPasswordInput" className="form-label">
                    Password *
                  </label>
                  <input
                    name="password"
                    id="registerPasswordInput"
                    className="form-control form-control_gray"
                    type="password"
                    placeholder="*******"
                  />
                </div>
                <p className="text-secondary mb-4">
                  Your personal data will be used to support your experience
                  throughout this website, to manage access to your account, and
                  for other purposes described in our privacy policy.
                </p>
                <button
                  className="btn btn-primary w-100 text-uppercase"
                  type="submit"
                >
                  Register
                </button>
                <div className="customer-option mt-4 text-center">
                  <span className="text-secondary">Already have account?</span>
                  <a href="#" className="btn-text js-show-login">
                    Login
                  </a>
                </div>
              </form>
            </div>
            {/* /.customer__register */}
          </div>
          {/* /.customer-forms__wrapper */}
        </div>
        {/* /.aside aside_right */}
        {/* Cart Drawer */}
        <div
          className="aside aside_right cart-drawer overflow-hidden"
          id="cartDrawer"
        >
          <div className="aside-header d-flex align-items-center">
            <h3 className="text-uppercase fs-6 mb-0">
              SHOPPING BAG ({' '}
              <span className="cart-amount js-cart-items-count">1</span> ){' '}
            </h3>
            <button className="btn-close-lg js-close-aside btn-close-aside ms-auto" />
          </div>
          {/* /.aside-header */}
          <div className="aside-content cart-drawer-items-list">
            <div className="cart-drawer-item d-flex position-relative">
              <div className="position-relative">
                <a href="product1_simple.html">
                  <img
                    loading="lazy"
                    className="cart-drawer-item__img"
                    src="../images/cart-item-1.jpg"
                    alt
                  />
                </a>
              </div>
              <div className="cart-drawer-item__info flex-grow-1">
                <h6 className="cart-drawer-item__title fw-normal">
                  <a href="product1_simple.html">Zessi Dresses</a>
                </h6>
                <p className="cart-drawer-item__option text-secondary">
                  Color: Yellow
                </p>
                <p className="cart-drawer-item__option text-secondary">
                  Size: L
                </p>
                <div className="d-flex align-items-center justify-content-between mt-1">
                  <div className="qty-control position-relative">
                    <input
                      type="number"
                      name="quantity"
                      defaultValue={1}
                      min={1}
                      className="qty-control__number border-0 text-center"
                    />
                    <div className="qty-control__reduce text-start">-</div>
                    <div className="qty-control__increase text-end">+</div>
                  </div>
                  {/* .qty-control */}
                  <span className="cart-drawer-item__price money price">
                    $99
                  </span>
                </div>
              </div>
              <button className="btn-close-xs position-absolute js-cart-item-remove end-0 top-0" />
            </div>
            {/* /.cart-drawer-item d-flex */}
            <hr className="cart-drawer-divider" />
            <div className="cart-drawer-item d-flex position-relative">
              <div className="position-relative">
                <a href="product1_simple.html">
                  <img
                    loading="lazy"
                    className="cart-drawer-item__img"
                    src="../images/cart-item-2.jpg"
                    alt
                  />
                </a>
              </div>
              <div className="cart-drawer-item__info flex-grow-1">
                <h6 className="cart-drawer-item__title fw-normal">
                  <a href="product1_simple.html">Kirby T-Shirt</a>
                </h6>
                <p className="cart-drawer-item__option text-secondary">
                  Color: Black
                </p>
                <p className="cart-drawer-item__option text-secondary">
                  Size: XS
                </p>
                <div className="d-flex align-items-center justify-content-between mt-1">
                  <div className="qty-control position-relative">
                    <input
                      type="number"
                      name="quantity"
                      defaultValue={4}
                      min={1}
                      className="qty-control__number border-0 text-center"
                    />
                    <div className="qty-control__reduce text-start">-</div>
                    <div className="qty-control__increase text-end">+</div>
                  </div>
                  {/* .qty-control */}
                  <span className="cart-drawer-item__price money price">
                    $89
                  </span>
                </div>
              </div>
              <button className="btn-close-xs position-absolute js-cart-item-remove end-0 top-0" />
            </div>
            {/* /.cart-drawer-item d-flex */}
            <hr className="cart-drawer-divider" />
            <div className="cart-drawer-item d-flex position-relative">
              <div className="position-relative">
                <a href="product1_simple.html">
                  <img
                    loading="lazy"
                    className="cart-drawer-item__img"
                    src="../images/cart-item-3.jpg"
                    alt
                  />
                </a>
              </div>
              <div className="cart-drawer-item__info flex-grow-1">
                <h6 className="cart-drawer-item__title fw-normal">
                  <a href="product1_simple.html">Cableknit Shawl</a>
                </h6>
                <p className="cart-drawer-item__option text-secondary">
                  Color: Green
                </p>
                <p className="cart-drawer-item__option text-secondary">
                  Size: L
                </p>
                <div className="d-flex align-items-center justify-content-between mt-1">
                  <div className="qty-control position-relative">
                    <input
                      type="number"
                      name="quantity"
                      defaultValue={3}
                      min={1}
                      className="qty-control__number border-0 text-center"
                    />
                    <div className="qty-control__reduce text-start">-</div>
                    <div className="qty-control__increase text-end">+</div>
                  </div>
                  {/* .qty-control */}
                  <span className="cart-drawer-item__price money price">
                    $129
                  </span>
                </div>
              </div>
              <button className="btn-close-xs position-absolute js-cart-item-remove end-0 top-0" />
            </div>
            {/* /.cart-drawer-item d-flex */}
          </div>
          {/* /.aside-content */}
          <div className="cart-drawer-actions position-absolute w-100 bottom-0 start-0">
            <hr className="cart-drawer-divider" />
            <div className="d-flex justify-content-between">
              <h6 className="fs-base fw-medium">SUBTOTAL:</h6>
              <span className="cart-subtotal fw-medium">$176.00</span>
            </div>
            {/* /.d-flex justify-content-between */}
            <a href="shop_cart.html" className="btn btn-light d-block mt-3">
              View Cart
            </a>
            <a
              href="shop_checkout.html"
              className="btn btn-primary d-block mt-3"
            >
              Checkout
            </a>
          </div>
          {/* /.aside-content */}
        </div>
        {/* /.aside */}
        {/* Sitemap */}
        <div className="modal fade" id="siteMap" tabIndex={-1}>
          <div className="modal-dialog modal-fullscreen">
            <div className="sitemap d-flex">
              <div className="w-50 d-none d-lg-block">
                <img
                  loading="lazy"
                  src="../images/nav-bg.jpg"
                  alt="Site map"
                  className="sitemap__bg"
                />
              </div>
              {/* /.sitemap__bg w-50 d-none d-lg-block */}
              <div className="sitemap__links w-50 flex-grow-1">
                <div className="modal-content">
                  <div className="modal-header">
                    <ul className="nav nav-pills" id="pills-tab" role="tablist">
                      <li className="nav-item" role="presentation">
                        <a
                          className="nav-link active rounded-1 text-uppercase"
                          id="pills-item-1-tab"
                          data-bs-toggle="pill"
                          href="#pills-item-1"
                          role="tab"
                          aria-controls="pills-item-1"
                          aria-selected="true"
                        >
                          WOMEN
                        </a>
                      </li>
                      <li className="nav-item" role="presentation">
                        <a
                          className="nav-link rounded-1 text-uppercase"
                          id="pills-item-2-tab"
                          data-bs-toggle="pill"
                          href="#pills-item-2"
                          role="tab"
                          aria-controls="pills-item-2"
                          aria-selected="false"
                        >
                          MEN
                        </a>
                      </li>
                      <li className="nav-item" role="presentation">
                        <a
                          className="nav-link rounded-1 text-uppercase"
                          id="pills-item-3-tab"
                          data-bs-toggle="pill"
                          href="#pills-item-3"
                          role="tab"
                          aria-controls="pills-item-3"
                          aria-selected="false"
                        >
                          KIDS
                        </a>
                      </li>
                    </ul>
                    <button
                      type="button"
                      className="btn-close-lg"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    />
                  </div>
                  <div className="modal-body">
                    <div className="tab-content col-12" id="pills-tabContent">
                      <div
                        className="tab-pane fade show active"
                        id="pills-item-1"
                        role="tabpanel"
                        aria-labelledby="pills-item-1-tab"
                      >
                        <div className="row">
                          <ul
                            className="nav nav-tabs list-unstyled col-5 d-block"
                            id="myTab"
                            role="tablist"
                          >
                            <li
                              className="nav-item position-relative"
                              role="presentation"
                            >
                              <a
                                className="nav-link nav-link_rline active"
                                id="tab-item-1-tab"
                                data-bs-toggle="tab"
                                href="#tab-item-1"
                                role="tab"
                                aria-controls="tab-item-1"
                                aria-selected="true"
                              >
                                <span className="rline-content">WOMEN</span>
                              </a>
                            </li>
                            <li
                              className="nav-item position-relative"
                              role="presentation"
                            >
                              <a
                                className="nav-link nav-link_rline"
                                id="tab-item-2-tab"
                                data-bs-toggle="tab"
                                href="#tab-item-2"
                                role="tab"
                                aria-controls="tab-item-2"
                                aria-selected="false"
                              >
                                <span className="rline-content">MAN</span>
                              </a>
                            </li>
                            <li
                              className="nav-item position-relative"
                              role="presentation"
                            >
                              <a
                                className="nav-link nav-link_rline"
                                id="tab-item-3-tab"
                                data-bs-toggle="tab"
                                href="#tab-item-3"
                                role="tab"
                                aria-controls="tab-item-3"
                                aria-selected="false"
                              >
                                <span className="rline-content">KIDS</span>
                              </a>
                            </li>
                            <li
                              className="nav-item position-relative"
                              role="presentation"
                            >
                              <a className="nav-link nav-link_rline" href="#">
                                <span className="rline-content">HOME</span>
                              </a>
                            </li>
                            <li
                              className="nav-item position-relative"
                              role="presentation"
                            >
                              <a className="nav-link nav-link_rline" href="#">
                                <span className="rline-content">
                                  COLLECTION
                                </span>
                              </a>
                            </li>
                            <li
                              className="nav-item position-relative"
                              role="presentation"
                            >
                              <a
                                className="nav-link nav-link_rline text-red"
                                href="#"
                              >
                                SALE UP TO 50% OFF
                              </a>
                            </li>
                            <li
                              className="nav-item position-relative"
                              role="presentation"
                            >
                              <a className="nav-link nav-link_rline" href="#">
                                <span className="rline-content">NEW</span>
                              </a>
                            </li>
                            <li
                              className="nav-item position-relative"
                              role="presentation"
                            >
                              <a className="nav-link nav-link_rline" href="#">
                                <span className="rline-content">SHOES</span>
                              </a>
                            </li>
                            <li
                              className="nav-item position-relative"
                              role="presentation"
                            >
                              <a className="nav-link nav-link_rline" href="#">
                                <span className="rline-content">
                                  ACCESSORIES
                                </span>
                              </a>
                            </li>
                            <li
                              className="nav-item position-relative"
                              role="presentation"
                            >
                              <a className="nav-link nav-link_rline" href="#">
                                <span className="rline-content">JOIN LIFE</span>
                              </a>
                            </li>
                            <li
                              className="nav-item position-relative"
                              role="presentation"
                            >
                              <a className="nav-link nav-link_rline" href="#">
                                <span className="rline-content">
                                  #UOMOSTYLE
                                </span>
                              </a>
                            </li>
                          </ul>
                          <div className="tab-content col-7" id="myTabContent">
                            <div
                              className="tab-pane fade show active"
                              id="tab-item-1"
                              role="tabpanel"
                              aria-labelledby="tab-item-1-tab"
                            >
                              <ul className="sub-menu list-unstyled">
                                <li className="sub-menu__item">
                                  <a
                                    href="#"
                                    className="menu-link menu-link_us-s"
                                  >
                                    New
                                  </a>
                                </li>
                                <li className="sub-menu__item">
                                  <a
                                    href="#"
                                    className="menu-link menu-link_us-s"
                                  >
                                    Best Sellers
                                  </a>
                                </li>
                                <li className="sub-menu__item">
                                  <a
                                    href="#"
                                    className="menu-link menu-link_us-s"
                                  >
                                    Collaborations®
                                  </a>
                                </li>
                                <li className="sub-menu__item">
                                  <a
                                    href="#"
                                    className="menu-link menu-link_us-s"
                                  >
                                    Sets
                                  </a>
                                </li>
                                <li className="sub-menu__item">
                                  <a
                                    href="#"
                                    className="menu-link menu-link_us-s"
                                  >
                                    Denim
                                  </a>
                                </li>
                                <li className="sub-menu__item">
                                  <a
                                    href="#"
                                    className="menu-link menu-link_us-s"
                                  >
                                    Jackets &amp; Coats
                                  </a>
                                </li>
                                <li className="sub-menu__item">
                                  <a
                                    href="#"
                                    className="menu-link menu-link_us-s"
                                  >
                                    Overshirts
                                  </a>
                                </li>
                                <li className="sub-menu__item">
                                  <a
                                    href="#"
                                    className="menu-link menu-link_us-s"
                                  >
                                    Trousers
                                  </a>
                                </li>
                                <li className="sub-menu__item">
                                  <a
                                    href="#"
                                    className="menu-link menu-link_us-s"
                                  >
                                    Jeans
                                  </a>
                                </li>
                                <li className="sub-menu__item">
                                  <a
                                    href="#"
                                    className="menu-link menu-link_us-s"
                                  >
                                    Dresses
                                  </a>
                                </li>
                                <li className="sub-menu__item">
                                  <a
                                    href="#"
                                    className="menu-link menu-link_us-s"
                                  >
                                    Sweatshirts and Hoodies
                                  </a>
                                </li>
                                <li className="sub-menu__item">
                                  <a
                                    href="#"
                                    className="menu-link menu-link_us-s"
                                  >
                                    T-shirts &amp; Tops
                                  </a>
                                </li>
                                <li className="sub-menu__item">
                                  <a
                                    href="#"
                                    className="menu-link menu-link_us-s"
                                  >
                                    Shirts &amp; Blouses
                                  </a>
                                </li>
                                <li className="sub-menu__item">
                                  <a
                                    href="#"
                                    className="menu-link menu-link_us-s"
                                  >
                                    Shorts and Bermudas
                                  </a>
                                </li>
                                <li className="sub-menu__item">
                                  <a
                                    href="#"
                                    className="menu-link menu-link_us-s"
                                  >
                                    Shoes
                                  </a>
                                </li>
                                <li className="sub-menu__item">
                                  <a
                                    href="shop3.html"
                                    className="menu-link menu-link_us-s"
                                  >
                                    Accessories
                                  </a>
                                </li>
                                <li className="sub-menu__item">
                                  <a
                                    href="#"
                                    className="menu-link menu-link_us-s"
                                  >
                                    Bags
                                  </a>
                                </li>
                                <li className="sub-menu__item">
                                  <a
                                    href="about.html"
                                    className="menu-link menu-link_us-s"
                                  >
                                    Gift Card
                                  </a>
                                </li>
                              </ul>
                              {/* /.sub-menu */}
                            </div>
                            <div
                              className="tab-pane fade"
                              id="tab-item-2"
                              role="tabpanel"
                              aria-labelledby="tab-item-2-tab"
                            >
                              <ul className="sub-menu list-unstyled">
                                <li className="sub-menu__item">
                                  <a
                                    href="#"
                                    className="menu-link menu-link_us-s"
                                  >
                                    Best Sellers
                                  </a>
                                </li>
                                <li className="sub-menu__item">
                                  <a
                                    href="#"
                                    className="menu-link menu-link_us-s"
                                  >
                                    New
                                  </a>
                                </li>
                                <li className="sub-menu__item">
                                  <a
                                    href="#"
                                    className="menu-link menu-link_us-s"
                                  >
                                    Sets
                                  </a>
                                </li>
                                <li className="sub-menu__item">
                                  <a
                                    href="#"
                                    className="menu-link menu-link_us-s"
                                  >
                                    Denim
                                  </a>
                                </li>
                                <li className="sub-menu__item">
                                  <a
                                    href="#"
                                    className="menu-link menu-link_us-s"
                                  >
                                    Collaborations®
                                  </a>
                                </li>
                                <li className="sub-menu__item">
                                  <a
                                    href="#"
                                    className="menu-link menu-link_us-s"
                                  >
                                    Trousers
                                  </a>
                                </li>
                                <li className="sub-menu__item">
                                  <a
                                    href="#"
                                    className="menu-link menu-link_us-s"
                                  >
                                    Jackets &amp; Coats
                                  </a>
                                </li>
                                <li className="sub-menu__item">
                                  <a
                                    href="#"
                                    className="menu-link menu-link_us-s"
                                  >
                                    Overshirts
                                  </a>
                                </li>
                                <li className="sub-menu__item">
                                  <a
                                    href="#"
                                    className="menu-link menu-link_us-s"
                                  >
                                    Dresses
                                  </a>
                                </li>
                                <li className="sub-menu__item">
                                  <a
                                    href="#"
                                    className="menu-link menu-link_us-s"
                                  >
                                    Jeans
                                  </a>
                                </li>
                                <li className="sub-menu__item">
                                  <a
                                    href="#"
                                    className="menu-link menu-link_us-s"
                                  >
                                    Sweatshirts and Hoodies
                                  </a>
                                </li>
                                <li className="sub-menu__item">
                                  <a
                                    href="about.html"
                                    className="menu-link menu-link_us-s"
                                  >
                                    Gift Card
                                  </a>
                                </li>
                                <li className="sub-menu__item">
                                  <a
                                    href="#"
                                    className="menu-link menu-link_us-s"
                                  >
                                    Shirts &amp; Blouses
                                  </a>
                                </li>
                                <li className="sub-menu__item">
                                  <a
                                    href="#"
                                    className="menu-link menu-link_us-s"
                                  >
                                    T-shirts &amp; Tops
                                  </a>
                                </li>
                                <li className="sub-menu__item">
                                  <a
                                    href="#"
                                    className="menu-link menu-link_us-s"
                                  >
                                    Shorts and Bermudas
                                  </a>
                                </li>
                                <li className="sub-menu__item">
                                  <a
                                    href="shop3.html"
                                    className="menu-link menu-link_us-s"
                                  >
                                    Accessories
                                  </a>
                                </li>
                                <li className="sub-menu__item">
                                  <a
                                    href="#"
                                    className="menu-link menu-link_us-s"
                                  >
                                    Shoes
                                  </a>
                                </li>
                                <li className="sub-menu__item">
                                  <a
                                    href="#"
                                    className="menu-link menu-link_us-s"
                                  >
                                    Bags
                                  </a>
                                </li>
                              </ul>
                              {/* /.sub-menu */}
                            </div>
                            <div
                              className="tab-pane fade"
                              id="tab-item-3"
                              role="tabpanel"
                              aria-labelledby="tab-item-3-tab"
                            >
                              <ul className="sub-menu list-unstyled">
                                <li className="sub-menu__item">
                                  <a
                                    href="about.html"
                                    className="menu-link menu-link_us-s"
                                  >
                                    Gift Card
                                  </a>
                                </li>
                                <li className="sub-menu__item">
                                  <a
                                    href="#"
                                    className="menu-link menu-link_us-s"
                                  >
                                    Collaborations®
                                  </a>
                                </li>
                                <li className="sub-menu__item">
                                  <a
                                    href="#"
                                    className="menu-link menu-link_us-s"
                                  >
                                    Sets
                                  </a>
                                </li>
                                <li className="sub-menu__item">
                                  <a
                                    href="#"
                                    className="menu-link menu-link_us-s"
                                  >
                                    Denim
                                  </a>
                                </li>
                                <li className="sub-menu__item">
                                  <a
                                    href="#"
                                    className="menu-link menu-link_us-s"
                                  >
                                    New
                                  </a>
                                </li>
                                <li className="sub-menu__item">
                                  <a
                                    href="#"
                                    className="menu-link menu-link_us-s"
                                  >
                                    Best Sellers
                                  </a>
                                </li>
                                <li className="sub-menu__item">
                                  <a
                                    href="#"
                                    className="menu-link menu-link_us-s"
                                  >
                                    Overshirts
                                  </a>
                                </li>
                                <li className="sub-menu__item">
                                  <a
                                    href="#"
                                    className="menu-link menu-link_us-s"
                                  >
                                    Jackets &amp; Coats
                                  </a>
                                </li>
                                <li className="sub-menu__item">
                                  <a
                                    href="#"
                                    className="menu-link menu-link_us-s"
                                  >
                                    Jeans
                                  </a>
                                </li>
                                <li className="sub-menu__item">
                                  <a
                                    href="#"
                                    className="menu-link menu-link_us-s"
                                  >
                                    Trousers
                                  </a>
                                </li>
                                <li className="sub-menu__item">
                                  <a
                                    href="#"
                                    className="menu-link menu-link_us-s"
                                  >
                                    Shorts and Bermudas
                                  </a>
                                </li>
                                <li className="sub-menu__item">
                                  <a
                                    href="#"
                                    className="menu-link menu-link_us-s"
                                  >
                                    Shoes
                                  </a>
                                </li>
                                <li className="sub-menu__item">
                                  <a
                                    href="shop3.html"
                                    className="menu-link menu-link_us-s"
                                  >
                                    Accessories
                                  </a>
                                </li>
                                <li className="sub-menu__item">
                                  <a
                                    href="#"
                                    className="menu-link menu-link_us-s"
                                  >
                                    Dresses
                                  </a>
                                </li>
                                <li className="sub-menu__item">
                                  <a
                                    href="#"
                                    className="menu-link menu-link_us-s"
                                  >
                                    Bags
                                  </a>
                                </li>
                              </ul>
                              {/* /.sub-menu */}
                            </div>
                          </div>
                        </div>
                        {/* /.row */}
                      </div>
                      <div
                        className="tab-pane fade"
                        id="pills-item-2"
                        role="tabpanel"
                        aria-labelledby="pills-item-2-tab"
                      >
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit, sed do eiusmod tempor incididunt ut labore et
                          dolore magna aliqua. Ut enim ad minim veniam, quis
                          nostrud exercitation ullamco laboris nisi ut aliquip
                          ex ea commodo consequat. Duis aute irure dolor in
                          reprehenderit in voluptate velit esse cillum dolore eu
                          fugiat nulla pariatur.
                        </p>
                        Elementum lectus a porta commodo suspendisse arcu,
                        aliquam lectus faucibus.
                      </div>
                      <div
                        className="tab-pane fade"
                        id="pills-item-3"
                        role="tabpanel"
                        aria-labelledby="pills-item-3-tab"
                      >
                        <p>
                          Sed ut perspiciatis unde omnis iste natus error sit
                          voluptatem accusantium doloremque laudantium, totam
                          rem aperiam, eaque ipsa quae ab illo inventore
                          veritatis et quasi architecto beatae vitae dicta sunt
                          explicabo. Nemo enim ipsam voluptatem quia voluptas
                          sit aspernatur aut odit aut fugit, sed quia
                          consequuntur magni dolores eos qui ratione voluptatem
                          sequi nesciunt.
                        </p>
                        Ut enim ad minima veniam, quis nostrum exercitationem
                        ullam corporis suscipit laboriosam, nisi ut aliquid ex
                        ea commodi consequatur?
                      </div>
                    </div>
                  </div>
                  {/* /.modal-body */}
                </div>
                {/* /.modal-content */}
              </div>
              {/* /.sitemap__links w-50 flex-grow-1 */}
            </div>
          </div>
          {/* /.modal-dialog modal-fullscreen */}
        </div>
        {/* /.sitemap position-fixed w-100 */}
        {/* Quick View */}
        <div className="modal fade" id="quickView" tabIndex={-1}>
          <div className="modal-dialog quick-view modal-dialog-centered">
            <div className="modal-content">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
              <div className="product-single">
                <div className="product-single__media m-0">
                  <div className="product-single__image position-relative w-100">
                    <div
                      className="swiper-container js-swiper-slider"
                      data-settings='{
            "slidesPerView": 1,
            "slidesPerGroup": 1,
            "effect": "none",
            "loop": false,
            "navigation": {
              "nextEl": ".modal-dialog.quick-view .product-single__media .swiper-button-next",
              "prevEl": ".modal-dialog.quick-view .product-single__media .swiper-button-prev"
            }
          }'
                    >
                      <div className="swiper-wrapper">
                        <div className="swiper-slide product-single__image-item">
                          <img
                            loading="lazy"
                            src="../images/products/quickview_1.jpg"
                            alt
                          />
                        </div>
                        <div className="swiper-slide product-single__image-item">
                          <img
                            loading="lazy"
                            src="../images/products/quickview_2.jpg"
                            alt
                          />
                        </div>
                        <div className="swiper-slide product-single__image-item">
                          <img
                            loading="lazy"
                            src="../images/products/quickview_3.jpg"
                            alt
                          />
                        </div>
                        <div className="swiper-slide product-single__image-item">
                          <img
                            loading="lazy"
                            src="../images/products/quickview_4.jpg"
                            alt
                          />
                        </div>
                      </div>
                      <div className="swiper-button-prev">
                        <svg
                          width={7}
                          height={11}
                          viewBox="0 0 7 11"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <use href="#icon_prev_sm" />
                        </svg>
                      </div>
                      <div className="swiper-button-next">
                        <svg
                          width={7}
                          height={11}
                          viewBox="0 0 7 11"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <use href="#icon_next_sm" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="product-single__detail">
                  <h1 className="product-single__name">
                    Lightweight Puffer Jacket With a Hood
                  </h1>
                  <div className="product-single__price">
                    <span className="current-price">$449</span>
                  </div>
                  <div className="product-single__short-desc">
                    <p>
                      Phasellus sed volutpat orci. Fusce eget lore mauris
                      vehicula elementum gravida nec dui. Aenean aliquam varius
                      ipsum, non ultricies tellus sodales eu. Donec dignissim
                      viverra nunc, ut aliquet magna posuere eget.
                    </p>
                  </div>
                  <form name="addtocart-form" method="post">
                    <div className="product-single__swatches">
                      <div className="product-swatch text-swatches">
                        <label>Sizes</label>
                        <div className="swatch-list">
                          <input type="radio" name="size" id="swatch-1" />
                          <label
                            className="swatch js-swatch"
                            htmlFor="swatch-1"
                            aria-label="Extra Small"
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            title="Extra Small"
                          >
                            XS
                          </label>
                          <input
                            type="radio"
                            name="size"
                            id="swatch-2"
                            defaultChecked
                          />
                          <label
                            className="swatch js-swatch"
                            htmlFor="swatch-2"
                            aria-label="Small"
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            title="Small"
                          >
                            S
                          </label>
                          <input type="radio" name="size" id="swatch-3" />
                          <label
                            className="swatch js-swatch"
                            htmlFor="swatch-3"
                            aria-label="Middle"
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            title="Middle"
                          >
                            M
                          </label>
                          <input type="radio" name="size" id="swatch-4" />
                          <label
                            className="swatch js-swatch"
                            htmlFor="swatch-4"
                            aria-label="Large"
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            title="Large"
                          >
                            L
                          </label>
                          <input type="radio" name="size" id="swatch-5" />
                          <label
                            className="swatch js-swatch"
                            htmlFor="swatch-5"
                            aria-label="Extra Large"
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            title="Extra Large"
                          >
                            XL
                          </label>
                        </div>
                        <a
                          href="#"
                          className="sizeguide-link"
                          data-bs-toggle="modal"
                          data-bs-target="#sizeGuide"
                        >
                          Size Guide
                        </a>
                      </div>
                      <div className="product-swatch color-swatches">
                        <label>Color</label>
                        <div className="swatch-list">
                          <input type="radio" name="color" id="swatch-11" />
                          <label
                            className="swatch swatch-color js-swatch"
                            htmlFor="swatch-11"
                            aria-label="Black"
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            title="Black"
                            style={{ color: '#222' }}
                          />
                          <input
                            type="radio"
                            name="color"
                            id="swatch-12"
                            defaultChecked
                          />
                          <label
                            className="swatch swatch-color js-swatch"
                            htmlFor="swatch-12"
                            aria-label="Red"
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            title="Red"
                            style={{ color: '#C93A3E' }}
                          />
                          <input type="radio" name="color" id="swatch-13" />
                          <label
                            className="swatch swatch-color js-swatch"
                            htmlFor="swatch-13"
                            aria-label="Grey"
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            title="Grey"
                            style={{ color: '#E4E4E4' }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="product-single__addtocart">
                      <div className="qty-control position-relative">
                        <input
                          type="number"
                          name="quantity"
                          defaultValue={1}
                          min={1}
                          className="qty-control__number text-center"
                        />
                        <div className="qty-control__reduce">-</div>
                        <div className="qty-control__increase">+</div>
                      </div>
                      {/* .qty-control */}
                      <button
                        type="submit"
                        className="btn btn-primary btn-addtocart js-open-aside"
                        data-aside="cartDrawer"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </form>
                  <div className="product-single__addtolinks">
                    <a
                      href="#"
                      className="menu-link menu-link_us-s add-to-wishlist"
                    >
                      <svg
                        width={16}
                        height={16}
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <use href="#icon_heart" />
                      </svg>
                      <span>Add to Wishlist</span>
                    </a>
                    <share-button className="share-button">
                      <button className="menu-link menu-link_us-s to-share d-flex align-items-center border-0 bg-transparent">
                        <svg
                          width={16}
                          height={19}
                          viewBox="0 0 16 19"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <use href="#icon_sharing" />
                        </svg>
                      </button>
                      <details
                        id="Details-share-template__main"
                        className="m-1 xl:m-1.5"
                        hidden
                      >
                        <summary className="btn-solid m-1 px-5 pb-3 pt-3.5 xl:m-1.5">
                          +
                        </summary>
                        <div
                          id="Article-share-template__main"
                          className="share-button__fallback bg-container shadow-theme absolute left-0 top-full z-10 flex w-full items-center border-t px-2 py-4"
                        >
                          <div className="field mr-4 grow">
                            <label
                              className="field__label sr-only"
                              htmlFor="url"
                            >
                              Link
                            </label>
                            <input
                              type="text"
                              className="field__input w-full"
                              id="url"
                              defaultValue="https://uomo-crystal.myshopify.com/blogs/news/go-to-wellness-tips-for-mental-health"
                              placeholder="Link"
                              onclick="this.select();"
                              readOnly
                            />
                          </div>
                          <button className="share-button__copy no-js-hidden">
                            <svg
                              className="icon icon-clipboard mr-1 inline-block"
                              width={11}
                              height={13}
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              aria-hidden="true"
                              focusable="false"
                              viewBox="0 0 11 13"
                            >
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M2 1a1 1 0 011-1h7a1 1 0 011 1v9a1 1 0 01-1 1V1H2zM1 2a1 1 0 00-1 1v9a1 1 0 001 1h7a1 1 0 001-1V3a1 1 0 00-1-1H1zm0 10V3h7v9H1z"
                                fill="currentColor"
                              />
                            </svg>
                            <span className="sr-only">Copy link</span>
                          </button>
                        </div>
                      </details>
                    </share-button>
                  </div>
                  <div className="product-single__meta-info mb-0">
                    <div className="meta-item">
                      <label>SKU:</label>
                      <span>N/A</span>
                    </div>
                    <div className="meta-item">
                      <label>Categories:</label>
                      <span>Casual &amp; Urban Wear, Jackets, Men</span>
                    </div>
                    <div className="meta-item">
                      <label>Tags:</label>
                      <span>biker, black, bomber, leather</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* /.modal-dialog */}
        </div>
        {/* /.quickview position-fixed */}
        {/* Newsletter Popup */}
        <div
          className="modal fade"
          id="newsletterPopup"
          tabIndex={-1}
          aria-hidden="true"
        >
          <div className="modal-dialog newsletter-popup modal-dialog-centered">
            <div className="modal-content">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
              <div className="row m-0 p-0">
                <div className="col-md-6 d-none d-md-block p-0">
                  <div className="newsletter-popup__bg h-100 w-100">
                    <img
                      loading="lazy"
                      src="../images/newsletter-popup.jpg"
                      className="h-100 w-100 object-fit-cover d-block"
                      alt
                    />
                  </div>
                </div>
                <div className="col-md-6 d-flex align-items-center p-0">
                  <div className="block-newsletter w-100">
                    <h3 className="block__title">Sign Up to Our Newsletter</h3>
                    <p>
                      Be the first to get the latest news about trends,
                      promotions, and much more!
                    </p>
                    <form
                      action="https://uomo-html.flexkitux.com/Demo1/index.html"
                      className="footer-newsletter__form position-relative bg-body"
                    >
                      <input
                        className="form-control border-2"
                        type="email"
                        name="email"
                        placeholder="Your email address"
                      />
                      <input
                        className="btn-link fw-medium position-absolute h-100 end-0 top-0 bg-transparent"
                        type="submit"
                        defaultValue="JOIN"
                      />
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* /.newsletter-popup position-fixed */}
        {/* Go To Top */}
        <div id="scrollTop" className="visually-hidden end-0" />
        {/* Page Overlay */}
        <div className="page-overlay" />
        {/* /.page-overlay */}
      </div>
    </div>
  );
};

export default CardProduct1;
