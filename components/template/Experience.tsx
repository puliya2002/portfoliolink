"use client";
import React from "react";
import { motion } from "framer-motion";
// import { ExperienceCard } from "./ExperienceCard";



const Timeline = () => {
  const events = [
    {
      year: "1984",
      title: "First Macintosh computer",
      description:
        "The Apple Macintosh—later rebranded as the Macintosh 128K—is the original Apple Macintosh personal computer. It played a pivotal role in establishing desktop publishing as a general office function. The motherboard, a 9 in (23 cm) CRT monitor, and a floppy drive were housed in a beige case with integrated carrying handle; it came with a keyboard and single-button mouse.",
    },
    {
      year: "1998",
      title: "iMac",
      description:
        "iMac is a family of all-in-one Mac desktop computers designed and built by Apple Inc. It has been the primary part of Apple's consumer desktop offerings since its debut in August 1998, and has evolved through seven distinct forms.",
    },
    {
      year: "1998",
      title: "iMac",
      description:
        "iMac is a family of all-in-one Mac desktop computers designed and built by Apple Inc. It has been the primary part of Apple's consumer desktop offerings since its debut in August 1998, and has evolved through seven distinct forms.",
    },
  ];
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  };
  return (
    <div className="d_container">

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
        transition={{ duration: 1, delay: 0.1 }}
      >
        <h2 className="pb-7">Experience</h2>
      </motion.div>
      <div className="max-w-4xl mx-auto p-6 relative">
        {/* Timeline Line */}
        <div className="absolute max-sm:left-4 left-1/2 w-0.5 bg-gray-600 transform -translate-x-1/2 top-12 bottom-16" />

        <div className="relative">
          {events.map((event, index) => (
            <div
              key={index}
              className={`mb-[-20px] max-sm:mb-1 flex max-sm:justify-end ${
                index % 2 === 0 ? "justify-end" : "justify-start"
              }`}
            >
              <div className="relative max-sm:w-full w-1/2 p-4">
                {/* Timeline dot */}
                <span
                  className={`absolute top-5 max-sm:-left-5  ${index % 2 === 0 ? "-left-3" : "-right-3"} w-6 h-6 bg-gray-700 rounded-full border-4 border-gray-900`}
                ></span>

                {/* Event Content */}
                <p
                  className={`text-gray-400 italic text-md max-sm:text-left ${
                    index % 2 === 0 ? "text-left" : "text-right"
                  }`}
                >
                  {event.year}
                </p>
                <h3
                  className={`text-xl  font-semibold text-white max-sm:text-left ${
                    index % 2 === 0 ? "text-left" : "text-right"
                  }`}
                >
                  {event.title}
                </h3>
                <p
                  className={`text-gray-300 text-md mt-2 max-sm:text-left ${
                    index % 2 === 0 ? "text-left" : "text-right"
                  }`}
                >
                  {event.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Timeline;
