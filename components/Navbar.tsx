import React from "react";
import Image from "next/image";
import Link from "next/link";
import NavbarLinks from "../constants/navbar";
import Drawer from "./Drawer";


const Navbar = () => {

  return (
    <div className="sticky top-0 px-5">
      <div className="flex items-center justify-between container mx-auto bg-white rounded-full my-4 px-8 py-4">
        <div>
          <Link href="/">
            <Image src="/logo.png" alt="logo" width={150} height={100}></Image>
          </Link>
        </div>

        <div>
          <ul className="flex gap-6 items-center text-lg hidden md:flex">
            {NavbarLinks.map((link) => (
              <li key={link.id}>
                <Link href={`/${link.id}`}>{link.title}</Link>
              </li>
            ))}
            <li className="bg-black text-white rounded-full px-7 py-2">
              Sign Up
            </li>
          </ul>

          <div className="md:hidden pt-1"><Drawer /></div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
