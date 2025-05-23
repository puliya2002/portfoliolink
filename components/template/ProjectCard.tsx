"use client";

import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { useRouter } from "next/navigation";

function ProjectCard({
  id,
  name,
  skills,
  image,
  username,
  discription,
  ss
}: {
  id: number;
  name: string;
  skills: string[];
  image: string;
  ss: string;
  username: string;
  discription: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  const router = useRouter();

  const handleNavigation = () => {
    // Store selected project details in localStorage
    localStorage.setItem(
      "selectedProject",
      JSON.stringify({ id, name, image, ss, skills, username, discription })
    );

    // Redirect to the project details page with the username
    router.push(`/${username}/projects/${id}`);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -50px 0px" }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className={`h-auto project-card cursor-pointer transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
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
          {skills?.map((skill, index) => (
            <div
              key={index}
              className="h-min w-auto bg-gray/20 border-gray-500/55 border rounded-md px-2 py-[2px] "
            >
              <p className="text-[16px]">{skill}</p>
            </div>
          ))}
        </div>

        <Image
          src={image || "/placeholder.png"}
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
