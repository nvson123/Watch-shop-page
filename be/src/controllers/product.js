const CreateSlugByTitle = require("../config/slug"); // Không sử dụng destructuring
const Category = require("../models/category");
const Product = require("../models/product");

const getProduct = async (req, res) => {
  const { limit = 10, page = 1 } = req.query;
  const skip = (page - 1) * limit;

  try {
    // Lấy tất cả các sản phẩm và kiểm tra trạng thái tồn kho
    const products = await Product.find()
      .limit(Number(limit))
      .skip(Number(skip))
      .populate({
        path: "category",
        match: { status: "SHOW" },  // Điều kiện lọc danh mục có trạng thái là SHOW
        select: "name"
      });

    const totalItems = await Product.countDocuments();

    // Cập nhật thêm tag 'Hết hàng' nếu tất cả các variant của sản phẩm có countInStock = 0
    const productsWithTags = products.map(product => {
      const isOutOfStock = product.variants.every(variant => variant.countInStock === 0);
      return {
        ...product.toObject(),
        tags: isOutOfStock ? ["Hết hàng"] : []
      };
    });

    if (productsWithTags.length === 0) {
      return res.status(200).json({
        meta: {
          totalItems: 0,
          totalPages: 0,
          currentPage: Number(page),
          limit: Number(limit),
        },
        data: [],
      });
    }

    return res.status(200).json({
      meta: {
        totalItems,
        totalPages: Math.ceil(totalItems / limit),
        currentPage: Number(page),
        limit: Number(limit),
      },
      data: productsWithTags,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const getProductById = async (req, res) => {
  try {
    const data = await Product.findById(req.params.id);
    if (!data) {
      return res.status(404).json({ message: "Không có sản phẩm nào" });
    }
    return res.status(200).json({
      data,
    });

  } catch (error) {
    // Xử lý lỗi nếu có
    console.error('Error fetching product:', error);
    res.status(500).json({ message: error.message });
  }
};

const getProductBySlug = async (req, res) => {
  try {
    const productSlug = req.params.slug; // Lấy slug từ tham số đường dẫn

    // Tìm sản phẩm theo slug
    const product = await Product.findOne({ slug: productSlug });

    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }

    // Kiểm tra tồn kho và thêm tag nếu cần
    const isOutOfStock = product.variants?.every(
      (variant) => variant.countInStock === 0
    );
    const tags = isOutOfStock ? ["Hết hàng"] : [];
    // Thêm tag vào phản hồi
    return res.status(200).json({ product: { ...product.toObject(), tags } });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const addProduct = async (req, res) => {
  try {
    // Lấy file ảnh từ req (req.image) và nhiều ảnh gallery
    // Giả sử req.body có một trường variants chứa danh sách các biến thể
    const { variants, ...productData } = req.body;

    // Kiểm tra xem có variants không và tính tổng countInStock
    const totalCountInStock =
      variants?.reduce((total, variant) => {
        return total + Number(variant.countInStock);
      }, 0) || 0; // Nếu không có variants, totalCountInStock sẽ là 0

    // Tạo slug từ name
    const slug = CreateSlugByTitle(productData.name); // Đảm bảo sử dụng productData.name

    // Tạo sản phẩm mới với totalCountInStock
    const product = new Product({
      ...productData,
      slug, // Gán slug vào sản phẩm
      countInStock: totalCountInStock,
      variants, // Nếu bạn cũng muốn lưu biến thể
    });

    // Lưu sản phẩm vào cơ sở dữ liệu
    const data = await product.save();

    return res.status(201).json({
      message: "Tạo sản phẩm thành công",
      data,
    });
  } catch (error) {
    // Trả về thông báo lỗi cụ thể hơn nếu có thể
    return res
      .status(500)
      .json({ message: error.message || "Có lỗi xảy ra khi tạo sản phẩm." });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const data = await Product.findByIdAndDelete(req.params.id);
    if (data.length < 0) {
      return res.status(404).json({ message: "Không có sản phẩm nào" });
    }
    return res.status(201).json({ messages: "Xóa sản phẩm thành công", data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const updates = req.body;

    // Tìm sản phẩm trước
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "No product found" });
    }

    // Xử lý cập nhật variants nếu có
    if (updates.variants && Array.isArray(updates.variants)) {
      const existingVariants = product.variants || [];
      const updatedVariants = updates.variants.map((variant) => {
        // Nếu variant chưa có SKU, tạo SKU mới
        if (!variant.sku) {
          variant.sku = `${variant.size}-${variant.color || "unknown"}-${Date.now()}`;
        }
        return variant;
      });

      // Gộp variants cũ và mới
      product.variants = [...existingVariants, ...updatedVariants];
    }

    // Cập nhật sản phẩm với thông tin mới
    Object.assign(product, updates); // Áp dụng các thay đổi khác
    const savedProduct = await product.save();

    return res.status(200).json({
      message: "Cập nhật sản phẩm thành công",
      data: savedProduct,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const relatedProduct = async (req, res) => {
  try {
    const product = await Product.find({ categories: req.params.categoryId });
    return res.status(201).json({ product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const uploadThumbnail = async (req, res) => {
  const file = req.file;
  if (!file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  res.json(file.path);
};

const uploadGallery = async (req, res) => {
  try {
    const files = req.files;
    if (!files || files.length === 0) {
      return res.status(400).json({ message: "No files uploaded" });
    }

    const uploadedFiles = [];

    for (const file of files) {
      uploadedFiles.push(file.path);
    }

    res.json(uploadedFiles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" + error });
  }
};
const getProductAll = async (req, res) => {
  const { limit = 10, page = 1 } = req.query;
  const skip = (page - 1) * limit;
  try {
    // Lọc sản phẩm chỉ lấy các sản phẩm có danh mục có trạng thái SHOW
    const products = await Product.find()
      .limit(Number(limit))
      .skip(Number(skip))
      .populate({
        path: "category",
        match: { status: "SHOW" },  // Điều kiện lọc danh mục có trạng thái là SHOW
        select: "name"
      });

    // Lọc ra các sản phẩm có category là null (các sản phẩm không có danh mục có trạng thái SHOW)
    const filteredProducts = products.filter(product => product.category !== null);

    const totalItems = await Product.countDocuments();

    // Cập nhật thêm tag 'Hết hàng' nếu tất cả các variant của sản phẩm có countInStock = 0
    const productsWithTags = filteredProducts.map(product => {
      const isOutOfStock = product.variants.every(variant => variant.countInStock === 0);
      return {
        ...product.toObject(),
        tags: isOutOfStock ? ["Hết hàng"] : []
      };
    });

    if (productsWithTags.length === 0) {
      return res.status(200).json({
        meta: {
          totalItems: 0,
          totalPages: 0,
          currentPage: Number(page),
          limit: Number(limit),
        },
        data: [],
      });
    }

    return res.status(200).json({
      meta: {
        totalItems,
      },
      data: productsWithTags,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


/// search products
const searchProduct = async (req, res) => {
  try {
    const { search = "", limit = 10, page = 1 } = req.query;
    const skip = (page - 1) * limit;

    // Loại bỏ khoảng trắng thừa
    const trimmedSearch = search.trim();

    // Kiểm tra nếu từ khóa tìm kiếm rỗng
    if (!trimmedSearch) {
      return res.status(400).json({
        message: "Vui lòng nhập từ khóa tìm kiếm.",
      });
    }

    // Tạo query tìm kiếm
    const query = {
      name: { $regex: trimmedSearch, $options: "i" }, // Tìm kiếm không phân biệt chữ hoa/chữ thường
    };

    // Lấy danh sách sản phẩm
    const products = await Product.find(query)
      .limit(Number(limit))
      .skip(Number(skip))
      .populate("category", "name");

    // Đếm tổng số sản phẩm
    const totalItems = await Product.countDocuments(query);

    // Trả về kết quả
    return res.status(200).json({
      meta: {
        totalItems,
        totalPages: Math.ceil(totalItems / limit),
        currentPage: Number(page),
        limit: Number(limit),
      },
      data: products,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};




const filterProducts = async (req, res) => {
  try {
    const { color, size, minPrice, maxPrice, limit = 10, page = 1 } = req.query;
    const skip = (page - 1) * limit;

    // Tạo query động dựa trên các tham số lọc
    const query = {};

    if (color) {
      query["variants.color"] = { $regex: color, $options: "i" }; // Lọc theo màu (không phân biệt chữ hoa/thường)
    }
    if (size) {
      query["variants.size"] = { $regex: size, $options: "i" }; // Lọc theo size (không phân biệt chữ hoa/thường)
    }
    if (minPrice) {
      query["variants.price"] = { $gte: Number(minPrice) }; // Lọc giá tối thiểu
    }
    if (maxPrice) {
      query["variants.price"] = query["variants.price"]
        ? { ...query["variants.price"], $lte: Number(maxPrice) }
        : { $lte: Number(maxPrice) }; // Lọc giá tối đa
    }

    // Lấy danh sách sản phẩm dựa trên query
    const products = await Product.find(query)
      .limit(Number(limit))
      .skip(Number(skip))
      .populate("category", "name");

    const totalItems = await Product.countDocuments(query);

    if (products.length === 0) {
      return res.status(200).json({
        meta: {
          totalItems: 0,
          totalPages: 0,
          currentPage: Number(page),
          limit: Number(limit),
        },
        data: [],
      });
    }

    return res.status(200).json({
      meta: {
        totalItems,
        totalPages: Math.ceil(totalItems / limit),
        currentPage: Number(page),
        limit: Number(limit),
      },
      data: products,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateProductsCategoris = async (req, res) => {
  try {
    const { categoryId, newCategoryId } = req.body;
    // Kiểm tra sự tồn tại của danh mục
    const [oldCategory, newCategory] = await Promise.all([
      Category.findById(categoryId),
      Category.findById(newCategoryId),
    ]);

    if (!oldCategory) {
      return res.status(404).json({ message: "Danh mục cũ không tồn tại" });
    }

    if (!newCategory) {
      return res.status(404).json({ message: "Danh mục mới không tồn tại" });
    }

    // Cập nhật sản phẩm
    const updatedProducts = await Product.updateMany(
      { category: categoryId },
      { $set: { category: newCategoryId } }
    );

    // Nếu không có sản phẩm, tiếp tục thực hiện mà không trả lỗi
    if (updatedProducts.modifiedCount === 0) {
      console.log("Không có sản phẩm để cập nhật");
    }

    return res.status(200).json({
      message: "Danh mục cũ đã được xử lý thành công",
      totalUpdated: updatedProducts.modifiedCount,
    });
  } catch (error) {
    console.error("Lỗi trong updateProductsCategoris:", error.message);
    res.status(500).json({
      message: "Có lỗi xảy ra trong quá trình xử lý danh mục",
      error: error.message,
    });
  }
};


module.exports = {
  getProduct,
  getProductById,
  addProduct,
  deleteProduct,
  updateProduct,
  relatedProduct,
  uploadThumbnail,
  uploadGallery,
  getProductAll,
  getProductBySlug,
  searchProduct,
  filterProducts,
  updateProductsCategoris,
};
