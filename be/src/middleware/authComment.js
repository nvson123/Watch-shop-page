const jwt = require("jsonwebtoken");

// Middleware xác thực người dùng
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Lấy token từ header
  
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    // Giải mã token và xác thực
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "123456"); 
    req.user = decoded; // Lưu thông tin người dùng vào req.user
    next(); // Tiến tới bước tiếp theo trong pipeline
  } catch (error) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};

module.exports = authMiddleware;
