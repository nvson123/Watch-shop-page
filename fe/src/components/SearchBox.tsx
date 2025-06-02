import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";

interface ISearchBoxProps {
  onClose: VoidFunction;
}

const SearchBox = ({ onClose }: ISearchBoxProps) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    // Xóa thông báo lỗi trước đó
    setError("");

    // Kiểm tra đầu vào
    if (searchTerm.trim().length < 2) {
      setError("Vui lòng nhập ít nhất 2 ký tự.");
      return;
    }

    // Điều hướng tới trang tìm kiếm
    navigate({
      to: "/searchList",
      search: {
        search: searchTerm,
      },
    });

    // Đóng modal
    onClose();
  };

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="relative w-full max-w-md p-4 bg-white rounded-lg shadow-lg">
          {/* Nút đóng modal */}
          <button
            onClick={onClose}
            className="absolute top-2 right-2 p-2 rounded-full hover:bg-gray-200 transition"
            aria-label="Close search box"
          >
            <img
              src="https://themewagon.github.io/cozastore/images/icons/icon-close2.png"
              alt="Close"
              className="w-5 h-5"
            />
          </button>

          {/* Form tìm kiếm */}
          <form
            onSubmit={handleSearch}
            className="flex flex-col space-y-3 p-3 border border-gray-300 rounded-md shadow-sm"
          >
            <div className="flex items-center space-x-3">
              <button
                type="submit"
                className="p-2 text-gray-500 hover:text-gray-700 transition"
                aria-label="Search"
              >
                <i className="fa-solid fa-magnifying-glass p-3 text-[20px] hover:text-blue-400"></i>
              </button>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Tìm kiếm ngay..."
                autoFocus
                className="w-full p-2 text-sm placeholder-gray-400 focus:outline-none focus:ring focus:ring-blue-500"
                aria-label="Search input"
              />
            </div>
            {/* Hiển thị lỗi */}
            {error && <p className="text-red-500 text-sm">{error}</p>}
          </form>
        </div>
      </div>
    </>
  );
};

export default SearchBox;
