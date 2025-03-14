import React from "react";
import Image from "next/image";
import { Eye } from "lucide-react";
import PorfileSS from "@/public/profilesstemp.png";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";
import { Pencil } from "lucide-react";

const ProfilePreview = () => {
      React.useEffect(() => {
        const timer = setTimeout(() => setProgress(66), 500);
        return () => clearTimeout(timer);
      }, []);
      const [progress, setProgress] = useState(13);
    return (
      <div>
        <div className="relative">
          <div className="absolute inset-0 flex items-center justify-center z-10 bg-black/75 rounded-[15px]">
            <div className="flex gap-2 items-center rounded-full bg-gray-900 border border-white text-white px-5 py-2 hover:bg-[--primary] hover:text-black cursor-pointer">
              <Eye />
              <p className="text-sm">View Portfolio</p>
            </div>
          </div>
          <div className="absolute top-0 right-0 z-10 p-4 ">
            <div className="flex gap-2 items-center rounded-full bg-gray-900 border border-white text-white px-5 py-2 hover:bg-[--primary] hover:text-black cursor-pointer">
              <Pencil size={17} />
              <p className="text-sm">Edit</p>
            </div>
          </div>
          <div className="absolute bottom-0 right-0 z-10 p-1 w-full">

            <Progress value={80} className="" />
          </div>
          <iframe
            src="https://pulinduvidmal.com"
            scrolling="no"
            loading="lazy"
            allowFullScreen
            className="rounded-[15px] border-2 border-white w-full h-[500px] z-0"
          />
        </div>

      </div>
    );
};

export default ProfilePreview;
