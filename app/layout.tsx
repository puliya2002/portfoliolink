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

  // // Check if the current path is '/login' or '/register'
  //   const isAuthPage = pathname === "/login" || pathname === "/register" || pathname === "/dashboard/live-edit";
  //   const isTemplatePage = pathname.startsWith("/template");

  //   return (
  //     <html lang="en">
  //       <body>
  //         <div>
  //           <div></div>
  //           <Providers>
  //             {/* Show Navbar and Footer only if it's NOT an auth, template, or user page */}
  //             {!isAuthPage && !isTemplatePage && <Navbar />}
  //             <main>{children}</main>
  //             {!isAuthPage && !isTemplatePage  && <Footer />}
  //           </Providers>
  //         </div>
  //       </body>
  //     </html>
  //   );
  // }


    // Check if the current path is '/login' or '/register'
  const isPage = pathname === "/" || pathname.startsWith("/dashboard") || pathname === "/admin-dashboard" || pathname === "/pricing";
  const isDashboardRestricted = pathname==="/dashboard/live-edit";


    return (
      <html lang="en">
        <body>
          <div>
            <div></div>
            <Providers>
              {/* Show Navbar and Footer only if it's NOT an auth, template, or user page */}
              {isPage && !isDashboardRestricted && <Navbar />}
              <main>{children}</main>
              {isPage && !isDashboardRestricted &&  <Footer />}
            </Providers>
          </div>
        </body>
      </html>
    );
  }

