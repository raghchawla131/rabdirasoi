import React, { useContext, useEffect } from "react";
import "./Checkout.css";
import { useNavigate } from "react-router-dom";
import { authContext } from "../../context/authContext";
import { useCart } from "../../context/cartContext";
import { useRazorpayPayment } from "../../hooks/useRazorpayPayment";

const Checkout = () => {
  const { currentUser } = useContext(authContext);
  const { cartItems, subtotal, total, fetchCartItems } = useCart();
  const { initiatePayment } = useRazorpayPayment();
  const navigate = useNavigate();

  // Load customerData from localStorage
  const customer = JSON.parse(localStorage.getItem("customerData"));

  useEffect(() => {
    if (
      !customer ||
      !customer.name ||
      !customer.phone ||
      !customer.pickup_datetime
    ) {
      navigate("/order-details");
    }
    fetchCartItems();
  }, [customer, navigate, fetchCartItems]);

  const handleTransaction = (e) => {
    e.preventDefault();
    initiatePayment({ customer, navigate });
  };

  return (
    <div id="checkout">
      <div className="order-summary">
        <h2>Order Summary</h2>
        <ul>
          {cartItems.map((item, index) => (
            <li key={index}>
              <div className="item-info">
                {item.name} x {item.item_quantity} (Pounds:{" "}
                {item.pound_quantity})
              </div>
              <div className="item-price">
                ₹{item.price * item.item_quantity * item.pound_quantity}
              </div>
            </li>
          ))}
        </ul>

        <div className="subtotal">
          <div className="subtotal-text">
            <strong>Subtotal:</strong>
          </div>
          <div className="subtotal-price">₹{subtotal}</div>
        </div>

        <hr />

        <div className="total">
          <div className="total-text">
            <strong>Total:</strong>
          </div>
          <div className="total-price">₹{total}</div>
        </div>

        <hr />

        {/* Pickup Details Section */}
        {customer && (
          <div className="pickup-details">
            <h3>Pickup Details</h3>
            <p>
              <strong>Name:</strong> {customer.name}
            </p>
            <p>
              <strong>Phone:</strong> {customer.phone}
            </p>
            <p>
              <strong>Pickup:</strong> {customer.pickup_datetime}
            </p>
            {customer.special_instructions && (
              <p>
                <strong>Instructions:</strong> {customer.special_instructions}
              </p>
            )}
            <button
              className="edit-details-btn"
              onClick={() => navigate("/order-details")}
            >
              Edit Details
            </button>
          </div>
        )}

        <div className="payment">
          <button className="pay-now-btn" onClick={handleTransaction}>
            Pay Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
