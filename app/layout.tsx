import type { Metadata } from "next";

import SideBar from "./_components/SideBar";
import "./global.css";

import { Inter } from "next/font/google";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"], display: "auto" });

export const metadata: Metadata = {
  title: "Stockly",
  description: "Gerenciador de estoque de produtos e vendas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className}antialiased`}>
        <div className="flex min-h-full">
          <SideBar />
          {children}
        </div>
        <Toaster />
      </body>
    </html>
  );
}
