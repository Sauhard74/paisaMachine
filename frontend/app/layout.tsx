import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PaisaMachine \u2014 Stock News Terminal",
  description: "Ultra-low latency stock news aggregation terminal",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-black antialiased">{children}</body>
    </html>
  );
}
