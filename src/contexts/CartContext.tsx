"use client";

import { Cart2 } from "@/utils/types";
import React, { createContext, useState, useEffect } from "react";

type CartContextType = {
  cart: Array<Cart2>;
  setCart: (cart: Array<Cart2>) => void;
};

export const CartContext = createContext({} as CartContextType);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<Array<Cart2>>([]);

  useEffect(() => {
    const updateCartItems = () => {
      const cartCookie = () => {
        const cookie = localStorage.getItem("cart");
        const cart =
          typeof cookie === "string" && cookie !== "" ? JSON.parse(cookie) : [];
        return cart;
      };
      setCart(cartCookie);
    };

    updateCartItems();
  }, []);

  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {children}
    </CartContext.Provider>
  );
}
