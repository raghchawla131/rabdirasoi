import { useState } from "react";
import "./OrderDetails.css";
import { useNavigate } from "react-router-dom";
import XContainer from "../../components/Container/XContainer";
import YContainer from "../../components/Container/YContainer";

export default function OrderDetails() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    pickup_date: "",
    pickup_time: "",
    special_instructions: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const pickup_datetime = `${formData.pickup_date} ${formData.pickup_time}`;

    const customerData = {
      name: formData.name,
      phone: formData.phone,
      pickup_datetime,
      special_instructions: formData.special_instructions,
    };

    localStorage.setItem("customerData", JSON.stringify(customerData));

    navigate("/checkout");
  };

  return (
    <XContainer>
      <YContainer>
        <form className="customer-form" onSubmit={handleSubmit}>
          <h2>Customer Details</h2>

          <label>
            Name
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
            />
          </label>

          <label>
            Phone
            <input
              type="tel"
              name="phone"
              required
              pattern="[0-9]{10}"
              value={formData.phone}
              onChange={handleChange}
            />
          </label>

          <label>
            Pickup Date
            <input
              type="date"
              name="pickup_date"
              required
              value={formData.pickup_date}
              onChange={handleChange}
            />
          </label>

          <label>
            Pickup Time
            <input
              type="time"
              name="pickup_time"
              required
              value={formData.pickup_time}
              onChange={handleChange}
            />
          </label>

          <label>
            Special Instructions
            <textarea
              name="special_instructions"
              rows="3"
              value={formData.special_instructions}
              onChange={handleChange}
            />
          </label>

          <button type="submit">Save & Continue</button>
        </form>
      </YContainer>
    </XContainer>
  );
}
