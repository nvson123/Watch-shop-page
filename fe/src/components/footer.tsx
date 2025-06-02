const Footer = () => {
  return (
    <>
      <footer className="footer footer_type_1">
        <div className="footer-middle container px-[55px]">
          <div className="row row-cols-lg-5 row-cols-2">
            <div className="footer-column footer-store-info col-12 mb-lg-0 mb-4">
              <div className="logo">
                <a href="index.html">
                  <img
                    src="/fasion zone.png"
                    alt="Uomo"
                    className="logo__image d-block w-48"
                  />
                </a>
              </div>
              {/* /.logo */}
              <p className="footer-address">
                Tòa nhà FPT Polytechnic, Phố Trịnh Văn Bô, Nam Từ Liêm, Hà Nội
              </p>
              <p className="m-0">
                <strong className="fw-medium">lamlqph33093@fpt.edu.vn</strong>
              </p>
              <p>
                <strong className="fw-medium">0787394101</strong>
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
              <h5 className="sub-menu__title text-uppercase">Về Chúng Tôi</h5>
              <ul className="sub-menu__list list-unstyled">
                <li className="sub-menu__item">
                  <a href="about.html" className="menu-link menu-link_us-s">
                    Giới Thiệu
                  </a>
                </li>
                <li className="sub-menu__item">
                  <a href="careers.html" className="menu-link menu-link_us-s">
                    Tuyển Dụng
                  </a>
                </li>
                <li className="sub-menu__item">
                  <a
                    href="affiliates.html"
                    className="menu-link menu-link_us-s"
                  >
                    Đối Tác
                  </a>
                </li>
                <li className="sub-menu__item">
                  <a href="blog.html" className="menu-link menu-link_us-s">
                    Blog
                  </a>
                </li>
                <li className="sub-menu__item">
                  <a href="contact.html" className="menu-link menu-link_us-s">
                    Liên Hệ
                  </a>
                </li>
              </ul>
            </div>
            {/* /.footer-column */}
            <div className="footer-column footer-menu mb-lg-0 mb-4">
              <h5 className="sub-menu__title text-uppercase">Cửa Hàng</h5>
              <ul className="sub-menu__list list-unstyled">
                <li className="sub-menu__item">
                  <a
                    href="new-arrivals.html"
                    className="menu-link menu-link_us-s"
                  >
                    Hàng Mới Về
                  </a>
                </li>
                <li className="sub-menu__item">
                  <a
                    href="accessories.html"
                    className="menu-link menu-link_us-s"
                  >
                    Phụ Kiện
                  </a>
                </li>
                <li className="sub-menu__item">
                  <a href="men.html" className="menu-link menu-link_us-s">
                    Đồng Hồ G-SHOCK
                  </a>
                </li>
                <li className="sub-menu__item">
                  <a href="women.html" className="menu-link menu-link_us-s">
                    Đồng Hồ BABY-G
                  </a>
                </li>
                <li className="sub-menu__item">
                  <a href="shop-all.html" className="menu-link menu-link_us-s">
                    Xem Tất Cả
                  </a>
                </li>
              </ul>
            </div>
            {/* /.footer-column */}
            <div className="footer-column footer-menu mb-lg-0 mb-4">
              <h5 className="sub-menu__title text-uppercase">Hỗ Trợ</h5>
              <ul className="sub-menu__list list-unstyled">
                <li className="sub-menu__item">
                  <a
                    href="customer-service.html"
                    className="menu-link menu-link_us-s"
                  >
                    Dịch Vụ Khách Hàng
                  </a>
                </li>
                <li className="sub-menu__item">
                  <a href="account.html" className="menu-link menu-link_us-s">
                    Tài Khoản
                  </a>
                </li>
                <li className="sub-menu__item">
                  <a
                    href="store-location.html"
                    className="menu-link menu-link_us-s"
                  >
                    Tìm Cửa Hàng
                  </a>
                </li>
                <li className="sub-menu__item">
                  <a href="terms.html" className="menu-link menu-link_us-s">
                    Điều Khoản & Chính Sách
                  </a>
                </li>
                <li className="sub-menu__item">
                  <a href="contact.html" className="menu-link menu-link_us-s">
                    Liên Hệ
                  </a>
                </li>
                <li className="sub-menu__item">
                  <a href="gift-card.html" className="menu-link menu-link_us-s">
                    Thẻ Quà Tặng
                  </a>
                </li>
              </ul>
            </div>
            {/* /.footer-column */}
            <div className="footer-column footer-newsletter col-12 mb-lg-0 mb-4">
              <h5 className="sub-menu__title text-uppercase">
                Đăng Ký Nhận Tin
              </h5>
              <p>
                Hãy là người đầu tiên cập nhật xu hướng, ưu đãi và nhiều thông
                tin hấp dẫn khác!
              </p>
              <form
                action="#"
                className="footer-newsletter__form position-relative bg-body"
              >
                <input
                  className="form-control border-white"
                  type="email"
                  name="email"
                  placeholder="Nhập địa chỉ email của bạn"
                />
                <input
                  className="btn-link fw-medium position-absolute h-100 end-0 top-0 bg-white"
                  type="submit"
                  defaultValue="THAM GIA"
                />
              </form>
            </div>
            {/* /.footer-column */}
          </div>
          {/* /.row-cols-5 */}
        </div>
        {/* /.footer-middle container */}
        <div className="footer-bottom container">
          <div className="d-block d-md-flex align-items-center">
            <span className="footer-copyright me-auto">
              ©2025 Tempus Chroniker
            </span>
            <div className="footer-settings d-block d-md-flex align-items-center">
              <div className="d-flex align-items-center">
                <label
                  htmlFor="footerSettingsLanguage"
                  className="text-secondary me-2"
                >
                  Ngôn Ngữ
                </label>
                <select
                  id="footerSettingsLanguage"
                  className="form-select form-select-sm bg-transparent"
                  aria-label="Default select example"
                  name="store-language"
                >
                  <option className="footer-select__option" selected>
                    Việt Nam | Tiếng Việt
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
                  Tiền Tệ
                </label>
                <select
                  id="footerSettingsCurrency"
                  className="form-select form-select-sm bg-transparent"
                  aria-label="Default select example"
                  name="store-currency"
                >
                  <option selected>₫ VND</option>
                  <option value={1}>$ USD</option>
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
    </>
  );
};

export default Footer;