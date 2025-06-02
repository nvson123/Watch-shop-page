import { createFileRoute } from '@tanstack/react-router';
import blog_banner from '../../../assets/images/blog_title_bg.jpg';
import blog1 from '../../../assets/images/Blog/blog-1.jpg';
import blog2 from '../../../assets/images/Blog/blog-2.jpg';
import blog3 from '../../../assets/images/Blog/blog-3.jpg';
import blog4 from '../../../assets/images/Blog/blog-4.jpg';
export const Route = createFileRoute('/_layout/blog/')({
  component: Blog,
});

function Blog() {
  return (
    <div className="px-[40px]">
      <main>
        <section className="blog-page-title mb-xl-5 mb-4">
          <div className="title-bg">
            <img loading="lazy" src={blog_banner} width={1780} height={420} />
          </div>
          <div className="container">
            <h2 className="page-title">Tin tức</h2>
            <div className="blog__filter">
              <a href="#" className="menu-link menu-link_us-s">
                Tất cả
              </a>
              {/* <a href="#" className="menu-link menu-link_us-s">
                Công ty
              </a>
              <a href="#" className="menu-link menu-link_us-s menu-link_active">
                Đồng Hồ G-SHOCK
              </a>
              <a href="#" className="menu-link menu-link_us-s">
                Phong cách
              </a>
              <a href="#" className="menu-link menu-link_us-s">
                Xu hướng
              </a>
              <a href="#" className="menu-link menu-link_us-s">
                Casio
              </a> */}
            </div>
          </div>
        </section>
        <section className="blog-page container">
          <h2 className="d-none">The Blog</h2>
          <div className="blog-grid row row-cols-1 row-cols-md-2">
            <div className="blog-grid__item">
              <div className="blog-grid__item-image">
                <img
                  loading="lazy"
                  className="h-auto"
                  src={blog1}
                  width={690}
                  height={500}
                />
              </div>
              <div className="blog-grid__item-detail">
                <div className="blog-grid__item-meta">
                  <span className="blog-grid__item-meta__author">
                    Bởi quản trị viên
                  </span>
                  <span className="blog-grid__item-meta__date">
                    Ngày 04 tháng 07 năm 2025
                  </span>
                </div>
                <div className="blog-grid__item-title">
                  <a href="blog/text">
                    Người đàn ông đeo một chiếc đồng hồ đẹp không bao giờ mất đi sự tự tin
                  </a>
                </div>
                <div className="blog-grid__item-content">
                  <p>
                    Một người đeo chiếc đồng hồ đẹp không chỉ thể hiện phong cách mà còn làm cho mỗi khoảnh khắc trên tay họ trở nên giá trị hơn.
                  </p>
                  <a href="blog/text" className="readmore-link">
                    Tiếp tục đọc
                  </a>
                </div>
              </div>
            </div>
            <div className="blog-grid__item">
              <div className="blog-grid__item-image">
                <img
                  loading="lazy"
                  className="h-auto"
                  src={blog2}
                  width={690}
                  height={500}
                />
              </div>
              <div className="blog-grid__item-detail">
                <div className="blog-grid__item-meta">
                  <span className="blog-grid__item-meta__author">
                    Bởi quản trị viên
                  </span>
                  <span className="blog-grid__item-meta__date">
                    Ngày 04 tháng 01 năm 2025
                  </span>
                </div>
                <div className="blog-grid__item-title">
                  <a href="blog/text">
                    5 Mẹo Tăng Doanh Số Bán Hàng Trực Tuyến Của Bạn
                  </a>
                </div>
                <div className="blog-grid__item-content">
                  <p>
                    Tối ưu website, cá nhân hóa trải nghiệm, tận dụng mạng xã
                    hội, tạo ưu đãi hấp dẫn, và đầu tư vào nội dung để tăng
                    doanh số bán hàng trực tuyến.
                  </p>
                  <a href="blog/text" className="readmore-link">
                    Tiếp tục đọc
                  </a>
                </div>
              </div>
            </div>
            <div className="blog-grid__item">
              <div className="blog-grid__item-image">
                <img
                  loading="lazy"
                  className="h-auto"
                  src={blog3}
                  width={690}
                  height={500}
                />
              </div>
              <div className="blog-grid__item-detail">
                <div className="blog-grid__item-meta">
                  <span className="blog-grid__item-meta__author">
                    Bởi quản trị viên
                  </span>
                  <span className="blog-grid__item-meta__date">
                    Ngày 04 tháng 01 năm 2025
                  </span>
                </div>
                <div className="blog-grid__item-title">
                  <a href="blog/text">
                    Một chiếc đồng hồ đẹp đúng nghĩa không chỉ nằm ở thiết kế sang trọng .
                  </a>
                </div>
                <div className="blog-grid__item-content">
                  <p>
                    "Có lẽ chữ 'đẹp' luôn song hành cùng những chiếc đồng hồ tinh tế. Thế nên, không phải ngẫu nhiên mà đồng hồ được xem là biểu tượng của phong cách và đẳng cấp. Nhiều khi nhận thấy, chữ 'đẹp' không chỉ gói gọn trong thiết kế, mà còn nằm ở giá trị thời gian và câu chuyện mà mỗi chiếc đồng hồ mang theo."{' '}
                  </p>
                  <a href="blog/text" className="readmore-link">
                    Tiếp tục đọc
                  </a>
                </div>
              </div>
            </div>
            <div className="blog-grid__item">
              <div className="blog-grid__item-image">
                <img
                  loading="lazy"
                  className="h-auto"
                  src={blog4}
                  width={690}
                  height={500}
                />
              </div>
              <div className="blog-grid__item-detail">
                <div className="blog-grid__item-meta">
                  <span className="blog-grid__item-meta__author">
                    Bởi quản trị viên
                  </span>
                  <span className="blog-grid__item-meta__date">
                    Ngày 04 tháng 01 năm 2025
                  </span>
                </div>
                <div className="blog-grid__item-title">
                  <a href="blog/text">Xu hướng đồng hồ hiện đại</a>
                </div>
                <div className="blog-grid__item-content">
                  <p>
                    Chẳng bao lâu nữa mùa đông sẽ đến, và đây cũng là thời điểm lý tưởng để lựa chọn một chiếc đồng hồ mới. Một chiếc đồng hồ không chỉ là phụ kiện thời trang mà còn giúp bạn khẳng định phong cách, thể hiện sự tinh tế và phù hợp với mọi trang phục, từ những bộ đồ thanh lịch đến phong cách cá tính hàng ngày.
                  </p>
                  <a href="blog/text" className="readmore-link">
                    Tiếp tục đọc
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div
            className="progress progress_uomo mb-3 me-auto ms-auto"
            style={{ width: 300 }}
          >
            <div
              className="progress-bar"
              role="progressbar"
              style={{ width: '39%' }}
              aria-valuenow={39}
              aria-valuemin={0}
              aria-valuemax={100}
            />
          </div>
          <div className="text-center">
            <a
              className="btn-link btn-link_lg text-uppercase fw-medium"
              href="#"
            >
              Hiển thị thêm
            </a>
          </div>
        </section>
      </main>
      <div className="pb-xl-5 mb-5"></div>
    </div>
  );
}
