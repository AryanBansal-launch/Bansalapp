// import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
// import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

import './globals.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { SessionProvider } from "next-auth/react";
import { ToastContainer} from 'react-toastify';
import { Suspense } from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <SessionProvider>
      <ToastContainer />
        <Navbar />
        <Suspense fallback={<div>Loading...</div>}><main>{children}</main></Suspense>
        <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}
