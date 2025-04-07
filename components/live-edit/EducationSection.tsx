"use client";
import React, { useState, useEffect } from "react";
import Button from "@/components/ui/Button";
import TextField from "@/components/ui/TextField";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Pencil, Plus, Trash2 } from "lucide-react";

const EducationSection = ({ onChange }: { onChange: () => void }) => {
  const router = useRouter();

  const [error, setError] = useState("");
  const [edit, setEdit] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [fetchedEducation, setFetchedEducation] = useState([]);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const [message, setMessage] = useState<string | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEducation, setSelectedEducation] = useState<any>(null);
  const [isAddNewMode, setIsAddNewMode] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  useEffect(() => {
    fetchEducation();
  }, []);

  const fetchEducation = () => {
    setError("");
    axios
      .get("/api/education")
      .then((res) => {
        setFetchedEducation(res.data.education || []);
      })
      .catch((err) => {
        console.log({ error: err }, { message: err.message });
        setError("Failed to fetch education entries. Please refresh the page.");
      });
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setStartDate("");
    setEndDate("");
    setSelectedEducation(null);
    setError("");
  };

  const handleSave = async (e: any) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      await axios.post("/api/education", {
        education: [
          {
            title,
            description,
            startDate: startDate ? new Date(startDate) : null,
            endDate: endDate ? new Date(endDate) : null,
          },
        ],
      });

      setEdit(false);
      setIsModalOpen(false);
      resetForm();
      fetchEducation();
      setMessage("Education entry added successfully!");
      setTimeout(() => setMessage(null), 3000);
      onChange();
    } catch (err) {
      console.log(err);
      setError("Failed to save education entry. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleUpdate = async (e: any) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      await axios.put(`/api/education/${selectedEducation._id}`, {
        title,
        description,
        startDate: startDate ? new Date(startDate) : null,
        endDate: endDate ? new Date(endDate) : null,
      });

      setIsModalOpen(false);
      resetForm();
      fetchEducation();
      setMessage("Education entry updated successfully!");
      setTimeout(() => setMessage(null), 3000);
      onChange();
    } catch (err) {
      console.log(err);
      setError("Failed to update education entry. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (educationId: string) => {
    if (confirmDelete !== educationId) return;

    setDeleting(true);
    setError("");
    setIsModalOpen(false);

    try {
      await axios.delete(`/api/education/${educationId}`);

      setConfirmDelete(null);
      fetchEducation();
      setMessage("Education entry deleted successfully!");
      setTimeout(() => setMessage(null), 3000);
      onChange();
    } catch (err) {
      console.log(err);
      setError("Failed to delete education entry. Please try again.");
    } finally {
      setDeleting(false);
    }
  };

  const handleEditClick = (education: any) => {
    setSelectedEducation(education);
    setTitle(education.title);
    setDescription(education.description);
    setStartDate(
      education.startDate
        ? new Date(education.startDate).toISOString().split("T")[0]
        : ""
    );
    setEndDate(
      education.endDate
        ? new Date(education.endDate).toISOString().split("T")[0]
        : ""
    );
    setIsAddNewMode(false);
    setIsModalOpen(true);
  };

  const handleAddNewClick = () => {
    resetForm();
    setIsAddNewMode(true);
    setIsModalOpen(true);
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  return (
    <div className="bg-gray-100 p-5 rounded-[20px] mt-5">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">Education Section</h1>
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

      {/* Modal for Add New or Edit Education */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-[500px] max-w-[90%] max-h-[90%] overflow-y-auto shadow-lg">
            <h2 className="text-xl font-semibold mb-4">
              {isAddNewMode ? "Add New Education" : "Edit Education"}
            </h2>

            <form onSubmit={isAddNewMode ? handleSave : handleUpdate}>
              <TextField
                label="Degree/Program Title"
                placeholder="e.g., Bachelor of Science in Computer Science"
                value={title}
                onChange={(e: any) => setTitle(e.target.value)}
                required
              />

              <div className="grid grid-cols-2 gap-3 mt-3">
                <div>
                  <label className="mb-1 block">Start Date</label>
                  <input
                    type="date"
                    className="form_input bg-gray-50 w-full p-2 border rounded"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </div>
                <div>
                  <label className="mb-1 block">End Date</label>
                  <input
                    type="date"
                    className="form_input bg-gray-50 w-full p-2 border rounded"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </div>
              </div>

              <h1 className="text-lg font-normal py-2 mt-2">Description</h1>
              <textarea
                className="form_input h-32 bg-gray-50 w-full p-2 border rounded"
                placeholder="Describe your education, achievements, courses, etc."
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
                    onClick={() => setConfirmDelete(selectedEducation._id)}
                    className="flex items-center text-red-500 hover:text-red-700 transition"
                    disabled={deleting}
                  >
                    <Trash2 className="w-4 h-4 mr-1" />
                    Delete Education
                  </button>

                  {confirmDelete === selectedEducation._id && (
                    <div className="mt-2 p-2 border border-red-200 bg-red-50 rounded">
                      <p className="text-sm text-red-700 mb-2">
                        Are you sure you want to delete this education entry?
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
                          onClick={() => handleDelete(selectedEducation._id)}
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

      {/* Education Grid */}
      {edit && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
          {fetchedEducation.length > 0 ? (
            fetchedEducation.map((education: any, index: number) => (
              <div
                key={index}
                className="bg-gray-200 p-4 rounded-lg flex justify-between items-start shadow-sm border border-gray-300 hover:shadow-md transition"
              >
                <div>
                  <h1 className="text-[20px] font-normal pb-1">
                    {education.title}
                  </h1>
                  <div className="text-sm text-gray-600 mb-2">
                    {formatDate(education.startDate)} -{" "}
                    {formatDate(education.endDate) || "Present"}
                  </div>
                  <p className="text-gray-500 text-sm line-clamp-2">
                    {education.description}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => handleEditClick(education)}
                  className="text-gray-500 hover:text-gray-700 transition"
                >
                  <Pencil className="w-5 h-5" />
                </button>
              </div>
            ))
          ) : (
            <div className="col-span-2 p-4 text-center text-gray-500">
              No education entries found. Click "Add New" to create your first
              education entry.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default EducationSection;
