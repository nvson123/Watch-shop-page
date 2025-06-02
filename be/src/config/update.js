const cron = require('node-cron');
const Order = require('../models/order'); // Thay bằng đường dẫn đến model của bạn

// Chạy job mỗi phút
cron.schedule('* * * * *', async () => {
  try {
    const now = new Date();
    const oneMinuteAgo = new Date(now.getTime() - 1 * 60 * 1000);

    // Tìm các đơn hàng `pendingPayment` quá 1 phút
    const orders = await Order.find({
      status: 'pendingPayment',
      updatedAt: { $lt: oneMinuteAgo },
    });

    for (const order of orders) {
      order.status = 'canceled';
      order.statusHistory.push({ status: 'canceled', time: new Date() });
      await order.save();
      console.log(`Order ${order._id} automatically canceled.`);
    }
  } catch (error) {
    console.error('Error running cron job:', error);
  }
});