"use client";

import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

function ProjectCard({
  id,
  name,
  skills,
  image,
}: {
  id: string;
  name: string;
  skills: string[];
  image: string;
}) {
  const router = useRouter();

  const handleNavigation = () => router.push(`/${id}`);

  return (
    <div
      className="h-auto project-card cursor-pointer"
      onClick={handleNavigation}
    >
      <div>
        <div className="flex flex-row justify-between items-center">
          <p className="text-2xl pb-2">{name}</p>
          <div className="cursor-pointer size-auto mb-2 p-2 border-2 border-gray-600/60 rounded-full hover:bg-gradient-to-tr from-gray-700/20 to-gray-500/50">
            <ArrowRight />
          </div>
        </div>

        <div className="flex flex-row flex-wrap gap-[6px]">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="h-min w-auto bg-black/20 border-gray-500/70 border rounded-md px-2 py-[2px] text-gray-400"
            >
              <p className="text-[16px]">{skill}</p>
            </div>
          ))}
        </div>
        <Image
          src={image}
          className="object-cover p-1 rounded-[15px] mt-3 h-[240px] sm:h-[270px] w-screen"
          alt="project"
          loading="lazy"
          width={800}
          height={400}
        />
      </div>
    </div>
  );
}

export default ProjectCard;
