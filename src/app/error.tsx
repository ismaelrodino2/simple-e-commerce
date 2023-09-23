"use client";

import Link from "next/link";

const error = ({ err, reset }: { err: Error; reset: () => void }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-4">Error Page</h1>
      <h2 className="text-xl mb-4">
        There was a problem: {JSON.stringify(err)}
      </h2>
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600 transition-colors duration-200"
        onClick={reset}
      >
        Try Again
      </button>
      <Link href={"/"} passHref>
        <div className="mt-4 text-blue-500 hover:text-blue-600">
          Go back to the home page
        </div>
      </Link>
    </div>
  );
};
export default error;
