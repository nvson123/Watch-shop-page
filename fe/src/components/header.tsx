import { useCart } from '@/data/cart/useCartLogic';
import { useFetchCart } from '@/data/cart/useFetchCart';
import { toast } from '@medusajs/ui';
import { Link, useLocation, useNavigate } from '@tanstack/react-router';
import { ChangeEvent, KeyboardEvent, KeyboardEventHandler, useEffect, useRef, useState } from 'react';
import '../../css/plugins/swiper.min.css';
import imgCart from '../assets/images/cart_trong.jpg';
import nav_bg from '../assets/images/nav-bg.jpg';
// import Banertime from './Banertime';
import CurrencyVND from './config/vnd';
const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [showSearch, setShowSearch] = useState(false);
  const [searchStr, setSearchStr] = useState<string>();

  const inputRef = useRef<HTMLInputElement>(null);

  // Trạng thái hiển thị của menu
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false); // Trạng thái hiển thị form tìm kiếm
  // Kiểm tra trạng thái đăng nhập khi component được tải
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    if (location.pathname !== '/searchList') {
      setSearchStr('');
    }
  }, [location.pathname]);

  const toggleShowSearch = () => setShowSearch(!showSearch);

  const onInputChange = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      navigate({
        to: '/searchList',
        search: {
          search: e.target.value
        }
      })
    }
  }

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen); // Đổi trạng thái khi nhấn icon search
  };
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const userId = localStorage.getItem('userId');
  const { data: cartData, isLoading } = useFetchCart(userId); // Lấy dữ liệu giỏ hàng
  // Tính tổng số lượng sản phẩm trong giỏ hàng
  const totalItems =
    cartData?.products?.reduce(
      (total: any, product: any) => total + product.quantity,
      0
    ) || 0;

  // Hàm đăng xuất
  const handleLogout = () => {
    // Xóa token khỏi localStorage và đặt trạng thái đăng nhập về false
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('userId');
    setIsLoggedIn(false);
    toast.success('Đăng xuất', {
      description: 'Bạn đã đăng xuất thành công',
      duration: 1000,
    });
  };
  //Phần menu của user
  const menuRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = event => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  // End-Phần menu của user
  // Đọc dữ liệu từ localStorage
  const storedData = JSON.parse(localStorage.getItem('user'));

  // Truy xuất tên người dùng (username)
  const username = storedData?.user?.username || 'Không có tên người dùng';

  // if (!userId) {
  //   return <LoginCart />;
  // }

  const {
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
  } = useCart(userId);

  // if (!cartData || !cartData.products || cartData.products.length === 0) {
  //   return <ErrorCart />;
  // }

  const handleCheckout = () => {
    const selectedItems = getAllItems() || [];
    if (selectedItems.length === 0) {
      toast.error('Vui lòng chọn ít nhất một sản phẩm để thanh toán.');
      return;
    }
    navigate({
      to: '/checkoutNew',
      state: { selectedItems },
    });
  };

  //Dòng dữ nguyên header
  const [isSticky, setIsSticky] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      // Kiểm tra nếu đã cuộn đến gần cuối trang
      const scrollPosition = window.scrollY + window.innerHeight;
      const pageHeight = document.documentElement.scrollHeight;
      if (scrollPosition >= pageHeight - 50) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="pb-32">
      <header
        id="header"
        className={`${isSticky ? 'bg-white' : 'bg-white'} header_sticky fixed left-0 top-0 w-full transition-all duration-300`}
      >
        {/* <Banertime /> */}
        <div className="container mt-[-10px] px-[55px] ">
          <div className="header-desk header-desk_type_1 ">
            <div className="logo">
              <a href="/">
                <img
                  src="/fasion zone.png"
                  alt="Uomo"
                  className="logo__image d-block w-40"
                />
              </a>
            </div>
            {/* /.logo */}
            <nav className="navigation">
              <ul className="navigation__list list-unstyled d-flex">
                <li className="navigation__item">
                  <Link to="/" className="navigation__link">
                    Trang Chủ
                  </Link>
                </li>
                <li className="navigation__item">
                  <Link to="/shop" className="navigation__link">
                    Cửa hàng
                  </Link>
                </li>
                <li className="navigation__item">
                  <Link to="/blog" className="navigation__link">
                    Tin tức
                  </Link>
                </li>
                <li className="navigation__item">
                  <Link to="/about" className="navigation__link">
                    Về Chúng Tôi
                  </Link>
                </li>
                <li className="navigation__item">
                  <Link to="/" className="navigation__link">
                    Liên hệ
                  </Link>
                </li>
              </ul>
              {/* /.navigation__list */}
            </nav>
            {/* /.navigation */}
            <div className="header-tools d-flex align-items-center">
              <div className="header-tools__item hover-container">
                {showSearch ? (
                  <div className="flex items-center rounded-md border !border-gray-400 px-2">
                    <input
                      type="text"
                      placeholder="Nhập tên sản phẩm"
                      className="rounded-[inherit] py-1.5 pr-2 outline-none"
                      onBlur={toggleShowSearch}
                      onKeyDown={onInputChange}
                      ref={inputRef}
                      value={searchStr}
                      onChange={e => setSearchStr(e.target.value)}
                    />
                    <i className="fa-solid fa-magnifying-glass text-md"></i>
                  </div>
                ) : (
                  <i
                    className="fa-solid fa-magnifying-glass text-xl cursor-pointer"
                    onClick={() => {
                      toggleShowSearch();

                      setTimeout(() => inputRef.current?.focus(), 1)
                    }}
                  ></i>
                )}

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
                  onClick={toggleMenu}
                >
                  <div className="custom-cursor-on-hover flex cursor-pointer items-center">
                    <i className="fa-solid fa-user text-xl hover:text-blue-400"></i>
                  </div>
                </a>
              </div>

              <a
                href="#"
                className="header-tools__item header-tools__cart js-open-aside"
                data-aside="cartDrawer"
              >
                <i className="fa-solid fa-cart-shopping text-xl"></i>
                {!isLoading && totalItems > 0 && (
                  <span className="cart-amount d-block position-absolute js-cart-items-count">
                    {totalItems}
                  </span>
                )}
              </a>
              <a
                className="header-tools__item"
                href="#"
                data-bs-toggle="modal"
                data-bs-target="#siteMap"
              >
                <i className="fa-solid fa-bars text-xl"></i>
              </a>
            </div>
            {/* /.header__tools */}
          </div>
          {/* /.header-desk header-desk_type_1 */}
        </div>
        {/* /.container */}
      </header>
      <div>
        <div
          className="aside aside_right customer-forms overflow-hidden"
          id="customerForms"
        >
          <div className="customer-forms__wrapper d-flex position-relative">
            <div className="flex flex-col items-center justify-center">
              <div className="z-1 group relative" ref={menuRef}>
                {isMenuOpen && (
                  <ul className="absolute top-10 w-96 transform cursor-pointer rounded-lg transition-all duration-300 ease-in-out">
                    {isLoggedIn ? (
                      <>
                        <div className="flex flex-col items-center justify-center px-3 py-4">
                          <button className="js-close-aside btn-close-lg btn-close-aside ms-auto mt-[-50px]" />
                          <img
                            src="https://res.cloudinary.com/dlzhmxsqp/image/upload/v1716288330/e_commerce/s4nl3tlwpgafsvufcyke.jpg"
                            alt=""
                            className="mt-5 h-16 w-16 rounded-full border-2 border-gray-200 object-cover"
                          />
                          <div className="mt-2 flex items-center gap-2">
                            <div className="text-xl text-gray-700">
                              Xin chào
                            </div>
                            <span className="text-xl font-medium text-gray-900">
                              {username || 'kkk'}
                            </span>
                          </div>
                        </div>

                        <li className="hidden px-4 py-2 text-lg font-medium hover:bg-blue-100 hover:text-blue-500 md:block">
                          <a href="/dashboard">Trang quản trị</a>
                        </li>

                        <li className="px-4 py-2 text-lg font-medium hover:bg-blue-100 hover:text-blue-500">
                          <Link to="/profile">Cập nhật hồ sơ</Link>
                        </li>

                        <li className="px-4 py-2 text-lg font-medium hover:bg-blue-100 hover:text-blue-500">
                          <Link to="/orderuser">Đơn mua</Link>
                        </li>

                        <li className="px-4 py-2 text-lg font-medium hover:bg-blue-100 hover:text-blue-500">
                          <a onClick={handleLogout} href="#">
                            Đăng xuất
                          </a>
                        </li>
                      </>
                    ) : (
                      <div className="w-full">
                        <button className="js-close-aside btn-close-lg btn-close-aside ms-auto flex justify-end" />
                        <div className="space-y-4 p-4 text-center">
                          <Link to="/login">
                            <button className="btn btn-primary d-block mt-3 w-full rounded-lg text-lg transition-colors duration-300">
                              Đăng nhập
                            </button>
                          </Link>
                          <div className="text-lg text-gray-600">
                            Bạn chưa có tài khoản?
                            <Link
                              to="/register"
                              className="pl-1 text-lg text-black hover:underline"
                            >
                              Đăng ký
                            </Link>
                          </div>
                        </div>
                      </div>
                    )}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
        <div
          className="aside aside_right cart-drawer overflow-hidden"
          id="cartDrawer"
        >
          <div className="aside-header d-flex align-items-center">
            {!isLoading && totalItems > 0 ? (
              <h3 className="text-uppercase fs-6 mb-0">
                Giỏ hàng ({' '}
                <span className="cart-amount js-cart-items-count">
                  {totalItems}
                </span>{' '}
                )
              </h3>
            ) : (
              <h3 className="text-uppercase fs-6 mb-0">Giỏ hàng trống</h3>
            )}
            <button className="js-close-aside btn-close-lg btn-close-aside ms-auto" />
          </div>
          {/* /.aside-header */}
          <div className="aside-content cart-drawer-items-list">
            {cartData?.products?.length === 0 ? (
              <>
                <img src={imgCart} className="m-auto w-40" alt="" />
                <p className="text-muted text-center">
                  Giỏ hàng của bạn hiện đang trống.
                </p>
                <Link
                  to="/shop"
                  className="btn btn-primary d-block m-auto mt-3 w-52"
                >
                  Mua sắm ngay
                </Link>
              </>
            ) : (
              cartData?.products?.map((product, index) => (
                <div
                  className="cart-drawer-item d-flex position-relative py-2"
                  key={product.id}
                >
                  <div className="position-relative">
                    <a href="product1_simple.html">
                      <img
                        loading="lazy"
                        className="cart-drawer-item__img"
                        src={product.image}
                      />
                    </a>
                  </div>
                  <div className="cart-drawer-item__info flex-grow-1">
                    <h6 className="cart-drawer-item__title fw-normal text-black">
                      <a href="">{product.name}</a>
                    </h6>
                    <p className="cart-drawer-item__option text-secondary">
                      Color: {product.color || 'Không có'}
                    </p>
                    <p className="cart-drawer-item__option text-secondary">
                      Size: {product.size || 'Không có'}
                    </p>
                    <div className="d-flex align-items-center justify-content-between mt-1">
                      <div className="qty-control position-relative">
                        <input
                          type="text"
                          min={1}
                          value={quantities[index] || product.quantity}
                          onChange={e =>
                            handleQuantityChange(index, e.target.value)
                          }
                          className="qty-control__number border-0 text-center"
                        />
                        <div
                          className="qty-control__reduce text-start"
                          onClick={() => decrementQuantity(index)}
                        >
                          -
                        </div>
                        <div
                          className="qty-control__increase text-end"
                          onClick={() => incrementQuantity(index)}
                        >
                          +
                        </div>
                      </div>
                      {/* .qty-control */}
                      <span className="cart-drawer-item__price money price">
                        <CurrencyVND
                          amount={
                            (quantities[index] || product.quantity) *
                            productPrice(index)
                          }
                        />
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleDeleteByIdProduct(product.variantId)} // Truyền variantId của sản phẩm
                    className="btn-close-xs position-absolute js-cart-item-remove end-0 top-0 py-2"
                  />

                </div>
              ))
            )}
          </div>
          {/* /.aside-content */}
          <div className="cart-drawer-actions position-absolute w-100 bottom-0 start-0">
            <hr className="cart-drawer-divider" />
            <div className="d-flex justify-content-between">
              <h6 className="fs-base fw-medium">TỔNG:</h6>
              <span className="cart-subtotal fw-medium">
                <CurrencyVND
                  amount={
                    cartData?.products?.reduce((total, product, index) => {
                      const productTotal =
                        (quantities[index] || product.quantity) *
                        productPrice(index);
                      return total + productTotal;
                    }, 0) || '0'
                  }
                />
              </span>
            </div>
            {/* /.d-flex justify-content-between */}
            <Link to="/cart" className="btn btn-light d-block mt-3">
              Xem giỏ hàng
            </Link>
            <button
              onClick={handleCheckout}
              className="btn btn-primary d-block mt-3 w-full"
              disabled={cartData?.products?.length === 0}
            >
              Thanh Toán
            </button>
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
                  src={nav_bg}
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
                          Đồng Hồ Nữ
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
                          Đồng Hồ Nam
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
                          Đồng Hồ Trẻ em
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
                            {/* <li
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
                                <span className="rline-content">Đồng Hồ Nữ</span>
                              </a>
                            </li> */}
                            {/* <li
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
                                <span className="rline-content">Đồng Hồ Nữ</span>
                              </a>
                            </li> */}
                            {/* <li
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
                                <span className="rline-content">Đồng Hồ Trẻ Em</span>
                              </a>
                            </li> */}
                            {/* <li
                              className="nav-item position-relative"
                              role="presentation"
                            >
                              <a className="nav-link nav-link_rline" href="#">
                                <span className="rline-content">HOME</span>
                              </a>
                            </li> */}
                            {/* <li
                              className="nav-item position-relative"
                              role="presentation"
                            >
                              <a className="nav-link nav-link_rline" href="#">
                                <span className="rline-content">
                                  COLLECTION
                                </span>
                              </a>
                            </li> */}
                            {/* <li
                              className="nav-item position-relative"
                              role="presentation"
                            >
                              <a
                                className="nav-link nav-link_rline text-red"
                                href="#"
                              >
                                SALE UP TO 10% OFF
                              </a>
                            </li> */}
                            {/* <li
                              className="nav-item position-relative"
                              role="presentation"
                            >
                              <a className="nav-link nav-link_rline" href="#">
                                <span className="rline-content">NEW</span>
                              </a>
                            </li> */}
                            {/* <li
                              className="nav-item position-relative"
                              role="presentation"
                            >
                              <a className="nav-link nav-link_rline" href="#">
                                <span className="rline-content">SHOES</span>
                              </a>
                            </li> */}
                            {/* <li
                              className="nav-item position-relative"
                              role="presentation"
                            >
                              <a className="nav-link nav-link_rline" href="#">
                                <span className="rline-content">
                                  ACCESSORIES
                                </span>
                              </a>
                            </li> */}
                            {/* <li
                              className="nav-item position-relative"
                              role="presentation"
                            >
                              <a className="nav-link nav-link_rline" href="#">
                                <span className="rline-content">JOIN LIFE</span>
                              </a>
                            </li> */}
                            {/* <li
                              className="nav-item position-relative"
                              role="presentation"
                            >
                              <a className="nav-link nav-link_rline" href="#">
                                <span className="rline-content">
                                  #UOMOSTYLE
                                </span>
                              </a>
                            </li> */}
                          </ul>
                          <div className="tab-content col-7" id="myTabContent">
                            <div
                              className="tab-pane fade show active"
                              id="tab-item-1"
                              role="tabpanel"
                              aria-labelledby="tab-item-1-tab"
                            >
                              {/* <ul className="sub-menu list-unstyled">
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
                              </ul> */}
                              {/* /.sub-menu */}
                            </div>
                            <div
                              className="tab-pane fade"
                              id="tab-item-2"
                              role="tabpanel"
                              aria-labelledby="tab-item-2-tab"
                            >
                              {/* <ul className="sub-menu list-unstyled">
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
                              </ul> */}
                              {/* /.sub-menu */}
                            </div>
                            <div
                              className="tab-pane fade"
                              id="tab-item-3"
                              role="tabpanel"
                              aria-labelledby="tab-item-3-tab"
                            >
                              {/* <ul className="sub-menu list-unstyled">
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
                              </ul> */}
                              {/* /.sub-menu */}
                            </div>
                          </div>
                        </div>
                        {/* /.row */}
                      </div>
                      {/* <div
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
                      </div> */}
                      {/* <div
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
                      </div> */}
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
                          />
                        </div>
                        <div className="swiper-slide product-single__image-item">
                          <img
                            loading="lazy"
                            src="../images/products/quickview_2.jpg"
                          />
                        </div>
                        <div className="swiper-slide product-single__image-item">
                          <img
                            loading="lazy"
                            src="../images/products/quickview_3.jpg"
                          />
                        </div>
                        <div className="swiper-slide product-single__image-item">
                          <img
                            loading="lazy"
                            src="../images/products/quickview_4.jpg"
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
                    {/* <share-button className="share-button">
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
                    </share-button> */}
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

export default Header;
