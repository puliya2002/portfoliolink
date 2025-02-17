import React from "react";
import Image from "next/image";
<<<<<<< Updated upstream

const Navbar = () => {
    return (
      <div className="flex items-center justify-between container mx-auto bg-gray-200 rounded-full my-4 px-5 py-4">
=======
import Link from "next/link";
import NavbarLinks from "../constants/navbar";
import Drawer from "./Drawer";
import { useSession } from "next-auth/react";




const Navbar = () => {


  const { data: session, status } = useSession();


  return (
    <div className="sticky top-0 px-5">
      <div className="flex items-center justify-between container mx-auto bg-white rounded-full my-4 px-8 py-4">
>>>>>>> Stashed changes
        <div>
          <Image src="/logo.png" alt="logo" width={150} height={100}></Image>
        </div>

        <div>
<<<<<<< Updated upstream
          <ul className="flex gap-4 items-center">
            <li>Home</li>
            <li>Home</li>
            <li>Home</li>
            <li className="bg-black text-white rounded-full px-7 py-2">Sign Up</li>
            
          </ul>
=======
          <ul className="flex gap-6 items-center text-md hidden md:flex ">
            <ul className="flex gap-6 items-center text-md hidden md:flex ">
              {NavbarLinks.map((link) => (
                <li
                  key={link.id}
                  className={`cursor-pointer hover:border-b hover:border-b-black ${
                    session ? "last:hidden" : ""
                  }`}
                >
                  <Link href={`/${link.id}`}>{link.title}</Link>
                </li>
              ))}
            </ul>
            <Link href="/register">
              <button className="bg-black text-white  rounded-full px-7 py-2 hover:bg-[--primary] hover:text-black">
                {!session ? "Sign Up" : "Dashboard"}
              </button>
            </Link>
          </ul>

          <div className="md:hidden pt-1">
            <Drawer />
          </div>
>>>>>>> Stashed changes
        </div>
      </div>
    );
};

export default Navbar;
