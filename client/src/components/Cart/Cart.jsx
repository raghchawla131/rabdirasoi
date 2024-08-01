import { useState, useEffect, useContext } from "react";
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
  const [subtotal, setSubtotal] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const countSubtotal = (items) => {
    let calculatedSubtotal = 0;
    for (const item of items) {
      calculatedSubtotal += item.price * item.pound_quantity * item.item_quantity;
    }
    setSubtotal(calculatedSubtotal);
  };

  const shippingCharges = cartItems.length > 0 ? 50 : 0;

  useEffect(() => {
    countSubtotal(cartItems);
  }, [cartItems]);

  const handleToggleCart = () => {
    setIsOpen(!isOpen);
    toggleCart();
  };

  const fetchCartItems = async () => {
    if (currentUser) {
      try {
        const res = await axios.post(
          'http://localhost:8000/api/cart/fetch-cart-items', 
          {
            user_id: currentUser,
          }
        );
        setCartItems(res.data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const navigateToCustomerDetails = () => {
    navigate("/customer-details");
  }

  useEffect(() => {
    fetchCartItems();
  }, [currentUser]);

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
              <h4>subtotal</h4>
              <h4>₹{subtotal}</h4>
            </div>
            <div>
              <h4>shipping + handling</h4>
              <h4>₹{shippingCharges}</h4>
            </div>
            <div>
              <h4>total</h4>
              <h4>₹{subtotal + shippingCharges}</h4>
            </div>
          </div>
          <div onClick={navigateToCustomerDetails} className="enter-address-btn">
            <button>enter address</button>
          </div>
        </div>
      </section>
    </>
  );
}
