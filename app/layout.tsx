import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AddTweet from "@/components/add-tweet";
import SearchTweet from "@/components/search-tweet";
import { Suspense } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | Karrot Market",
    default: "Karrot Market",
  },
  description: "Sell and buy all the things!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-neutral-900 text-white max-w-screen-sm mx-auto`}
      >
        <Suspense fallback={<div>Loading...</div>}>
          <SearchTweet />
          <AddTweet />
          {children}
        </Suspense>
      </body>
    </html>
  );
}
