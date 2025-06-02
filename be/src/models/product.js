const mongoose = require("mongoose");

const variantSchema = new mongoose.Schema({
  size: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    default: 0,
  },
  countInStock: {
    type: Number,
    required: true,
    default: 0,
  },
  weight: {
    type: Number,
    required: true,
    default: 0,
  },
  sku: {
    type: String,
    unique: true,
  },
});

// Middleware để tự động tạo SKU cho variant trước khi lưu
variantSchema.pre("save", function (next) {
  if (!this.sku) {
    // Tạo SKU tự động nếu không có
    this.sku = `${this.size}-${this.color}-${Date.now()}`;
  }
  next();
});

// Định nghĩa schema cho Product
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      lowercase: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    image: {
      type: String,
    },
    gallery: {
      type: [String], // Chỉ định rõ kiểu dữ liệu cho mảng
    },
    description: {
      type: String,
    },
    detaildescription: {
      type: String,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    tags: {
      type: [String], // Chỉ định rõ kiểu dữ liệu cho mảng
    },
    variants: [variantSchema],
  },
  { timestamps: true, versionKey: false } // Tự động thêm thời gian tạo và cập nhật
);

// Xuất mô hình Product
module.exports = mongoose.model("Product", productSchema);
