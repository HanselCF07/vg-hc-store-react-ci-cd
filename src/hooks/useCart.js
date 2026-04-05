// hooks/useCart.jsx
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

export default function useCart() {
  const { cart, addToCart, removeFromCart, clearCart } = useContext(CartContext);

  const subtotal = cart.reduce((sum, item) => sum + item.price, 0);

  const discount = cart.reduce(
    (sum, item) => sum + ((item.discount || 0) / 100) * item.price,
    0
  );

  const shipping = cart.length > 0 ? 5.0 : 0; // global

  const total = subtotal - discount + shipping;

  return {
    cart,
    addToCart,
    removeFromCart,
    clearCart,
    subtotal,
    discount,
    shipping,
    total,
    totalItems: cart.length,
  };
}