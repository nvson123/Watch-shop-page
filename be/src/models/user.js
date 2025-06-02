const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
      required: true,
      match: [
        /^[a-zA-Z0-9_]+$/,
        "Tên người dùng chỉ được chứa chữ cái, số và dấu gạch dưới",
      ],
    },
    email: {
      type: String,
      unique: true,
      trim: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    avatar: {
      type: String,
      default: "https://picsum.photos/100/100",
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    phone: {
      type: String,
      unique: true, // Không cho phép trùng số điện thoại
      trim: true,
      required: true, // Bắt buộc nhập
      match: [
        /^[0-9]{10,11}$/,
        "Số điện thoại không hợp lệ! Phải chứa 10-11 chữ số",
      ],
    },
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("User", UserSchema);
