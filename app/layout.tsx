"use client";

import { usePathname } from "next/navigation";

import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Providers from "./providers";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  // Check if the current path is '/login' or '/register'
  const isAuthPage = pathname === "/login" || pathname === "/register";
  const isTemplatePage = pathname.startsWith("/template");

  return (
    <html lang="en">
      <body>
        <div>
          <div></div>
          {/* Only show Navbar and Footer if it's not the login or register page */}
          <Providers>
            {!isAuthPage && !isTemplatePage && <Navbar />}
            <main>{children}</main>
            {!isAuthPage && !isTemplatePage && <Footer />}
          </Providers>
        </div>
      </body>
    </html>
  );
}
