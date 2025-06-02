const express = require("express");
const {
  saveLocation,
  getLocations,
  deleteLocation,
} = require("../controllers/address");
const router = express.Router();
// Route lưu tọa độ
router.post("/save", saveLocation);

// Route lấy danh sách tọa độ
router.get("/all", getLocations);
// Route xóa tọa độ
router.delete("/address/:id", deleteLocation);

module.exports = router;