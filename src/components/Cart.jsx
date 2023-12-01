import { useState, useEffect } from "react";
import CartItem from "./CartItem";
import { getCartItemsFromStorage, setCartItemsToStorage } from "../utils/CartStorage";
import { PRODUCTS } from "../products";

export default function Cart({ toggleCart }) {
  const [cartItems, setCartItems] = useState(getCartItemsFromStorage());
  const [subtotal, setSubtotal] = useState(0);

    const countSubtotal = () => {
      let calculatedSubtotal = 0;

      for (const itemId of cartItems) {
        const product = PRODUCTS.find((product) => String(product.key) === itemId);

        if (product) {
          calculatedSubtotal += product.price;
        } else {
          console.warn(`Product not found for itemId: ${itemId}`);
        }
      }

      setSubtotal(calculatedSubtotal);
    };

  useEffect(() => {
    setCartItems(getCartItemsFromStorage());
  }, [])

  useEffect(() => {
    countSubtotal();
  })

  const handleRemoveItem = (itemToRemove) => {
    const updatedCartItems = cartItems.filter((item) => item !== itemToRemove.toString());
    setCartItems(updatedCartItems);
    setCartItemsToStorage(updatedCartItems);
    countSubtotal();
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
            return <CartItem key={item} item={item} onRemoveItem={handleRemoveItem} onSubtotalChange={countSubtotal} />;
          })}
        </div>
        <div className="cart-bottom">
          <div className="total-order-price">
            <div>
              <h4>subtotal</h4>
              <h4>₹{subtotal}</h4>
            </div>
            <div>
              <h4>shipping + handling</h4>
              <h4>₹50</h4>
            </div>
            <div>
              <h4>total</h4>
              <h4>₹{subtotal + 50}</h4>
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