"use client";
import React, { useState, useEffect } from "react";
import Button from "@/components/Button";
import axios from "axios";
import { useRouter } from "next/navigation";
import PortfolioSetupCard from "@/components/portfolioSetupCard";

export default function Step2() {
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">Portfolio Setup</h1>
      <p className="text-gray-500 text-[15px]">Select Portfolio Sections</p>
      <hr className="my-2" />

      <form onSubmit={handleSubmit}>
        <div className="gap-4 grid grid-cols-1 md:grid-cols-2 pt-5">
          <PortfolioSetupCard
            heading="Profile Section"
            slug="profile-section"
            isChecked={true}
            isDisabled={true}
          />
          <PortfolioSetupCard
            heading="About Me Section"
            slug="about-me-section"
            isChecked={true}
            isDisabled={true}
          />
          <PortfolioSetupCard
            heading="Project Section"
            slug="project-section"
            isChecked={true}

          />
          <PortfolioSetupCard heading="Skills" slug="skills" />
          <PortfolioSetupCard
            heading="Experience"
            slug="experience"

          />
          <PortfolioSetupCard
            heading="Education"
            slug="education"

          />
        </div>
        <div className="flex justify-end mt-5">
          <Button
            type="submit"
            text="Next"
            extraClass="md:px-[50px] lg:px-[100px]"
          />
        </div>
      </form>
    </div>
  );
}
