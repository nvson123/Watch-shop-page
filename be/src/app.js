const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const { Server } = require("socket.io");
const cors = require("cors");
const dotenv = require("dotenv");
const morgan = require("morgan");

// Import routes
const message = require("./routers/chatRoutes");
const cartRouter = require("./routers/cart");
const productRouter = require("./routers/product");
const categoryRouter = require("./routers/category");
const authRouter = require("./routers/auth.router");
const orderRouter = require("./routers/order");
const shippingRoutes = require("./routers/shipping");
const couponRoutes = require("./routers/coupon");
const commentRouter = require("./routers/comment");
const paymentRoutes = require("./routers/paymentRoutes");
const blogRoutes = require("./routers/blog");
const customerRoutes = require("./routers/customerRoutes");
const locationRoutes = require("./routers/address");

// Database connection
const { connectDB } = require("./config/db");

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});
// Socket.IO connection
io.on("connection", (socket) => {
  console.log("A client connected:", socket.id);

  // Lắng nghe khi admin cập nhật sản phẩm
  socket.on("admin-update-product", (data) => {
    io.emit("update-cart", data);
  });

  // Lắng nghe khi người dùng thay đổi số lượng trong quá trình checkout
  socket.on("checkout-update-quantity", (data) => {
    console.log("Checkout quantity updated:", data);
    io.emit("notify-quantity-change", data);
  });

  socket.on("admin-send-message", (data) => {
    console.log("Admin sent a message:", data);
    io.emit("receive-message", data);
  });

  // Xử lý khi client ngắt kết nối
  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

connectDB(process.env.DB_URI);

// Routes
app.use("/api", productRouter);
app.use("/api", authRouter);
app.use("/api", categoryRouter);
app.use("/api", cartRouter);
app.use("/api", orderRouter);
app.use("/api", shippingRoutes);
app.use("/api", couponRoutes);
app.use("/api", commentRouter);
app.use("/api", paymentRoutes);
app.use("/api", message);
app.use("/api", blogRoutes);
app.use("/api", customerRoutes);
app.use("/api", locationRoutes);

// Start servers
const appPort = 8000;
app.listen(appPort, () => {
  console.log(`App running on http://localhost:${appPort}`);
});

const socketPort = 8080;
server.listen(socketPort, () => {
  console.log(`Socket.IO listening on port ${socketPort}`);
});
