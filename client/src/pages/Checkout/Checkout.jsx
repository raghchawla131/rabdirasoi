import React, { useContext, useEffect, useState } from 'react';
import './Checkout.css';
import { AuthContext } from '../../context/authContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const { currentUser } = useContext(AuthContext);
  const [cartItems, setCartItems] = useState([]);
  const [customer, setCustomer] = useState(null); // Initially null to detect if no customer details are available
  const [subtotal, setSubtotal] = useState(0);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  // Fetch cart items for the current user
  const fetchCartItems = async () => {
    if (currentUser) {
      try {
        const res = await axios.post('http://localhost:8000/api/cart/fetch-cart-items', {
          user_id: currentUser,
        });
        setCartItems(res.data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  // Fetch customer details for the current user
  const fetchCustomerDetails = async () => {
    if (currentUser) {
      try {
        const res = await axios.post('http://localhost:8000/api/customerDetails/fetchCustomerDetails', {
          user_id: currentUser,
        });
        if (res.data) {
          setCustomer(res.data);
        } else {
          setCustomer(null); // No customer details found
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    fetchCartItems();
    fetchCustomerDetails();
  }, [currentUser]);

  useEffect(() => {
    const calculateSubtotal = () => {
      const newSubtotal = cartItems.reduce((acc, item) => 
        acc + parseFloat(item.price) * item.item_quantity * item.pound_quantity, 0);
      setSubtotal(newSubtotal);
      setTotal(newSubtotal); // Assuming no additional charges for simplicity
    };
    calculateSubtotal();
  }, [cartItems]);

  // Helper functions to format date and time
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-GB');
  };

  const formatTime = (timeString) => {
    const [hours, minutes, seconds] = timeString.split(':');
    const date = new Date();
    date.setHours(hours);
    date.setMinutes(minutes);
    date.setSeconds(seconds);
    
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    });
  };
  

  return (
    <div id='checkout'>
      <div className='customer-details'>
        {customer ? (
          <>
            <h2>Customer Details</h2>
            <p><strong>Name:</strong> {customer.name}</p>
            <p><strong>Phone:</strong> {customer.phone}</p>
            <p><strong>Pickup Date:</strong> {formatDate(customer.pickup_date)}</p>
            <p><strong>Pickup Time:</strong> {formatTime(customer.pickup_time)}</p>
            <p><strong>Special Instructions:</strong> {customer.special_instructions}</p>
            <p><strong>Order Status:</strong> {customer.order_status}</p>
            <button onClick={() => {navigate('/customer-details')}}>Edit Details</button>
          </>
        ) : (
          <button onClick={() => {navigate('/customer-details')}}>Add New</button>
        )}
      </div>

      <div className='order-summary'>
        <h2>Order Summary</h2>
        <ul>
          {cartItems.map((item, index) => (
            <li key={index}>
              <div className="item-info">
                {item.name} x {item.item_quantity} (Pounds: {item.pound_quantity})
              </div>
              <div className="item-price">
                ₹{parseFloat(item.price) * item.item_quantity * item.pound_quantity}
              </div>
            </li>
          ))}
        </ul>
        <div className='subtotal'>
          <div className="subtotal-text"><strong>Subtotal:</strong></div>
          <div className="subtotal-price">₹{subtotal}</div>
        </div>
        <hr />
        <div className='total'>
          <div className="total-text"><strong>Total:</strong></div>
          <div className="total-price">₹{total}</div>
        </div>
        <div className='payment'>
          <button>pay now</button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
