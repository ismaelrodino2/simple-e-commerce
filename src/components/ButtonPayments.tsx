"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { HiOutlineRefresh } from "react-icons/hi";

export const ButtonPayments = ({ id }: { id: string }) => {
  const [loading1, setLoading1] = useState<boolean>(false);
  const [loading2, setLoading2] = useState<boolean>(false);
  const router = useRouter();

  const cancel = async () => {
    setLoading1(true);
    try {
      await axios.post("/api/cancel", { id });

      // router.push("/profile");
      router.refresh();
      // redirect("/profile");
    } catch (err) {
      console.log(err);
    } finally {
      setLoading1(false);
    }
  };

  const backToPayment = async () => {
    setLoading2(true);
    try {
      const cance2l = await axios.get("/api/checkout-many", {
        params: { id },
      });
      router.push(cance2l.data.url);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading2(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 py-3">
      <button
        onClick={backToPayment}
        disabled={loading1 ? true : false}
        className={`rounded p-2 w-full flex items-center justify-center text-white ${
          loading1
            ? "bg-gray-500 cursor-not-allowed"
            : "bg-blue-800 cursor-pointer"
        }`}
      >
        {loading1 ? (
          <span className="flex items-center">
            <HiOutlineRefresh className="animate-spin mr-2" /> Pay
          </span>
        ) : (
          <span> Pay</span>
        )}
      </button>
      <button
        onClick={cancel}
        disabled={loading2 ? true : false}
        className={`rounded p-2 w-full flex items-center justify-center text-white ${
          loading2
            ? "bg-gray-500 cursor-not-allowed"
            : "bg-[#ff000070] cursor-pointer"
        }`}
      >
        {loading2 ? (
          <span className="flex items-center">
            <HiOutlineRefresh className="animate-spin mr-2" /> Cancel Payment
          </span>
        ) : (
          <span> Cancel Payment</span>
        )}
      </button>
    </div>
  );
};
