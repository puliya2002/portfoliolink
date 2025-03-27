"use client";
import React, { useEffect, useState } from "react";
import { Pencil } from "lucide-react";
import Image from "next/image";
import ThemeLight from "@/public/themelight.png";
import ThemeDark from "@/public/themedark.png";
import axios from "axios";
import { useRouter } from "next/navigation";

const SelectSections = ({ onChange }: { onChange: () => void }) => {
  const [selectedTheme, setSelectedTheme] = useState("dark");
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchTheme = async () => {
      try {
        const response = await axios.get("/api/step5");
        setSelectedTheme(response.data.theme);
      } catch (error) {
        console.error("Error fetching theme:", error);
        setError("Failed to load theme");
      }
    };
    fetchTheme();
  }, []);

  const handleThemeUpdate = async (theme: string) => {
    try {
      const response = await axios.post("/api/step5", {
        theme: theme,
      });

      setSelectedTheme(theme);
      console.log(`Theme updated to ${theme}`);

      if (onChange) {
        onChange();
      }
    } catch (err: any) {
      console.error("Error:", err.response?.data?.error);
      setError(err.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <div className="bg-gray-100 p-5 rounded-[20px] mt-5">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">Choose Portfolio Theme</h1>
      </div>

      <div>
        <h1 className="text-xl font-normal py-3 mt-5">
          Main Theme: {selectedTheme}
        </h1>
        <hr className="mb-3" />
        <div className="flex flex-row gap-5">
          <div
            className={`w-1/2 cursor-pointer border-4 ${
              selectedTheme === "dark"
                ? "border-[--primary]"
                : "border-transparent"
            } rounded-2xl`}
            onClick={() => handleThemeUpdate("dark")}
          >
            <Image src={ThemeDark} alt="Dark Theme" className="rounded-xl" />
          </div>
          <div
            className={`w-1/2 cursor-pointer border-4 ${
              selectedTheme === "light"
                ? "border-[--primary] "
                : "border-transparent"
            } rounded-2xl`}
            onClick={() => handleThemeUpdate("light")}
          >
            <Image src={ThemeLight} alt="Light Theme" className="rounded-xl" />
          </div>
        </div>

        {error && <p className="text-red-500 text-[13px] mt-3">{error}</p>}
      </div>
    </div>
  );
};

export default SelectSections;
