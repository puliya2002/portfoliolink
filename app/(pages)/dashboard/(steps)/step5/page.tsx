"use client";
import React, { useEffect, useState } from "react";
import Button from "@/components/ui/Button";
import Image from "next/image";
import ThemeLight from "@/public/themelight.png";
import ThemeDark from "@/public/themedark.png";
import axios from "axios";
import { useRouter } from "next/navigation";
import { set } from "mongoose";

const Appearance = () => {
  const [selectedTheme, setSelectedTheme] = useState("dark");
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios
      .get("/api/step5")
      .then((response) => {
        setSelectedTheme(response.data.theme);
      })
      .catch((error) => {
        console.error("Error:", error.response?.data?.error);
      });
  }, []);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    axios
      .post("/api/step5", {
        theme: selectedTheme,
      })
      .then((response) => {
        console.log("Response:", response.data);
        setLoading(false);
        router.push("/dashboard/");
      })
      .catch((error) => {
        console.error("Error:", error.response?.data?.error);
        setLoading(false);
      });
  }

  return (
    <div>
      <h1 className="text-xl font-bold">Appearance</h1>


      <form onSubmit={handleSubmit}>
        <h1 className="text-xl font-normal py-3 mt-5">
          Main Theme : {selectedTheme}
        </h1>
        <hr className="mb-3" />
        <div className="flex flex-row gap-5">
          <div
            className={`w-1/2 cursor-pointer border-4 ${
              selectedTheme === "dark"
                ? "border-[--primary]"
                : "border-transparent"
            } rounded-2xl`}
            onClick={() => setSelectedTheme("dark")}
          >
            <Image src={ThemeDark} alt="Dark Theme" className="rounded-xl" />
          </div>
          <div
            className={`w-1/2 cursor-pointer border-4 ${
              selectedTheme === "light"
                ? "border-[--primary] "
                : "border-transparent"
            } rounded-2xl`}
            onClick={() => setSelectedTheme("light")}
          >
            <Image src={ThemeLight} alt="Light Theme" className="rounded-xl" />
          </div>
        </div>
        <div className="flex justify-end mt-5">
          <Button type="back" text="Back" extraClass="px-[30px] mr-2" />
          <Button type="submit" text="Finish" extraClass="px-[60px]" />
        </div>
      </form>
    </div>
  );
};

export default Appearance;
