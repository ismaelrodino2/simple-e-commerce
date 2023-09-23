import { CartProvider } from "@/contexts/CartContext";
import "./globals.css";
import React from "react";
import {
  Inter,
  Poppins,
  Merriweather,
  Lora,
  Montserrat,
  Open_Sans,
} from "next/font/google";
import { NavBar } from "@/components/NavBar";
import { AuthProvider } from "@/contexts/AuthContext";
import { SearchProvider } from "@/contexts/SearchContext";
import { ToastContainer } from "react-toastify";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600"],
});

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["400"],
});

const merriweather = Merriweather({
  subsets: ["latin"],
  variable: "--font-merriweather",
  weight: ["400"],
});

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
  weight: ["600", "700"],
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["500"],
});

const opensans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-opensans",
  weight: ["400", "700"],
});

const fonts = `${inter.className} ${inter.variable} ${poppins.variable} ${merriweather.variable} ${lora.variable} ${montserrat.variable} ${opensans.variable}`;

export const metadata = {
  title: "Furnish in",
  description: "Great furnish ecommerce website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} ${inter.variable} ${poppins.variable} ${merriweather.variable} ${lora.variable} ${montserrat.variable} ${opensans.variable}`}
      >
        <SearchProvider>
          <CartProvider>
            <AuthProvider>
              <NavBar />
              <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
              />
              {children}
            </AuthProvider>
          </CartProvider>
        </SearchProvider>
      </body>
    </html>
  );
}
