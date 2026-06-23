import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar"; // 1. Navbar ko import kiya

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Singh Niwas PG - Smart Tenant Management System",
  description:
    "Singh Niwas PG Isuapur Bihar. Online rent payment, tenant portal, complaint management and billing system.",

  keywords: [
    "Singh Niwas PG",
    "PG in Isuapur",
    "Hostel in Isuapur",
    "PG Bihar",
    "Tenant Management System",
    "Online Rent Payment",
    "Singh Niwas",
  ],

  openGraph: {
    title: "Singh Niwas PG",
    description:
      "Smart rental and tenant management platform.",
    url: "https://singhniwas.vercel.app",
    siteName: "Singh Niwas PG",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#050816]">
  <div className="relative">
    <Navbar />
    <main>{children}</main>
  </div>
</body>
    </html>
  );
}