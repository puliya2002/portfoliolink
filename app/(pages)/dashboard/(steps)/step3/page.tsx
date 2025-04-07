"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import Button from "@/components/ui/Button";
import Link from "next/link";

const FileUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const [message, setMessage] = useState<string | null>(null);
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(true);

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
  });

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
      } else {
        setMessage(`Error: ${result.error}`);
      }
    } catch (error) {
      setMessage("Upload failed. Please try again.");
      console.error("Error uploading file:", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <div className="p-7 border rounded-xl shadow-sm max-w-sm">
        <input type="file" onChange={handleFileChange} className="mb-2 " />
        <button
          onClick={handleUpload}
          disabled={uploading}
          className="bg-black text-white px-4 py-2 rounded-full disabled:bg-gray-400"
        >
          {uploading ? "Uploading..." : "Upload"}
        </button>
        {message && <p className="mt-2 text-sm text-gray-700">{message}</p>}
        <div className="w-[300px] h-[300px] rounded-lg overflow-hidden mt-4">
          {!loading ? (
            <Image
              className="w-full h-full object-center object-cover"
              src={url}
              alt="logo"
              width={300}
              height={300}
            />
          ) : (
            <p>Loading.....</p>
          )}
        </div>
      </div>
      <div className="flex justify-end mt-5">
        <Button type="back" text="Back" extraClass="px-[30px] mr-2" />
        <Link href="/dashboard/step4">
          <Button type="submit" text="Next" extraClass="px-[60px]" />
        </Link>
      </div>
    </div>
  );
};

export default FileUpload;
