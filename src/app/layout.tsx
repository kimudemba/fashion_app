import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/store/provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Trending Outfits - Shop Complete Looks",
  description: "Discover and shop complete outfits curated by expert stylists. Find your perfect style with our trending collections.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
