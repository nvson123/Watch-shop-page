const cloudinary = require("cloudinary").v2;
require("dotenv").config();

cloudinary.config({
  cloud_name: "dfjsl3isc",
  api_key: "436916755399874",
  api_secret: "MpGAd3yEMZ5FBnFwQ1az8jz-8Ts",
});

module.exports = cloudinary;