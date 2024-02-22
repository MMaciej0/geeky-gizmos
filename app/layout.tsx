import type { Metadata } from "next";
import { Roboto_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

import Navbar from "./_components/Navbar";

const roboto = Roboto_Mono({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Geeky Gizmos Bazar",
  description:
    "Welcome to Geeky Gizmos Bazaar, your one-stop destination for all things tech and geeky! Explore our vast collection of gadgets, gizmos, and geek-approved accessories. From cutting-edge electronics to retro gaming treasures, we've got something for every tech enthusiast. Shop now and unleash your inner geek with Geeky Gizmos Bazaar!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          roboto.variable,
        )}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
