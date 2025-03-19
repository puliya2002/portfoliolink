"use client";
import React, { useState, useEffect } from "react";
import Button from "@/components/ui/Button";
import TextField from "@/components/ui/TextField";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Pencil } from "lucide-react";

const ProjectSection = ({ onChange }: { onChange: () => void }) => {
  const router = useRouter();
  const [projects, setProjects] = useState<any[]>([]);
  const [newProject, setNewProject] = useState({
    projectTitle: "",
    projectDescription: "",
    skills: "",
  });

  const [error, setError] = useState("");
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get("/api/projects");
        console.log("Fetched project data:", response.data);
        setProjects(response.data || []);
      } catch (error) {
        console.error("Error fetching project data:", error);
      }
    };

    fetchProjects();
  }, []);

  const handleChange = (e: any) => {
    setNewProject((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = async () => {
    try {
      const res = await axios.post("/api/projects", newProject);
      console.log("Project saved successfully:", res.data);

      setProjects([...projects, newProject]);
      setNewProject({
        projectTitle: "",
        projectDescription: "",
        skills: "",
      });
    } catch (err: any) {
      console.error("Error:", err.response?.data?.error);
      setError(err.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <div className="bg-gray-100 p-5 rounded-[20px] mt-5">
      <h1 className="text-xl font-semibold">Project Section</h1>
      <div className="flex justify-end">
        <div className="flex gap-1 px-4 py-1 rounded-full">
          {!edit && <Pencil className="w-5 h-5" />}
          <button onClick={() => setEdit(!edit)}>
            {edit ? "Cancel" : "Edit"}
          </button>
        </div>
      </div>

      {/* List existing projects */}
      <div className="mt-5">
        {projects.map((project, index) => (
          <div key={index} className="border p-4 rounded-lg bg-white mt-3">
            <h2 className="text-lg font-medium">{project.projectTitle}</h2>
            <p className="text-sm text-gray-500">{project.skills}</p>
            <p className="text-gray-700 mt-2">{project.projectDescription}</p>
          </div>
        ))}
      </div>

      {/* Form to add new projects */}
      {edit && (
        <form>
          <hr className="mb-3" />
          <div className="flex justify-end">
            <button
              type="button"
              className="bg-[--primary] px-4 py-1 rounded-full"
              onClick={handleSave}
            >
              Save Changes
            </button>
          </div>

          <TextField
            label="Project Title"
            placeholder="e.g., Portfolio Website"

            value={newProject.projectTitle}
            onChange={handleChange}
          />
          <TextField
            label="Skills Used"
            placeholder="e.g., React, Next.js, Tailwind CSS"

            value={newProject.skills}
            onChange={handleChange}
          />
          <h1 className="text-xl font-normal py-3 mt-6">Project Description</h1>
          <hr className="mb-3" />
          <textarea
            className="form_input h-32 bg-gray-50"
            placeholder="Describe your project here."
            name="projectDescription"
            value={newProject.projectDescription}
            onChange={handleChange}
          ></textarea>
          {error && <p className="text-red-500 text-[13px]">{error}</p>}
        </form>
      )}
    </div>
  );
};

export default ProjectSection;
