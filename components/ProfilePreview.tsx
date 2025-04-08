import React from "react";

import { Eye } from "lucide-react";

import { Progress } from "@/components/ui/progress";
import { useState } from "react";
import { Pencil } from "lucide-react";
import Link from "next/link";

const ProfilePreview = ({ profile }: { profile: any }) => {
      React.useEffect(() => {
        const timer = setTimeout(() => setProgress(66), 500);
        return () => clearTimeout(timer);
      }, []);
      const [progress, setProgress] = useState(13);
    return (
      <div>
        <div className="relative">
          <div className="absolute inset-0 flex items-center justify-center z-10 bg-black/75 rounded-[15px]">
            <Link
              target="_blank"
              href={`${process.env.NEXT_PUBLIC_API_URL}/${profile.username}`}
            >
              <div className="flex gap-2 items-center rounded-full bg-gray-900 border border-white text-white px-5 py-2 hover:bg-[--primary] hover:text-black cursor-pointer">
                <Eye />
                <p className="text-sm">View Portfolio</p>
              </div>
            </Link>
          </div>
          <div className="absolute top-0 right-0 z-10 p-4 ">
            <Link href="/dashboard/live-edit">
              <div className="flex gap-2 items-center rounded-full bg-gray-900 border border-white text-white px-5 py-2 hover:bg-[--primary] hover:text-black cursor-pointer">
                <Pencil size={17} />
                <p className="text-sm">Live Edit</p>
              </div>
            </Link>
          </div>
          <div className="absolute bottom-0 right-0 z-10 p-1 w-full">
            <Progress value={progress} className="" />
          </div>
          <iframe
            src={`http://localhost:3000/${profile.username}`}
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
