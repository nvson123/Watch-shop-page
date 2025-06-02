import { createFileRoute, useParams } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import instance from '@/api/axiosIntance';
import Header from '@/components/layoutAdmin/header/header';
import NewHeader from '@/components/layoutAdmin/header/new-header';

// Route định nghĩa
export const Route = createFileRoute('/dashboard/_layout/coupon/$id/showUser')({
  component: CouponUserList,
});

function CouponUserList() {
  // Lấy `id` từ URL params
  const { id } = useParams({
    from: '/dashboard/_layout/coupon/$id/showUser',
  });

  // Fetch dữ liệu danh sách người dùng đã sử dụng mã giảm giá
  const { data, isLoading, error } = useQuery({
    queryKey: ['couponUsers', id],
    queryFn: async () => {
      const response = await instance.get(`/coupon/${id}/users`);
      console.log(data);

      return response.data;
    },
    enabled: !!id, // Chỉ chạy query khi có `id`
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
      <div className="text-center text-red-500">
        Error: {error.message || 'Failed to load data'}
      </div>
    );
  }

  return (
    <div className="h-screen overflow-y-auto">
      {/* Header */}
      <div className="fixed left-0 right-0 top-16 z-10 md:relative md:left-auto md:right-auto md:top-0">
        <NewHeader
          breadcrumbs={[
            {
              title: 'Danh sách phiếu giảm giá',
              href: '/dashboard/coupon',
            },
            {
              title: 'Danh sách người dùng sử dụng mã giảm giá',
            },
          ]}
        />
      </div>
      <div className="m-8 rounded-lg bg-white p-6 shadow-lg">
        <h1 className="mb-4 text-2xl font-bold text-gray-800">
          Người dùng sử dụng mã giảm giá
        </h1>
        {data?.users?.length > 0 ? (
          <table className="w-full table-auto border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-4 py-2 text-left font-medium text-black">
                  STT
                </th>
                <th className="border px-4 py-2 text-left font-medium text-black">
                  Tên
                </th>
                <th className="border px-4 py-2 text-left font-medium text-black">
                  Email
                </th>
              </tr>
            </thead>
            <tbody>
              {data.users.map((user: any, index: number) => (
                <tr
                  key={user.id}
                  className={`hover:bg-gray-50 ${
                    index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                  }`}
                >
                  <td className="border px-4 py-2 text-black">{index + 1}</td>
                  <td className="border px-4 py-2 text-black">
                    {user.username}
                  </td>
                  <td className="border px-4 py-2 text-black">{user.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-600">
            Chưa có người dùng nào sử dụng mã giảm giá này.
          </p>
        )}
      </div>
    </div>
  );
}

export default CouponUserList;
