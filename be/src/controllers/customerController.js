const CustomerInfo = require("../models/customerInfor");

// Tạo mới khách hàng
const createCustomer = async (req, res) => {
  try {
    const { userId, name, phone, city, district, ward, address, isDefault } = req.body;

    // Kiểm tra các trường bắt buộc
    if (!userId || !name || !phone || !city || !district || !ward || !address) {
      return res.status(400).json({
        success: false,
        message: "Các trường userId, name, phone, city, district, ward, address là bắt buộc!",
      });
    }

    // Kiểm tra xem userId đã có khách hàng nào chưa
    const existingCustomers = await CustomerInfo.find({ userId });

    let isDefaultValue = !!isDefault; // Chuyển giá trị isDefault thành boolean

    // Nếu chưa có khách hàng nào, đặt isDefault là true
    if (existingCustomers.length === 0) {
      isDefaultValue = true;
    }

    // Nếu địa chỉ mới là mặc định, cập nhật tất cả các địa chỉ khác thành không mặc định
    if (isDefaultValue) {
      await CustomerInfo.updateMany({ userId }, { isDefault: false });
    }

    // Tạo địa chỉ khách hàng mới
    const newCustomer = new CustomerInfo({
      userId,
      name,
      phone,
      city,
      district,
      ward,
      address,
      isDefault: isDefaultValue, // Sử dụng giá trị xác định ở trên
    });

    // Lưu thông tin địa chỉ vào cơ sở dữ liệu
    await newCustomer.save();

    return res.status(201).json({
      success: true,
      message: "Khách hàng được tạo thành công!",
      data: newCustomer,
    });
  } catch (error) {
    console.error("Lỗi khi tạo khách hàng:", error);

    // Phản hồi lỗi với thông tin chi tiết
    return res.status(500).json({
      success: false,
      message: "Có lỗi xảy ra trong quá trình tạo khách hàng!",
      error: error.message, // Gửi thông tin chi tiết lỗi để debug
    });
  }
};


  const getCustomers = async (req, res) => {
    try {
      const { userId } = req.params; // Lấy userId từ tham số URL
    
      // Tìm tất cả các địa chỉ của khách hàng với userId
      const customerInfos = await CustomerInfo.find({ userId });
    
      if (customerInfos.length === 0) {
        return res.status(404).json({
          success: false,
          message: "Không tìm thấy địa chỉ nào cho khách hàng.",
        });
      }
    
      return res.status(200).json({
        success: true,
        message: "Danh sách địa chỉ của khách hàng.",
        data: customerInfos,
      });
    } catch (error) {
      console.error("Lỗi khi lấy danh sách địa chỉ:", error);
      return res.status(500).json({
        success: false,
        message: "Có lỗi xảy ra khi lấy danh sách địa chỉ!",
      });
    }
  };
  
  const editCustomer = async (req, res) => {
    try {
      const { id, userId } = req.params;
      const { name, phone, city, district, ward, address, isDefault } = req.body;
  
      if (!userId || !id) {
        return res.status(400).json({
          success: false,
          message: "Thiếu userId hoặc id trong yêu cầu!",
        });
      }
  
      if (!name || !phone || !city || !district || !ward || !address) {
        return res.status(400).json({
          success: false,
          message: "Thiếu dữ liệu cần thiết trong payload!",
        });
      }
  
      const customer = await CustomerInfo.findOne({ _id: id, userId });
      if (!customer) {
        return res.status(404).json({
          success: false,
          message: "Không tìm thấy khách hàng!",
        });
      }
  
      if (isDefault) {
        await CustomerInfo.updateMany(
          { userId },
          { $set: { isDefault: false } }
        );
      }
  
      Object.assign(customer, { name, phone, city, district, ward, address, isDefault });
      const updatedCustomer = await customer.save();
  
      const hasDefault = await CustomerInfo.findOne({ userId, isDefault: true });
      if (!hasDefault) {
        const firstCustomer = await CustomerInfo.findOne({ userId }).sort({ _id: 1 });
        if (firstCustomer) {
          firstCustomer.isDefault = true;
          await firstCustomer.save();
        }
      }
  
      return res.status(200).json({
        success: true,
        data: updatedCustomer,
      });
    } catch (error) {
      console.error("Lỗi cập nhật địa chỉ:", error.message);
      return res.status(500).json({
        success: false,
        message: "Đã xảy ra lỗi trong quá trình xử lý!",
      });
    }
  };
  
  const getCustomerById = async (req, res) => {
    try {
      const { userId } = req.params; 
  
      const customerInfo = await CustomerInfo.findOne({ userId, isDefault: true });
  
      if (!customerInfo) {
        return res.status(404).json({
          success: false,
          message: "Không tìm thấy địa chỉ mặc định cho khách hàng.",
        });
      }
  
      return res.status(200).json({
        success: true,
        message: "Địa chỉ mặc định của khách hàng.",
        data: customerInfo,
      });
    } catch (error) {
      console.error("Lỗi khi lấy địa chỉ khách hàng:", error);
      return res.status(500).json({
        success: false,
        message: "Có lỗi xảy ra khi lấy địa chỉ khách hàng.",
      });
    }
  };
// Xóa khách hàng
const deleteCustomer = async (req, res) => {
  try {
    const { id } = req.params; // Lấy ID của khách hàng từ tham số URL

    // Kiểm tra xem khách hàng có tồn tại không
    const customer = await CustomerInfo.findById(id);
    if (!customer) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy khách hàng với ID được cung cấp!",
      });
    }

    // Xóa khách hàng
    await customer.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Khách hàng đã được xóa thành công!",
    });
  } catch (error) {
    console.error("Lỗi khi xóa khách hàng:", error);
    return res.status(500).json({
      success: false,
      message: "Có lỗi xảy ra khi xóa khách hàng!",
    });
  }
};

const editCustomerAddress = async (req, res) => {
  try {
    const { id, userId } = req.params;
    const { isDefault } = req.body; 
    if (!userId || !id) {
      return res.status(400).json({
        success: false,
        message: "Thiếu userId hoặc id trong yêu cầu!",
      });
    }

    const customer = await CustomerInfo.findOne({ _id: id, userId });
    if (!customer) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy địa chỉ của khách hàng!",
      });
    }

    if (isDefault !== undefined) {
      if (isDefault) {
        
        await CustomerInfo.updateMany(
          { userId, _id: { $ne: id } },
          { $set: { isDefault: false } }
        );
      }
      customer.isDefault = isDefault; 
    }


    const updatedCustomer = await customer.save();

    
    const hasDefault = await CustomerInfo.exists({ userId, isDefault: true });
    if (!hasDefault) {
      const firstCustomer = await CustomerInfo.findOne({ userId }).sort({ _id: 1 });
      if (firstCustomer) {
        firstCustomer.isDefault = true;
        await firstCustomer.save();
      }
    }

    return res.status(200).json({
      success: true,
      data: updatedCustomer,
    });
  } catch (error) {
    console.error("Lỗi cập nhật địa chỉ:", error.message);
    return res.status(500).json({
      success: false,
      message: "Đã xảy ra lỗi trong quá trình xử lý!",
    });
  }
};





  

module.exports = { createCustomer, getCustomers, editCustomer, getCustomerById, deleteCustomer, editCustomerAddress};