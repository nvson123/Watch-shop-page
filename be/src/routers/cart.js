const express = require("express");
const {
  addItemToCart,
  decreaseProductQuantity,
  deleteItemFromCart,
  getCartByUserId,
  increaseProductQuantity,
  updateProductQuantity,
} = require("../controllers/cart");
const router = express.Router();

router.post("/cart/add-to-cart", addItemToCart);

router.get("/cart/:userId", getCartByUserId);

router.patch("/cart/increase-quantity", increaseProductQuantity);

router.patch("/cart/decrease-quantity", decreaseProductQuantity);

router.patch("/cart/update-quantity", updateProductQuantity);

router.delete("/cart/:userId/product", deleteItemFromCart);


module.exports = router;
