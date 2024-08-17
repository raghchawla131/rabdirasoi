import { useContext, useState, useEffect } from "react";
import "./CustomerDetails.css";
import axios from "axios";
import { AuthContext } from "../../context/authContext";
import { useNavigate } from "react-router-dom";

export default function CustomerDetails() {
  const { currentUser } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    pickup_date: "",
    pickup_time: "",
    special_instructions: "",
  });
  const navigate = useNavigate();

  // Fetch customer details when the component mounts
  useEffect(() => {
    const fetchCustomerDetails = async () => {
      if (currentUser) {
        try {
          const res = await axios.post(
            "http://localhost:8000/api/customerDetails/fetchCustomerDetails",
            {
              user_id: currentUser,
            }
          );
          if (res.data) {
            setFormData({
              name: res.data.name || "",
              phone: res.data.phone || "",
              pickup_date: res.data.pickup_date || "", // Directly use the stored date
              pickup_time: res.data.pickup_time || "",
              special_instructions: res.data.special_instructions || "",
            });
          }
        } catch (error) {
          console.log(error);
        }
      }
    };
  
    fetchCustomerDetails();
  }, [currentUser]);
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:8000/api/customerDetails/updateCustomerDetails",
        {
          ...formData,
          user_id: currentUser,
        }
      );
      navigate("/checkout");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="customer-details-container">
      <h2>Enter Your Details</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone Number:</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="pickup_date">Pickup Date:</label>
          <input
            type="date"
            id="pickup_date"
            name="pickup_date"
            value={formData.pickup_date}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="pickup_time">Pickup Time:</label>
          <input
            type="time"
            id="pickup_time"
            name="pickup_time"
            value={formData.pickup_time}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="special_instructions">Special Instructions:</label>
          <textarea
            id="special_instructions"
            name="special_instructions"
            value={formData.special_instructions}
            onChange={handleChange}
          ></textarea>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
