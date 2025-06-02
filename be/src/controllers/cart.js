const Cart = require("../models/cart");
const Product = require("../models/product");
const { ObjectId } = require('mongodb');
const getCartByUserId = async (req, res) => {
  const { userId } = req.params;
  try {
    const cart = await Cart.findOne({ userId }).populate("products.productId", "name price image variants");
    if (!cart) {
      return res.status(404).json({ message: "Cart not found for this user" });
    }
    
    const cartData = {
      products: cart.products.map((item) => {
        if (!item?.productId) {
          return null; 
        }
        const selectedVariant = item.productId.variants.find(variant => variant.sku === item.variantId);

        return {
          productId: item.productId._id,
          name: item.productId.name,
          weight: selectedVariant ? selectedVariant.weight : null,
          image: item.productId.image,
          price: selectedVariant ? selectedVariant.price : item.productId.price,
          quantity: item.quantity,
          totalPrice: item.totalPrice,
          variantId: item.variantId,
          size: selectedVariant ? selectedVariant.size : null, 
          color: selectedVariant ? selectedVariant.color : null, 
        };
      }).filter(product => product !== null), 
    };
    return res.status(200).json(cartData);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const addItemToCart = async (req, res) => {
  const { userId, products } = req.body;
  try {
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, products: [] });
    }

    for (const { productId, variantId, quantity, priceAtTime } of products) {
      if (!productId || !variantId || !priceAtTime || !quantity || isNaN(priceAtTime) || isNaN(quantity)) {
        return res.status(400).json({ message: 'Invalid product data: productId, variantId, priceAtTime, and quantity are required and must be valid numbers.' });
      }
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      const variant = product.variants.find(v => v.sku === variantId);
      if (!variant) {
        return res.status(404).json({ message: 'Product variant not found' });
      }
      if (quantity > variant.countInStock) {
        return res.status(400).json({
          message: `Số lượng vượt quá tồn kho. Chỉ còn lại ${variant.countInStock} sản phẩm.`,
        });
      }

      const existProductIndex = cart.products.findIndex(
        (item) => item.productId.toString() === productId && item.variantId === variantId
      );

      if (existProductIndex !== -1) {
        cart.products[existProductIndex].quantity += quantity;
        cart.products[existProductIndex].totalPrice += priceAtTime * quantity;
      } else {
        cart.products.push({
          productId,
          variantId,
          quantity,
          priceAtTime,
          totalPrice: priceAtTime * quantity,
        });
      }
    }

    await cart.save();
    return res.status(201).json({ cart, message: "Đã thêm vào giỏ hàng" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteItemFromCart = async (req, res) => {
  const { userId } = req.params;  // Lấy userId từ params
  const { variantIds } = req.body;  // Lấy mảng SKU từ body request
  try {
    // Tìm giỏ hàng của người dùng
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Không tìm thấy giỏ hàng" });
    }

    // Lọc các sản phẩm có SKU trong variantIds
    cart.products = cart.products.filter(product =>
      !variantIds.some(variantId => variantId === product.variantId)  
    );

    // Lưu lại giỏ hàng sau khi xóa sản phẩm
    await cart.save();
    return res.status(200).json({ cart, message: "Đã xóa các sản phẩm đã chọn khỏi giỏ hàng" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

 const increaseProductQuantity = async (req , res) => {
  const { userId, productId, variantId } = req.body;

  try {
    // Tìm giỏ hàng của người dùng
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // Tìm sản phẩm trong giỏ hàng
    const product = cart.products.find(
      (item) => item.productId.toString() === productId && item.variantId === variantId
    );
    if (!product) {
      return res.status(404).json({ message: "Product not found in cart" });
    }

    // Tìm sản phẩm và biến thể từ cơ sở dữ liệu
    const dbProduct = await Product.findById(productId);
    const variant = dbProduct.variants.find((v) => v.sku === variantId);

    if (!variant) {
      return res.status(404).json({ message: "Product variant not found" });
    }

    // Kiểm tra nếu số lượng hiện tại đã đạt đến giới hạn tồn kho
    if (product.quantity >= variant.countInStock) {
      return res.status(400).json({
        message: `Không thể tăng thêm số lượng. Chỉ còn lại ${variant.countInStock} sản phẩm trong kho.`,
      });
    }

    // Tăng số lượng sản phẩm trong giỏ
    product.quantity++;
    product.totalPrice += product.priceAtTime;

    // Lưu giỏ hàng
    await cart.save();

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


 
 const decreaseProductQuantity = async (req , res) => {
  const { userId, productId, variantId, confirm } = req.body;  
  try {
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const product = cart.products.find(
      (item) => item.productId.toString() === productId && item.variantId === variantId
    );
    if (!product) {
      return res.status(404).json({ message: "Product not found in cart" });
    }
    if (product.quantity > 1) {
      product.quantity--;
      product.totalPrice -= product.priceAtTime;
      
      const dbProduct = await Product.findById(productId);
      const variant = dbProduct.variants.find(v => v.sku === variantId);
      await dbProduct.save();
      await cart.save();
      res.status(200).json(cart);
    } else {
      if (confirm) {
        // Nếu confirm = true, xóa sản phẩm khỏi giỏ hàng
        cart.products = cart.products.filter(item =>
          !(item.productId.toString() === productId && item.variantId === variantId)
        );
        
        await cart.save();
        res.status(200).json({ cart, message: "Sản phẩm đã được xóa khỏi giỏ hàng vì số lượng là 0" });
      } else {
        // Nếu confirm không phải là true, trả về thông báo yêu cầu xác nhận
        res.status(400).json({ message: "Vui lòng xác nhận để xóa sản phẩm khỏi giỏ hàng" });
      }
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



 const updateProductQuantity = async (req , res) => {
  const { userId, productId, variantId, quantity } = req.body;
  try {
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    const product = cart.products.find(
      (item) => item.productId.toString() === productId && item.variantId === variantId
    );
    if (!product) {
      return res.status(404).json({ error: "Product not found in cart" });
    }

    const item = await Product.findById(productId);
    if (!item) {
      return res.status(404).json({ error: "Product not found" });
    }

    const variant = item.variants.find(v => v.sku === variantId);
    if (!variant) {
      return res.status(404).json({ error: "Product variant not found" });
    }

    // Adjust the quantity if it's greater than the available stock
    if (quantity > variant.countInStock) {
      return res.status(400).json({
        error: `Số lượng yêu cầu vượt quá tồn kho. Chỉ còn lại ${variant.countInStock} sản phẩm.`,
      });
    }

    product.quantity = quantity > variant.countInStock ? variant.countInStock : quantity;
    product.totalPrice = product.priceAtTime * product.quantity;

    await cart.save();

    return res.status(200).json({ cart });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

 module.exports = {
    getCartByUserId,
    addItemToCart,
    deleteItemFromCart,
    increaseProductQuantity,
    decreaseProductQuantity,
    updateProductQuantity,
  };

