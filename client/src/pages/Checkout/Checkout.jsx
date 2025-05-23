import React, { useContext, useEffect, useState, useCallback } from "react"; 
import "./Checkout.css"; 
import { AuthContext } from "../../context/authContext"; 
import axios from "axios"; 
import { useNavigate } from "react-router-dom"; 
import logo from "../../assets/rab di rasoi logo.png"; 

const Checkout = () => {
  const { currentUser } = useContext(AuthContext);
  const [cartItems, setCartItems] = useState([]);
  const [customer, setCustomer] = useState(null); 
  const [subtotal, setSubtotal] = useState(0); 
  const [total, setTotal] = useState(0); 
  const razorpayKeyId = process.env.REACT_APP_RAZORPAY_KEY_ID;
  const navigate = useNavigate();

  // Fetch cart items for the current user
  const fetchCartItems = useCallback(async () => {
    if (currentUser) {
      try {
        const res = await axios.post(
          `${process.env.REACT_APP_API_URL}/api/cart/fetch-cart-items`,
          { user_id: currentUser }
        );
        setCartItems(res.data);
      } catch (error) {
        console.log(error);
      }
    }
  }, [currentUser]);

  // Fetch customer details for the current user
  const fetchCustomerDetails = useCallback(async () => {
    if (currentUser) {
      try {
        const res = await axios.post(
          `${process.env.REACT_APP_API_URL}/api/customerDetails/fetchCustomerDetails`,
          { user_id: currentUser }
        );
        if (res.data) {
          setCustomer(res.data);
        } else {
          setCustomer(null); // No customer details found
        }
      } catch (error) {
        console.log(error);
      }
    }
  }, [currentUser]);

  // Fetch data on mount and when currentUser changes
  useEffect(() => {
    if (currentUser) {
      fetchCartItems();
      fetchCustomerDetails();
    }
  }, [currentUser, fetchCartItems, fetchCustomerDetails]);

  // Calculate subtotal and total
  useEffect(() => {
    const calculateSubtotal = () => {
      const newSubtotal = cartItems.reduce(
        (acc, item) => acc + parseFloat(item.price) * item.item_quantity * item.pound_quantity,
        0
      );
      setSubtotal(newSubtotal);
      setTotal(newSubtotal); // Assuming no additional charges for simplicity
    };
    calculateSubtotal();
  }, [cartItems]);

  // Helper functions to format date and time
  const formatDate = (dateString) => new Date(dateString).toLocaleDateString("en-GB");

  const formatTime = (timeString) => {
    const [hours, minutes, seconds] = timeString.split(":");
    const date = new Date();
    date.setHours(hours);
    date.setMinutes(minutes);
    date.setSeconds(seconds);

    return date.toLocaleTimeString("en-US", { hour: "numeric", minute: "numeric", hour12: true });
  };

  const amount = 500;
  const currency = "INR";
  const receiptId = "ragh1";

  const handleTransaction = async (e) => {
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/payment/order`, {
        amount,
        currency,
        receipt: receiptId,
      });
      const order = res.data;

      console.log("Transaction Response:", order);

      var options = {
        key: razorpayKeyId, // Enter the Key ID generated from the Dashboard
        amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency,
        name: "Rab Di Rasoi", // Your business name
        description: "Test Transaction",
        image: logo,
        order_id: order.id, // This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        handler: function (response) {
          alert(response.razorpay_payment_id);
          alert(response.razorpay_order_id);
          alert(response.razorpay_signature);
        },
        prefill: {
          name: "Gaurav Kumar", // Your customer's name
          email: "gaurav.kumar@example.com",
          contact: "9000090000", // Provide the customer's phone number for better conversion rates
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#3399cc",
        },
      };

      var rzp1 = new window.Razorpay(options);
      rzp1.on("payment.failed", function (response) {
        alert(response.error.code);
        alert(response.error.description);
        alert(response.error.source);
        alert(response.error.step);
        alert(response.error.reason);
        alert(response.error.metadata.order_id);
        alert(response.error.metadata.payment_id);
      });

      rzp1.open();
      navigate("/"); // Redirect to home page after payment
      e.preventDefault();
    } catch (error) {
      console.error("Error creating transaction:", error);
    }
  };

  return (
    <div id="checkout">
      <div className="customer-details">
        {customer ? (
          <>
            <h2>Customer Details</h2>
            <p>
              <strong>Name:</strong> {customer.name}
            </p>
            <p>
              <strong>Phone:</strong> {customer.phone}
            </p>
            <p>
              <strong>Pickup Date:</strong> {formatDate(customer.pickup_date)}
            </p>
            <p>
              <strong>Pickup Time:</strong> {formatTime(customer.pickup_time)}
            </p>
            <p>
              <strong>Special Instructions:</strong> {customer.special_instructions}
            </p>
            <p>
              <strong>Order Status:</strong> {customer.order_status}
            </p>
            <button onClick={() => navigate("/customer-details")}>Edit Details</button>
          </>
        ) : (
          <button onClick={() => navigate("/customer-details")}>Add New</button>
        )}
      </div>

      <div className="order-summary">
        <h2>Order Summary</h2>
        <ul>
          {cartItems.map((item, index) => (
            <li key={index}>
              <div className="item-info">
                {item.name} x {item.item_quantity} (Pounds: {item.pound_quantity})
              </div>
              <div className="item-price">
                ₹
                {parseFloat(item.price) * item.item_quantity * item.pound_quantity}
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
        <div className="payment">
          <button onClick={handleTransaction}>Pay Now</button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
