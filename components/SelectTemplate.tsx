import React from "react";
import Image from "next/image";

import Who from "../public/whoimg.jpg";
import Button from "./ui/Button";
import portfolioMY from "../public/portfolio-my.webp";

const selectTemplate = () => {
  return (
    <div className="main_margin">
      <div className="container mx-auto py-12">
        <h1 className="text-3xl font-bold text-center mb-12">
          Choose Your Template
        </h1>

        {/* Developer Template */}
        <div className="container mx-auto flex flex-col md:flex-row mb-16 gap-8">
          <div className="md:w-2/5 flex items-start">
            <Image
              src={portfolioMY}
              alt="hero"
              width={560}
              height={560}
              className="rounded-[20px]"
            />
          </div>
          <div className="md:w-3/5 justify-center flex flex-col lg:pr-20">
            <h2 className="pb-3">Developer Portfolio</h2>
            <ul
              style={{ listStyle: "disc" }}
              className="text-base lg:text-lg pl-5 pb-4"
            >
              <li>
                Perfect for showcasing your coding projects and technical skills
              </li>
              <li>
                Includes sections for work experience and GitHub integration
              </li>
              <li>
                Optimized for highlighting your development stack and
                achievements
              </li>
            </ul>
            <Button type="button" text="Use This Template" />
          </div>
        </div>

        {/* Coming Soon Templates */}
        <h2 className="text-2xl font-semibold text-center mb-6">
          More Templates Coming Soon
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Designer Template - Coming Soon */}
          <div className="bg-gray-100 rounded-[20px] p-6 flex flex-col items-center justify-center h-64">
            <div className="w-16 h-16 bg-gray-300 rounded-full mb-4 flex items-center justify-center">
              <span>🎨</span>
            </div>
            <h3 className="font-semibold mb-2">Designer Template</h3>
            <p className="text-gray-600 text-center">
              Perfect for visual artists and UI/UX designers
            </p>
            <span className="mt-4 px-3 py-1 bg-gray-200 rounded-full text-sm">
              Coming Soon
            </span>
          </div>

          {/* Writer Template - Coming Soon */}
          <div className="bg-gray-100 rounded-[20px] p-6 flex flex-col items-center justify-center h-64">
            <div className="w-16 h-16 bg-gray-300 rounded-full mb-4 flex items-center justify-center">
              <span>✍️</span>
            </div>
            <h3 className="font-semibold mb-2">Writer Template</h3>
            <p className="text-gray-600 text-center">
              Showcase your articles, books and writing projects
            </p>
            <span className="mt-4 px-3 py-1 bg-gray-200 rounded-full text-sm">
              Coming Soon
            </span>
          </div>

          {/* Photographer Template - Coming Soon */}
          <div className="bg-gray-100 rounded-[20px] p-6 flex flex-col items-center justify-center h-64">
            <div className="w-16 h-16 bg-gray-300 rounded-full mb-4 flex items-center justify-center">
              <span>📸</span>
            </div>
            <h3 className="font-semibold mb-2">Photographer Template</h3>
            <p className="text-gray-600 text-center">
              Display your photography portfolio with gallery views
            </p>
            <span className="mt-4 px-3 py-1 bg-gray-200 rounded-full text-sm">
              Coming Soon
            </span>
          </div>
        </div>

        <div className="text-center mt-12">
          <Button type="button" text="View All Templates" />
        </div>
      </div>
    </div>
  );
};

export default selectTemplate;
