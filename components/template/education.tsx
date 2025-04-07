"use client";
import React from "react";
import { motion } from "framer-motion";

const Timeline = ({education}:any) => {
  const events = [
    {
      year: "2015",
      title: "High School Graduation",
      description:
        "Completed high school with a focus on science and mathematics, laying the foundation for a future in technology and engineering.",
    },
    {
      year: "2019",
      title: "Bachelor's in Software Engineering",
      description:
        "Earned a Bachelor's degree in Software Engineering from Plymouth University, gaining expertise in programming, data structures, and software development methodologies.",
    },
    {
      year: "2023",
      title: "Master's in Computer Science (Ongoing)",
      description:
        "Currently pursuing a Master's degree, focusing on advanced computing concepts, AI, and cloud technologies.",
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
        <h2 className="pb-2 pt-3">Education</h2>
      </motion.div>
      <div className="max-w-4xl mx-auto p-6 relative">
        {/* Timeline Line */}
        <div className="absolute max-sm:left-4 left-1/2 w-0.5 bg-gray-600 transform -translate-x-1/2 top-12 bottom-16" />

        <div className="relative">
          {education.map((event: any, index: number) => {
            const formatDate = (dateString: string) => {
              return new Date(dateString).toLocaleDateString("en-US", {
                year: "numeric",

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
                    } w-6 h-6 bg-gray-700 rounded-full border-4 border-gray-800 `}
                  ></span>

                  {/* Event Content */}
                  <p
                    className={`opacity-60 italic text-md max-sm:text-left ${
                      index % 2 === 0 ? "text-left" : "text-right"
                    }`}
                  >
                    {formatDate(event.startDate)} - {formatDate(event.endDate)}
                  </p>
                  <h3
                    className={`text-xl font-[500]   max-sm:text-left ${
                      index % 2 === 0 ? "text-left" : "text-right"
                    }`}
                  >
                    {event.title}
                  </h3>
                  <p
                    className={` text-md mt-2 max-sm:text-left ${
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
