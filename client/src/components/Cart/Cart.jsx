import { useContext, useEffect } from "react";
import "./Cart.css";
import CartItem from "../CartItems/CartItem";
import { IoClose } from "react-icons/io5";
import { IconContext } from "react-icons/lib";
import { useNavigate } from "react-router-dom";
import { authContext } from "../../context/authContext";
import { useCart } from "../../context/cartContext";

export default function Cart({ isCartVisible, onClose }) {
  const { currentUser } = useContext(authContext);
  const { cartItems, subtotal, total, fetchCartItems } = useCart(); // ✅ Using from context
  const navigate = useNavigate();

  const navigateToCheckout = () => {
    onClose();
    navigate("/checkout");
  };

  useEffect(() => {
    if (currentUser) {
      fetchCartItems();
    }
  }, [currentUser, fetchCartItems]);

  if (!isCartVisible) return null;

  return (
    <section className="cart open">
      <div className="cart-header">
        <IconContext.Provider value={{ size: "2rem", cursor: "pointer" }}>
          <div>
            <IoClose onClick={onClose} />
          </div>
        </IconContext.Provider>
        <h4>YOUR ORDERS</h4>
      </div>
      <div className="selected-cart-items">
        {cartItems.map((item) => (
          <CartItem
            key={item.product_id}
            item={item}
            fetchCartItems={fetchCartItems}
          />
        ))}
      </div>
      <div className="cart-bottom">
        <div className="total-order-price">
          <div>
            <h4>subtotal</h4>
            <h4>₹{subtotal}</h4>
          </div>
          <div>
            <h4>total</h4>
            <h4>₹{total}</h4>
          </div>
        </div>
        <div onClick={navigateToCheckout} className="cart-checkout">
          <button className="cart-checkout-btn">Checkout</button>
        </div>
      </div>
    </section>
  );
}