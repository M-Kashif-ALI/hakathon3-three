"use client";

import React, { useEffect, useState } from "react";
import { CartContext } from "./context";

interface cartItem {
  _id: string;
  title: string;
  tags: string[];
  price: number;
  inventory: number;
  description: string;
  imageurl: string;
  quantity: number;
}

const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<cartItem[]>(() => {
    
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  const [count, setCount] = useState<number>(() => {
    
    const storedCount = localStorage.getItem("count");
    return storedCount ? parseInt(storedCount) : 0;
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
    localStorage.setItem("count", JSON.stringify(count));
  }, [cart, count]);

  // --------------- Add Functionality ------------------ \\
  const add = (item: cartItem) => {
    const existingItem = cart.find((cartItem) => cartItem._id === item._id);
    if (existingItem) {
      setCart(
        cart.map((cartItem) =>
          cartItem._id === item._id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
    setCount(count + 1);
  };

  // --------------- Delete Functionality ------------------ \\

  const del = (id: string) => {
    const existingItem = cart.find((cartItem) => cartItem._id === id);
    if (existingItem) {
      if (existingItem.quantity > 1) {
        setCart(
          cart.map((cartItem) =>
            cartItem._id === id
              ? { ...cartItem, quantity: cartItem.quantity - 1 }
              : cartItem
          )
        );
        setCount(count - 1);
      }
    }
  };

  // --------------- Clear Cart Functionality ------------------ \\

  const clearCart = () => {
    setCart([]);
    setCount(0);
    localStorage.removeItem("cart");
    localStorage.removeItem("count");
  };

  return (
    <div>
      <CartContext.Provider value={{ cart, del, add, count, clearCart }}>
        {children}
      </CartContext.Provider>
    </div>
  );
};

export default CartProvider;
