import { useState } from "react";
import { PRODUCTS } from "../products";

export default function CartItem({ item, onRemoveItem, onSubtotalChange }) {
  const [itemsQuantity, setItemsQuantity] = useState(1);

  function handleIncrement() {
    setItemsQuantity(itemsQuantity + 1);
    onSubtotalChange();
  }

  function handleDecrement() {
    if (itemsQuantity > 1) {
      setItemsQuantity(itemsQuantity - 1);
      onSubtotalChange();
    }
  }

  function handleRemoveItemClick() {
    onRemoveItem(item);
  }

  return (
    <div className="cart-item">
      <div className="cart-item-img">
        <img src={item.image_url} alt="" />
      </div>
      <div className="cart-item-description">
        <h4>{item.name}</h4>
        <h5>₹{item.price}</h5>
        <div className="selected-item-quantity-cart">
          <button onClick={handleDecrement}>
            <ion-icon name="remove-outline"></ion-icon>
          </button>
          <div>{item.pound_quantity}</div>
          <button onClick={handleIncrement}>
            <ion-icon name="add-outline"></ion-icon>
          </button>
        </div>
      </div>
      <div onClick={handleRemoveItemClick} className="remove-cart-item">
        <ion-icon name="close-outline"></ion-icon>
      </div>
    </div>
  );
}
