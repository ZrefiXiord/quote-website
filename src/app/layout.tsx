import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { StrictMode } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Citations",
  description: "Site de citations",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className + " bg-blue-400"}>
        <div className="flex flex-col h-screen">{children}</div>
      </body>
    </html>
  );
}
