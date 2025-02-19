

"use client";
import React from "react";


const steps = [
  { id: 1, name: "Profile" },
  { id: 2, name: "Portfolio setup" },
  { id: 3, name: "Sections" },
  { id: 4, name: "Appearance" },
];

const ProgressSidebar = ({ currentStep }: { currentStep: any }) => {

  return (
    <div className="w-full md:w-1/4  max-md:px-5 pt-12">
      <ul className="">
        {steps.map((step) => (
          <li key={step.id} className="flex items-center gap-2">
            <div
              className={`w-8 h-8 flex items-center justify-center rounded-full text-white font-bold z-[2] ${
                step.id <= currentStep ? "bg-[--primary]" : "bg-gray-300"
              }`}
            >
              {step.id}
            </div>

            <div className="h-12 border-l-2 border-gray-300  ml-[-25px] pr-[22px] z-1"></div>

            <span
              className={`text-md ${
                step.id === currentStep
                  ? "font-bold text-bold"
                  : "text-gray-500"
              }`}
            >
              {step.name}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProgressSidebar