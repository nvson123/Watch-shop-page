import CurrencyVND from '@/components/config/vnd';
import Header from '@/components/layoutAdmin/header/header';
import {
  useFetchCategory,
  useFetchProducts,
} from '@/data/products/useProductList';
import useProductMutation from '@/data/products/useProductMutation';
import { Adjustments, EllipsisVertical, Plus } from '@medusajs/icons';
import {
  Badge,
  Button,
  Checkbox,
  DropdownMenu,
  Input,
  Table,
  usePrompt,
} from '@medusajs/ui';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useMemo, useState } from 'react';

const pageSize = 10;

export const Route = createFileRoute('/dashboard/_layout/products/')({
  component: ProductList,
});

function ProductList() {
  const [currentPage, setCurrentPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState(''); // State lưu giá trị tìm kiếm
  const navigate = useNavigate();
  const { data: categories } = useFetchCategory(); // Lấy danh mục từ API
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]); // State cho danh sách các category đã chọn

  const dialog = usePrompt();

  const {
    data: listproduct,
    error,
    isLoading,
  } = useFetchProducts({
    limit: pageSize,
    page: currentPage + 1,
  });

  const pageCount = useMemo(() => {
    return listproduct?.meta
      ? Math.ceil(listproduct.meta.totalItems / pageSize)
      : 0;
  }, [listproduct]);

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

  const { deleteProduct } = useProductMutation();
  const deleteEntity = async (_id: string) => {
    const userHasConfirmed = await dialog({
      title: 'Xóa sản phẩm',
      description: 'Bạn có muốn xóa sản phẩm này không ?',
    });
    if (userHasConfirmed) {
      deleteProduct.mutate(_id);
    }
  };

  const previousPage = () => {
    if (canPreviousPage) {
      setCurrentPage(prev => prev - 1);
    }
  };

  // Filter products based on search term and selected categories
  const filteredProducts = useMemo(() => {
    let filtered = listproduct?.data ?? [];

    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategories.length > 0) {
      filtered = filtered.filter(product =>
        selectedCategories.includes(product.category?.name ?? '')
      );
    }

    return filtered;
  }, [listproduct, searchTerm, selectedCategories]);

  const currentProducts = useMemo(() => {
    return (
      filteredProducts.map(product => ({
        ...product,
        totalCountInStock:
          product.countInStock !== undefined
            ? product.countInStock
            : product.variants?.reduce(
                (total, variant) => total + (variant.countInStock || 0),
                0
              ) || 0,
      })) ?? []
    );
  }, [filteredProducts]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const toggleCategorySelection = (category: string) => {
    setSelectedCategories(prev => {
      if (prev.includes(category)) {
        return prev.filter(c => c !== category); // Remove category if it's already selected
      } else {
        return [...prev, category]; // Add category to selection
      }
    });
  };

  return (
    <div className="h-screen overflow-y-auto">
      <Header title="Danh sách sản phẩm " pathname="/" />
      <div className="relative flex justify-between px-6 py-4">
        <div className="relative w-80">
          <Input
            className="bg-ui-bg-base"
            id="search-input"
            placeholder="Tìm kiếm"
            size="small"
            value={searchTerm} // Liên kết giá trị input
            onChange={e => setSearchTerm(e.target.value)} // Cập nhật giá trị tìm kiếm
          />
        </div>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenu.Trigger asChild>
              <Button variant="secondary">
                <Adjustments className="text-black" />
                Lọc
              </Button>
            </DropdownMenu.Trigger>

            <DropdownMenu.Content className="space-y-2 rounded-md border bg-white p-4 shadow-lg">
              <DropdownMenu.Item
                className="flex items-center gap-2"
                onSelect={e => {
                  e.preventDefault();
                  setSelectedCategories([]); // Reset selection when "All Categories" is selected
                }}
              >
                <Checkbox checked={selectedCategories.length === 0} />
                <label>Tất cả danh mục</label>
              </DropdownMenu.Item>

              {categories?.map(category => (
                <DropdownMenu.Item
                  key={category.id}
                  className="flex items-center gap-2"
                  onSelect={e => {
                    e.preventDefault(); // Ngăn đóng DropdownMenu
                    toggleCategorySelection(category.name); // Toggle category selection
                  }}
                >
                  <Checkbox
                    checked={selectedCategories.includes(category.name)}
                  />
                  <label>{category.name}</label>
                </DropdownMenu.Item>
              ))}
            </DropdownMenu.Content>
          </DropdownMenu>

          <Button
            variant="primary"
            onClick={() => navigate({ to: '/dashboard/products/create' })}
          >
            <Plus />
            Thêm sản phẩm
          </Button>
        </div>
      </div>

      <div className="mx-6 flex flex-col gap-1 rounded-lg border border-gray-200 bg-ui-bg-base px-6 py-4">
        <Table>
          <Table.Row className="bg-ui-bg-base-hover">
            <Table.HeaderCell className="font-semibold text-ui-fg-base"></Table.HeaderCell>
            <Table.HeaderCell className="font-semibold text-ui-fg-base">
              Tên sản phẩm
            </Table.HeaderCell>
            <Table.HeaderCell className="font-semibold text-ui-fg-base">
              Ảnh
            </Table.HeaderCell>
            <Table.HeaderCell className="font-semibold text-ui-fg-base">
              Giá (VND)
            </Table.HeaderCell>
            <Table.HeaderCell className="font-semibold text-ui-fg-base">
              Danh mục
            </Table.HeaderCell>
            <Table.HeaderCell className="font-semibold text-ui-fg-base">
              Mô tả
            </Table.HeaderCell>
          </Table.Row>
          <Table.Body>
            {currentProducts.length > 0 ? (
              currentProducts.map(product => (
                <Table.Row
                  key={product._id}
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
                        <DropdownMenu.Item
                          className="p-2 text-ui-tag-neutral-text hover:text-ui-code-bg-base"
                          asChild
                        >
                          <span
                            onClick={() =>
                              void navigate({
                                to: `/dashboard/products/${product.slug}/viewdetail`,
                              })
                            }
                          >
                            Chi tiết sản phẩm
                          </span>
                        </DropdownMenu.Item>
                        <DropdownMenu.Item className="gap-x-2" asChild>
                          <span onClick={async () => deleteEntity(product._id)}>
                            Xóa
                          </span>
                        </DropdownMenu.Item>
                        <DropdownMenu.Item
                          className="gap-x-2"
                          onClick={() =>
                            void navigate({
                              to: `/dashboard/comment/${product._id}/comment`,
                            })
                          }
                        >
                          Xem bình luận
                        </DropdownMenu.Item>
                        <DropdownMenu.Item
                          className="gap-x-2"
                          onClick={() =>
                            void navigate({
                              to: `/dashboard/products/${product._id}/edit`,
                            })
                          }
                        >
                          Sửa sản phẩm
                        </DropdownMenu.Item>
                      </DropdownMenu.Content>
                    </DropdownMenu>
                  </Table.Cell>
                  <Table.Cell className="font-semibold text-ui-fg-base">
                    {product.name}
                  </Table.Cell>
                  <Table.Cell>
                    {product.image && (
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-10 w-9 rounded-lg object-contain"
                      />
                    )}
                  </Table.Cell>
                  <Table.Cell className="font-semibold text-ui-fg-base">
                    <CurrencyVND amount={product.price} />
                  </Table.Cell>
                  <Table.Cell className="font-semibold text-ui-fg-base">
                    <Badge color={product.category?.name ? 'blue' : 'red'}>
                      {product.category?.name || 'Danh mục không hiển thị'}
                    </Badge>
                  </Table.Cell>
                  <Table.Cell className="max-w-xs truncate font-semibold text-ui-fg-base">
                    {product.description}
                  </Table.Cell>
                </Table.Row>
              ))
            ) : (
              <Table.Row>
                <Table.Cell className="text-center">
                  Không có sản phẩm nào
                </Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table>
        <Table.Pagination
          count={listproduct?.meta?.totalItems ?? 0}
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

export default ProductList;
