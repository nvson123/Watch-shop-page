const express = require("express");
const {
  signin,
  signup,
  requestResetPassword,
  processResetPassword,
  getUserInfo,
  updatePassword,
  getAllUsers,
  updateAccount,
  verifyOldPassword,
  updateUser,
} = require("../controllers/auth");
const router = express.Router();
router.post(`/signup`, signup);
router.post(`/signin`, signin);
router.post("/request-reset-password", requestResetPassword);
router.post("/check-valid-code", processResetPassword);
router.post("/update-new-password", updatePassword);
router.get("/users", getAllUsers);
router.get("/user/info/:userId", getUserInfo);
router.put("/user/update/:userId", updateAccount);
router.put("/user/update", updateUser);
router.post("/verify-old-password", verifyOldPassword);

module.exports = router;
