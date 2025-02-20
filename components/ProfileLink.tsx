import React from "react";
import Image from "next/image";
import { Download } from "lucide-react";
import { Clipboard } from "lucide-react";



import { useState } from "react";

const ProfileLink = () => {

    return (
      <div className="bg-gray-100 h-fit rounded-[30px] p-5 ">
        <h2 className="text-lg font-medium text-left pb-3">Your Prtfolio Link</h2>
        <div className="flex items-center justify-center flex-col">
          <div className="flex flex-row gap-2 justify-center items-center">
            <div className="bg-black w-32 h-32 rounded-md"></div>
            <div className="rounded-full ">
              <Download />
            </div>
          </div>
          <div className="border border-gray-700 w-full h-fit rounded-full mt-5 flex justify-center items-center">
            <Clipboard size={16} />

            <p className="text-sm text-center truncate p-2">
              https://www.portfoli.link/username
            </p>
          </div>
        </div>
      </div>
    );
};

export default ProfileLink;
