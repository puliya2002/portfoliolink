"use client";
import React, { useState, useEffect } from "react";
import MainSection from "@/components/live-edit/MainSection";
import Picture from "@/components/live-edit/Picture";
import ProjectSection from "@/components/live-edit/ProjectSection";
import axios from "axios";
import Link from "next/link";
import { Eye } from "lucide-react";
import SelectSections from "@/components/live-edit/SelectSections";
import ExperienceSection from "@/components/live-edit/Experience";
import EducationSection from "@/components/live-edit/EducationSection";
import SkillsSection from "@/components/live-edit/SkillsSection";
import Theme from "@/components/live-edit/Theme";

function Page() {
  const [refreshIframe, setRefreshIframe] = useState(false);

  const [profile, setProfile] = useState({
    username: "",
  });
  const [setup, setSetup] = useState({
    project: true,
    experience: true,
    education: true,
    skills: true,
  });

  useEffect(() => {
    axios
      .get("/api/dashboard")
      .then((response) => {
        setProfile(response.data.profile);
        setSetup(response.data.setup);
      })
      .catch((error) => {
        console.error("Error:", error.response?.data?.error);
      });
  }, [refreshIframe]);

  const handleChange = () => {
    // When state in MainSection changes, trigger iframe refresh
    setRefreshIframe((prev) => !prev);

  };

  useEffect(() => {
    // Whenever the iframe needs to be refreshed, set a key to force a reload
  }, [refreshIframe]);

  return (
    <div>
      <div className="flex flex-col lg:flex-row bg-white">
        <div className="w-full lg:w-2/5 p-5 min-h-screen max-h-screen overflow-y-scroll">
          <div className="absolute top-0 right-0 z-10 p-4 ">
            <Link
              target="_blank"
              href={`${process.env.NEXT_PUBLIC_API_URL}/${profile.username}`}
            >
              <div className="flex w-fit gap-2 items-center rounded-full bg-[--primary] border border-white text-black px-5 py-2 hover:bg-gray-800 hover:text-white cursor-pointer">
                <Eye />
                <p className="text-sm">View Portfolio</p>
              </div>
            </Link>
          </div>
          <div className="flex flex-row justify-between">
            <h1 className="text-2xl font-bold">Live Edit</h1>
            <Link href="/dashboard">
              <p className="text-gray-800 mt-2 text-[15px] underline cursor-pointer">
                Go back
              </p>
            </Link>
          </div>
          <p className="text-gray-500 text-[13px]">
            These sections include all the information about you.
          </p>

          <SelectSections onChange={handleChange} />
          <MainSection onChange={handleChange} />
          <Picture onChange={handleChange} />

          {setup.project && <ProjectSection onChange={handleChange} />}
          {setup.experience && <ExperienceSection onChange={handleChange} />}
          {setup.education && <EducationSection onChange={handleChange} />}
          {setup.skills && <SkillsSection onChange={handleChange} />}
          <Theme onChange={handleChange} />
        </div>
        <div className="w-full lg:w-3/5">
          <iframe
            src={`http://localhost:3000/${profile.username}`}
            key={refreshIframe ? Date.now() : ""}
            scrolling="yes"
            loading="lazy"
            className="border-2 border-[--primary] w-full h-[100%] min-h-screen max-h-screen z-0"
          />
        </div>
      </div>
    </div>
  );
}

export default Page;
