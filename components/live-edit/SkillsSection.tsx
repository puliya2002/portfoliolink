"use client";
import React, { useState, useEffect } from "react";
import Button from "@/components/ui/Button";
import TextField from "@/components/ui/TextField";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Pencil, Plus, Trash2, X } from "lucide-react";

const SkillsSection = ({ onChange }: { onChange: () => void }) => {
  const router = useRouter();

  const [error, setError] = useState("");
  const [edit, setEdit] = useState(false);

  const [name, setName] = useState("");
  const [proficiency, setProficiency] = useState(75); // Default to 75%
  const [category, setCategory] = useState("technical"); // Default category
  const [fetchedSkills, setFetchedSkills] = useState([]);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const [message, setMessage] = useState<string | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState<any>(null);
  const [isAddNewMode, setIsAddNewMode] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = () => {
    setError("");
    axios
      .get("/api/skills")
      .then((res) => {
        setFetchedSkills(res.data.skills || []);
      })
      .catch((err) => {
        console.log({ error: err }, { message: err.message });
        setError("Failed to fetch skills. Please refresh the page.");
      });
  };

  const resetForm = () => {
    setName("");
    setProficiency(75);
    setCategory("technical");
    setSelectedSkill(null);
    setError("");
  };

  const handleSave = async (e: any) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      await axios.post("/api/skills", {
        skills: [
          {
            name,
            proficiency,
            category,
          },
        ],
      });

      setEdit(false);
      setIsModalOpen(false);
      resetForm();
      fetchSkills();
      setMessage("Skill added successfully!");
      setTimeout(() => setMessage(null), 3000);
      onChange();
    } catch (err) {
      console.log(err);
      setError("Failed to save skill. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleUpdate = async (e: any) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      await axios.put(`/api/skills/${selectedSkill._id}`, {
        name,
        proficiency,
        category,
      });

      setIsModalOpen(false);
      resetForm();
      fetchSkills();
      setMessage("Skill updated successfully!");
      setTimeout(() => setMessage(null), 3000);
      onChange();
    } catch (err) {
      console.log(err);
      setError("Failed to update skill. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (skillId: string) => {
    if (confirmDelete !== skillId) return;

    setDeleting(true);
    setError("");
    setIsModalOpen(false);

    try {
      await axios.delete(`/api/skills/${skillId}`);

      setConfirmDelete(null);
      fetchSkills();
      setMessage("Skill deleted successfully!");
      setTimeout(() => setMessage(null), 3000);
      onChange();
    } catch (err) {
      console.log(err);
      setError("Failed to delete skill. Please try again.");
    } finally {
      setDeleting(false);
    }
  };

  const handleEditClick = (skill: any) => {
    setSelectedSkill(skill);
    setName(skill.name);
    setProficiency(skill.proficiency);
    setCategory(skill.category);
    setIsAddNewMode(false);
    setIsModalOpen(true);
  };

  const handleAddNewClick = () => {
    resetForm();
    setIsAddNewMode(true);
    setIsModalOpen(true);
  };

  // Group skills by category
  const groupedSkills = fetchedSkills.reduce((acc: any, skill: any) => {
    const category = skill.category || "Other";
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(skill);
    return acc;
  }, {});

  return (
    <div className="bg-gray-100 p-5 rounded-[20px] mt-5">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">Skills Section</h1>
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

      {/* Modal for Add New or Edit Skill */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-[500px] max-w-[90%] max-h-[90%] overflow-y-auto shadow-lg">
            <h2 className="text-xl font-semibold mb-4">
              {isAddNewMode ? "Add New Skill" : "Edit Skill"}
            </h2>

            <form onSubmit={isAddNewMode ? handleSave : handleUpdate}>
              <TextField
                label="Skill Name"
                placeholder="e.g., JavaScript, Project Management, Design"
                value={name}
                onChange={(e: any) => setName(e.target.value)}
                required
              />

              <div className="mt-3">
                <label className="block mb-1">Skill Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="form_input bg-gray-50 w-full p-2 border rounded"
                  required
                >
                  <option value="technical">Technical</option>
                  <option value="soft">Soft Skills</option>
                  <option value="language">Languages</option>
                  <option value="tool">Tools</option>
                  <option value="framework">Frameworks</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="mt-3">
                <label className="block mb-1">
                  Proficiency: {proficiency}%
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={proficiency}
                  onChange={(e) => setProficiency(parseInt(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Beginner</span>
                  <span>Intermediate</span>
                  <span>Expert</span>
                </div>
              </div>

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
                    onClick={() => setConfirmDelete(selectedSkill._id)}
                    className="flex items-center text-red-500 hover:text-red-700 transition"
                    disabled={deleting}
                  >
                    <Trash2 className="w-4 h-4 mr-1" />
                    Delete Skill
                  </button>

                  {confirmDelete === selectedSkill._id && (
                    <div className="mt-2 p-2 border border-red-200 bg-red-50 rounded">
                      <p className="text-sm text-red-700 mb-2">
                        Are you sure you want to delete this skill?
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
                          onClick={() => handleDelete(selectedSkill._id)}
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

      {/* Skills Display */}
      {edit ? (
        <div className="py-4">
          {Object.keys(groupedSkills).length > 0 ? (
            Object.entries(groupedSkills).map(([category, skills]: [string, any]) => (
              <div key={category} className="mb-4">
                <h2 className="text-lg font-medium mb-2 capitalize">{category}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {skills.map((skill: any, index: number) => (
                    <div
                      key={index}
                      className="bg-gray-200 p-3 rounded-lg flex justify-between items-center shadow-sm border border-gray-300"
                    >
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-1">
                          <h3 className="font-medium">{skill.name}</h3>
                          <span className="text-sm text-gray-600">{skill.proficiency}%</span>
                        </div>
                        <div className="w-full bg-gray-300 rounded-full h-2.5">
                          <div
                            className="bg-blue-600 h-2.5 rounded-full"
                            style={{ width: `${skill.proficiency}%` }}
                          ></div>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleEditClick(skill)}
                        className="ml-3 text-gray-500 hover:text-gray-700 transition"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="p-4 text-center text-gray-500">
              No skills found. Click "Add New" to create your first skill.
            </div>
          )}
        </div>
      ) : (
        <div className="py-4">
          {Object.keys(groupedSkills).length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {fetchedSkills.map((skill: any, index: number) => (
                <div
                  key={index}
                  className="bg-gray-200 px-3 py-1 rounded-full text-sm"
                >
                  {skill.name}
                </div>
              ))}
            </div>
          ) : (
            <div className="p-4 text-center text-gray-500">
              No skills added yet.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SkillsSection;