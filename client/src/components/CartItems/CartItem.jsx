import { useContext, useState } from "react";
import "./CartItem.css";
import { AuthContext } from "../../context/authContext";
import axios from "axios";

export default function CartItem({ item, fetchCartItems }) {
  const { currentUser } = useContext(AuthContext);
  const [poundQuantity, setPoundQuantity] = useState(item.pound_quantity);
  const [itemsQuantity, setItemsQuantity] = useState(item.item_quantity);

  // Define the options for the select dropdown
  const options = [
    { value: "1.00", label: "1 Pound" },
    { value: "1.50", label: "1.5 Pounds" },
    { value: "2.00", label: "2 Pounds" },
    { value: "2.50", label: "2.5 Pounds" },
    { value: "3.00", label: "3 Pounds" },
    { value: "3.50", label: "3.5 Pounds" },
    { value: "4.00", label: "4 Pounds" },
    { value: "4.50", label: "4.5 Pounds" },
    { value: "5.00", label: "5 Pounds" },
  ];

  // Handle changes to the select dropdown
  const handlePoundChange = async (e) => {
    const newQuantity = parseFloat(e.target.value);
  
    try {
      const status = await updateCartItemPoundQuantity(poundQuantity, String(newQuantity));
      
      if (status === 200) {
        // Only proceed if the status code is 200
        setPoundQuantity(newQuantity);
      } else {
        // Optionally handle other statuses or errors
        console.log("Error: Unexpected status code", status);
      }
    } catch (error) {
      // Optionally handle the error or display a message to the user
      console.log("Error updating pound quantity:", error.message);
    }
  };
  

  // Handle incrementing the item quantity
  const handleIncrement = async () => {
    if (itemsQuantity < 3) {
      const newQuantity = itemsQuantity + 1;
      setItemsQuantity(newQuantity);
      console.log(poundQuantity, newQuantity);
      updateCartItemQuantity(poundQuantity, newQuantity);
    }
  };

  // Handle decrementing the item quantity
  const handleDecrement = async () => {
    if (itemsQuantity > 1) {
      const newQuantity = itemsQuantity - 1;
      setItemsQuantity(newQuantity);
      updateCartItemQuantity(poundQuantity, newQuantity);
    }
  };

  // Update the cart item pound quantity
  const updateCartItemPoundQuantity = async (oldPoundQuantity, newPoundQuantity) => {
    try {
      const res = await axios.post("http://localhost:8000/api/cart/update-cart-item-pound-quantity", {
        user_id: currentUser,
        product_id: item.product_id,
        old_pound_quantity: oldPoundQuantity,
        new_pound_quantity: newPoundQuantity,
      });
      if(res.status === 200) {
        fetchCartItems(); // Fetch updated cart items
      }
      return res.status;
    } catch (error) {
      console.log(error);
    }
  };

  // Update the cart item quantity
  const updateCartItemQuantity = async (poundQuantity, itemsQuantity) => {
    try {
      await axios.post("http://localhost:8000/api/cart/update-cart-item-quantity", {
        user_id: currentUser,
        product_id: item.product_id,
        pound_quantity: poundQuantity,
        item_quantity: itemsQuantity,
      });
      fetchCartItems(); // Fetch updated cart items
    } catch (error) {
      console.log(error);
    }
  };

  // Handle removing an item from the cart
  const handleRemoveCartItem = async (productId) => {
    try {
      await axios.post("http://localhost:8000/api/cart/remove-from-cart", {
        user_id: currentUser,
        product_id: productId,
      });
      fetchCartItems(); // Fetch updated cart items
    } catch (error) {
      alert("Error removing item from cart");
      console.log(error);
    }
  };

  return (
    <div className="cart-item-container">
      <div className="cart-item">
        <div className="cart-item-img">
          <img src={item.image_url} alt={item.name} />
        </div>
        <div className="cart-item-description">
          <h4>{item.name}</h4>
          <h5>₹{item.price}</h5>
          <div className="cart-item-quantity-wrapper">
            <div className="cart-item-dropdown-pound-quantity">
              <select defaultValue={item.pound_quantity} onChange={handlePoundChange}>
                {options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="cart-item-quantity">
              <button onClick={handleDecrement}>
                <ion-icon name="remove-outline"></ion-icon>
              </button>
              <div>{itemsQuantity}</div>
              <button onClick={handleIncrement}>
                <ion-icon name="add-outline"></ion-icon>
              </button>
            </div>
          </div>
        </div>
        <div
          onClick={() => handleRemoveCartItem(item.product_id)}
          className="remove-cart-item"
        >
          <ion-icon name="close-outline"></ion-icon>
        </div>
      </div>
    </div>
  );
}
