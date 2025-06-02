const Joi = require("joi");

const registerSchema = Joi.object({
  username: Joi.string()
    .max(10) // Giới hạn tối đa 10 ký tự
    .required()
    .trim()
    .messages({
      "any.required": "Username Bắt Buộc",
      "string.empty": "Username không được để trống",
      "string.trim": "Username không được chứa khoảng trắng",
      "string.max": "Username không được vượt quá 10 ký tự",
    }),
  email: Joi.string().email().required().messages({
    "any.required": "Bắt buộc phải nhập Email",
    "string.email": "Email không đúng định dạng",
    "string.empty": "Email không được để trống",
  }),
  password: Joi.string().min(6).required().messages({
    "any.required": "Password bắt buộc phải nhập",
    "string.empty": "Password không được để trống",
    "string.min": "Password phải có ít nhất 6 ký tự",
  }),
  confirmPassword: Joi.string().required().valid(Joi.ref("password")).messages({
    "any.only": "confirmPassword không khớp",
    "any.required": "confirmPassword bắt buộc phải nhập",
  }),
  phone: Joi.string()
    .pattern(/^[0-9]{10,11}$/)
    .required()
    .messages({
      "any.required": "Số điện thoại là bắt buộc",
      "string.empty": "Số điện thoại không được để trống",
      "string.pattern.base":
        "Số điện thoại phải có 10-11 chữ số và chỉ chứa số",
    }),
  avatar: Joi.string().optional(),
});

const signinSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "any.required": "Email bắt buộc phải nhập",
    "string.email": "Email không đúng định dạng",
    "string.empty": "Email không được để trống",
  }),
  password: Joi.string().min(6).required().messages({
    "any.required": "Password bắt buộc phải nhập",
    "string.empty": "Password không được để trống",
    "string.min": "Password phải có ít nhất 6 ký tự",
  }),
});
module.exports = {
  registerSchema,
  signinSchema,
};
