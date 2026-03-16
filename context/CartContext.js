"use client";
import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("toolfyr_cart");
    if (saved) setCart(JSON.parse(saved));
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) localStorage.setItem("toolfyr_cart", JSON.stringify(cart));
  }, [cart, isLoaded]);

  const addToCart = (product, size, color, qty = 1) => {
    setCart((prev) => {
      const existing = prev.find(
        (item) => item.id === product.id && item.size === size && item.color === color
      );
      if (existing) {
        return prev.map((item) =>
          item.id === product.id && item.size === size && item.color === color
            ? { ...item, qty: item.qty + qty }
            : item
        );
      }
      return [...prev, { id: product.id, name: product.name, price: product.price, image: product.image, size, color, qty }];
    });
  };

  const removeFromCart = (id, size, color) => {
    setCart((prev) => prev.filter((item) => !(item.id === id && item.size === size && item.color === color)));
  };

  const updateQty = (id, size, color, qty) => {
    if (qty <= 0) return removeFromCart(id, size, color);
    setCart((prev) =>
      prev.map((item) =>
        item.id === id && item.size === size && item.color === color ? { ...item, qty } : item
      )
    );
  };

  const clearCart = () => setCart([]);

  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);
  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQty, clearCart, cartCount, cartTotal, isLoaded }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
