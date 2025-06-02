import instance from "@/api/axiosIntance";

export const updatePaymentStatus = async (orderId, paymentStatus, paymentMethod) => {
  try {
    // Gửi yêu cầu đến API
    const response = await instance.post("/update-payment-status", {
      orderId,
      paymentStatus,
      paymentMethod, 
    });


    if (response.status !== 200) {
      throw new Error("Failed to update payment status");
    }

    return response.data; 
  } catch (error) {
    console.error("Error during API call:", error.message);
    throw error; 
  }
};

export const retryPayment = async (orderId) => {
    try {
      const response = await instance.post("/retry-payment", { orderId });
      if (response.data.paymentUrl) {

        window.location.href = response.data.paymentUrl;
      } else {
        alert("Payment retry failed: No URL returned from server.");
      }
    } catch (error) {
      console.error("Error retrying payment:", error.message);
      alert("Failed to retry payment. Please try again later.");
    }
  };
  