const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary.config");
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "products",
    format: async (req, file) => "png",
    public_id: (req, file) =>
      file.originalname.substring(0, file.originalname.lastIndexOf(".")),
    resource_type: "auto",
    transformation: [
      {
        width: 300,
        height: 300,
        crop: "limit",
      },
    ],
  },
});

const upload = multer({ storage: storage });

module.exports = {
  upload,
};