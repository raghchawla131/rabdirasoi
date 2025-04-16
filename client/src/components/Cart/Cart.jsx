import { useState, useEffect, useContext, useCallback } from "react";
import "./Cart.css";
import CartItem from "../CartItems/CartItem";
import { IoClose } from "react-icons/io5";
import { IconContext } from "react-icons/lib";
import axios from "axios";
import { AuthContext } from "../../context/authContext";
import { useNavigate } from "react-router-dom";

export default function Cart({ toggleCart }) {
  const { currentUser } = useContext(AuthContext);
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  // Calculate total only
  const countTotal = (items) => {
    let calculatedTotal = 0;
    for (const item of items) {
      calculatedTotal += item.price * item.pound_quantity * item.item_quantity;
    }
    setTotal(calculatedTotal);
  };

  useEffect(() => {
    countTotal(cartItems);
  }, [cartItems]);

  const handleToggleCart = () => {
    setIsOpen(!isOpen);
    toggleCart();
  };

  const fetchCartItems = useCallback(async () => {
    if (currentUser) {
      try {
        const res = await axios.post(
          `${process.env.REACT_APP_API_URL}/api/cart/fetch-cart-items`, 
          {
            user_id: currentUser,
          }
        );
        setCartItems(res.data);
      } catch (error) {
        console.log(error);
      }
    }
  }, [currentUser]);

  const navigateToCheckout = () => {
    setIsOpen(!isOpen);
    toggleCart();
    navigate("/checkout");
  };

  useEffect(() => {
    fetchCartItems();
  }, [fetchCartItems]);

  return (
    <>
      <section className={`cart ${isOpen ? "open" : ""}`}>
        <div className="cart-header">
          <IconContext.Provider value={{ size: "2rem", cursor: "pointer" }}>
            <div>
              <IoClose onClick={handleToggleCart} />
            </div>
          </IconContext.Provider>
          <h4>YOUR ORDERS</h4>
        </div>
        <div className="selected-cart-items">
          {cartItems.map((item) => (
            <CartItem
              key={item.product_id} // Assuming product_id is unique
              item={item}
              fetchCartItems={fetchCartItems}
            />
          ))}
        </div>
        <div className="cart-bottom">
          <div className="total-order-price">
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
    </>
  );
}
