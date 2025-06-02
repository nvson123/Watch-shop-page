const express = require("express");
const {
  getOrderById,
  getOrders,
  updateOrder,
  deleteOrder,
  createOrder,
  getOrdersByUserId,
  cancelOrder,
  confirmReceived,
  setDelivered,
  updateReturnReason,
  returnOrder,
  countSuccessfulOrders,
  getOrderByIdAdmin,
  getOrdersByUserIdWithOnlinePayment,
} = require("../controllers/order");
const router = express.Router();

router.post("/orders", createOrder);

router.get("/orders", getOrders);
router.get("/orders/:orderId/admin", getOrderByIdAdmin);

router.get("/orders/:userId/:orderId", getOrderById);

router.get("/orders/:userId", getOrdersByUserId);
router.put("/orders/:orderId", updateOrder);

router.delete("/orders/:userId/:orderId", deleteOrder);
router.put("/orders/:orderId/cancel", cancelOrder);
router.put("/orders/:orderId/confirm-received", confirmReceived);
router.put("/orders/:orderId/set-delivered", setDelivered);
router.put("/orders/:orderId/return", returnOrder);
router.post("/:id/return", updateReturnReason);
router.get("/count-successful-orders", countSuccessfulOrders);
router.get('/order/:userId', getOrdersByUserIdWithOnlinePayment);

module.exports = router;