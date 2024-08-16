import { useContext, useState } from "react";
import "./CustomerDetails.css";
import axios from "axios";
import { AuthContext } from "../../context/authContext";

export default function CustomerDetails() {
  const { currentUser } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    pickup_date: "",
    pickup_time: "",
    special_instructions: "",
  });

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
      const res = await axios.post(
        "http://localhost:8000/api/customerDetails/updateCustomerDetails",
        {
          ...formData,
          user_id: currentUser,
        }
      );
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
