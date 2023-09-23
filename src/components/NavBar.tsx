"use client";
import { useState } from "react";

import Link from "next/link";
import {
  AiOutlineArrowRight,
  AiOutlineSearch,
  AiOutlineShoppingCart,
  AiOutlineClose,
  AiOutlineMenu,
} from "react-icons/ai";
import { BiLogIn } from "react-icons/bi";
import { Navbar } from "@/utils/helpers";
import Avatar from "./Avatar";
import { useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import { CartContext } from "@/contexts/CartContext";
import { SearchContext } from "@/contexts/SearchContext";

export const NavBar = () => {
  const { setSearch, search } = useContext(SearchContext);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const { cart } = useContext(CartContext);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const searchInput = e.currentTarget.elements.namedItem(
      "search",
    ) as HTMLInputElement;
    setSearch(searchInput.value);
  };

  const { authenticated } = useContext(AuthContext);

  return (
    <div className="bg-cream800 min-h-[112px] flex items-center">
      <div className="container mx-auto px-4 flex flex-col xl:max-w-6xl">
        <div className="flex items-center my-7 justify-between">
          <button
            className="md:hidden"
            onClick={toggleMenu}
            aria-label="Toggle Menu"
          >
            <AiOutlineMenu size={24} />
          </button>
          <div className=" mr-2 h-full  hidden lg:flex">
            <Link href={"/"} className="text-blue850 px-1 logo">
              Furnish In
            </Link>
          </div>
          <ul className={" gap-8 nav-item hidden md:flex"}>
            {Navbar().map((el, i) => {
              return (
                <li className="cursor-pointer" key={i + "-" + el.link}>
                  <Link href={el.link}>{el.name}</Link>
                </li>
              );
            })}
          </ul>
          <div className="flex xl:gap-16 gap-5 items-center pl-2">
            <form onSubmit={handleSearch} className="relative">
              <input
                name="search"
                className="ml-3 w-36 md:w-auto pl-1 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 max-w-[200px]"
                type="text"
                placeholder="Search"
              />
              <button className="absolute top-1/2 right-2 transform -translate-y-1/2 text-gray-500 text-sm">
                <AiOutlineSearch size={24} />
              </button>
            </form>
            <button className="scale-[180%] text-black700">
              {!authenticated ? (
                <Link href={"/signin"}>
                  <AiOutlineShoppingCart size={18} />
                </Link>
              ) : (
                <Link href={"/cart"}>
                  <div className="relative">
                    <AiOutlineShoppingCart size={18} />
                    {cart ? (
                      <div className="bg-blue850 text-white rounded-full text-[8px] absolute items-center justify-center -top-1 -right-1 w-[11px] h-[11px]">
                        {cart?.length}
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </Link>
              )}
            </button>
            {authenticated ? (
              <Avatar
                src={process.env.NEXT_PUBLIC_GENERIC_AVATAR!}
                alt={"Avatar generic image"}
              />
            ) : (
              <Link href="/signin" className="">
                <div className="bg-blue800 text-white py-[11px] px-4 rounded-md flex items-center login-button">
                  <div className="hidden md:flex items-center">
                    Sign In
                    <AiOutlineArrowRight className="ml-2 scale-150" />
                  </div>
                  <div className="md:hidden">
                    <BiLogIn size={24} />
                  </div>
                </div>
              </Link>
            )}
          </div>
        </div>
        {isMenuOpen && (
          <div
            className={
              "fixed top-0 left-0 right-0 bottom-0 bg-gradient-to-r from-[#004374] via-[#19597e] to-[#3483bb] z-10"
            }
          >
            <div className="container mx-auto flex items-center justify-center h-full px-4 py-8">
              <ul className="flex flex-col gap-4 text-white text-2xl font-semibold">
                {Navbar().map((el, i) => {
                  return (
                    <li
                      key={i + "-" + el.link}
                      className="hover:text-blue600v2 cursor-pointer"
                    >
                      <Link
                        onClick={() => setMenuOpen(!isMenuOpen)}
                        href={el.link}
                      >
                        {el.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
            <button
              className="absolute top-4 right-4 text-white hover:text-black800"
              onClick={toggleMenu}
              aria-label="Close Menu"
            >
              <AiOutlineClose size={32} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
