import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SearchInput from "@/components/SearchInput";
import NavBar from "@/components/NavBar";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Flag app",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      
      <body className={inter.className}>
        <NavBar />
        <div className="flex flex-col items-center ">
          <SearchInput />
          {children}
        </div>
        <Toaster richColors position="bottom-right"/>
        
      </body>
    </html>
  );
}
