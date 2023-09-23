"use client";
import { useState } from "react";
import Modal from "react-modal";
import { ModalContent } from "./ModalContent";
import { useRouter } from "next/navigation";

export const Button = ({ color, text }: { color: string; text: string }) => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const router = useRouter();
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }
  const customStyles = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.5)", // Darker overlay background color
    },
    content: {
      top: "50%",
      width: "70%",
      height: "85%",
      padding: 0,
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  const handleGetStarted = () => {
    router.push("/signin");
  };
  const handleTalkToUs = () => {
    setIsOpen(true);
  };
  return (
    <>
      <Modal
        ariaHideApp={false}
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <ModalContent closeModal={closeModal} />
      </Modal>
      <button
        onClick={
          text === "Get in touch with us" ? handleTalkToUs : handleGetStarted
        }
        className={`${
          color === "cream" ? "bg-cream800" : "bg-blue850 text-white"
        } py-2 px-11 rounded-md shadow-md`}
      >
        {text}
      </button>
    </>
  );
};
