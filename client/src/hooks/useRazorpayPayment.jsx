import axios from "axios";
import { useContext } from "react";
import { authContext } from "../context/authContext";
import logo from "../assets/rab di rasoi logo.png";
import { useCart } from "../context/cartContext";

export const useRazorpayPayment = () => {
  const { currentUser } = useContext(authContext);
  const { cartItems, total, clearCart } = useCart();

  const initiatePayment = async ({ customer, navigate }) => {
    try {
      // 🔒 Hardcoded API URL (development)
      const API_URL = "http://localhost:5000";

      const res = await axios.post(`${API_URL}/api/payment/create-order`, {
        amount: total * 100,
        currency: "INR",
        receipt: `receipt_${Date.now()}`,
      });

      const order = res.data;

      const options = {
        key: `${process.env.REACT_APP_RAZORPAY_KEY_ID}`
, // 🔑 Hardcoded Razorpay Key
        amount: order.amount,
        currency: "INR",
        name: "Rab Di Rasoi",
        description: "Order Payment",
        image: logo,
        order_id: order.id,
        handler: async function (response) {
          const verificationRes = await axios.post(`${API_URL}/api/payment/verify`, {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          });

          if (verificationRes.data.verified) {
            try {
              await axios.post(`${API_URL}/api/orders/create`, {
                user_id: currentUser.userId,
                name: customer.name,
                phone: customer.phone,
                pickup_datetime: customer.pickup_datetime,
                special_instructions: customer.special_instructions,
                orderItems: cartItems.map((item) => ({
                  item_id: item.id,
                  item_quantity: item.item_quantity,
                  pound_quantity: item.pound_quantity,
                })),
                razorpay_payment_id: response.razorpay_payment_id,
              });

              localStorage.removeItem("customerData");
              clearCart();
              navigate("/order-success");
            } catch (err) {
              console.error("Order save failed:", err);
            }
          } else {
            alert("Payment verification failed. Please contact support.");
          }
        },
        prefill: {
          name: currentUser?.firstName || "Customer",
          email: currentUser?.email || "unknown@example.com",
          contact: customer?.phone || "9000090000",
        },
        notes: {
          address: "Customer Pickup",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.on("payment.failed", function (response) {
        alert("Payment Failed");
        console.error(response.error);
      });

      rzp1.open();
    } catch (error) {
      console.error("Error initiating payment:", error);
    }
  };

  return { initiatePayment };
};
