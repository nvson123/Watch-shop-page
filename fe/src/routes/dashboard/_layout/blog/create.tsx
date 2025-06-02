import Header from '@/components/layoutAdmin/header/header';
import NewHeader from '@/components/layoutAdmin/header/new-header';
import TextareaDescription from '@/components/textarea';
import useBlogMutation from '@/data/blog/useBlogMutation';
import { ArrowDownTray, XMark } from '@medusajs/icons';
import { Button, Input, toast } from '@medusajs/ui';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import axios from 'axios';
import { useRef, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

export const Route = createFileRoute('/dashboard/_layout/blog/create')({
  component: AddBlog,
});

interface BlogFormValues {
  title: string; // Title of the post
  content: string; // Content of the post
  author: string; // Author of the post
  tags: string[]; // Array of tags for the post (fixed to a simple array of strings)
  thumbnail: string; // URL to the post's thumbnail image
  slug: string; // Slug for the post, typically used for SEO-friendly URLs
  createdAt: string; // Date when the post was created
  updatedAt: string;
}

function AddBlog() {
  const navigate = useNavigate();
  const { createPost } = useBlogMutation();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const formatFileSize = (size: number) => {
    if (size < 1024) return `${size} B`;
    else if (size < 1048576) return `${(size / 1024).toFixed(2)} KB`;
    else return `${(size / 1048576).toFixed(2)} MB`;
  };

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      // Kiểm tra kích thước và định dạng tệp
      if (file.size > 500 * 1024) {
        setError('thumbnail', {
          type: 'manual',
          message: 'Kích thước tệp tối đa là 500KB.',
        });
        return;
      }

      if (!['image/jpeg', 'image/png'].includes(file.type)) {
        setError('thumbnail', {
          type: 'manual',
          message: 'Chỉ hỗ trợ định dạng .jpg và .png.',
        });
        return;
      }

      setSelectedImage(file);
    }
  };

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
    setError,
    trigger,
    reset,
  } = useForm<BlogFormValues>();

  const onCreateBlog: SubmitHandler<BlogFormValues> = async data => {
    try {
      // Kiểm tra xem có ảnh được chọn hay không
      let thumbnailUrl = '';
      if (selectedImage) {
        const formDataBlog = new FormData();
        formDataBlog.append('thumbnail', selectedImage);

        // Upload ảnh và lấy URL từ server
        const response = await axios.post(
          `http://localhost:8080/api/upload-thumbnail-blog`,
          formDataBlog,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );

        if (response?.data) {
          thumbnailUrl = response.data.url; // Giả định server trả về URL ảnh trong `data.url`
        } else {
          throw new Error('Upload ảnh thất bại');
        }
      }

      // Chuẩn bị dữ liệu bài viết
      const currentDate = new Date().toISOString();
      const blogData = {
        ...data,
        createdAt: currentDate,
        updatedAt: currentDate,
      };

      // Gọi API tạo bài viết
      createPost.mutate(blogData, {
        onSuccess: () => {
          toast.success('Tạo bài viết thành công');
          reset(); // Reset form sau khi thành công
          navigate({ to: '/dashboard/blog' }); // Chuyển hướng
        },
        onError: error => {
          toast.error(`Lỗi khi tạo bài viết: ${error.message}`);
        },
      });
    } catch (error) {
      console.error('Lỗi khi tạo bài viết:', error);
      toast.error('Lỗi khi tạo bài viết hoặc upload ảnh');
    }
    if (!selectedImage) return;
    const formDataThumbnail = new FormData();
    formDataThumbnail.append('thumbnail', selectedImage);
    try {
      // Gửi yêu cầu upload ảnh
      await axios.post(
        `http://localhost:8080/api/upload-thumbnail-blog`,
        formDataThumbnail,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      // Kiểm tra phản hồi từ server
    } catch (error) {
      console.error('Failed to upload image:', error);
      throw new Error('Failed to upload image');
    }
  };

  const handleEditorChange = (content: string) => {
    setValue('content', content); // Cập nhật giá trị
    trigger('content'); // Gọi kiểm tra hợp lệ cho trường 'content'
  };

  return (
    <div className="h-screen overflow-y-auto">
      <div className="fixed left-0 right-0 top-16 z-10 md:relative md:left-auto md:right-auto md:top-0">
        <NewHeader
          breadcrumbs={[
            {
              title: 'Danh sách bài viết',
              href: '/dashboard/blog',
            },
            {
              title: 'Thêm bài viết mới',
            },
          ]}
        />
      </div>
      <form onSubmit={handleSubmit(onCreateBlog)} className="m-8">
        <div className="my-3 flex justify-between">
          <div className="w-[330px]">
            <Input
              placeholder="Search"
              id="search-input"
              size="small"
              type="search"
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant="secondary"
              type="button"
              onClick={() => navigate({ to: '/dashboard/blog' })}
            >
              Hủy
            </Button>
            <Button variant="primary" type="submit">
              Tạo bài viết
            </Button>
          </div>
        </div>

        <div className="rounded-lg border bg-ui-bg-base p-7">
          <h1 className="text-2xl font-medium text-ui-fg-base">
            Thông tin bài viết
          </h1>
          <p className="mb-4 text-sm font-normal text-ui-fg-subtle">
            Nhập chi tiết bài viết như tiêu đề, nội dung...,
          </p>

          <div className="space-y-4">
            {/* Tiêu đề */}
            <div className="flex space-x-4">
              <div className="flex-1 space-y-3">
                <label className="text-sm font-medium text-ui-fg-base">
                  <span className="text-ui-tag-red-text">*</span> Tiêu đề
                </label>
                <Input
                  placeholder="Tiêu đề"
                  size="base"
                  {...register('title', {
                    required: 'Tiêu đề bắt buộc',
                  })}
                />
                {errors.title && (
                  <span className="text-xs text-red-500">
                    {errors.title.message}
                  </span>
                )}
              </div>
            </div>
            {/* Tác giả */}
            <div className="flex space-x-4">
              <div className="flex-1 space-y-3">
                <label className="text-sm font-medium text-ui-fg-base">
                  <span className="text-ui-tag-red-text">*</span> Tác giả
                </label>
                <Input
                  placeholder="Tác giả"
                  size="base"
                  {...register('author', {
                    required: 'Tác giả bắt buộc',
                  })}
                />
                {errors.author && (
                  <span className="text-xs text-red-500">
                    {errors.author.message}
                  </span>
                )}
              </div>
            </div>
            {/* Thẻ */}
            <div className="flex space-x-4">
              <div className="flex-1 space-y-3">
                <label className="text-sm font-medium text-ui-fg-base">
                  <span className="text-ui-tag-red-text">*</span> Thẻ
                </label>
                <Input
                  placeholder="Thẻ"
                  size="base"
                  {...register('tags', {
                    required: 'Thẻ bắt buộc',
                  })}
                />
                {errors.tags && (
                  <span className="text-xs text-red-500">
                    {errors.tags.message}
                  </span>
                )}
              </div>
            </div>
            {/* Ảnh đại diện  */}
            <div>
              <label className="text-sm font-medium text-ui-fg-base">
                <span className="text-ui-tag-red-text">*</span> Ảnh
              </label>
              <p className="mb-2 text-xs text-ui-fg-muted">
                Kích thước tệp tối đa là 500KB. Hỗ trợ các định dạng .jpg và
                .png.
              </p>
              <button
                type="button"
                className="flex w-full cursor-pointer flex-col items-center gap-2 rounded-lg border border-dashed border-ui-border-strong p-8"
                onClick={handleClick}
              >
                <div className="mb-2 flex items-center">
                  <ArrowDownTray className="mr-1 h-5 w-5" />
                  <p className="text-xs font-medium text-ui-fg-base">
                    Tải lên file
                  </p>
                  <input
                    type="file"
                    id="image"
                    ref={fileInputRef}
                    accept=".jpg, .png"
                    onChange={handleThumbnailChange}
                    className="hidden cursor-pointer"
                  />
                </div>
                <p className="mb-2 text-center text-xs text-ui-fg-muted">
                  Kéo và thả file vào đây hoặc bấm vào để tải lên
                </p>
              </button>
              <div className="mt-5">
                {selectedImage && (
                  <div className="mb-3 flex items-center justify-between gap-3 rounded-lg border bg-ui-bg-subtle-hover px-2 py-3">
                    <div>
                      <p className="text-sm font-normal text-ui-fg-base">
                        {selectedImage.name}
                      </p>
                      <p className="text-xs font-normal text-ui-fg-subtle">
                        {formatFileSize(selectedImage.size)}
                      </p>
                    </div>
                    <XMark
                      className="cursor-pointer"
                      onClick={() => setSelectedImage(null)}
                    />
                  </div>
                )}
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-medium text-ui-fg-base">
                  <span className="text-ui-tag-red-text">*</span> Nội dung
                </label>
                <div className="mt-2 flex flex-1 flex-col">
                  <Controller
                    name="content"
                    control={control}
                    defaultValue=""
                    rules={{ required: 'Mô tả cần bắt buộc' }}
                    render={({ field: { onChange, value } }) => (
                      <TextareaDescription
                        apiKey="vx5npguuuktlxhbv9tv6vvgjk1x5astnj8kznhujei9w6ech"
                        value={value}
                        onChange={content =>
                          handleEditorChange(content, onChange)
                        }
                        className="h-full w-full" // To make the text area take full space
                      />
                    )}
                  />
                  {errors.content && (
                    <span className="mt-2 text-xs text-red-500">
                      {errors.content.message}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddBlog;
