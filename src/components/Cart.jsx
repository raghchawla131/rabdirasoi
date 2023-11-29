import { useState, useEffect } from "react";
import CartItem from "./CartItem";
import { getCartItemsFromStorage, setCartItemsToStorage } from "../utils/CartStorage";

export default function Cart({ toggleCart }) {
  const [cartItems, setCartItems] = useState(getCartItemsFromStorage());

  useEffect(() => {
    setCartItems(getCartItemsFromStorage());
  }, [])

  const handleRemoveItem = (itemToRemove) => {
    const updatedCartItems = cartItems.filter((item) => item !== itemToRemove);
    setCartItems(updatedCartItems);
    setCartItemsToStorage(updatedCartItems);
  };

  return (
    <>
      <section className="cart">
        <div className="cart-header">
          <button onClick={toggleCart} className="close-cart-btn">
            <ion-icon name="close"></ion-icon>
          </button>
          <h4>YOUR ORDERS</h4>
        </div>
        <div className="selected-cart-items">
          {cartItems.map((item) => {
            return <CartItem key={item} item={item} onRemoveItem={handleRemoveItem} />;
          })}
        </div>
        <div className="cart-bottom">
          <div className="total-order-price">
            <div>
              <h4>subtotal</h4>
              <h4>₹500</h4>
            </div>
            <div>
              <h4>shipping + handling</h4>
              <h4>₹50</h4>
            </div>
            <div>
              <h4>total</h4>
              <h4>₹550</h4>
            </div>
          </div>
          <div className="enter-address-btn">
            <button>enter address</button>
          </div>
        </div>
      </section>
    </>
  );
}
