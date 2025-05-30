import React, { useContext, useEffect } from "react";
import "./Checkout.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/rab di rasoi logo.png";
import { authContext } from "../../context/authContext";
import { useCart } from "../../context/cartContext";

const Checkout = () => {
  const { currentUser } = useContext(authContext);
  const { cartItems, subtotal, total, fetchCartItems } = useCart();
  const navigate = useNavigate();
  const razorpayKeyId = process.env.REACT_APP_RAZORPAY_KEY_ID;

  // Load customerData from localStorage
  const customer = JSON.parse(localStorage.getItem("customerData"));

  useEffect(() => {
    if (!customer || !customer.name || !customer.phone || !customer.pickup_datetime) {
      navigate("/order-details");
    }
    fetchCartItems();
  }, [fetchCartItems, customer, navigate]);

  const handleTransaction = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/api/payment/order", {
        amount: total * 100,
        currency: "INR",
        receipt: "order_rcptid_11",
      });

      const order = res.data;

      const options = {
        key: razorpayKeyId,
        amount: order.amount,
        currency: "INR",
        name: "Rab Di Rasoi",
        description: "Order Payment",
        image: logo,
        order_id: order.id,
        handler: async function (response) {
          alert(`Payment Successful! Payment ID: ${response.razorpay_payment_id}`);

          try {
            await axios.post("http://localhost:5000/api/orders/create", {
              user_id: currentUser.userId,
              name: customer.name,
              phone: customer.phone,
              pickup_datetime: customer.pickup_datetime,
              special_instructions: customer.special_instructions,
              orderItems: cartItems.map(item => ({
                item_id: item.id,
                item_quantity: item.item_quantity,
                pound_quantity: item.pound_quantity,
              })),
              razorpay_payment_id: response.razorpay_payment_id,
            });

            localStorage.removeItem("customerData");
            navigate("/order-success");

          } catch (err) {
            console.error("Order save failed:", err);
          }
        },
        prefill: {
          name: currentUser?.firstName || "Customer",
          email: currentUser?.emailAddresses?.[0]?.emailAddress || "unknown@example.com",
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

  return (
    <div id="checkout">
      <div className="order-summary">
        <h2>Order Summary</h2>
        <ul>
          {cartItems.map((item, index) => (
            <li key={index}>
              <div className="item-info">
                {item.name} x {item.item_quantity} (Pounds: {item.pound_quantity})
              </div>
              <div className="item-price">
                ₹{item.price * item.item_quantity * item.pound_quantity}
              </div>
            </li>
          ))}
        </ul>

        <div className="subtotal">
          <div className="subtotal-text"><strong>Subtotal:</strong></div>
          <div className="subtotal-price">₹{subtotal}</div>
        </div>

        <hr />

        <div className="total">
          <div className="total-text"><strong>Total:</strong></div>
          <div className="total-price">₹{total}</div>
        </div>

        <hr />

        {/* Pickup Details Section */}
        {customer && (
          <div className="pickup-details">
            <h3>Pickup Details</h3>
            <p><strong>Name:</strong> {customer.name}</p>
            <p><strong>Phone:</strong> {customer.phone}</p>
            <p><strong>Pickup:</strong> {customer.pickup_datetime}</p>
            {customer.special_instructions && (
              <p><strong>Instructions:</strong> {customer.special_instructions}</p>
            )}
            <button onClick={() => navigate("/order-details")}>Edit Details</button>
          </div>
        )}

        <div className="payment">
          <button onClick={handleTransaction}>Pay Now</button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
