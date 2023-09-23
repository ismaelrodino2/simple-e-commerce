import { Product } from "@/utils/types";
import { getCookie } from "cookies-next";
import { Cart2 } from "./types";
import axios from "axios";

export const Cookies = async () => {
  const cookie = getCookie("supabase-auth", {}); // => 'value'
  if (typeof cookie == "string" && cookie) {
    const cookies = await axios.get("/api/token", {
      headers: {
        Authorization: JSON.parse(cookie).token,
      },
    });
    return cookies?.data?.decodedToken;
  } else {
    return null;
  }
};

export const Links = () => {
  return [
    { name: "Home", link: "/" },
    { name: "All Products", link: "/products" },
    { name: "Dining room", link: "diningroom" },
    { name: "Dining room", link: "diningroom" },
  ];
};
export const Navbar = () => {
  return [
    { name: "Home", link: "/" },
    { name: "All Products", link: "/products" },
    { name: "Dining room", link: "#" },
    { name: "Dining room", link: "#" },
  ];
};

export const Team = () => {
  return [
    {
      name: "Gabriel Cunha",
      alt: "profile pic",
      link: "/images/gabriel.jpeg",
      desc: "UX/UI Designer",
    },
    {
      name: "Ismael Rodino",
      alt: "profile pic",
      link: "/images/ismael.jpeg",
      desc: "Software engineer",
    },
  ];
};

export const BottomFooter = () => {
  return [
    ["Landings", "Home", "Services"],
    ["Company", "Home", "Careers", "Services"],
    ["Resources", "Blog", "Services"],
  ];
};

export const Customers = () => {
  return [
    {
      name: "Dining room",
      alt: "profile pic",
      link: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      desc: "Lorem ipsum dolor sit amet consectetur. Blandit morbi duis ultrices proin bibendum elementum morbi blandit.",
    },
    {
      name: "Dining room",
      alt: "profile pic",
      link: "https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      desc: "Lorem ipsum dolor sit amet consectetur. Blandit morbi duis ultrices proin bibendum elementum morbi blandit.",
    },
    {
      name: "Dining room",
      alt: "profile pic",
      link: "https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      desc: "Lorem ipsum dolor sit amet consectetur. Blandit morbi duis ultrices proin bibendum elementum morbi blandit.",
    },
    {
      name: "Dining room",
      alt: "profile pic",
      link: "https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      desc: "Lorem ipsum dolor sit amet consectetur. Blandit morbi duis ultrices proin bibendum elementum morbi blandit.",
    },
  ];
};

export const handleAddToCart = (element: Cart2, cart: Array<Cart2>) => {
  const { id } = element;

  // Get the current cart from cookies
  // const cart = getCart();
  // Check if the product already exists in the cart
  const productIndex = cart.findIndex((item: { id: string }) => item.id === id);

  if (productIndex !== -1) {
    // If the product exists, update the unit
    const updatedCart = [...cart];
    updatedCart[productIndex].unit += 1;

    return updatedCart;
  } else {
    // If the product doesn't exist, add it to the cart
    const updatedCart = [...cart, { ...element, unit: 1 }];

    return updatedCart;
  }
};

export const handleDecreaseUnit = (element: Cart2, cart: Array<Cart2>) => {
  // Check if the unit is at least 1
  if (element.unit < 1) {
    console.log("Error: Invalid unit value");
    return;
  }

  const { id, unit } = element;

  // Check if the product exists in the cart
  const productIndex = cart.findIndex((item: { id: string }) => item.id === id);

  if (productIndex !== -1) {
    if (cart[productIndex].unit === 1) {
      // Remove the product from the cart if the unit is 1
      const updatedCart = cart.filter(
        (item: Product, index: number) => index !== productIndex,
      );

      return updatedCart;
    } else if (cart[productIndex].unit > 1) {
      // Decrease the unit by 1
      const updatedCart = [...cart];
      updatedCart[productIndex].unit -= 1;

      return updatedCart;
    }
  } else {
    console.log("Error: Product not found in cart, add a product");
  }
  return;
};
