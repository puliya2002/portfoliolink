"use client";
import React from "react";
import { motion } from "framer-motion";

const Timeline = ({experience}:any) => {


  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="d_container">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeInUp}
        transition={{ duration: 1, delay: 0.1 }}
      >
        <h2 className="pb-2 pt-3">Experience</h2>
      </motion.div>
      <div className="max-w-4xl mx-auto p-6 relative">
        {/* Timeline Line */}
        <div className="absolute max-sm:left-4 left-1/2 w-0.5 bg-gray-600 transform -translate-x-1/2 top-12 bottom-16" />

        <div className="relative">
          {experience &&
            experience.map((event: any, index: number) => {
              // Format the date to 'MMM DD, YYYY' (e.g., Mar 28, 2025)
              const formatDate = (dateString: string) => {
                return new Date(dateString).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",

                });
              };

              return (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  variants={fadeInUp}
                  transition={{ duration: 1, delay: index * 0.1 }}
                  className={`mb-[-20px] max-sm:mb-1 flex max-sm:justify-end ${
                    index % 2 === 0 ? "justify-end" : "justify-start"
                  }`}
                >
                  <div className="relative max-sm:w-full w-1/2 p-4">
                    {/* Timeline dot */}
                    <span
                      className={`absolute top-5 max-sm:-left-5  ${
                        index % 2 === 0 ? "-left-3" : "-right-3"
                      } w-6 h-6 bg-gray-700 rounded-full border-4 border-gray-900`}
                    ></span>

                    {/* Event Content */}
                    <p
                      className={`text-gray-400 italic text-md max-sm:text-left ${
                        index % 2 === 0 ? "text-left" : "text-right"
                      }`}
                    >
                      {formatDate(event.startDate)} -{" "}
                      {formatDate(event.endDate)}
                    </p>
                    <h3
                      className={`text-xl font-semibold text-white max-sm:text-left ${
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
                </motion.div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Timeline;
