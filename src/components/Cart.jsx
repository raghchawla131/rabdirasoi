import { useState } from "react";

export default function Cart({ toggleCart }) {
  return (
    <>
      <section className="cart">
        <button onClick={toggleCart}>
          <ion-icon name="close"></ion-icon>
        </button>
      </section>
    </>
  );
}
