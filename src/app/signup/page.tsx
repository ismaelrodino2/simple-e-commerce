"use client";;
import { FormEvent } from "react";
import { supabase } from "@/utils/supabase";
import Link from "next/link";
import axios from "axios";
import Stripe from "stripe";
import { useState } from "react";

const signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => setShowPassword(!showPassword);
  const stripe = new Stripe(process.env.NEXT_PUBLIC_SECRETKEY!, {
    apiVersion: "2022-11-15",
  });
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = e.currentTarget.email.value;
    const name = e.currentTarget.username.value;
    const password = e.currentTarget.password.value;

    try {
      // Create a customer in Stripe
      const customer = await stripe.customers.create({
        name,
        email,
      });

      const { data } = await supabase.auth.signUp({ email, password });

      const id = data.user?.id;
      await axios.post("/api/user", {
        email,
        name,
        id,
        stripeCustomerId: customer.id,
      });
      window.alert("check your email");
      // Set the values to empty
      e.currentTarget.email.value = "";
      e.currentTarget.username.value = "";
      e.currentTarget.password.value = "";
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-[calc(100vh-112px)]">
      <form onSubmit={handleSubmit} className="border p-6 rounded-lg">
        <h1 className="text-2xl font-bold mb-4">Sign Up</h1>
        <input
          type="text"
          className="border border-black800 bg-ice text-black900 rounded p-2 mb-2 w-full"
          name="username"
          placeholder="Username"
        />
        <input
          type="text"
          className="border border-black800 bg-ice text-black900 rounded p-2 mb-2 w-full"
          name="email"
          placeholder="Email"
        />
        <div>
          <input
            className="border border-black800 bg-ice text-black900 rounded p-2 mb-2 w-full"
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
          />
          <label htmlFor="showPassword">
            <input
              type="checkbox"
              id="showPassword"
              checked={showPassword}
              onChange={toggleShowPassword}
            />
            Show Password
          </label>
        </div>
        <button
          type="submit"
          className="bg-blue800 text-white rounded p-2 w-full"
        >
          Submit
        </button>
      </form>
      <p className="text-black900 font-bold mt-4">
        You already have an account?{" "}
        <Link href="/signin" className="text-blue600v2">
          Sign Up
        </Link>
      </p>
    </div>
  );
};
export default signup;
