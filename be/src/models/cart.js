const { mongoose, Schema } = require("mongoose");

const cartSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    products: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        variantId: {
          type: String,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
        priceAtTime: {
          type: Number,
          required: true,
        },
        totalPrice: {
          type: Number,
          required: true, 
        },
      },
    ],
  },
  { timestamps: true, versionKey: false }
);

cartSchema.pre("save", function (next) {
  this.products.forEach((product) => {
    product.totalPrice = product.priceAtTime * product.quantity;
  });
  next();
});

module.exports = mongoose.model("Cart", cartSchema);