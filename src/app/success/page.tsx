import React from "react";
import Head from "next/head";
import Link from "next/link";
//success page after the purchasing
const sucess = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <Head>
        <title>Payment Successful</title>
      </Head>

      <h1 className="text-4xl font-bold mb-4">Payment Successful!</h1>
      <p className="text-lg text-gray-700 mb-2">Thank you for your purchase.</p>
      <p className="text-lg text-gray-700 mb-6">
        Your order will be processed shortly. Keep an eye on your email!
      </p>
      <Link href="/">
        <div className="text-blue-500 hover:text-blue-700">Go back to Home</div>
      </Link>
    </div>
  );
};

export default sucess;
