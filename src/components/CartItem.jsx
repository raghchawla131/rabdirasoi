import { useState } from "react";
import { PRODUCTS } from "../products";

export default function CartItem({ item, onRemoveItem, onSubtotalChange }) {
  const [itemsQuantity, setItemsQuantity] = useState(1);

  const product =
    PRODUCTS.find((product) => product.key === parseInt(item)) || {};

  const { productName, price, productImage } = product;

  function handleIncrement() {
    setItemsQuantity(itemsQuantity + 1);
  }

  function handleDecrement() {
    if (itemsQuantity > 1) {
      setItemsQuantity(itemsQuantity - 1);
    }
  }

  function handleRemoveItemClick() {
    onRemoveItem(parseInt(item));
  }

  return (
    <>
      <div className="cart-item">
        <div className="cart-item-img">
          <img src={productImage} alt="" />
        </div>
        <div className="cart-item-description">
          <h4>{productName}</h4>
          <h5>₹{price}</h5>
          <div className="selected-item-quantity-cart">
            <button onClick={handleDecrement}>
              <ion-icon name="remove-outline"></ion-icon>
            </button>
            <div>{itemsQuantity}</div>
            <button onClick={handleIncrement}>
              <ion-icon name="add-outline"></ion-icon>
            </button>
          </div>
        </div>
        <div onClick={handleRemoveItemClick} className="remove-cart-item">
          <ion-icon name="close-outline"></ion-icon>
        </div>
      </div>
    </>
  );
}