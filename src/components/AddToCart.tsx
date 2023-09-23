"use client";

import { AuthContext } from "@/contexts/AuthContext";
import { CartContext } from "@/contexts/CartContext";
import { Cart2 } from "@/utils/types";
import { handleAddToCart, handleDecreaseUnit } from "@/utils/helpers";
import Link from "next/link";
import { useContext } from "react";

export const AddToCart = ({ el }: { el: Cart2 }) => {
  const { authenticated } = useContext(AuthContext);
  const { setCart, cart } = useContext(CartContext);

  const getIdUnit = (id: string) => {
    const foundProduct = cart.find(
      (product: { id: string }) => product.id === id,
    );
    return foundProduct ? foundProduct.unit : 0;
  };

  const handleAdd = async () => {
    setCart(handleAddToCart(el, cart));
    localStorage.setItem("cart", JSON.stringify(cart));
  };
  const handleRemove = () => {
    const updatedCart = handleDecreaseUnit(el, cart);
    if (updatedCart) {
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }
  };

  return (
    <div className="">
      {authenticated ? (
        <div className="bg-black800 text-white flex">
          <button className="p-2 text-lg font-semibold" onClick={handleRemove}>
            -
          </button>
          <span className="bg-cream800 text-black800 px-2 flex items-center">
            {getIdUnit(el.id)}
          </span>
          <button className="p-2 text-lg font-semibold" onClick={handleAdd}>
            +
          </button>
        </div>
      ) : (
        <Link href={"/signin"}>
          <div className="bg-black900 text-white py-3 px-1 rounded-md">
            Add to cart
          </div>
        </Link>
      )}
    </div>
  );
};
