import { Product, Products } from "@/utils/types";
import { setCookie } from "cookies-next";
import { useEffect, useState } from "react";

export const useCart = () => {
  const [cart, setCart] = useState<Products>([]);

  useEffect(() => {
    // Save cart to cookies or local storage
    setCookie("Cart", { cart: cart }, { maxAge: 60 * 6 * 24 });
  }, [cart]);

  const handleAddToCart = (sku: Product) => {
    setCart((prev: Products) => [...prev, sku]);
  };

  return { cart, handleAddToCart };
};
