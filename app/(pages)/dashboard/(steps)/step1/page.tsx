"use client";
import React, { useState } from "react";
import Button from "@/components/Button";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Step1() {
  const [username, setUsername] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [bio, setBio] = useState("");
  const [error, setError] = useState("");
  const router = useRouter(); // Next.js router for redirection

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting username:", username); // Debugging log
    try {
      const response = await axios.post("/api/step1", {
        username,
        displayName,
        bio,
      });
      console.log("Response:", response.data);
      router.push("/dashboard/step2");
    } catch (err: any) {
      console.error("Error:", err.response?.data);
      setError(err.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">Profile</h1>
      <p className="text-gray-500 text-[15px]">
        This is how others will see you on the site.
      </p>
      <hr className="my-4" />

      {/* Form Inputs */}
      <form onSubmit={handleSubmit}>
        <div className="mt-5">
          <label className="block text-gray-700">Username</label>
          <input
            type="text"
            className="w-full form_input"
            placeholder="e.g. pulindu_"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <p className="form_discription">
            Set a unique username for your portfolio URL (e.g.,
            https://portfolio.link/username). This cannot be changed later.
          </p>

          <label className="block mt-4 text-gray-700">Display Name</label>
          <input
            type="text"
            className="form_input"
            placeholder="e.g. Pulindu Vidmal"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            required
          />

          <label className="block mt-4 text-gray-700">Bio</label>
          <textarea
            className="form_input h-32"
            placeholder="Write a brief bio for your 'About Me' section."
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          ></textarea>

          <label className="block mt-4 text-gray-700">URL</label>
          <input
            type="text"
            className="w-full p-2 border rounded-md bg-gray-200 h-[47px]"
            disabled
            value={`https://portfolio.link/${username}`}
          />

          {error && <p className="text-red-500 text-[15px] pt-3">{error}</p>}
        </div>

        {/* Next Button */}
        <div className="flex justify-end mt-5">
          <Button type="submit" text="Next" extraClass="px-[100px]" />
        </div>
      </form>
    </div>
  );
}
