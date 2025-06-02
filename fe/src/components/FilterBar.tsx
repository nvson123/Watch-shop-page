import instance from "../api/axiosIntance";
import React, { useState, useEffect } from "react";
import { toast } from "@medusajs/ui";
import CurrencyVND from "./config/vnd";

// Các kiểu dữ liệu cho các lựa chọn lọc
type ColorType = "Black" | "Blue" | "Gray" | "Green" | "Red" | "White";
type SizeType = "S" | "M" | "L" | "XL" | "XXL" | "All";

const colorMapping: Record<ColorType, string> = {
  Black: "#000000",
  Blue: "#0000FF",
  Gray: "#808080",
  Green: "#008000",
  Red: "#FF0000",
  White: "#FFFFFF",
};

const FilterBar: React.FC<{ onFilterChange: (products: any[]) => void }> = ({ onFilterChange }) => {
  const [selectedColor, setSelectedColor] = useState<ColorType | null>(null);
  const [selectedSize, setSelectedSize] = useState<SizeType | null>(null);
  const [priceRange, setPriceRange] = useState<number>(0); // Store the selected max price
  const [originalProducts, setOriginalProducts] = useState<any[]>([]); // Store the original product list

  const fetchFilteredProducts = async () => {
    try {
      const params = new URLSearchParams();
  
      // Thêm các bộ lọc vào tham số nếu có
      if (selectedColor) params.append("color", selectedColor.toLowerCase());
      if (selectedSize && selectedSize !== "All") params.append("size", selectedSize.toLowerCase());
  
      params.append("limit", "10");
      params.append("page", "1");
  
      console.log("Request URL:", `/products/filter?${params.toString()}`); // Debug: log URL
  
      const response = await instance.get(`/products/filter?${params.toString()}`);
      let filteredProducts = response.data.data;
  
      // Filter by price if selected
      if (priceRange > 0) {
        filteredProducts = filteredProducts.filter((product: any) => product.price <= priceRange);
      }
  
      // Kiểm tra và thông báo nếu không có sản phẩm nào
     
  
      onFilterChange(filteredProducts);
      setOriginalProducts(filteredProducts); // Store the filtered products as the original list
    } catch (error) {
      console.error("Lỗi khi lấy sản phẩm:", error);
      toast.error("Đã có lỗi xảy ra khi lấy sản phẩm");
    }
  };

  const resetFilters = () => {
    // Reset all filters and return to the original product list
    setSelectedColor(null);
    setSelectedSize(null);
    setPriceRange(0);
    onFilterChange(originalProducts); // Reset the list to the original state
  };

  useEffect(() => {
    // Fetch products with current filter selections when any filter is updated
    if (selectedColor || selectedSize || priceRange > 0) {
      console.log("Fetching products with filters", { selectedColor, selectedSize, priceRange });
      fetchFilteredProducts();
    } else {
      fetchFilteredProducts(); // Fetch original products if no filters are applied
    }
  }, [selectedColor, selectedSize, priceRange]);

  const handleColorSelect = (color: ColorType) => {
    // Toggle color selection
    setSelectedColor(prev => (prev === color ? null : color));
  };

  const handleSizeSelect = (size: SizeType) => {
    // Toggle size selection
    setSelectedSize(prev => (prev === size ? null : size));
  };

  return (
    <div>
      {/* Accordion cho Color */}
      <div className="accordion" id="color-filters">
  <div className="accordion-item mb-4 pb-3">
    <h5 className="accordion-header" id="accordion-heading-1">
      <button
        className="accordion-button fs-5 text-uppercase border-0 p-0"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#accordion-filter-color"
        aria-expanded="true"
        aria-controls="accordion-filter-color"
      >
        Màu sắc
      </button>
    </h5>
    <div
      id="accordion-filter-color"
      className="accordion-collapse show border-0"
      aria-labelledby="accordion-heading-1"
      data-bs-parent="#color-filters"
    >
      <div className="accordion-body px-0 pb-0">
        <div className="d-flex flex-wrap">
          {Object.entries(colorMapping).map(([color, hex]) => (
            <a
              key={color}
             
              className={`js-filter border-1 rounded-full p-1 m-1 ${selectedColor === color ? "selected" : ""}`}
              style={{
                backgroundColor: hex,
                width: "40px",
                height: "40px",
                display: "inline-block",
                margin: "5px",
                borderRadius: "50%",
                transition: "transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease",
                transform: selectedColor === color ? "scale(0.7)" : "scale(0.5)", // Phóng to vòng tròn khi chọn
                borderColor: selectedColor === color ? "#333" : "gray", // Viền đậm khi chọn
                borderWidth: selectedColor === color ? "3px" : "1px", // Độ rộng viền khi chọn
                boxShadow: selectedColor === color ? "0 0 15px rgba(0, 0, 0, 0.3)" : "none", // Hiệu ứng đổ bóng khi chọn
              }}
              onClick={() => handleColorSelect(color as ColorType)}
              onMouseEnter={(e) => {
                e.target.style.transform = "scale(0.7)"; // Hiệu ứng khi hover
                e.target.style.boxShadow = "0 0 8px rgba(0, 0, 0, 0.15)"; // Hiệu ứng đổ bóng khi hover
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = selectedColor === color ? "scale(0.7)" : "scale(0.5)"; // Giữ hiệu ứng nếu đã chọn
                e.target.style.boxShadow = "none"; // Loại bỏ hiệu ứng đổ bóng khi không hover
              }}
            ></a>
          ))}
        </div>
      </div>
    </div>
  </div>
</div>



      {/* Accordion cho Size */}
      <div className="accordion" id="size-filters">
        <div className="accordion-item mb-4 pb-3">
          <h5 className="accordion-header" id="accordion-heading-size">
            <button
              className="accordion-button fs-5 text-uppercase border-0 p-0"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#accordion-filter-size"
              aria-expanded="true"
              aria-controls="accordion-filter-size"
            >
              Kích cỡ
            </button>
          </h5>
          <div
            id="accordion-filter-size"
            className="accordion-collapse show border-0"
            aria-labelledby="accordion-heading-size"
            data-bs-parent="#size-filters"
          >
            <div className="accordion-body px-0 pb-0">
              <div className="d-flex flex-wrap">
                {["S", "M", "L", "XL", "XXL"].map((size) => (
                  <a
                    key={size}
                   
                    className={`swatch-size btn btn-sm js-filter mb-3 me-3 ${selectedSize === size ? "selected" : ""}`}
                    style={{
                      border: selectedSize === size ? "1px solid blue" : "1px solid lightgray",
                      transform: selectedSize === size ? "scale(1)" : "scale(1)",
                      transition: "transform 0.2s ease, border-color 0.2s ease",
                    }}
                    onClick={() => handleSizeSelect(size as SizeType)}
                  >
                    {size}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Accordion cho Price */}
      <div className="accordion" id="price-filters">
        <div className="accordion-item mb-4">
          <h5 className="accordion-header mb-2" id="accordion-heading-price">
            <button
              className="accordion-button fs-5 text-uppercase border-0 p-0"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#accordion-filter-price"
              aria-expanded="true"
              aria-controls="accordion-filter-price"
            >
              Giá
            </button>
          </h5>
          <div
            id="accordion-filter-price"
            className="accordion-collapse show border-0"
            aria-labelledby="accordion-heading-price"
            data-bs-parent="#price-filters"
          >
            <div className="price-range__info d-flex align-items-center mt-2">
              <span className="text-secondary me-2">Giá:</span>
              <input
                type="range"
                className="form-range price-range__slider mx-2"
                min="0"
                max="50000000"
                step="10000"
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
              />
              <span className=" ms-3">
                <CurrencyVND amount={priceRange} />
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Button to reset filters */}
      <button className="btn btn-primary mt-2" onClick={resetFilters}>
        Xóa tất cả bộ lọc
      </button>
    </div>
  );
};

export default FilterBar;
