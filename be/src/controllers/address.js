const Location = require("../models/address");
const saveLocation = async (req, res) => {
  try {
    const { lat, lng } = req.body;

    // Kiểm tra giá trị nhập vào
    if (!lat || !lng) {
      return res
        .status(400)
        .json({ message: "Latitude and Longitude are required" });
    }

    const location = new Location({ lat, lng });
    await location.save();
    res.status(201).json({ message: "Location saved successfully", location });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Lấy tất cả tọa độ
const getLocations = async (req, res) => {
  try {
    const locations = await Location.find();
    res.status(200).json(locations);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
const deleteLocation = async (req, res) => {
  const { id } = req.params;

  try {
    // Kiểm tra xem tọa độ có tồn tại không
    const location = await Location.findById(id);
    if (!location) {
      return res.status(404).json({ message: "Location not found" });
    }

    // Xóa tọa độ
    await Location.findByIdAndDelete(id);

    res.status(200).json({ message: "Location deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  saveLocation,
  getLocations,
  deleteLocation,
};