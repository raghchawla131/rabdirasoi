import { useState } from "react";
import CartItem from "./CartItem";

export default function Cart({ toggleCart }) {
  return (
    <>
      <section className="cart">
        <div className="cart-header">
          <button onClick={toggleCart} className="close-cart-btn">
            <ion-icon name="close"></ion-icon>
          </button>
          <h4>YOUR ORDERS</h4>
        </div>
        <div>
          <CartItem />
        </div>
      </section>
    </>
  );
}
