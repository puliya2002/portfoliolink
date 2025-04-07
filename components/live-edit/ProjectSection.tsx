"use client";
import React, { useState, useEffect } from "react";
import Button from "@/components/ui/Button";
import TextField from "@/components/ui/TextField";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Pencil, Plus, Trash2 } from "lucide-react";

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
  const [deleting, setDeleting] = useState(false);

  const [message, setMessage] = useState<string | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [existingCoverPhoto, setExistingCoverPhoto] = useState<string | null>(
    null
  );
  const [existingScreenshot, setExistingScreenshot] = useState<string | null>(
    null
  );
  const [isAddNewMode, setIsAddNewMode] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = () => {
    setError("");
    axios
      .get("/api/projects")
      .then((res) => {
        setFetchedProjects(res.data.project || []);
      })
      .catch((err) => {
        console.log({ error: err }, { message: err.message });
        setError("Failed to fetch projects. Please refresh the page.");
      });
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setLink("");
    setTechnologies("");
    setCoverPhoto(null);
    setScreenshot(null);
    setSelectedProject(null);
    setExistingCoverPhoto(null);
    setExistingScreenshot(null);
    setError("");
  };

  const handleSave = async (e: any) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    let splitedTechnologies = technologies
      .split("|")
      .map((tech) => tech.trim());

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
      setIsModalOpen(false);
      resetForm();
      fetchProjects();
      setMessage("Project added successfully!");
      setTimeout(() => setMessage(null), 3000);
      onChange();
    } catch (err) {
      console.log(err);
      setError("Failed to save project. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleUpdate = async (e: any) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    let splitedTechnologies = technologies
      .split("|")
      .map((tech) => tech.trim());

    try {
      let coverPhotoUrl = existingCoverPhoto;
      let screenshotUrl = existingScreenshot;

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

      await axios.put(`/api/projects/${selectedProject._id}`, {
        title,
        description,
        link,
        technologies: splitedTechnologies,
        coverPhoto: coverPhotoUrl,
        screenshot: screenshotUrl,
      });

      setIsModalOpen(false);
      resetForm();
      fetchProjects();
      setMessage("Project updated successfully!");
      setTimeout(() => setMessage(null), 3000);
      onChange();
    } catch (err) {
      console.log(err);
      setError("Failed to update project. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (projectId: string) => {
    if (confirmDelete !== projectId) return;

    setDeleting(true);
    setError("");
    setIsModalOpen(false);

    try {
      await axios.delete(`/api/projects/${projectId}`);

      setConfirmDelete(null);
      fetchProjects();
      setMessage("Project deleted successfully!");
      setTimeout(() => setMessage(null), 3000);
      onChange();
    } catch (err) {
      console.log(err);
      setError("Failed to delete project. Please try again.");
    } finally {
      setDeleting(false);
    }
  };

  const handleEditClick = (project: any) => {
    setSelectedProject(project);
    setTitle(project.title);
    setDescription(project.description);
    setLink(project.link);
    setTechnologies(project.technologies.join(" | "));
    setExistingCoverPhoto(project.coverPhoto);
    setExistingScreenshot(project.screenshot);
    setIsAddNewMode(false);
    setIsModalOpen(true);
  };

  const handleAddNewClick = () => {
    resetForm();
    setIsAddNewMode(true);
    setIsModalOpen(true);
  };

  return (
    <div className="bg-gray-100 p-5 rounded-[20px] mt-5">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">Project Section</h1>
        <div className="flex gap-3">
          <button
            onClick={handleAddNewClick}
            className="flex items-center gap-1 px-4 py-1 bg-[--primary] text-black rounded-full hover:bg-green-600 transition"
          >
            <Plus className="w-5 h-5" />
            Add New
          </button>
          <div className="flex gap-1 px-4 py-1 rounded-full">
            {!edit && <Pencil className="w-5 h-5" />}
            <button onClick={() => setEdit(!edit)}>
              {edit ? "Cancel" : "Edit"}
            </button>
          </div>
        </div>
      </div>

      {message && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded mt-3">
          {message}
        </div>
      )}

      {/* Modal for Add New or Edit Project */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-[500px] max-w-[90%] max-h-[90%] overflow-y-auto shadow-lg">
            <h2 className="text-xl font-semibold mb-4">
              {isAddNewMode ? "Add New Project" : "Edit Project"}
            </h2>

            <form onSubmit={isAddNewMode ? handleSave : handleUpdate}>
              <TextField
                label="Project Title"
                placeholder="e.g., Portfolio Website"
                value={title}
                onChange={(e: any) => setTitle(e.target.value)}
                required
              />
              <TextField
                label="Technologies Used"
                placeholder="e.g., React | Next.js | Tailwind CSS"
                value={technologies}
                onChange={(e: any) => setTechnologies(e.target.value)}
                required
              />
              <TextField
                label="Project Link"
                placeholder="e.g., https://example.com"
                value={link}
                onChange={(e: any) => setLink(e.target.value)}
                required
              />

              <div className="flex flex-col mt-3">
                <label className="mb-1">Cover Photo</label>
                {existingCoverPhoto && !isAddNewMode && (
                  <div className="mb-2">
                    <img
                      src={existingCoverPhoto}
                      alt="Current cover"
                      className="h-20 object-cover rounded mb-1"
                    />
                    <p className="text-xs text-gray-500">Current cover photo</p>
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setCoverPhoto(e.target.files?.[0] || null)}
                  className="mb-3"
                />
              </div>

              <div className="flex flex-col mt-1">
                <label className="mb-1">Screenshot</label>
                {existingScreenshot && !isAddNewMode && (
                  <div className="mb-2">
                    <img
                      src={existingScreenshot}
                      alt="Current screenshot"
                      className="h-20 object-cover rounded mb-1"
                    />
                    <p className="text-xs text-gray-500">Current screenshot</p>
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setScreenshot(e.target.files?.[0] || null)}
                  className="mb-3"
                />
              </div>

              <h1 className="text-lg font-normal py-2 mt-2">
                Project Description
              </h1>
              <textarea
                className="form_input h-32 bg-gray-50 w-full p-2 border rounded"
                placeholder="Describe your project here."
                value={description}
                onChange={(e: any) => setDescription(e.target.value)}
                required
              ></textarea>

              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    resetForm();
                  }}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-4 py-2 bg-[--primary] text-black rounded hover:bg-black hover:text-white transition disabled:opacity-70"
                >
                  {saving ? "Saving..." : isAddNewMode ? "Save" : "Update"}
                </button>
              </div>

              {!isAddNewMode && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={() => setConfirmDelete(selectedProject._id)}
                    className="flex items-center text-red-500 hover:text-red-700 transition"
                    disabled={deleting}
                  >
                    <Trash2 className="w-4 h-4 mr-1" />
                    Delete Project
                  </button>

                  {confirmDelete === selectedProject._id && (
                    <div className="mt-2 p-2 border border-red-200 bg-red-50 rounded">
                      <p className="text-sm text-red-700 mb-2">
                        Are you sure you want to delete this project?
                      </p>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => setConfirmDelete(null)}
                          className="px-3 py-1 text-sm bg-gray-200 rounded"
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(selectedProject._id)}
                          className="px-3 py-1 text-sm bg-red-500 text-white rounded"
                          disabled={deleting}
                        >
                          {deleting ? "Deleting..." : "Yes, Delete"}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </form>
          </div>
        </div>
      )}

      {/* Project Grid */}
      {edit && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
          {fetchedProjects.length > 0 ? (
            fetchedProjects.map((project: any, index: number) => (
              <div
                key={index}
                className="bg-gray-200 p-4 rounded-lg flex justify-between items-start shadow-sm border border-gray-300 hover:shadow-md transition"
              >
                <div>
                  <h1 className="text-[20px] font-normal pb-1">
                    {project.title}
                  </h1>
                  <p className="text-gray-500 text-sm line-clamp-2">
                    {project.description}
                  </p>
                  {project.technologies && project.technologies.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1">
                      {project.technologies.map((tech: string, i: number) => (
                        <span
                          key={i}
                          className="text-xs bg-gray-300 px-2 py-1 rounded"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => handleEditClick(project)}
                  className="text-gray-500 hover:text-gray-700 transition"
                >
                  <Pencil className="w-5 h-5" />
                </button>
              </div>
            ))
          ) : (
            <div className="col-span-2 p-4 text-center text-gray-500">
              No projects found. Click "Add New" to create your first project.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProjectSection;
