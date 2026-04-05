// context/CartContext.jsx
import { createContext, useState, useEffect } from "react";
import { saveCart, getCart, removeCart } from "../utils/cartUtils";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => getCart());

  useEffect(() => {
    // Every time we change the cart, we save it
    saveCart(cart, true); // true = Persistent in localStorage
  }, [cart]);

  const addToCart = (item) => {
    setCart((prevCart) => {
      const exists = prevCart.some((p) => p.publicId === item.publicId);
      if (exists) return prevCart;
      return [
        ...prevCart,
        {
          ...item,
          discount: item.discount || 0,
        },
      ];
    });
  };

  const removeFromCart = (publicId) => {
    setCart((prevCart) => prevCart.filter((p) => p.publicId !== publicId));
  };

  const clearCart = () => {
    setCart([]);
    removeCart();
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

