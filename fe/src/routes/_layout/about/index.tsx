import { createFileRoute } from '@tanstack/react-router';
import aboutBanner from '../../../assets/images/about/about-1.jpg';
import aboutBanner2 from '../../../assets/images/about/about-2.jpg';
import brand1 from '../../../assets/images/brands/brand1.png';
import brand2 from '../../../assets/images/brands/brand2.png';
import brand3 from '../../../assets/images/brands/brand3.png';
import brand4 from '../../../assets/images/brands/brand4.png';
import brand5 from '../../../assets/images/brands/brand5.png';
import brand6 from '../../../assets/images/brands/brand6.png';
import brand7 from '../../../assets/images/brands/brand7.png';
export const Route = createFileRoute('/_layout/about/')({
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className='px-[40px]'>
      <div>
        <main>
          <div className="mb-4 pb-4" />
          <section className="about-us container">
            <div className="mw-930">
              <h2 className="page-title">Về Chúng tôi </h2>
            </div>
            <div className="about-us__content pb-5 mb-5">
              <p className="mb-5">
                <img loading="lazy" className="w-100 h-auto d-block" src={aboutBanner} width={1410} height={550} alt />
              </p>
              <div className="mw-930">
                <h3 className="mb-4">CÂU CHUYỆN CỦA CHÚNG TÔI</h3>
                <p className="fs-6 fw-medium mb-4">Tempus Chroniker tự hào là thương hiệu đồng hồ cao cấp, kết hợp giữa tinh hoa chế tác truyền thống và thiết kế hiện đại. Với sứ mệnh mang đến những cỗ máy thời gian không chỉ chính xác mà còn thể hiện đẳng cấp, chúng tôi luôn cập nhật xu hướng mới nhất từ những trung tâm chế tác danh tiếng trên thế giới.</p>
                <p className="mb-4">Đẳng cấp và Tinh tế: Mỗi chiếc đồng hồ Tempus Chroniker là sự giao thoa giữa nghệ thuật và kỹ thuật, từ bộ máy tinh xảo đến thiết kế sang trọng, phù hợp với nhiều phong cách – từ thanh lịch, cổ điển đến mạnh mẽ, thể thao.</p>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <h5 className="mb-3">Sứ mệnh của chúng tôi</h5>
                    <p className="mb-3">Mỗi sản phẩm của Tempus Chroniker là sự kết hợp giữa tinh hoa chế tác và thiết kế tinh tế, giúp khách hàng thể hiện cá tính và trân trọng từng khoảnh khắc trong cuộc sống."</p>
                  </div>
                  <div className="col-md-6">
                    <h5 className="mb-3">Sứ mệnh của chúng tôi</h5>
                    <p className="mb-3">"Chúng tôi không chỉ tạo ra những chiếc đồng hồ, mà còn mang đến giá trị về thời gian, phong cách và đẳng cấp."</p>

                  </div>
                </div>
              </div>
              <div className="mw-930 d-lg-flex align-items-lg-center">
                <div className="image-wrapper col-lg-6">
                  <img className="h-auto" loading="lazy" src={aboutBanner2} width={450} height={500} alt />
                </div>
                <div className="content-wrapper col-lg-6 px-lg-4">
                  <h5 className="mb-3">Công ty</h5>
                  <p>Tempus Chroniker là thương hiệu đồng hồ cao cấp, mang trong mình sứ mệnh kết nối giá trị thời gian với phong cách sống hiện đại. Chúng tôi cam kết mang đến những sản phẩm chất lượng, kết hợp giữa công nghệ chế tác tiên tiến và thiết kế tinh tế, giúp khách hàng khẳng định cá tính và đẳng cấp riêng.

Với đội ngũ chuyên gia giàu kinh nghiệm và niềm đam mê không ngừng đổi mới, Tempus Chroniker không chỉ cung cấp đồng hồ mà còn mang đến trải nghiệm vượt thời gian, đồng hành cùng bạn trong từng khoảnh khắc quan trọng.</p>
                </div>
              </div>
            </div>
          </section>
          <section className="service-promotion horizontal container mw-930 pt-0 mb-md-4 pb-md-4 mb-xl-5">
            <div className="row">
              <div className="col-md-4 text-center mb-5 mb-md-0">
                <div className="service-promotion__icon mb-4">
                  <i className="fa-solid fa-gift text-[40px]"></i>
                </div>
                <h3 className="service-promotion__title fs-6 text-uppercase">Giao hàng nhanh và miễn phí</h3>
                <p className="service-promotion__content text-secondary">Giao hàng miễn phí cho tất cả các đơn hàng trên 500.000đ</p>
              </div>{/* /.col-md-4 text-center*/}
              <div className="col-md-4 text-center mb-5 mb-md-0">
                <div className="service-promotion__icon mb-4">
                  <i className="fa-solid fa-headset text-[40px]"></i>
                </div>
                <h3 className="service-promotion__title fs-6 text-uppercase">Hỗ trợ khách hàng 24/7</h3>
                <p className="service-promotion__content text-secondary">Hỗ trợ khách hàng thân thiện 24/7</p>
              </div>{/* /.col-md-4 text-center*/}
              <div className="col-md-4 text-center mb-4 pb-1 mb-md-0">
                <div className="service-promotion__icon mb-4">
                  <i className="fa-solid fa-shield text-[40px]"></i>
                </div>
                <h3 className="service-promotion__title fs-6 text-uppercase">Đảm bảo hoàn tiền</h3>
                <p className="service-promotion__content text-secondary">Chúng tôi trả lại tiền trong vòng 15 ngày</p>
              </div>{/* /.col-md-4 text-center*/}
            </div>{/* /.row */}
          </section>
        </main>
        <div className="mb-5 pb-xl-5" />
      </div>

    </div>
  );
}
