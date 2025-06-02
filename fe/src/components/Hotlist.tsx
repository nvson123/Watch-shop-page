import React from 'react'
import hot_list from '../assets/images/collection_grid_1.jpg';
import hot_list1 from '../assets/images/collection_grid_2.jpg';
import hot_list2 from '../assets/images/collection_grid_3.jpg';
import { Link } from '@tanstack/react-router';
const Hotlist = () => {
    return (
        <div>
            {/* Shop by collection */}
            <section className="collections-grid collections-grid_masonry" id="section-collections-grid_masonry ">
                <div className="container h-md-100">
                    <div className="row h-md-100 px-[40px]">
                        <div className="col-lg-6 h-md-100">
                            <div className="collection-grid__item position-relative h-md-100">
                                <div className="background-img" style={{ backgroundImage: `url(${hot_list})` }} />
                                <div className="content_abs content_bottom content_left content_bottom-md content_left-md">
                                    <p className="text-uppercase mb-1">Sản phẩm nổi bật</p>
                                    <h3 className="text-uppercase">Bộ sưu tập  <strong> Đồng hồ dành cho nam</strong></h3>
                                    <Link to="/shop" className="btn-link default-underline text-uppercase fw-medium">Khám phá ngay</Link>
                                </div>{/* /.content_abs content_bottom content_left content_bottom-md content_left-md */}
                            </div>
                        </div>{/* /.col-md-6 */}
                        <div className="col-lg-6 d-flex flex-column">
                            <div className="collection-grid__item position-relative flex-grow-1 mb-lg-4">
                                <div className="background-img" style={{ backgroundImage: `url(${hot_list1})` }} />
                                <div className="content_abs content_bottom content_left content_bottom-md content_left-md">
                                    <p className="text-uppercase mb-1">Sản phẩm nổi bật</p>
                                    <h3 className="text-uppercase">Bộ sưu tập  <strong> Đồng hồ dành cho nam</strong></h3>
                                    <Link to="/shop" className="btn-link default-underline text-uppercase fw-medium">Khám phá ngay</Link>
                                </div>{/* /.content_abs content_bottom content_left content_bottom-md content_left-md */}
                            </div>
                            <div className="position-relative flex-grow-1 mt-lg-1">
                                <div className="row h-md-100">
                                    <div className="col-md-6 h-md-100">
                                        <div className="collection-grid__item h-md-100 position-relative">
                                            <div className="background-img" style={{ backgroundImage: `url(${hot_list2})` }} />
                                            <div className="content_abs content_bottom content_left content_bottom-md content_left-md">
                                                <p className="text-uppercase mb-1">Sản phẩm nổi bật</p>
                                                <h3 className="text-uppercase">Bộ sưu tập  <strong>Đồng hồ dành cho trẻ em</strong></h3>
                                                <Link to="/shop" className="btn-link default-underline text-uppercase fw-medium">Khám phá ngay</Link>
                                            </div>{/* /.content_abs content_bottom content_left content_bottom-md content_left-md */}
                                        </div>{/* /.collection-grid__item */}
                                    </div>
                                    <div className="col-md-6 h-md-100">
                                        <div className="collection-grid__item h-md-100 position-relative">
                                            <div className="background-img" style={{ backgroundColor: '#f5e6e0' }} />
                                            <div className="content_abs content_bottom content_left content_bottom-md content_left-md">
                                                <h3 className="text-uppercase"> Quà tặng</h3>
                                                <p className="mb-1">Làm ai đó ngạc nhiên với món quà mà họ thực sự mong muốn.</p>
                                                <Link to="/shop" className="btn-link default-underline text-uppercase fw-medium">Khám phá ngay</Link>
                                            </div>{/* /.content_abs content_bottom content_left content_bottom-md content_left-md */}
                                        </div>{/* /.collection-grid__item */}
                                    </div>
                                </div>
                            </div>
                        </div>{/* /.col-md-6 */}
                    </div>{/* /.row */}
                </div>{/* /.container */}
            </section>{/* /.collections-grid collections-grid_masonry */}
            <div className="mb-4 pb-4 mb-xl-5 pb-xl-5" />
        </div>
    )
}

export default Hotlist