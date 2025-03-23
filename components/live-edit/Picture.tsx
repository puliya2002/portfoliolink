"use client";
import React, { useEffect, useState } from "react";

import axios from "axios";
import { Pencil } from "lucide-react";


const Picture = ({ onChange }: { onChange: () => void }) => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const [message, setMessage] = useState<string | null>(null);
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    axios
      .get("/api/step3")
      .then((res) => {
        setUrl(res.data.picture);
        setLoading(false);
      })
      .catch((err) => {
        console.log({ error: err }, { message: err.message });
      });
  }, []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] || null;
    setFile(selectedFile);
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage("Please select a file.");
      return;
    }

    setUploading(true);
      setMessage(null);


    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/step3", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        setMessage(`File uploaded successfully: ${result.fileName}`);
          setUrl(result.fileUrl); // Update URL after successful upload
                setEdit(false);
                onChange();
      } else {
        setMessage(`Error: ${result.error}`);
      }
    } catch (error) {
      setMessage("Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="bg-gray-100 p-5 rounded-[20px] mt-5">
      <div className="flex justify-between mb-[-12px]">
        <h1 className="text-xl font-semibold">Picture</h1>
        <div className="flex gap-1 px-4 py-1 rounded-full">
          {!edit && <Pencil className="w-5 h-5" />}
          <button onClick={() => setEdit(!edit)}>
            {edit ? "Cancel" : "Edit"}
          </button>
        </div>
      </div>

      {edit ? (
        <div className="p-7 mt-4 border rounded-xl shadow-sm max-w-sm">
          <hr className="mb-3" />
          <input type="file" onChange={handleFileChange} className="mb-2" />
          <button
            onClick={handleUpload}
            disabled={uploading}
            className="bg-[--primary] text-black px-4 py-2 rounded-full disabled:bg-gray-400"
          >
            {uploading ? "Uploading..." : "Upload & Save"}
          </button>
          {message && <p className="mt-2 text-sm text-gray-700">{message}</p>}
        </div>
      ) : (
        <div className="rounded-lg overflow-hidden mt-4">
          {/* {!loading ? (
              <Image
                className="w-[100px] h-[100px] object-center object-cover"
                src={url}
                alt="Uploaded Image"
                width={100}
                height={100}
              />
            ) : (
              <p>Loading.....</p>
            )} */}
        </div>
      )}
    </div>
  );
};

export default Picture;
