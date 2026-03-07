import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PaisaMachine - Trader Dashboard",
  description: "Ultra-low latency stock news aggregation & trading dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#080c08] text-[#e5e7eb] antialiased font-mono">
        {children}
      </body>
    </html>
  );
}
