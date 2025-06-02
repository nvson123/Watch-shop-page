import instance from '@/api/axiosIntance';
import Header from '@/components/layoutAdmin/header/header';
import NewHeader from '@/components/layoutAdmin/header/new-header';
import useCategoryMutation from '@/data/category/useCategoryMutation';
import { Button, Input, Switch, Label, toast } from '@medusajs/ui';

import {
  createFileRoute,
  useNavigate,
  useParams,
} from '@tanstack/react-router';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

// Route configuration
export const Route = createFileRoute('/dashboard/_layout/category/$id/edit')({
  loader: async ({ params }) => {
    const { id } = params;
    if (!id) {
      throw new Error('ID danh mục bị thiếu');
    }
    try {
      const response = await instance.get(`categorys/${id}`);
      return response.data as Category;
    } catch (error) {
      console.error('Lỗi khi lấy thông tin danh mục:', error);
      throw new Response('Không thể tải thông tin danh mục', { status: 500 });
    }
  },
  component: EditCategory,
});

function EditCategory() {
  const navigate = useNavigate();
  const { id } = useParams({ from: '/dashboard/_layout/category/$id/edit' });
  const { updateCategory } = useCategoryMutation();
  const categories = Route.useLoaderData<Category>();

  console.log('Dữ liệu từ API:', categories);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
    watch,
  } = useForm<Category>({
    defaultValues: {
      name: '',
      status: 'SHOW', // Set default status to 'SHOW'
    },
  });

  useEffect(() => {
    if (categories?.category?.name) {
      reset({
        name: categories.category.name,
        status: categories.category.status || 'SHOW', // Ensure status is loaded
      });
    }
  }, [categories, reset]);

  const onUpdateCategory: SubmitHandler<Category> = async data => {
    try {
      await updateCategory.mutateAsync({ id, data });
      navigate({ to: '/dashboard/category' });
    } catch (error) {
      console.error('Cập nhật danh mục thất bại:', error);
    }
  };

  if (!categories) return <div>Đang tải thông tin danh mục...</div>;

  const isStatusShow = watch('status') === 'SHOW'; // Check the status from watch

  return (
    <div className="h-screen overflow-y-auto">
      <div className="fixed left-0 right-0 top-16 z-10 md:relative md:left-auto md:right-auto md:top-0">
        <NewHeader
          breadcrumbs={[
            {
              title: 'Danh sách danh mục',
              href: '/dashboard/category',
            },
            {
              title: 'Cập nhật danh mục',
            },
          ]}
        />
      </div>
      <form onSubmit={handleSubmit(onUpdateCategory)} className="m-8">
        <div className="my-3 flex justify-end">
          <div className="flex gap-2">
            <Button
              variant="secondary"
              type="button"
              onClick={() => navigate({ to: '/dashboard/category' })}
            >
              Hủy bỏ
            </Button>
            <Button variant="primary" type="submit">
              Cập nhật danh mục
            </Button>
          </div>
        </div>

        <div className="rounded-lg border bg-ui-bg-base p-7">
          <h1 className="text-2xl font-medium text-ui-fg-base">
            Thông tin chung
          </h1>
          <p className="mb-4 text-sm font-normal text-ui-fg-subtle">
            Cập nhật tên danh mục và trạng thái.
          </p>

          <div className="space-y-4">
            <div className="flex space-x-4">
              <div className="flex-1 space-y-3">
                <label className="block text-sm font-medium text-ui-fg-base">
                  <span className="text-ui-tag-red-text">*</span> Tên danh mục
                </label>
                <Input
                  placeholder="Nhập tên danh mục"
                  size="base"
                  {...register('name', {
                    required: 'Tên danh mục là bắt buộc',
                  })}
                />
                {errors.name && (
                  <span className="text-xs text-red-500">
                    {errors.name.message}
                  </span>
                )}
              </div>
            </div>

            {/* Thêm Switch để chọn trạng thái */}
            <div className="flex items-center gap-x-2">
              <Switch
                id="manage-inventory"
                checked={isStatusShow}
                onCheckedChange={value =>
                  setValue('status', value ? 'SHOW' : 'HIDE')
                }
              />
              <Label htmlFor="manage-inventory">Hiển thị danh mục</Label>
            </div>

            {/* Hiển thị thông tin bổ sung nếu trạng thái là "SHOW" */}
            {isStatusShow && (
              <div className="mt-4 rounded-lg border bg-green-50 p-4">
                <p className="text-sm text-green-700">
                  Danh mục này đang hiển thị.
                </p>
              </div>
            )}

            {/* Ẩn phần này khi trạng thái là "HIDE" */}
            {!isStatusShow && (
              <div className="mt-4 rounded-lg border bg-gray-50 p-4">
                <p className="text-sm text-gray-700">Danh mục này đã ẩn.</p>
              </div>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}

export default EditCategory;
