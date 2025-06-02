const express = require("express");
const router = express.Router();
const {
  createCoupon,
  getCoupons,
  updateCoupon,
  deleteCoupon,
  applyCoupon,
  getAvailableCoupons,
  getCouponById,
  getCouponUsers
} = require("../controllers/coupon");

// Tạo mã giảm giá mới
router.post("/create-coupon", createCoupon);

// Lấy danh sách các mã giảm giá
router.get("/get-coupon", getCoupons);
router.get("/get-coupon/:couponId", getCouponById);
// Cập nhật mã giảm giá
router.put("/update-coupon/:couponId", updateCoupon);

// Xoá mã giảm giá
router.delete("/delete-coupon/:couponId", deleteCoupon);

// Áp dụng mã giảm giá
router.post("/apply-coupon", applyCoupon);

// Lấy các mã giảm giá hợp lệ cho người dùng chọn
router.get("/available-coupon", getAvailableCoupons);

router.get("/coupon/:couponId/users", getCouponUsers);

module.exports = router;