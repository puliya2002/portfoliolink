"use client";
import React, { useState, useEffect } from "react";
import Button from "@/components/Button";
import axios from "axios";
import { useRouter } from "next/navigation";
import PortfolioSetupCard from "@/components/portfolioSetupCard";

export default function Step2() {
  const [error, setError] = useState("");
  const router = useRouter();

  const [isProject, setIsProject] = useState<boolean | null>(null);
  const [isSkills, setIsSkills] = useState<boolean | null>(null);
  const [isExperience, setIsExperience] = useState<boolean | null>(null);
  const [isEducation, setIsEducation] = useState<boolean | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("/api/step2");
        console.log("Fetched data:", response.data); // Debugging log

        const { project, skills, experience, education } = response.data;

        setIsProject(() => project);
        setIsSkills(() => skills);
        setIsExperience(() => experience);
        setIsEducation(() => education);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/step2", {
        project: isProject,
        skills: isSkills,
        experience: isExperience,
        education: isEducation,
      });

      router.push("/dashboard");
    } catch (err: any) {
      console.error("Error:", err.response?.data?.error);
      setError(err.response?.data?.error || "Something went wrong");
    }
  };

  if (
    isProject === null ||
    isSkills === null ||
    isExperience === null ||
    isEducation === null
  ) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold">Portfolio Setup</h1>
      <p className="text-gray-500 text-[15px]">Select Portfolio Sections</p>
      <hr className="my-2" />

      <form onSubmit={handleSubmit}>
        <div className="gap-4 grid grid-cols-1 md:grid-cols-2 pt-5">
          <PortfolioSetupCard
            heading="Profile Section"
            value="profile-section"
            defaultChecked
            isChecked
            isDisabled
          />
          <PortfolioSetupCard
            heading="About Me Section"
            value="about-me-section"
            defaultChecked
            isChecked
            isDisabled
          />
          <PortfolioSetupCard
            heading="Project Section"
            value="project-section"
            defaultChecked={isProject}
            onCheckedChange={setIsProject}
          />
          <PortfolioSetupCard
            heading="Skills"
            value="skills"
            defaultChecked={isSkills}
            onCheckedChange={setIsSkills}
          />
          <PortfolioSetupCard
            heading="Experience"
            value="experience"
            defaultChecked={isExperience}
            onCheckedChange={setIsExperience}
          />
          <PortfolioSetupCard
            heading="Education"
            value="education"
            defaultChecked={isEducation}
            onCheckedChange={setIsEducation}
          />
        </div>
        <div className="flex justify-end mt-5">
          <Button
            type="submit"
            text="Next"
            extraClass="md:px-[50px] lg:px-[100px]"
          />
        </div>
        {error && <p className="text-red-500 text-[13px]">{error}</p>}
      </form>
    </div>
  );
}
