import React, { useContext, useEffect, useState, useCallback } from "react";
import {
  Box,
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  TextField,
} from "@mui/material";
import { AuthContext } from "../../context/authContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/rab di rasoi logo.png";

const Checkout = () => {
  const { currentUser } = useContext(AuthContext);
  const [cartItems, setCartItems] = useState([]);
  const [customerDetails, setCustomerDetails] = useState({
    name: "",
    phone: "",
    pickupDate: "",
    pickupTime: "",
    specialInstructions: "",
  });
  const [subtotal, setSubtotal] = useState(0);
  const [total, setTotal] = useState(0);

  const razorpayKeyId = process.env.REACT_APP_RAZORPAY_KEY_ID;
  const navigate = useNavigate();

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

  useEffect(() => {
    if (currentUser) {
      fetchCartItems();
    }
  }, [currentUser, fetchCartItems]);

  useEffect(() => {
    const calculateSubtotal = () => {
      const newSubtotal = cartItems.reduce(
        (acc, item) =>
          acc +
          parseFloat(item.price) * item.item_quantity * item.pound_quantity,
        0
      );
      setSubtotal(newSubtotal);
      setTotal(newSubtotal); // Assuming no additional charges for simplicity
    };
    calculateSubtotal();
  }, [cartItems]);

  // Function to format date
  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString("en-GB");

  // Function to format time
  const formatTime = (timeString) => {
    const [hours, minutes, seconds] = timeString.split(":");
    const date = new Date();
    date.setHours(hours);
    date.setMinutes(minutes);
    date.setSeconds(seconds);

    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  };

  const amount = 500;
  const currency = "INR";
  const receiptId = "ragh1";

  const handleTransaction = async (e) => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/payment/order`,
        {
          amount,
          currency,
          receipt: receiptId,
        }
      );
      const order = res.data;

      console.log("Transaction Response:", order);

      // Sending customer details along with payment details
      const transactionData = {
        amount,
        currency,
        customerDetails,
        orderId: order.id,
      };

      var options = {
        key: razorpayKeyId,
        amount,
        currency,
        name: "Rab Di Rasoi",
        description: "Test Transaction",
        image: logo,
        order_id: order.id,
        handler: function (response) {
          alert(response.razorpay_payment_id);
          alert(response.razorpay_order_id);
          alert(response.razorpay_signature);

          // You can send transaction data to your server here, if needed
        },
        prefill: {
          name: customerDetails.name,
          email: "gaurav.kumar@example.com", // You can update with customer email if available
          contact: customerDetails.phone,
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
      });

      rzp1.open();
      navigate("/"); // Redirect after payment
      e.preventDefault();
    } catch (error) {
      console.error("Error creating transaction:", error);
    }
  };

  // Handling form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerDetails({
      ...customerDetails,
      [name]: value,
    });
  };

  return (
    <Box
      sx={{
        padding: "calc(81px + 32px) 32px 32px",
        display: "flex",
        justifyContent: "space-between",
        gap: 2,
        backgroundColor: "#f9f9f9",
      }}
    >
      <Box
        sx={{
          flex: 2,
          padding: 2,
          backgroundColor: "#fff",
          borderRadius: 2,
          boxShadow: 2,
        }}
      >
        <Typography variant="h6" gutterBottom>
          Customer Details
        </Typography>

        <TextField
          label="Name"
          variant="outlined"
          fullWidth
          value={customerDetails.name}
          onChange={handleInputChange}
          name="name"
          required
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Phone"
          variant="outlined"
          fullWidth
          value={customerDetails.phone}
          onChange={handleInputChange}
          name="phone"
          required
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Pickup Date"
          variant="outlined"
          fullWidth
          type="date"
          value={customerDetails.pickupDate}
          onChange={handleInputChange}
          name="pickupDate"
          required
          sx={{
            marginBottom: 2,
            "& .MuiInputLabel-root": {
              position: "absolute",
              top: "2px", // Lowered label to avoid overlap
              backgroundColor: "#fff", // Ensure background color to avoid label overlap
              padding: "0 4px", // Add padding to avoid the label covering the input
              zIndex: 1, // Keep label above input field
            },
            "& .MuiInputBase-root": {
              height: "auto", // Ensures the input height stays default
            },
          }}
          InputLabelProps={{
            shrink: true, // Ensures label shrinks when input is filled
          }}
        />

        <TextField
          label="Pickup Time"
          variant="outlined"
          fullWidth
          type="time"
          value={customerDetails.pickupTime}
          onChange={handleInputChange}
          name="pickupTime"
          required
          sx={{
            marginBottom: 2,
            "& .MuiInputLabel-root": {
              position: "absolute",
              top: "2px", // Lowered label to avoid overlap
              backgroundColor: "#fff", // Ensure background color to avoid label overlap
              padding: "0 4px", // Add padding to avoid the label covering the input
              zIndex: 1, // Keep label above input field
            },
            "& .MuiInputBase-root": {
              height: "auto", // Ensures the input height stays default
            },
          }}
          InputLabelProps={{
            shrink: true, // Ensures label shrinks when input is filled
          }}
        />

        <TextField
          label="Special Instructions"
          variant="outlined"
          fullWidth
          value={customerDetails.specialInstructions}
          onChange={handleInputChange}
          name="specialInstructions"
          sx={{ marginBottom: 2 }}
        />
      </Box>

      <Box
        sx={{
          flex: 1,
          padding: 2,
          backgroundColor: "#fff",
          borderRadius: 2,
          boxShadow: 2,
        }}
      >
        <Typography variant="h6" gutterBottom>
          Order Summary
        </Typography>
        <List>
          {cartItems.map((item, index) => (
            <ListItem
              key={index}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <ListItemText
                primary={`${item.name} x ${item.item_quantity} (Pounds: ${item.pound_quantity})`}
                secondary={`₹${(
                  parseFloat(item.price) *
                  item.item_quantity *
                  item.pound_quantity
                ).toFixed(2)}`}
              />
            </ListItem>
          ))}
        </List>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 2,
          }}
        >
          <Typography variant="body1">
            <strong>Subtotal:</strong>
          </Typography>
          <Typography variant="body1">₹{subtotal}</Typography>
        </Box>
        <Divider sx={{ my: 2 }} />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 2,
          }}
        >
          <Typography variant="body1">
            <strong>Total:</strong>
          </Typography>
          <Typography variant="body1" sx={{ fontWeight: "bold" }}>
            ₹{total}
          </Typography>
        </Box>
        <Box sx={{ marginTop: 2 }}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleTransaction}
          >
            Pay Now
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Checkout;
