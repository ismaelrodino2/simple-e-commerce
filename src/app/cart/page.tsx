"use client";
import { AuthContext } from "@/contexts/AuthContext";
import { CartContext } from "@/contexts/CartContext";
import { Product } from "@/utils/types";
import { deleteCookie, setCookie } from "cookies-next";
import Head from "next/head";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { HiOutlineRefresh } from "react-icons/hi";

const Cart = () => {
  const { setCart, cart } = useContext(CartContext);
  const [loading, setLoading] = useState(false);

  const { user } = useContext(AuthContext);

  const handleCancel = () => {
    try {
      window.localStorage.setItem("cart", "");
      setCart([]);
    } catch (err) {
      console.log(err);
    }
  };

  const router = useRouter();

  const handleBuy = async () => {
    setLoading(true);
    window.document.title = "Loading...";
    const cookiesArr = () => {
      const cookie = window.localStorage.getItem("cart");
      const cart = typeof cookie === "string" ? JSON.parse(cookie) : [];
      return cart;
    };
    try {
      const cookiesCart = cookiesArr();
      if (cookiesCart) {
        const arr = cookiesArr().map((el: Product) => {
          const obj = {
            price: el.default_price.id,
            quantity: el.unit,
          };
          return obj;
        });

        const metadata = cookiesArr().reduce(
          (
            acc: {
              [x: string]: {
                product_name: string;
                product_image_url: string;
                stripeId: string;
              };
            },
            obj: {
              default_price: { id: string };
              name: string;
              images: Array<string>;
            },
          ) => {
            const key = obj.default_price.id;

            acc[key] = {
              product_name: obj.name,
              product_image_url: obj.images[0],
              stripeId: user?.stripeId || "",
            };

            return acc;
          },
          {},
        );

        const email = user?.email;

        const body = {
          arr,
          user,
          cookiesArr: cookiesArr(),
          metadata,
          email,
        };

        const aa = await fetch("/api/checkout-many", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        const comment = await aa.json();

        deleteCookie("cart");
        setCart([]);
        setCookie("last-checkoutid", { id: comment.id });
        router.push(comment.text);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
      window.document.title = "Shopping Cart | Furnish In";
    }
  };

  return (
    <div className="flex  container px-4 mx-auto">
      <Head>
        <title>Shopping Cart | Furnish In</title>
        <meta
          name="Shopping Cart | Furnish In"
          content="https://e-commerce-black-seven.vercel.app/"
        />
      </Head>
      <div className="flex gap-6 py-10">
        <button
          type="submit"
          disabled={loading ? true : false}
          onClick={handleBuy}
          className={`rounded w-auto py-2 px-4 flex items-center justify-center text-white ${
            loading
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-blue-800 cursor-pointer"
          }`}
        >
          {loading ? (
            <span className="flex items-center">
              <HiOutlineRefresh className="animate-spin mr-2" /> Buy all in cart
            </span>
          ) : (
            <span> buy all in cart</span>
          )}
        </button>

        <button
          className="bg-[#ca4848] text-white
         py-2 px-11 rounded-md shadow-md"
          onClick={handleCancel}
        >
          delete all purchases
        </button>
      </div>
    </div>
  );
};
export default Cart;
