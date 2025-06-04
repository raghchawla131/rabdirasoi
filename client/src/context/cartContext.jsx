// context/CartContext.js
import { createContext, useState, useContext, useCallback, useEffect } from "react";
import axios from "axios";
import { authContext } from "./authContext";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { currentUser } = useContext(authContext);
  const [cartItems, setCartItems] = useState([]);
  const [subtotal, setSubtotal] = useState(0);

  const total = subtotal; // ✅ No shipping charges

  const countSubtotal = (items) => {
    let calculatedSubtotal = 0;
    for (const item of items) {
      calculatedSubtotal += item.price * item.pound_quantity * item.item_quantity;
    }
    setSubtotal(calculatedSubtotal);
  };

  const fetchCartItems = useCallback(async () => {
    if (currentUser) {
      try {
        const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/cart/get`, {
          params: { user_id: currentUser.userId },
        });
        setCartItems(res.data);
        countSubtotal(res.data);
      } catch (error) {
        console.log("Error fetching cart:", error);
      }
    }
  }, [currentUser]);

  const clearCart = () => {
    setCartItems([]);
    setSubtotal(0);
  };

  useEffect(() => {
    fetchCartItems();
  }, [fetchCartItems]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        setCartItems,
        subtotal,
        total,
        fetchCartItems,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook
export const useCart = () => useContext(CartContext);
