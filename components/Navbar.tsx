import React from "react";
import Image from "next/image";

const Navbar = () => {
    return (
      <div className="flex items-center justify-between container mx-auto bg-gray-200 rounded-full my-4 px-5 py-4">
        <div>
          <Image src="/logo.png" alt="logo" width={150} height={100}></Image>
        </div>

        <div>
          <ul className="flex gap-4 items-center">
            <li>Home</li>
            <li>Home</li>
            <li>Home</li>
            <li className="bg-black text-white rounded-full px-7 py-2">Sign Up</li>
            
          </ul>
        </div>
      </div>
    );
};

export default Navbar;
