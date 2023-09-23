"use client";
import axios from "axios";
import { getCookie } from "cookies-next";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Cancel = () => {
  const router = useRouter();
  const cancel = async () => {
    let id;
    const cookie = getCookie("last-checkoutid");
    if (typeof cookie === "string") {
      id = JSON.parse(cookie).id;
    }
    try {
      await axios.post("/api/cancel", { id });
      router.push("/");
    } catch (err) {
      console.log(err);
    }
  };

  const backToPayment = async () => {
    let id;
    const cookie = getCookie("last-checkoutid");
    if (typeof cookie === "string") {
      id = JSON.parse(cookie).id;
    }
    try {
      const cance2l = await axios.get("/api/checkout-many", {
        params: { id },
      });
      router.push(cance2l.data.url);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-[calc(100vh-112px)] flex items-center justify-center">
      <div className=" flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">
          You're sure you want to cancel?
        </h1>
        <button
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mb-2"
          onClick={cancel}
        >
          Yes, cancel
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mb-2"
          onClick={backToPayment}
        >
          No, back to payment
        </button>
        <Link href="/" className="text-blue-500 hover:underline">
          Instead, back home
        </Link>
      </div>
    </div>
  );
};
export default Cancel;
