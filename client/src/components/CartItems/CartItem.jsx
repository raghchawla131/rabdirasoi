import { useContext, useState } from "react";
import "./CartItem.css";
import axios from "axios";
import { authContext } from "../../context/authContext";

export default function CartItem({ item, fetchCartItems }) {
  const { currentUser } = useContext(authContext);
  const [poundQuantity, setPoundQuantity] = useState(item.pound_quantity);
  const [itemsQuantity, setItemsQuantity] = useState(item.item_quantity);

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

  const handlePoundChange = async (e) => {
    const newQuantity = parseFloat(e.target.value);

    try {
      const status = await updateCartItemPoundQuantity(poundQuantity, String(newQuantity));
      if (status === 200) {
        setPoundQuantity(newQuantity);
      } else {
        console.log("Error: Unexpected status code", status);
      }
    } catch (error) {
      console.log("Error updating pound quantity:", error.message);
    }
  };

  const handleIncrement = async () => {
    if (itemsQuantity < 3) {
      const newQuantity = itemsQuantity + 1;
      setItemsQuantity(newQuantity);
      await updateCartItemQuantity(poundQuantity, newQuantity);
    }
  };

  const handleDecrement = async () => {
    if (itemsQuantity > 1) {
      const newQuantity = itemsQuantity - 1;
      setItemsQuantity(newQuantity);
      await updateCartItemQuantity(poundQuantity, newQuantity);
    }
  };

  const updateCartItemPoundQuantity = async (oldPoundQuantity, newPoundQuantity) => {
    try {
      const res = await axios.put(`${process.env.REACT_APP_BASE_URL}/api/cart/update`, {
        user_id: currentUser.userId,
        product_id: item.product_id,
        old_pound_quantity: oldPoundQuantity,
        new_pound_quantity: newPoundQuantity,
        item_quantity: itemsQuantity,
      });
      if (res.status === 200) {
        fetchCartItems();
      }
      return res.status;
    } catch (error) {
      console.log(error);
    }
  };

  const updateCartItemQuantity = async (poundQuantity, itemQuantity) => {
    try {
      const res = await axios.put(`${process.env.REACT_APP_BASE_URL}/api/cart/update`, {
        user_id: currentUser.userId,
        product_id: item.product_id,
        old_pound_quantity: poundQuantity,
        new_pound_quantity: poundQuantity,
        item_quantity: itemQuantity,
      });
      if (res.status === 200) {
        fetchCartItems();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemoveCartItem = async (productId, pound_quantity) => {
    try {
      await axios.delete(`${process.env.REACT_APP_BASE_URL}/api/cart/remove`, {
        data: {
          user_id: currentUser.userId,
          product_id: productId,
          pound_quantity: pound_quantity,
        },
      });
      fetchCartItems();
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
          onClick={() => handleRemoveCartItem(item.product_id, item.pound_quantity)}
          className="remove-cart-item"
        >
          <ion-icon name="close-outline"></ion-icon>
        </div>
      </div>
    </div>
  );
}