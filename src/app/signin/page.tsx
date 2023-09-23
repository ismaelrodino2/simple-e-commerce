"use client";
import { FormEvent, useContext, useState } from "react";
import Link from "next/link";
import { AuthContext } from "@/contexts/AuthContext";
import { HiOutlineRefresh } from "react-icons/hi";

const signin = () => {
  const { login } = useContext(AuthContext);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const email = e.currentTarget.username.value;
    const password = e.currentTarget.password.value;

    try {
      await login(email, password);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-[calc(100vh-112px)]">
      <form onSubmit={handleSubmit} className="border p-6 rounded-lg">
        <input
          type="text"
          className="border border-black800 bg-ice text-black900 rounded p-2 mb-2 w-full"
          name="username"
          placeholder="Email"
        />
        <input
          className="border border-black800 bg-ice text-black900 rounded p-2 mb-2 w-full"
          type="password"
          name="password"
          placeholder="Password"
        />
        <button
          type="submit"
          disabled={loading ? true : false}
          className={`rounded p-2 w-full flex items-center justify-center text-white ${
            loading
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-blue-800 cursor-pointer"
          }`}
        >
          {loading ? (
            <span className="flex items-center">
              <HiOutlineRefresh className="animate-spin mr-2" /> Sign In
            </span>
          ) : (
            <span> Sign In</span>
          )}
        </button>
      </form>
      <p className="text-black900 font-bold mt-4">
        Don&apos;t have an account yet?{" "}
        <Link className="text-blue600v2" href="/signup">
          Sign Up
        </Link>
      </p>
    </div>
  );
};
export default signin;
