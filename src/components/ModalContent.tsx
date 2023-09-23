import axios from "axios";
import { FormEvent, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const ModalContent = ({ closeModal }: { closeModal: () => void }) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const handleSend = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await toast.promise(
        axios.post("/api/contact", { email, name, message }),
        {
          pending: "Sending email...",
          success: "Email sent. Thanks!",
          error: "Oops, operation failed!",
        },
      );

      setEmail("");
      setName("");
      setMessage("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-cream800 h-full overflow-x-hidden">
      <ToastContainer
        position="bottom-right"
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <div className="bg-blue800 h-16 text-white flex justify-center px-4 items-center">
        <h1 className="md:text-xl font-light text-base">
          Our response time is just 6 business hours!
        </h1>
      </div>
      <div className="px-10 h-[calc(100%-64px)] flex flex-col">
        <div className="flex flex-col text-center items-center py-8">
          <img className="h-28 w-28" src="/images/contact.svg" alt="" />
          <h2 className="font-lora font-medium text-lg">
            Here you can clear all your doubts about our company, products and
            employees. It will be an honor to serve you all.
          </h2>
        </div>
        <form onSubmit={handleSend}>
          <div className="flex flex-col gap-2 h-full">
            <input
              className="rounded-md p-2 focus:outline-none focus:border-none"
              type="email"
              name="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="rounded-md p-2 focus:outline-none focus:border-none"
              type="text"
              name="username"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <textarea
              className="min-h-[130px] h-full rounded-md resize-none border focus:outline-none focus:border-none p-2 flex-grow"
              maxLength={150}
              name="message"
              placeholder="Your text here"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
          <div className="flex md:flex-row flex-col-reverse justify-between py-8 gap-4">
            <button
              className="py-2 px-11 rounded-md shadow-md bg-white"
              onClick={closeModal}
            >
              Close
            </button>
            <button
              type="submit"
              className="py-2 px-11 rounded-md shadow-md bg-white"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
