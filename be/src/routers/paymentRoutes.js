const express = require("express");
const router = express.Router();

// Kiểm tra xem paymentController có được import đúng không
const paymentController = require("../controllers/paymentController");

if (!paymentController || !paymentController.updatePaymentStatusOnFailure) {
    console.error("Error: updatePaymentStatusOnFailure is undefined. Check the import path and export in paymentController.js");
} else {
    console.log("updatePaymentStatusOnFailure loaded successfully");
}

router.post(
  "/update-payment-status",
  async (req, res, next) => {
    try {
      await paymentController.updatePaymentStatusOnFailure(req, res);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
