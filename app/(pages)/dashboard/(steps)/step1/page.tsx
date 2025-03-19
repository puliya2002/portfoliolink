"use client";
import React, { useState, useEffect } from "react";
import Button from "@/components/ui/Button";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Step1() {
  const [username, setUsername] = useState("");

  const [error, setError] = useState("");
  const [isChecking, setIsChecking] = useState(false);
  const [usernameAvailable, setUsernameAvailable] = useState(true);
  const router = useRouter();

  // Debounce live username checking
  useEffect(() => {
    if (!username) {
      setUsernameAvailable(true);
      return;
    }

    setIsChecking(true);
    const timer = setTimeout(async () => {
      try {
        const response = await axios.post(
          `/api/check-username?username=${username}`
        );
        setUsernameAvailable(response.data.available);
      } catch (error) {
        console.error("Error checking username:", error);
        setUsernameAvailable(false);
      }
      setIsChecking(false);
    }, 500); // Delay of 500ms

    return () => clearTimeout(timer);
  }, [username]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("/api/step1");
        const {username} = response?.data;
        setUsername(username);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!usernameAvailable) {
      setError("Username is already taken");
      return;
    }

    if (!username) {
      setError("All fields are required");
      return;
    }

    try {
      const response = await axios.post("/api/step1", {
        username,
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
      <h1 className="text-2xl font-bold">Username</h1>
      <p className="text-gray-500 text-[15px]">
        This is how others will see you on the site.
      </p>
      <hr className="my-4" />

      <form onSubmit={handleSubmit}>
        <div className="mt-5">
          <label className="block text-gray-700">Username</label>
          <input
            type="text"
            className="w-full form_input"
            placeholder="e.g. pulindu_"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <p className="form_discription">
            Set a unique username for your portfolio URL (e.g.,
            https://portfolio.link/username). This cannot be changed later.
          </p>

          {username && (
            <p
              className={`text-[15px] pt-1 ${
                isChecking
                  ? "text-gray-500"
                  : usernameAvailable
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              {isChecking
                ? "Checking availability..."
                : usernameAvailable
                ? "Username is available ✅"
                : "Username is already taken ❌"}
            </p>
          )}




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
