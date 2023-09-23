"use client";
import { Cookies } from "@/utils/helpers";
import axios from "axios";

type PropTypes = {
  id: string;
  product_name: string;
  product_image_url: string;
};

export const BuyButton = ({
  id,
  product_name,
  product_image_url,
}: PropTypes) => {
  const handleBuy = async () => {
    const cookies = Cookies();
    if (cookies) {
      try {
        const aa = await axios.post("/api/checkout", {
          priceId: id,
          stripeCustomerId: cookies.user.data.user.stripeId,
          name: cookies.user.data.user.name,
          product_name,
          product_image_url,
        });
      } catch (err) {
        console.log(err);
      }
    } else {
      console.log("not logged in");
    }
  };
  return (
    <div>
      <button onClick={handleBuy}>Buy</button>
    </div>
  );
};
