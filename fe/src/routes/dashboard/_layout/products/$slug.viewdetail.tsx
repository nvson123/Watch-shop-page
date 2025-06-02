import instance from '@/api/axiosIntance';
import CurrencyVND from '@/components/config/vnd';
import Header from '@/components/layoutAdmin/header/header';
import NewHeader from '@/components/layoutAdmin/header/new-header';
import { useQuery } from '@tanstack/react-query';
import { createFileRoute, useParams } from '@tanstack/react-router';

export const Route = createFileRoute(
  '/dashboard/_layout/products/$slug/viewdetail'
)({
  component: DetailProduct,
});

function DetailProduct() {
  const { slug } = useParams({
    from: '/dashboard/_layout/products/$slug/viewdetail',
  });

  const { data, isLoading, error } = useQuery({
    queryKey: ['product', slug],
    queryFn: async () => {
      try {
        const response = await instance.get(`/products/slug/${slug}`);
        return response.data;
      } catch (error) {
        throw new Error('Call API thất bại');
      }
    },
    enabled: !!slug, // Đảm bảo query chỉ chạy khi `slug` tồn tại
  });

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center text-gray-500">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500">Error: {error.message}</div>
    );
  }

  return (
    <div className="h-screen overflow-y-auto">
      <div className="fixed left-0 right-0 top-16 z-10 md:relative md:left-auto md:right-auto md:top-0">
        <NewHeader
          breadcrumbs={[
            {
              title: 'Danh sách sản phẩm',
              href: '/dashboard/products',
            },
            {
              title: 'Chi tiết sản phẩm',
            },
          ]}
        />
      </div>
      <div className="m-8 overflow-hidden rounded-lg bg-white shadow-md">
        <div className="grid max-w-6xl grid-cols-3">
          {/* Product Image */}
          <div className="flex items-center p-4">
            <img
              src={data.product.image}
              alt={data.product.name}
              className="rounded-lg object-cover"
            />
          </div>

          {/* Product Details */}
          <div className="space-y-4 p-6">
            <h1 className="text-2xl font-bold uppercase text-gray-800">
              {data.product.name}
            </h1>
            <p className="font-semibold text-black">
              Mô tả:{' '}
              <span className="font-sans text-gray-600">
                {data.product.description}
              </span>
            </p>
            <div className="font-semibold text-black">
              Giá:{' '}
              <span className="text-xl font-semibold text-red-600">
                <CurrencyVND amount={data.product.price} />
              </span>
            </div>
            <div className="font-semibold text-black">
              Giảm giá:{' '}
              <span className="text-xl font-semibold text-gray-600">
                {data.product.discount}%
              </span>
            </div>
          </div>
        </div>

        {/* Gallery Section */}
        <div className="p-8">
          <h2 className="text-lg font-bold text-gray-800">Ảnh trưng bày</h2>
          {data.product.gallery.length > 0 ? (
            <div className="mt-4 grid grid-cols-4 gap-4">
              {data.product.gallery.map((image: string, index: number) => (
                <img
                  key={index}
                  src={image}
                  alt={`Gallery Image ${index + 1}`}
                  className="h-48 w-full rounded object-cover shadow"
                />
              ))}
            </div>
          ) : (
            <p className="text-gray-600">
              Không có hình ảnh nào trong thư viện.
            </p>
          )}
        </div>

        {/* Variants Section */}
        <div className="p-8">
          <h2 className="text-lg font-bold text-gray-800">Biến thể</h2>
          {data.product.variants.length > 0 ? (
            <div className="mt-4 overflow-x-auto">
              <table className="min-w-full border border-gray-300">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border px-4 py-2 text-left font-medium text-black">
                      Size
                    </th>
                    <th className="border px-4 py-2 text-left font-medium text-black">
                      Màu
                    </th>
                    <th className="border px-4 py-2 text-left font-medium text-black">
                      Giá (đ)
                    </th>
                    <th className="border px-4 py-2 text-left font-medium text-black">
                      Sku
                    </th>
                    <th className="border px-4 py-2 text-left font-medium text-black">
                      Số lượng trong kho
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.product.variants.map((variant: any, index: number) => (
                    <tr
                      key={variant._id || index}
                      className={`hover:bg-gray-50 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
                    >
                      <td className="border px-4 py-2 text-black">
                        {variant.size}
                      </td>
                      <td className="border px-4 py-2 text-black">
                        {variant.color}
                      </td>
                      <td className="border px-4 py-2 text-black">
                        <CurrencyVND amount={variant.price} />
                      </td>
                      <td className="border px-4 py-2 text-black">
                        {variant.sku}
                      </td>
                      <td className="border px-4 py-2 text-black">
                        {variant.countInStock}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-600">Không có sẵn các biến thể.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default DetailProduct;
