import Header from '@/components/layoutAdmin/header/header';
import { useFetchPosts } from '@/data/blog/useBlogList';
import useBlogMutation from '@/data/blog/useBlogMutation';
import { EllipsisVertical, Plus } from '@medusajs/icons';
import { Button, DropdownMenu, Input, Table, usePrompt } from '@medusajs/ui';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useMemo, useState } from 'react';

const pageSize = 7;

export const Route = createFileRoute('/dashboard/_layout/blog/')({
  component: BlogList,
});

function BlogList() {
  const [currentPage, setCurrentPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedPost, setExpandedPost] = useState<string | null>(null); // State for expanding content
  const navigate = useNavigate();
  const dialog = usePrompt();

  // Fetching posts data from the API
  const {
    data: listPosts,
    error,
    isLoading,
  } = useFetchPosts({
    limit: pageSize,
    page: currentPage + 1,
  });

  const pageCount = useMemo(() => {
    return listPosts?.meta
      ? Math.ceil(listPosts.meta.totalItems / pageSize)
      : 0;
  }, [listPosts]);

  const canNextPage = useMemo(
    () => currentPage < pageCount - 1,
    [currentPage, pageCount]
  );
  const canPreviousPage = useMemo(() => currentPage > 0, [currentPage]);

  const nextPage = () => {
    if (canNextPage) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const previousPage = () => {
    if (canPreviousPage) {
      setCurrentPage(prev => prev - 1);
    }
  };
  const { deletePost } = useBlogMutation();
  const deletePosts = async (_id: string) => {
    const userHasConfirmed = await dialog({
      title: 'Xóa bài viết',
      description: 'Bạn có chắc chắn muốn xóa bài viết này?',
    });
    if (userHasConfirmed) {
      // Call delete post function here
      deletePost.mutate(_id);
      console.log('Post deleted:', _id); // This would be replaced with actual delete logic
    }
  };

  const filteredPosts = useMemo(() => {
    return Array.isArray(listPosts?.data)
      ? listPosts.data.filter(post =>
          post.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : [];
  }, [listPosts, searchQuery]);
  console.log('list', listPosts);

  const toggleContent = (id: string) => {
    if (expandedPost === id) {
      setExpandedPost(null); // Collapse if already expanded
    } else {
      setExpandedPost(id); // Expand the clicked post
    }
  };

  if (isLoading) return <p>Đang tải bài viết...</p>;
  if (error) return <p>Lỗi: {error.message}</p>;

  return (
    <div className="h-screen overflow-y-auto">
      <Header title="Danh sách bài viết" pathname="/" />
      <div className="relative flex justify-between px-6 py-4">
        <div className="relative w-80">
          <Input
            className="bg-ui-bg-base"
            placeholder="Tìm kiếm"
            id="search-input"
            size="small"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="primary"
            onClick={() => navigate({ to: '/dashboard/blog/create' })}
          >
            <Plus />
            Tạo bài viết mới
          </Button>
        </div>
      </div>

      <div className="mx-6 flex flex-col gap-1 rounded-lg border border-gray-200 bg-ui-bg-base px-6 py-4">
        <Table>
          <thead>
            <Table.Row className="bg-ui-bg-base-hover">
              <Table.HeaderCell className="font-semibold text-ui-fg-base"></Table.HeaderCell>
              <Table.HeaderCell className="font-semibold text-ui-fg-base">
                Tiêu đề
              </Table.HeaderCell>
              <Table.HeaderCell className="font-semibold text-ui-fg-base">
                Tác giả
              </Table.HeaderCell>
              <Table.HeaderCell className="font-semibold text-ui-fg-base">
                Thẻ
              </Table.HeaderCell>
              <Table.HeaderCell className="font-semibold text-ui-fg-base">
                Ảnh đại diện
              </Table.HeaderCell>
              <Table.HeaderCell className="font-semibold text-ui-fg-base">
                Ngày tạo
              </Table.HeaderCell>
            </Table.Row>
          </thead>
          <tbody>
            {filteredPosts.length > 0 ? (
              filteredPosts.map(post => (
                <Table.Row
                  key={post.id}
                  className="[&_td:last-child]:w-[10%] [&_td:last-child]:whitespace-nowrap"
                >
                  <Table.Cell>
                    <DropdownMenu>
                      <DropdownMenu.Trigger asChild>
                        <button type="button" className="outline-none">
                          <EllipsisVertical />
                        </button>
                      </DropdownMenu.Trigger>
                      <DropdownMenu.Content className="space-y-2">
                        <DropdownMenu.Item className="p-2 text-ui-tag-neutral-text hover:text-ui-code-bg-base">
                          Xem chi tiết
                        </DropdownMenu.Item>
                        <DropdownMenu.Item className="gap-x-2" asChild>
                          <span onClick={async () => deletePosts(post._id)}>
                            Xóa
                          </span>
                        </DropdownMenu.Item>
                        <DropdownMenu.Item
                          className="gap-x-2"
                          onClick={() =>
                            void navigate({
                              to: `/dashboard/blog/${post.id}/edit`,
                            })
                          }
                        >
                          Chỉnh sửa
                        </DropdownMenu.Item>
                      </DropdownMenu.Content>
                    </DropdownMenu>
                  </Table.Cell>
                  <Table.Cell className="font-semibold text-ui-fg-base">
                    {post.title}
                  </Table.Cell>
                  <Table.Cell className="font-semibold text-ui-fg-base">
                    {/* Truncate content and allow expanding */}
                    <p
                      className={`${
                        expandedPost === post.id
                          ? 'line-clamp-none'
                          : 'line-clamp-2 cursor-pointer'
                      }`}
                      onClick={() => toggleContent(post.id)}
                    >
                      {post.author}
                    </p>
                  </Table.Cell>

                  <Table.Cell className="font-semibold text-ui-fg-base">
                    {post.tags.join(', ')}
                  </Table.Cell>
                  <Table.Cell className="font-semibold text-ui-fg-base">
                    {post.thumbnail && (
                      <img
                        src={post.thumbnail}
                        alt={post.title}
                        className="h-10 w-9 rounded-lg object-contain"
                      />
                    )}
                  </Table.Cell>
                  <Table.Cell className="font-semibold text-ui-fg-base">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </Table.Cell>
                </Table.Row>
              ))
            ) : (
              <Table.Row>
                <Table.Cell className="text-center" colSpan={7}>
                  Không có bài viết nào
                </Table.Cell>
              </Table.Row>
            )}
          </tbody>
        </Table>
        <Table.Pagination
          count={listPosts?.meta?.totalItems ?? 0}
          pageSize={pageSize}
          pageIndex={currentPage}
          pageCount={pageCount}
          canPreviousPage={canPreviousPage}
          canNextPage={canNextPage}
          previousPage={previousPage}
          nextPage={nextPage}
        />
      </div>
    </div>
  );
}

export default BlogList;
