"use client";
import { SessionProvider } from "next-auth/react";
import Footer from "./_components/footer";
import Navbar from "./_components/navbar";
import "./globals.css";
import { Toaster } from "react-hot-toast";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/lolaselan.jpg" type="image/jpg" />
      </head>

      <body>
        <SessionProvider>
          <Toaster position="top-right" />
          <Navbar />
          {children}
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}
