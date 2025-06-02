import instance from '@/api/axiosIntance';
import Header from '@/components/layoutAdmin/header/header';
import NewHeader from '@/components/layoutAdmin/header/new-header';
import { Button, Input, toast, Switch, Label } from '@medusajs/ui'; // Import Switch và Label
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { SubmitHandler, useForm } from 'react-hook-form';

export const Route = createFileRoute('/dashboard/_layout/category/create')({
  component: AddCategory,
});

function AddCategory() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue, // Sử dụng setValue để thay đổi giá trị
  } = useForm<Category>({
    defaultValues: {
      name: '',
      status: true, // true = SHOW, false = HIDE
    },
  });

  // Hàm xử lý khi Switch thay đổi
  const handleSwitchChange = (checked: boolean) => {
    setValue('status', checked); // Cập nhật giá trị của status khi thay đổi
  };

  const onCreateCategory: SubmitHandler<Category> = async data => {
    try {
      // Gửi request API để tạo danh mục với status là 'SHOW' hoặc 'HIDE'
      await instance.post('/categories', {
        name: data.name,
        status: data.status ? 'SHOW' : 'HIDE', // Trạng thái sẽ là 'SHOW' nếu true, 'HIDE' nếu false
      });
      toast.success('Tạo danh mục', {
        description: 'Tạo danh mục thành công!',
        duration: 1000,
      });
      // Chuyển hướng về danh sách danh mục sau khi tạo
      navigate({ to: '/dashboard/category' });
    } catch (error) {
      console.error('Thêm danh mục thất bại', error);
    }
  };

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
              title: 'Thêm mới danh mục',
            },
          ]}
        />
      </div>
      <form onSubmit={handleSubmit(onCreateCategory)} className="m-8">
        <div className="my-3 flex justify-end">
          <div className="flex gap-2">
            <Button
              variant="secondary"
              type="button"
              onClick={() => navigate({ to: '/dashboard/category' })}
            >
              Hủy
            </Button>
            <Button variant="primary" type="submit">
              Tạo danh mục
            </Button>
          </div>
        </div>

        <div className="rounded-lg border bg-ui-bg-base p-7">
          <h1 className="text-2xl font-medium text-ui-fg-base">
            Thông tin chung
          </h1>
          <p className="mb-4 text-sm font-normal text-ui-fg-subtle">
            Cung cấp tên danh mục.
          </p>

          <div className="space-y-4">
            {/* Tên danh mục */}
            <div className="flex space-x-4">
              <div className="flex-1 space-y-3">
                <label className="text-sm font-medium text-ui-fg-base">
                  <span className="text-ui-tag-red-text">*</span> Tên danh mục
                </label>
                <Input
                  placeholder="Type here"
                  size="base"
                  {...register('name', {
                    required: 'Category name is required',
                  })}
                />
                {errors.name && (
                  <span className="text-xs text-red-500">
                    {errors.name.message}
                  </span>
                )}
              </div>
            </div>

            {/* Trường Status với Switch */}
            <div className="flex items-center gap-x-2">
              <Switch
                id="manage-inventory"
                {...register('status')}
                onCheckedChange={handleSwitchChange} // Cập nhật giá trị khi thay đổi
                defaultChecked={true} // Mặc định là 'SHOW'
              />
              <Label htmlFor="manage-inventory">Hiển thị</Label>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddCategory;
