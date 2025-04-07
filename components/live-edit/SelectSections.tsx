"use client";
import React, { useState, useEffect } from "react";
import PortfolioSetupCard from "@/components/portfolioSetupCard";
import axios from "axios";
import { Pencil } from "lucide-react";
import { useRouter } from "next/navigation";

const SelectSections = ({ onChange }: { onChange: () => void }) => {
  const router = useRouter();
  const [error, setError] = useState("");

  const [edit, setEdit] = useState(false);
  const [isProject, setIsProject] = useState<boolean | null>(null);
  const [isSkills, setIsSkills] = useState<boolean | null>(null);
  const [isExperience, setIsExperience] = useState<boolean | null>(null);
  const [isEducation, setIsEducation] = useState<boolean | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("/api/step2");
        console.log("Fetched data:", response.data);

        const { project, skills, experience, education } = response.data;
        setIsProject(project);
        setIsSkills(skills);
        setIsExperience(experience);
        setIsEducation(education);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchUser();
  }, []);

  const handleUpdate = async (section: string, value: boolean) => {
    try {
      await axios.post("/api/step2", {
        project: section === "project" ? value : isProject,
        skills: section === "skills" ? value : isSkills,
        experience: section === "experience" ? value : isExperience,
        education: section === "education" ? value : isEducation,
      });
      console.log(`${section} updated to`, value);
      onChange();
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
    <div className="bg-gray-100 p-5 rounded-[20px] mt-5">
      <div className="flex justify-between">
        <h1 className="text-xl font-semibold">Select Portfolio Sections</h1>
        <div className="flex gap-1 px-4 py-1 rounded-full">
          {!edit && <Pencil className="w-5 h-5" />}
          <button onClick={() => setEdit(!edit)}>
            {edit ? "Cancel" : "Edit"}
          </button>
        </div>
      </div>

      {edit && (
        <form>
          <hr className="my-2" />
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
              onCheckedChange={(checked: boolean) => {
                setIsProject(checked);
                handleUpdate("project", checked);
              }}
            />
            <PortfolioSetupCard
              heading="Skills"
              value="skills"
              defaultChecked={isSkills}
              onCheckedChange={(checked: boolean) => {
                setIsSkills(checked);
                handleUpdate("skills", checked);
              }}
            />
            <PortfolioSetupCard
              heading="Experience"
              value="experience"
              defaultChecked={isExperience}
              onCheckedChange={(checked: boolean) => {
                setIsExperience(checked);
                handleUpdate("experience", checked);
              }}
            />
            <PortfolioSetupCard
              heading="Education"
              value="education"
              defaultChecked={isEducation}
              onCheckedChange={(checked: boolean) => {
                setIsEducation(checked);
                handleUpdate("education", checked);
              }}
            />
          </div>

          {error && <p className="text-red-500 text-[13px] mt-3">{error}</p>}
        </form>
      )}
    </div>
  );
};

export default SelectSections;
