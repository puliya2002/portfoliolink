"use client";
import React, { useState, useEffect } from "react";
import MainSection from "@/components/live-edit/MainSection";
import Picture from "@/components/live-edit/Picture";
import ProjectSection from "@/components/live-edit/ProjectSection";

function Page() {
  const [refreshIframe, setRefreshIframe] = useState(false);

  const handleChange = () => {
    // When state in MainSection changes, trigger iframe refresh
    setRefreshIframe((prev) => !prev);
  };

  useEffect(() => {
    // Whenever the iframe needs to be refreshed, set a key to force a reload
  }, [refreshIframe]);

  return (
    <div>
      <div className="flex flex-row bg-white">
        <div className="w-2/5 p-5 min-h-screen max-h-screen overflow-y-scroll">
          <h1 className="text-xl font-bold">Live Edit</h1>
          <p className="text-gray-500 text-[13px]">
            These sections include all the information about you.
          </p>
          <MainSection onChange={handleChange} />
          <Picture onChange={handleChange} />
          <ProjectSection onChange={handleChange} />
        </div>
        <div className="w-3/5">
          <iframe
            src="http://localhost:3000/minu"
            key={refreshIframe ? Date.now() : ""}
            scrolling="yes"
            loading="lazy"
            className="border-2 border-[--primary] w-full h-[100%] min-h-screen max-h-screen z-0"
          />
        </div>
      </div>
    </div>
  );
}

export default Page;
