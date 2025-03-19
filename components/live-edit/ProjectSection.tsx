"use client";
import React, { useState, useEffect } from "react";
import Button from "@/components/ui/Button";
import TextField from "@/components/ui/TextField";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Pencil } from "lucide-react";

const ProjectSection = ({ onChange }: { onChange: () => void }) => {
  const router = useRouter();

  const [error, setError] = useState("");
  const [edit, setEdit] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [technologies, setTechnologies] = useState("");

  const [message, setMessage] = useState<string | null>(null);
  const [url, setUrl] = useState("");


  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/projects", {
        project: [
          {
            title,
            description,
            link,
            technologies: technologies.split("|").map((tech) => tech.trim()),
          },
        ],
      });
      console.log("Response:", res.data);

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

      {edit && (
        <form onSubmit={handleSave}>
          <hr className="mb-3" />
          <div className="flex justify-end">
            <button
              type="button"
              className="bg-[--primary] px-4 py-1 rounded-full"
            >
              Save Changes
            </button>
          </div>

          <TextField
            label="Project Title"
            placeholder="e.g., Portfolio Website"
            name="title"
            value={title}
            onChange={(e: any) => setTitle(e.target.value)}
          />
          <TextField
            label="Technologies Used"
            placeholder="e.g., React | Next.js | Tailwind CSS"
            name="technologies"
            value={technologies}
            onChange={(e: any) => setTechnologies(e.target.value)}
          />
          <TextField
            label="Project Link"
            placeholder="e.g., https://example.com"
            name="link"
            value={link}
            onChange={(e: any) => setLink(e.target.value)}
          />
          <h1 className="text-xl font-normal py-3 mt-6">Project Description</h1>
          <hr className="mb-3" />
          <textarea
            className="form_input h-32 bg-gray-50"
            placeholder="Describe your project here."
            name="description"
            value={description}
            onChange={(e: any) => setDescription(e.target.value)}
          ></textarea>
          {error && <p className="text-red-500 text-[13px]">{error}</p>}
        </form>
      )}
    </div>
  );
};

export default ProjectSection;
