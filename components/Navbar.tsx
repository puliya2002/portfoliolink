import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import NavbarLinks from "../constants/navbar";
import Drawer from "./Drawer";
import { useSession } from "next-auth/react";


const Navbar = () => {


  const { data: session } = useSession();

  return (
    <div className="sticky top-0 px-5">
      <div className="flex items-center justify-between container mx-auto bg-white rounded-full my-4 px-8 py-4">
        <div>
          <Link href="/">
            <Image src="/logo.png" alt="logo" width={150} height={100}></Image>
          </Link>
        </div>

        <div>
          <ul className="flex gap-6 items-center text-md hidden md:flex ">
            <ul className="flex gap-6 items-center text-md hidden md:flex">
              {NavbarLinks.map((link) => (
                <li
                  key={link.id}
                  className={`cursor-pointer hover:border-b hover:border-b-black${session ? " last:hidden" : ""}`}
                >
                  <Link href={`/${link.id}`}>{link.title}</Link>
                </li>
              ))}
            </ul>
            <Link href="/register">
              <button className="bg-black text-white rounded-full px-7 py-2 hover:bg-[--primary] hover:text-black">
                {session ? "Dashboard" : "Sign Up"}
              </button>
            </Link>
          </ul>

          <div className="md:hidden pt-1">
            <Drawer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
