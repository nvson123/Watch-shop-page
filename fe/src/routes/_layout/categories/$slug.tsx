import instance from '@/api/axiosIntance';
import FilterBar from '@/components/FilterBar';
import { useFetchProductAll } from '@/data/products/useProductList';
import {
  ChevronRightMini,
  Funnel,
  Heart,
  MagnifyingGlass,
  ShoppingCartSolid,
} from '@medusajs/icons';
import { createFileRoute, Link, useParams } from '@tanstack/react-router';
import { useEffect, useState } from 'react';

export const Route = createFileRoute('/_layout/categories/$slug')({
  component: ProductCategory,
});

function ProductCategory() {
  const { slug: categorySlug } = useParams({
    from: '/_layout/categories/$slug',
  });

  const [products, setProducts] = useState([]); // Sản phẩm được tải từ API
  const [categoryName, setCategoryName] = useState<string | null>(null); // Tên danh mục
  const [loading, setLoading] = useState(true); // Trạng thái tải dữ liệu
  const [error, setError] = useState<string | null>(null); // Trạng thái lỗi
  const [selectedCategory] = useState<string | null>(null); // Trạng thái chọn danh mục
  const [showFilter, setShowFilter] = useState<boolean>(false); // Trạng thái filter
  const [showSearch, setShowSearch] = useState<boolean>(false); // Trạng thái tìm kiếm
  const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
  const [productsPerPage] = useState(12); // Số sản phẩm mỗi trang
  const [totalPages, setTotalPages] = useState(1); // Tổng số trang

  const toggleFilter = () => {
    setShowFilter(!showFilter);
    if (!showFilter) {
      setShowSearch(false); // Tắt Search khi Filter bật
    }
  };

  const toggleSearch = () => {
    setShowSearch(!showSearch);
    if (!showSearch) {
      setShowFilter(false); // Tắt Filter khi Search bật
    }
  };

  const { listProduct } = useFetchProductAll();

  const filteredProducts = selectedCategory
    ? listProduct.filter(product => product?.category?._id === selectedCategory)
    : listProduct;

  const displayedProducts = filteredProducts
    ? filteredProducts.slice(0, 16)
    : [];

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = displayedProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  useEffect(() => {
    setTotalPages(Math.ceil(displayedProducts.length / productsPerPage));
  }, [displayedProducts, productsPerPage]);

  useEffect(() => {
    if (!categorySlug) {
      setError('Không tìm thấy ID danh mục');
      setLoading(false);
      return;
    }

    const fetchCategory = async () => {
      try {
        const response = await instance.get(`/categories/${categorySlug}`);
        if (response.data && response.data.category) {
          setCategoryName(response.data.category.name);
          setProducts(response.data.products || []);
        } else {
          setError('Không có sản phẩm nào trong danh mục này');
        }
      } catch (err) {
        setError('Không thể tải danh mục sản phẩm');
      } finally {
        setLoading(false);
      }
    };

    fetchCategory();
  }, [categorySlug]);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  const nextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));

  if (loading) {
    return <div className="text-center text-xl text-gray-500">Đang tải...</div>;
  }

  if (error) {
    return <div className="text-center text-lg text-red-500">{error}</div>;
  }

  return (
    <div>
      <div className="main-content flex h-48 w-full flex-col items-center justify-center">
        <div className="text-content">
          <div className="text-center text-4xl font-semibold">
            Danh Mục {categoryName}
          </div>
          <div className="link caption1 mt-3 flex items-center justify-center gap-1">
            <div className="flex items-center justify-center">
              <a href="/">Trang chủ</a>
              <ChevronRightMini />
            </div>
            <div className="capitalize text-gray-500">
              <Link to=".">{categoryName}</Link>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 py-10 pt-5">
        <div className="m-auto mt-10 max-w-7xl bg-white shadow sm:p-5 md:p-5 lg:p-5 xl:p-0">
          <div className="mb-4 mt-5 flex flex-wrap items-center justify-between p-4 sm:mb-8">
            <div className="flex flex-wrap space-x-4 sm:space-x-8"></div>
            <div className="mt-4 flex space-x-2 sm:mt-0 sm:space-x-4">
              <button
                onClick={toggleFilter}
                className="flex items-center rounded border border-gray-300 px-2 py-1 sm:px-4 sm:py-2"
              >
                <Funnel className="mr-1 sm:mr-2" />
                {showFilter ? 'Close' : 'Filter'}
              </button>
              <button
                onClick={toggleSearch}
                className="flex items-center rounded border border-gray-300 px-2 py-1 sm:px-4 sm:py-2"
              >
                <MagnifyingGlass className="mr-1 sm:mr-2" />
                {showSearch ? 'Close' : 'Search'}
              </button>
            </div>
          </div>

          {showSearch && (
            <div className="mb-8 scale-100 transform opacity-100 transition-all duration-500 ease-in-out">
              <div className="flex items-center space-x-2 rounded-lg border border-gray-300 p-4">
                <MagnifyingGlass className="mr-2" />
                <input
                  type="text"
                  placeholder="Search"
                  className="search-input w-full border-none bg-white focus:outline-none"
                />
              </div>
            </div>
          )}

          {/* Thanh lọc */}
          {showFilter && <FilterBar />}

          {/* Hiển thị trạng thái Loading hoặc Error */}
          {loading && <p>Loading products...</p>}
          {error && <p className="text-red-500">{error}</p>}

          {/* Hiển thị danh sách sản phẩm */}
          {products.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 sm:gap-8 md:grid-cols-3 lg:grid-cols-4">
              {products.map((product: Product) => (
                <div
                  key={product._id}
                  className="product-card group relative overflow-hidden text-center"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-80 w-full transform transition-transform duration-500"
                  />
                  <Link
                    to={`/${product.slug ? product.slug : product._id}/quickviewProduct`}
                    className="quick-view duration-900 absolute bottom-4 left-1/2 -translate-x-1/2 transform rounded-full bg-white px-4 py-2 opacity-0 shadow transition-all hover:bg-black hover:text-white group-hover:translate-y-[-100px] group-hover:opacity-100"
                  >
                    Xem nhanh
                  </Link>
                  <h2 className="mt-2 flex items-center justify-between text-gray-500">
                    {product.name}
                    <div className="flex space-x-2">
                      <Link
                        to={`/${product.slug ? product.slug : product._id}/detailproduct`}
                      >
                        <ShoppingCartSolid />
                      </Link>
                      <Heart />
                    </div>
                  </h2>
                  <p className="mt-2 flex justify-start text-gray-600">
                    ${product.price}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            !loading && <p>Không có sản phẩm nào</p>
          )}

          {/* Hiển thị phân trang */}
          <div className="mt-8 flex justify-center space-x-2">
            <button
              onClick={prevPage}
              disabled={currentPage === 1}
              className="rounded-md bg-gray-500 px-4 py-2 text-white disabled:bg-gray-300"
            >
              Trước
            </button>
            <div className="flex space-x-2">
              {[...Array(totalPages).keys()].map(page => (
                <button
                  key={page}
                  onClick={() => paginate(page + 1)}
                  className={`rounded-md px-4 py-2 ${currentPage === page + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                >
                  {page + 1}
                </button>
              ))}
            </div>
            <button
              onClick={nextPage}
              disabled={currentPage === totalPages}
              className="rounded-md bg-gray-500 px-4 py-2 text-white disabled:bg-gray-300"
            >
              Sau
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCategory;
