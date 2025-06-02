type Variant = {
  size: string;
  color: string;
  price: number;
  countInStock: number;
  weight: number;
  sku: string;
};

type Category = {
  data: Category | PromiseLike<Category>;
  status: number;
  _id: string;
  name: string;
  slug: string;
};

interface Categori {
  category: Category; // Thêm thuộc tính `category` chứa thông tin danh mục
  products: Product[]; // Nếu products có cấu trúc cụ thể, hãy thay `any[]` bằng kiểu thích hợp
}
type Product = {
  _id: string;
  name: string;
  price: number;
  slug: string;
  image: string;
  category: string[]; // Thay đổi từ string thành Category
  gallery?: string[];
  description: string;
  discount: number;
  countInStock: number;
  featured?: boolean;
  tags?: string[];
  variants: Variant[];
  comments?: Comment[]; // Thêm danh sách bình luận cho sản phẩm
};

type ProductParams = {
  keyWord?: string;
  page: number;
  limit: number;
};
interface CategoryParams {
  name?: string;
  parentCategoryId?: string;
  sort?: string;
}

type MetaData = {
  totalItems: number;
};
