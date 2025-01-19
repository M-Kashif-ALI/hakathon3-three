"use client";
import { createContext } from "react";

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

interface cartContextType {
  cart: cartItem[];
  count: number;
  add: (item: cartItem) => void;
  del: (id: string) => void;
}

export const CartContext = createContext<cartContextType>({
  cart: [],
  count: 0,
  add: () => {},
  del: () => {},
});
