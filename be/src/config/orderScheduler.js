const cron = require("node-cron");
const Order = require("../models/order");

// Lên lịch công việc chạy mỗi ngày vào lúc nửa đêm
cron.schedule("0 0 * * *", async () => {
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  
  try {
    console.log("Cron job đang chạy...");
    console.log(`Kiểm tra các đơn hàng có receivedAt cũ hơn: ${sevenDaysAgo}`);

    // Tìm các đơn hàng ở trạng thái "received" và có `receivedAt` cũ hơn 7 ngày
    const orders = await Order.find({
      status: "received",
      receivedAt: { $lte: sevenDaysAgo },
    });

    console.log(
      `Đã tìm thấy ${orders.length} đơn hàng đủ điều kiện để cập nhật`
    );

    // In chi tiết từng đơn hàng
    orders.forEach((order) => {
      console.log(`Đơn hàng ${order._id} với receivedAt: ${order.receivedAt}`);
    });

    // Cập nhật trạng thái của từng đơn hàng đủ điều kiện thành "delivered"
    for (const order of orders) {
      order.status = "delivered";
      await order.save();
      console.log(
        `Trạng thái đơn hàng ${order._id} đã được cập nhật thành "delivered".`
      );
    }
  } catch (error) {
    console.error("Lỗi khi cập nhật đơn hàng:", error);
  }
});