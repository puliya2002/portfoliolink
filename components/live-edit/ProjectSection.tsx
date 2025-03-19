"use client";
import React, { useState, useEffect, use } from "react";
import Button from "@/components/ui/Button";
import TextField from "@/components/ui/TextField";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Pencil } from "lucide-react";
import { set } from "mongoose";

const ProjectSection = ({ onChange }: { onChange: () => void }) => {
  const router = useRouter();

  const [error, setError] = useState("");
  const [edit, setEdit] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [technologies, setTechnologies] = useState("");
  const [fetchedProjects, setFetchedProjects] = useState([]);
  const [coverPhoto, setCoverPhoto] = useState<File | null>(null);
  const [screenshot, setScreenshot] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);

  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get("/api/projects")
      .then((res) => {
        setFetchedProjects(res.data.project);
      })
      .catch((err) => {
        console.log({ error: err }, { message: err.message });
      });
  }, []);



  const handleSave = async (e: any) => {
  setSaving(true);
  e.preventDefault();
  let splitedTechnologies = technologies.split("|").map((tech) => tech.trim());

  try {
    let coverPhotoUrl = null;
    let screenshotUrl = null;

    if (coverPhoto) {
      const formData = new FormData();
      formData.append("file", coverPhoto);
      const coverRes = await axios.post("/api/s3-upload", formData);
      coverPhotoUrl = coverRes.data.fileUrl;
    }

    if (screenshot) {
      const formData = new FormData();
      formData.append("file", screenshot);
      const screenshotRes = await axios.post("/api/s3-upload", formData);
      screenshotUrl = screenshotRes.data.fileUrl;
    }

    await axios.post("/api/projects", {
      project: [
        {
          title,
          description,
          link,
          technologies: splitedTechnologies,
          coverPhoto: coverPhotoUrl,
          screenshot: screenshotUrl,
        },
      ],
    });

    setEdit(false);
    console.log("Saved");
    setSaving(false);
    onChange();
  } catch (err) {
    console.log(err);
    setSaving(false);

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
          <div className="py-3">
            {fetchedProjects.map((project: any, index: number) => (
              <div key={index} className="mb-3">
                <h1 className="text-lg font-semibold">Title{project.title}</h1>
                <p className="text-gray-500">
                  Discription{project.description}
                </p>
                <p className="text-gray-500">Link{project.link}</p>
                <p>{project.coverPhoto}</p>
                <p>{project.screenshot}</p>
                {project.technologies.map((tech: any, index: number) => (
                  <p key={index} className="text-gray-500">
                    {tech}
                  </p>
                ))}
              </div>
            ))}
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
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setCoverPhoto(e.target.files?.[0] || null)}
            className="mb-3"
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setScreenshot(e.target.files?.[0] || null)}
            className="mb-3"
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
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-[--primary] px-4 py-1 rounded-full"
            >
              {saving ? "Saving....." : "Save"}
            </button>
          </div>
          {error && <p className="text-red-500 text-[13px]">{error}</p>}
        </form>
      )}
    </div>
  );
};

export default ProjectSection;
