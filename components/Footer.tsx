import React from "react";
import Image from "next/image";
import Link from "next/link";
import NavbarLinks from "../constants/navbar";
import Drawer from "./Drawer";

const Footer = () => {
  return (
    <div className="px-5">
      <div className="flex flex-col md:flex-row items-center justify-between container mx-auto bg-white rounded-full my-4 px-8 py-4">
        <div>
          <Link href="/">
            <Image src="/logo.png" alt="logo" width={100} height={500}></Image>
          </Link>
        </div>

        <div>
          <p className="text-sm max-md:pt-2">
            Copyright &copy; {new Date().getFullYear()} PortfoliLink
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
